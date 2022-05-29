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



export const BASE_URL = "https://it-network-pvptd9hy4-nguyentinh0310.vercel.app";
export const socket = socketIoClient.io("https://it-network-api.herokuapp.com");
// export const socket = socketIoClient.io("http://localhost:5000");
