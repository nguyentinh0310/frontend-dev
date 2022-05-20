import { MainLayout, Seo } from "@/components";
import { LeftPanel, MiddlePannel, RightPanel } from "@/components/home";
import { NextPageWithLayout } from "@/models";

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        data={{
          title: "It Network",
          description:
            "Website It Network xây dựng fullstack sử dụng công nghệ Nextjs và Nodejs",
          url: "http://localhost:3000/",
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

export default HomePage;
