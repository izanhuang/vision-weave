import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { Photo } from "react-photo-album";

function getImageDimensions(
  imgUrl: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    };
    img.onerror = () => {
      resolve({ width: 100, height: 100 }); // Default dimensions on error
    };
    img.src = imgUrl;
  });
}

const proxyImage = (url: string) => {
  if (process.env.NODE_ENV === "production") {
    return `https://your-production-domain.com/image?url=${encodeURIComponent(
      url
    )}`;
  }

  return `http://localhost:4000/image?url=${encodeURIComponent(url)}`;
};

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
      items.map(async (item): Promise<Photo | null> => {
        const imageUrl = item.description.match(/<img src=\"([^\"]+)\"/);
        if (imageUrl === null) {
          console.warn("No image found in item:", item);
          return null; // Skip items without images
        }

        const imageDimensions = await getImageDimensions(imageUrl[1]);

        const imageSrc = await proxyImage(imageUrl[1]);

        return {
          width: imageDimensions.width,
          height: imageDimensions.height,
          src: imageSrc,
        } as Photo;
      })
    );
    return imageUrls.filter(Boolean);
  } catch (err) {
    console.error("RSS parse error:", err);
    return [];
  }
}
