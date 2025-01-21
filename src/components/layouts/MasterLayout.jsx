import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import SideBar from "./sidebar/SideBar";

const MasterLayout = ({ child }) => {
  return (
    <>
      <div id="preloader">
        <div id="status">
          <div class="bouncingLoader">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>

      <div id="wrapper">
        <Header />
        <SideBar />
        <div class="content-page">
          {child}
          <Footer />
        </div>
      </div>

      <div class="rightbar-overlay"></div>
    </>
  );
};

export default MasterLayout;
