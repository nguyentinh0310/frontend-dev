import { toast } from "react-toastify";

export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
export const checkName = (name: string) => {
  if (!name) {
    toast.error("Họ tên không để trông");
  }
  if (name.length > 25) {
    toast.error("Họ tên không không dài quá 25 chữ");
  }
  // if (name.split(" ").length >= 2) {
  //   toast.error("Họ tên ít nhất hai từ trở lên");
  // }
};
