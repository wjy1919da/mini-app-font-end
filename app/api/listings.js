import client from "./client";

const endpoint = "/listings";

const getListings = () => client.get(endpoint);

export const addListing = (listing, onUploadProgress) => {
  const data = new FormData();
  console.log("listing in api", listing);
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", 1);
  data.append("description", listing.description);

  // 这里需要添加适当的处理来转换 image URI 为 Blob 或 File 对象
  // 示例如下：
  listing.images.forEach((image, index) => {
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    });
  });

  if (listing.location)
    data.append("location", JSON.stringify(listing.location));

  console.log("data in listing api", data);
  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addListing,
  getListings,
};
