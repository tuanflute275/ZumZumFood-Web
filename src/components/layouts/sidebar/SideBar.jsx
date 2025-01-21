import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div class="left-side-menu">
      <div class="slimscroll-menu">
        <div id="sidebar-menu">
          <ul class="metismenu" id="side-menu">
            <li class="menu-title">Home</li>

            <li>
              <Link to={"/dashboard"} class="waves-effect">
                <i class="remixicon-dashboard-line"></i>
                <span> Dashboards </span>
              </Link>
            </li>

            <li>
              <a href="javascript: void(0);" class="waves-effect">
                <i class="remixicon-stack-line"></i>
                <span> Apps </span>
                <span class="menu-arrow"></span>
              </a>
              <ul class="nav-second-level" aria-expanded="false">
                <li>
                  <Link to={"/parameter"}>Parameters</Link>
                </li>
                <li>
                  <Link to={"/brand"}>Brands</Link>
                </li>
              </ul>
            </li>

            <li>
              <a href="javascript: void(0);" class="waves-effect">
                <i class="remixicon-folder-add-line"></i>
                <span> Multi Level </span>
                <span class="menu-arrow"></span>
              </a>
              <ul class="nav-second-level nav" aria-expanded="false">
                <li>
                  <a href="javascript: void(0);">Level 1.1</a>
                </li>
                <li>
                  <a href="javascript: void(0);" aria-expanded="false">
                    Level 1.2
                    <span class="menu-arrow"></span>
                  </a>
                  <ul class="nav-third-level nav" aria-expanded="false">
                    <li>
                      <a href="javascript: void(0);">Level 2.1</a>
                    </li>
                    <li>
                      <a href="javascript: void(0);">Level 2.2</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="clearfix"></div>
      </div>
    </div>
  );
};

export default SideBar;
