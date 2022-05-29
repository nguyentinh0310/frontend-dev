import { MainLayout, Seo } from "@/components";
import { LeftPanel, MiddlePannel, RightPanel } from "@/components/home";
import { useNotify } from "@/hooks";
import { NextPageWithLayout } from "@/models";


const HomePage: NextPageWithLayout  = () => {
  const { notifies } = useNotify();
  return (
    <>
      <Seo
        data={{
          title: `${
            notifies?.totalRows > 0 ? `(${notifies?.totalRows})` : ""
          } It Network`,
          description:
            "Website It Network xây dựng fullstack sử dụng công nghệ Nextjs và Nodejs",
          url: "https://it-network-pvptd9hy4-nguyentinh0310.vercel.app/",
          thumbnailUrl:
            "https://res.cloudinary.com/dwgximj2j/image/upload/v1625475731/header__ul8cso.png",
        }}
      />
      <section className="home">
        <LeftPanel />
        <MiddlePannel />
        <RightPanel />
      </section>
    </>
  );
};
HomePage.Layout = MainLayout;

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const token: any = context.req.headers.cookie;
//   const tokenParser = token?.substring(4);

//   const res = await axios.get(
//     `${process.env.API_URL}/api/v1/posts/follow?limit=15`,
//     {
//       headers: { Authorization: tokenParser },
//     }
//   );
//   return {
//     props: {
//       posts: res.data,
//     },
//   };
// };

export default HomePage;
