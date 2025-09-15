import React from "react";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <>
      <div className="md:flex hidden min-h-screen w-full bgLogin">
        <div className="w-1/3 h-100 relative overflow-hidden">
          {/* <img
            className="absolute top-0 h-full"
            src={loginPage}
            alt="healthcare-logo"
          /> */}
        </div>

        <div className="w-2/3 flex items-center justify-start">
          <div className="w-9/12 flex flex-col items-start justify-center">
            <h2 className="text-3xl font-semibold">Sign in</h2>
            <LoginForm />
          </div>
        </div>
      </div>

      <div className="md:hidden flex flex-col items-center justify-center min-h-screen bgLoginMobile px-6">
        <div className="mb-10">
          {/* <img src={logo} alt="healthcare-logo" className="w-36" /> */}
        </div>
        <div className="w-full  bg-white rounded-2xl px-6 py-8">
          <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
