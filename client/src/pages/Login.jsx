import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  console.log(API_URL)
  const onSubmit = async (data) => {
    try {
      const loginUrl = `${API_URL}/login`;

      console.log("========== LOGIN DEBUG ==========");
      console.log("API_URL:", API_URL);
      console.log("LOGIN URL:", loginUrl);
      console.log("=================================");
      const response = await axios.post(
        `${loginUrl}/login`,
        data,
      );
      console.log(response);
      console.log("LOGIN RESPONSE:", response);
      toast.success(response?.data?.message)
      const userToken = response.data.token;
      localStorage.setItem("token", userToken);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");

    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          Login
        </h1>

        {/* <form className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-200"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form> */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-200"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              // type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-200"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                // minLength: {
                //   value: 6,
                //   message: "Minimum 6 characters",
                // },
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account?
          <Link
            className="text-indigo-600 font-semibold cursor-pointer ml-1 hover:underline"
            to="/register"
          >
            {" "}
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
