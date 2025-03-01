import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const redirect = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.gender
    ) {
      return toast.error("Please fill in all fields!");
    }

    // Name validation
    if (formData.name.trim().length <= 3) {
      return toast.error("Name must be greater than 3 characters!");
    }

    // Email validation
    if (!validateEmail(formData.email)) {
      return toast.error("Please enter a valid email address!");
    }

    // Password validation
    if (formData.password.length < 8) {
      return toast.error("Password must be at least 8 characters long!");
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    setLoading(true);
    // Send data to backend
    axios
      .post("api/auth/signup", formData)
      .then((res) => {
        toast.success("Signup successful!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        dispatch(login(res.data)); //  Dispatch login action
        setLoading(false);
        setTimeout(() => {
          redirect("/"); //  Redirect to home page after 1 second
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50">
        <h1 className="text-3xl font-semibold text-center text-gray-300 flex justify-center mb-4">
          Sign <span className="text-green-500">Up</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full input input-bordered h-10"
              value={formData.name}
              onChange={handleChange}
              name="name"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="johndoe@example.com"
              className="w-full input input-bordered h-10"
              value={formData.email}
              onChange={handleChange}
              name="email"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
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

          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Gender</span>
            </label>
            <select
              className="select select-bordered w-full"
              name="gender"
              onChange={handleChange}
              value={formData.gender}
            >
              <option disabled value="">
                Select
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <Link
            className="text-sm hover:underline hover:text-blue-400 mt-2 inline-block"
            to="/login"
          >
            Already have an account?
          </Link>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
