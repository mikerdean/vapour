import { Outlet } from "@solidjs/router";

import Footer from "./footer";
import Header from "./header";
import type { LayoutComponent } from "./layout.types";
import NowPlaying from "./nowPlaying";

const Layout: LayoutComponent = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <NowPlaying />
      <Footer />
    </>
  );
};

export default Layout;
