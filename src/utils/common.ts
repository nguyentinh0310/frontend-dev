import socketIoClient from "socket.io-client";

export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
export const checkName = (name: string) => {
  let err = "";
  if (!name) {
    err = "Họ tên không để trông";
  }
  if (name.length > 25) {
    err = "Họ tên không không dài quá 25 chữ";
  }
  if (name.split(" ").length >= 2) {
    err = "Họ tên ít nhất hai từ trở lên";
  }
};

export const BASE_URL = "http://localhost:3000";
export const socket = socketIoClient.io("http://localhost:5000");
