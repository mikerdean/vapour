import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { ErrorBoundary } from "solid-js";

import FontAwesomeIcon from "../images/fontAwesomeIcon";
import Footer from "./footer";
import Header from "./header";
import type { LayoutComponent } from "./layout.types";
import NowPlayingMini from "./nowPlayingMini";

const Layout: LayoutComponent = (props) => {
  return (
    <>
      <Header />
      <main>
        <ErrorBoundary
          fallback={(err: Error) => (
            <div class="bg-slate-700 m-3 p-3 rounded-lg">
              <h1 class="border-b-2 border-slate-900 mb-3 text-cyan-400 text-lg">
                <FontAwesomeIcon
                  icon={faWarning}
                  class="mr-2 text-yellow-600"
                />
                An error occurred
              </h1>
              <p>{err.message}</p>
            </div>
          )}
        >
          {props.children}
        </ErrorBoundary>
      </main>
      <NowPlayingMini />
      <Footer />
    </>
  );
};

export default Layout;
