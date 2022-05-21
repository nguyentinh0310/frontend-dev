import Cookies from "cookies";
import httpProxy, { ProxyResCallback } from "http-proxy";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};
// tắt body-paser
export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "method not support" });
  }

  return new Promise((resolve) => {
    // dont't send cookie to API server
    req.headers.cookie = "";

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = "";
      proxyRes.on("data", function (chunk) {
        body += chunk;
      });
      proxyRes.on("end", function () {
        try {
          const { access_token } = JSON.parse(body);
          // convert token to cookies
          const cookies = new Cookies(req, res, {
            secure: process.env.NODE_ENV !== "development",
          });
          cookies.set("jwt", access_token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 2* 24 * 60 * 60 * 1000,
          });

          if (access_token) {
            (res as NextApiResponse)
              .status(200)
              .json({ message: "login successfully" });
          } else {
            (res as NextApiResponse).status(500).json({ message: body });
          }
        } catch (error) {
          (res as NextApiResponse)
            .status(500)
            .json({ message: "something went wrong" });
        }
        resolve(true);
      });
    };

    proxy.once("proxyRes", handleLoginResponse);

    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true, // forward
      selfHandleResponse: true, // tự xử lý
    });
  });
}
