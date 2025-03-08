import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../../redux/userSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return toast.error("Please fill in all fields!");
    }
    setLoading(true);
    axios
      .post("api/auth/login", formData)
      .then((res) => {
        dispatch(login(res.data));
        setFormData({ email: "", password: "" });
        toast.success("Logged in successfully!");
        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Login failed!");
        setLoading(false);
      });
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="  w-full max-w-md p-6 rounded-lg bg-slate-300">
        {/* Logo & Heading */}
        <div className="flex items-center justify-start ">
          <img src="/obrolan.png" alt="obrolan logo" className=" " />
        </div>

        {/* Subtitle */}
        <h2 className="font-semibold text-black mb-4">
          Welcome to Obrolan! Please log in to your account.
        </h2>

        {/* Form */}
        <form>
          <div>
            <label className="label p-2">
              <span className="text-base font-semibold text-black label-text">
                Email :
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter email"
              className="w-full input input-bordered h-10"
              value={formData.email}
              onChange={handleChange}
              name="email"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base font-semibold text-black  label-text">
                Password :
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={formData.password}
              onChange={handleChange}
              name="password"
            />
          </div>

          {/* Sign Up Link */}
          <Link
            to="/signup"
            className="text-sm hover:underline text-red-700 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>

          {/* Login Button */}
          <div>
            <button
              className="btn btn-block btn-sm mt-2"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
