import { useAuth } from "../../hooks/useAuth";
import {
  Mail,
  Lock,
  ArrowRightToLine,
  Cloud,
  SquareTerminal,
} from "lucide-react";

export default function Login() {
  let {register, handleSubmit, onLoginSubmit, errors, navigate} = useAuth();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#141119] text-white">

      {/* Background Blur */}

      <div className="absolute -left-40 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-violet-700/10 blur-[180px]" />

      <div className="absolute -right-40 top-20 h-[450px] w-[450px] rounded-full bg-violet-700/10 blur-[180px]" />

      {/* Floating Image */}

      {/* <div className="absolute bottom-28 right-16 hidden lg:block">
        <div className="rounded-3xl bg-[#18141F] p-6 shadow-2xl">
          <img
            src="/orb.png"
            alt=""
            className="h-64 w-64 object-cover opacity-70"
          />
        </div>
      </div> */}

      {/* Login Card */}

      <div className="w-full max-w-xl rounded-3xl border border-[#2A2533] bg-[#1A1721]/95 p-10 backdrop-blur-xl">

        {/* Logo */}

        <div className="mb-8 text-center">

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-violet-600">
            <SquareTerminal size={28} />
          </div>

          <h1 className="text-5xl font-bold">
            TEAM SYNC
          </h1>

          <p className="mt-3 text-lg text-gray-400">
            Sign in to your workspace
          </p>

        </div>

        {/* Social Buttons */}

        <div className="grid grid-cols-2 gap-5">

          <button
            type="button"
            className="flex h-14 items-center justify-center gap-3 rounded-xl border border-[#363041] bg-[#25212D] font-semibold uppercase transition hover:border-violet-500"
          >
            <Cloud size={20} />
            Google
          </button>

          <button
            type="button"
            className="flex h-14 items-center justify-center gap-3 rounded-xl border border-[#363041] bg-[#25212D] font-semibold uppercase transition hover:border-violet-500"
          >
            <SquareTerminal size={20} />
            GitHub
          </button>

        </div>

        {/* Divider */}

        <div className="relative my-8">

          <div className="absolute top-1/2 left-0 h-px w-full bg-[#302B39]" />

          <span className="relative mx-auto block w-fit bg-[#1A1721] px-5 text-gray-400">
            or continue with email
          </span>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(onLoginSubmit)}
          className="space-y-6"
        >
          {/* Email */}

          <div>

            <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Email Address
            </div>

            <div className="flex items-center rounded-xl border border-[#3B3547] bg-[#0F0C14] px-4">

              <Mail
                size={18}
                className="text-gray-500"
              />

              <input
                type="email"
                placeholder="name@company.com"
                className="h-14 w-full bg-transparent px-3 outline-none placeholder:text-gray-500"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email",
                  },
                })}
              />

            </div>

            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}

          </div>

          {/* Password */}

          <div>

            <div className="mb-2 flex items-center justify-between">

              <span className="text-sm font-semibold uppercase tracking-wider text-gray-300">
                Password
              </span>

              <button
                type="button"
                className="text-violet-400 hover:text-violet-300"
              >
                Forgot password?
              </button>

            </div>

            <div className="flex items-center rounded-xl border border-[#3B3547] bg-[#0F0C14] px-4">

              <Lock
                size={18}
                className="text-gray-500"
              />

              <input
                type="password"
                placeholder="••••••••"
                className="h-14 w-full bg-transparent px-3 outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters",
                  },
                })}
              />

            </div>

            {errors.password && (
              <p className="mt-2 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}

          </div>

          {/* Remember */}

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              className="h-5 w-5 rounded border-[#444]"
              {...register("remember")}
            />

            <span className="text-gray-400">
              Stay signed in
            </span>

          </label>

          {/* Login */}

          <button
            type="submit"
            className="flex h-16 w-full items-center justify-center gap-3 rounded-xl bg-violet-600 text-lg font-semibold transition hover:bg-violet-500"
          >
            Sign In
            <ArrowRightToLine size={22} />
          </button>

        </form>

        {/* Footer */}

        <div className="mt-10 border-t border-[#302B39] pt-8 text-center text-gray-400">
          Don't have an account?
          <button onClick={() => navigate("/register")} className="ml-2 font-semibold text-violet-400 hover:text-violet-300 cursor-pointer">
            Sign Up
          </button>
        </div>

      </div>
    </div>
  );
}