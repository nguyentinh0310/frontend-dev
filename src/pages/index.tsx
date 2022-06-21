import { MainLayout, Seo } from "@/components";
import { LeftPanel, MiddlePannel, RightPanel } from "@/components/home";
import { useNotify } from "@/hooks";
import { IPost, ListResponse } from "@/models";
import { GetServerSidePropsContext } from "next";

export interface HomePageProps {
  initPosts: ListResponse<IPost>;
}

const HomePage = ({ initPosts }: HomePageProps) => {
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
        <MiddlePannel posts={initPosts} />
        <RightPanel />
      </section>
    </>
  );
};
HomePage.Layout = MainLayout;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token: any = context.req.headers.cookie;
  const tokenParser = token?.substring(4);

  const response = await fetch(
    `${process.env.API_URL}/api/v1/posts/follow?limit=15`,
    {
      headers: { Authorization: context.req ? tokenParser : undefined },
    }
  );
  const data = await response.json();

  return {
    props: {
      posts: data,
    },
  };
};

// export const getStaticProps: GetStaticProps<HomePageProps> = async (
//   context: GetStaticPropsContext
// ) => {
//   const cookies = new Cookies(req, res);
//   const accessToken = cookies.get('jwt')
//   const token: any = context.req.headers.cookie;
//   const tokenParser = token?.substring(4);

//   const response = await fetch(`${process.env.API_URL}/api/v1/posts?limit=15`);
//   const data = await response.json();

//   return {
//     props: {
//       initPosts: data,
//     },
//   };
// };

export default HomePage;
