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
  return `${process.env.REACT_APP_API_URL}/api/image?url=${encodeURIComponent(
    url
  )}`;
};

const getBase64FromUrl = async (url) => {
  const imageData = await fetch(url);
  const blob = await imageData.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};

export async function getPinterestImages(rssUrl: string) {
  try {
    const proxyUrl = `${
      process.env.REACT_APP_API_URL
    }/api/rss?url=${encodeURIComponent(rssUrl)}`;
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
        const imageSrcProxy = await proxyImage(imageUrl[1]);
        const imageBase64 = await getBase64FromUrl(imageSrcProxy);

        return {
          width: imageDimensions.width,
          height: imageDimensions.height,
          src: imageBase64,
        } as Photo;
      })
    );
    return imageUrls.filter(Boolean);
  } catch (err) {
    console.error("RSS parse error:", err);
    return [];
  }
}
