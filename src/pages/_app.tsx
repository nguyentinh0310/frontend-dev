import axiosClient from "@/api-client/axios-client";
import { EmptyLayout } from "@/components/layout";
import { AppPropsWithLayout } from "@/models";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { SWRConfig } from "swr";
import store from "../app/store";
import "../styles/globals.scss";

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  // useEffect(() => {
  //   const socket = socketIoClient.io();
  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  return (
    <>
      <Provider store={store}>
        <SWRConfig
          value={{
            fetcher: (url) => axiosClient.get(url),
            dedupingInterval: 60 * 60 * 1000, //1hr
            revalidateOnFocus: false,
            shouldRetryOnError: false,
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Provider>
    </>
  );
}
