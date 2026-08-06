import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/user", data);
      console.log(response);
      toast.success(response?.data?.message)
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          Register
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Name
            </label>
            <input
              placeholder="name"
              {...register("name", { required: "Name is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {/* {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )} */}
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
              type="password"
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
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Premium
          </label>
          <div className="flex">
            <span>Yes</span>{" "}
            <input
              value={true}
              type="radio"
              {...register("isPremium")}
              className="w-full   outline-none  "
            />
            <span>No</span>{" "}
            <input
              type="radio"
              value={false}
              {...register("isPremium")}
              className="w-full outline-none 
              "
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?
          <Link
            to="/"
            className="ml-1 text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
