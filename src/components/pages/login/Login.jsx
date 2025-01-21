import React, { useState, useEffect, useSelector } from "react";
import { useNavigate } from "react-router-dom";
import * as AuthServices from "../../../services/AuthService";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../../redux/reducers/user";
import { jwtDecode } from "jwt-decode";
import { selectUserData } from "../../../redux/reducers/user";

function Login() {
  const initData = {
    usernameOrEmail: "",
    password: "",
  };
  const [loginData, setLoginData] = useState(initData);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log(loginData);
    const [result, error] = await AuthServices.login(loginData);
    if (result) {
      // lưu lại mật khẩu
      if (rememberMe) {
        localStorage.setItem("loginData", JSON.stringify(loginData));
      } else {
        localStorage.removeItem("loginData");
      }

      const accessToken = result.data.accessToken;
      // Lưu token vào Redux
      dispatch(setToken(accessToken));

      // Giải mã JWT để lấy thông tin người dùng
      const decoded = jwtDecode(accessToken);
      const dataDecoded = {
        userId: decoded.nameid,
        avatar: decoded.certthumbprint,
        username: decoded.unique_name,
        fullname: decoded.given_name,
        email: decoded.email,
        role: decoded.role,
      };
      dispatch(setUser(dataDecoded));
      // navigate router
      navigate("/dashboard");
      document.location.reload();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("loginData"));
    if (savedData) {
      setLoginData(savedData);
      setRememberMe(true);
    }
  }, []);

  return (
    <div class="account-pages mt-5 mb-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card">
              <div class="card-body p-4">
                <div class="text-center w-75 m-auto">
                  <a href="index.html">
                    <span>
                      <img
                        src="assets\images\logo-dark.png"
                        alt=""
                        height="22"
                      />
                    </span>
                  </a>
                  <p class="text-muted mb-4 mt-3">
                    Enter your email address and password to access admin panel.
                  </p>
                </div>

                <form method="post" onSubmit={(e) => handleSubmitForm(e)}>
                  <div class="form-group mb-3">
                    <label for="emailaddress">Email address</label>
                    <input
                      class="form-control"
                      type="text"
                      id="usernameOrEmail"
                      name="usernameOrEmail"
                      value={loginData.usernameOrEmail}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          usernameOrEmail: e.target.value,
                        })
                      }
                      placeholder="Enter your email"
                    />
                  </div>

                  <div class="form-group mb-3">
                    <label for="password">Password</label>
                    <input
                      class="form-control"
                      type="password"
                      id="password"
                      name="password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      placeholder="Enter your password"
                    />
                  </div>

                  <div class="form-group mb-3">
                    <div class="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="checkbox-signin"
                        checked={rememberMe}
                        onChange={(e) => handleRememberMeChange(e)}
                      />
                      <label class="custom-control-label" for="checkbox-signin">
                        Remember me
                      </label>
                    </div>
                  </div>

                  <div class="form-group mb-0 text-center">
                    <button class="btn btn-primary btn-block" type="submit">
                      Log In
                    </button>
                  </div>
                </form>

                <div class="text-center">
                  <h5 class="mt-3 text-muted">Sign in with</h5>
                  <ul class="social-list list-inline mt-3 mb-0">
                    <li class="list-inline-item">
                      <a
                        href="javascript: void(0);"
                        class="social-list-item border-primary text-primary"
                      >
                        <i class="mdi mdi-facebook"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="javascript: void(0);"
                        class="social-list-item border-danger text-danger"
                      >
                        <i class="mdi mdi-google"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="javascript: void(0);"
                        class="social-list-item border-info text-info"
                      >
                        <i class="mdi mdi-twitter"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="javascript: void(0);"
                        class="social-list-item border-secondary text-secondary"
                      >
                        <i class="mdi mdi-github-circle"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-12 text-center">
                <p>
                  {" "}
                  <a href="pages-recoverpw.html" class="text-muted ml-1">
                    Forgot your password?
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
