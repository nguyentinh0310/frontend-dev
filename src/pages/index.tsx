import { MainLayout } from "@/components";
import { LeftPanel, MiddlePannel, RightPanel } from "@/components/home";
import { NextPageWithLayout } from "@/models";

const HomePage: NextPageWithLayout = () => {
  return (
    <section className="home">
      <LeftPanel />
      <MiddlePannel />
      <RightPanel />
    </section>
  );
};
HomePage.Layout = MainLayout;

export default HomePage;
