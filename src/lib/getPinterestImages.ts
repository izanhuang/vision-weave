import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { Photo } from "react-photo-album";

function getImageDimensions(
  imgUrl: string
): Promise<{ width: string; height: string }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width ? `${img.width}px` : "auto",
        height: img.height ? `${img.height}px` : "auto",
      });
    };
    img.onerror = () => {
      resolve({ width: "100px", height: "100px" }); // Default dimensions on error
    };
    img.src = imgUrl;
  });
}

export async function getPinterestImages(rssUrl: string) {
  try {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://your-production-domain.com" // e.g. yourdomain.com or backend server
        : "http://localhost:4000";

    const proxyUrl = `${baseUrl}/api/rss?url=${encodeURIComponent(rssUrl)}`;
    const { data } = await axios.get(proxyUrl);
    const parser = new XMLParser();
    const json = parser.parse(data);
    const items = json.rss.channel.item;
    const imageUrls = await Promise.all(
      items.map(async (item): Promise<Photo> => {
        const imageUrl = item.description.match(/<img src=\"([^\"]+)\"/);
        const imageDimensions = imageUrl
          ? await getImageDimensions(imageUrl[1])
          : { width: 100, height: 100 }; // Default dimensions if no image found

        console.log("Parsed image:", imageDimensions);

        return {
          key: item.guid,
          width: imageDimensions.width,
          height: imageDimensions.height,
          src: imageUrl ? imageUrl[1] : null,
        } as Photo;
      })
    );
    return imageUrls.filter(Boolean);
  } catch (err) {
    console.error("RSS parse error:", err);
    return [];
  }
}
