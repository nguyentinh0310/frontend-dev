import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";
import Cookies from "cookies";

// tắt body-paser
export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return new Promise((resolve) => {
    // convert cookies to header Authorization
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get('jwt')
    if(accessToken){
      req.headers.authorization= `${accessToken}`
    }
    // dont't send cookie to API server
    req.headers.cookie = "";


    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true, // forward
      selfHandleResponse: false, // res trả về proxy thực hiện
    });

    proxy.once("proxyRes", () => {
      resolve(true);
    });
  });
}
