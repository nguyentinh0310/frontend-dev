import { toast } from "react-toastify";

export const checkImage = (file: any) => {
  if (!file) toast.error("File không tồn tại");

  if (file.type !== "image/jpeg" && file.type !== "image/png") {
    toast.error("File không đúng định dạng");
  }
  if (file.size > 1024 * 1024) {
    toast.error("Kích thước hình ảnh lớn nhất là 1mb");
  }
};

export const imageUpload = async (images: any) => {
  let imgArr: any = [];
  for (const item of images) {
    const formData = new FormData();
    formData.append("file", item);

    formData.append("upload_preset", "v1coewqh");
    formData.append("cloud_name", "dwgximj2j");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dwgximj2j/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }
  return imgArr;
};
