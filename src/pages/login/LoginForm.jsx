import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../services/login/loginUser";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import eyeEnabled from "../../../public/assets/icons/eye.svg";
import eyeDisabled from "../../../public/assets/icons/eye-off.svg";

export default function LoginForm({ onFinish }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .trim("Username cannot be empty")
        .required("Username is required"),
      password: Yup.string()
        .trim("Password cannot be empty")
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setButtonLoading(true);
        const user = await loginUser(values.username, values.password);
        login(user);
        navigate("/");
        if (onFinish) onFinish();
      } catch (error) {
        setApiError(error.message);
        resetForm();
      } finally {
        setButtonLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mt-6 md:w-11/12 w-full">
      <div className="md:mb-4 mb-6">
        <label
          className={`block font-medium mb-2 ${
            (formik.touched.username && formik.errors.username) || apiError
              ? "text-red-500"
              : "system-flow-text"
          }`}
        >
          Username
        </label>
        <input
          type="text"
          name="username"
          {...formik.getFieldProps("username")}
          onChange={(e) => {
            formik.handleChange(e);
            setApiError("");
          }}
          placeholder="Enter your username"
          className={` w-full p-3 border rounded placeholder-[#777777] ${
            (formik.touched.username && formik.errors.username) || apiError
              ? "border-red-500"
              : ""
          }`}
        />
        {formik.touched.username && formik.errors.username && (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.username}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label
          className={`block font-medium mb-2 ${
            (formik.touched.password && formik.errors.password) || apiError
              ? "text-red-500"
              : "system-flow-text"
          }`}
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            {...formik.getFieldProps("password")}
            onChange={(e) => {
              formik.handleChange(e);
              setApiError("");
            }}
            placeholder="Enter your password"
            className={`w-full p-3 border rounded pr-10 placeholder-[#777777] ${
              (formik.touched.password && formik.errors.password) || apiError
                ? "border-red-500"
                : ""
            }`}
          />
          <img
            src={showPassword ? eyeEnabled : eyeDisabled}
            alt="toggle visibility"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
          />
        </div>
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.password}
          </div>
        )}
      </div>

      {apiError && <div className="text-red-600 text-sm mb-2">{apiError}</div>}

      <button
        type="submit"
        className="md:w-1/3 w-full primary text-white py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        disabled={!formik.isValid || !formik.dirty || buttonLoading}
      >
        {buttonLoading ? (
          <>
            <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
}
