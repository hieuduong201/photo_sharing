import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/UserSlice";

const LoginRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Đăng nhập
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Đăng ký
  const [registerData, setRegisterData] = useState({
    login_name: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    location: "",
    description: "",
    occupation: ""
  });
  const [registerMessage, setRegisterMessage] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/login`,
        { login_name: loginName, password }
      );
      if (res.data.status === "OK") {
        dispatch(updateUser(res.data.data));
        localStorage.setItem("user", JSON.stringify(res.data.data));
        navigate("/");
      }
    } catch (err) {
      setLoginError(err.response?.data?.message || "Đăng nhập thất bại.");
    }
  };

  const handleRegister = async () => {
    if (registerData.password !== registerData.confirmPassword) {
      setRegisterMessage("❌ Mật khẩu xác nhận không khớp.");
      return;
    }

 

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/register`,
        registerData
      );
      if (res.data.status === "OK") {
        setRegisterMessage("✅ Đăng ký thành công! Bạn có thể đăng nhập.");
        setRegisterData({
          login_name: "",
          password: "",
          confirmPassword: "",
          first_name: "",
          last_name: "",
          location: "",
          description: "",
          occupation: ""
        });
      }
    } catch (err) {
      setRegisterMessage(err.response?.data?.message || "Đăng ký thất bại.");
    }
  };

  const fields = [
    "login_name",
    "password",
    "confirmPassword",
    "first_name",
    "last_name",
    "location",
    "description",
    "occupation"
  ];

  return (
    <div className="login-register-container">
      <div className="form-box">
        <div className="form-section">
          <h2>Đăng nhập</h2>
          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {loginError && <p className="error">{loginError}</p>}
          <button className="btn" onClick={handleLogin}>Đăng nhập</button>
        </div>

        <div className="form-section">
          <h2>Đăng ký</h2>
          {fields.map((field) => (
            <div className="form-group" key={field}>
              <label>{field.replace(/([A-Z])/g, " $1").replace("_", " ").toUpperCase()}</label>
              <input
                type={field.toLowerCase().includes("password") ? "password" : "text"}
                value={registerData[field]}
                onChange={(e) =>
                  setRegisterData({ ...registerData, [field]: e.target.value })
                }
              />
            </div>
          ))}

          {registerMessage && (
            <p className={registerMessage.includes("thành công") ? "success" : "error"}>
              {registerMessage}
            </p>
          )}
          <button className="btn register-btn" onClick={handleRegister}>Đăng ký</button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
