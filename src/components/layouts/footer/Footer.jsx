import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer class="footer">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6">
          <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <Link to={"https://github.com/tuanflute275"} target="_blank">
                  Github
                </Link>
              </li>
              <li className="list-inline-item">
                <Link
                  to={"https://www.facebook.com/profile.php?id=100047425502024"}
                  target="_blank"
                >
                  FaceBook
                </Link>
              </li>
            </ul>
          </div>
          <div class="col-md-6">
            <div class="text-md-right footer-links d-none d-sm-block">
              <a href="javascript:void(0);">TUANFLUTE275</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
