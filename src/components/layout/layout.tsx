import { Outlet } from "@solidjs/router";

import Footer from "./footer";
import Header from "./header";
import type { LayoutComponent } from "./types";

const Layout: LayoutComponent = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
