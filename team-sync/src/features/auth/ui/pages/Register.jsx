import { User, Mail, Lock } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {

  let {register, handleSubmit, watch, onRegisterSubmit, errors, navigate} = useAuth();

  const password = watch("password", "");

  const getStrength = () => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;

    return strength;
  };

  const strength = getStrength();

  return (
    <div className="min-h-screen bg-[#111018] text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT */}
        <div
          className="hidden lg:flex relative bg-cover bg-center"
          style={{
            backgroundImage: "url('/bg.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative flex flex-col justify-between p-12">
            <h1 className="text-3xl font-bold">TEAM SYNC</h1>

            <div>
              <p className="uppercase tracking-[5px] text-violet-300">
                Next-Gen Intelligence
              </p>

              <h2 className="mt-6 text-5xl font-bold leading-tight">
                Accelerate your team's intelligence.
              </h2>

              <p className="mt-5 max-w-md text-gray-300 text-lg">
                Connect your enterprise data to our specialized AI models and
                unlock strategic insights in seconds.
              </p>

              <div className="mt-12 flex gap-10">
                <div>
                  <h3 className="text-3xl font-bold">99.9%</h3>
                  <p className="text-gray-400">Uptime SLA</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold">ISO</h3>
                  <p className="text-gray-400">27001 Certified</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex items-center justify-center px-6 py-10">
          <form
            onSubmit={handleSubmit(onRegisterSubmit)}
            className="w-full max-w-lg space-y-6"
          >
            <div>
              <h1 className="text-5xl font-bold">Create your account</h1>

              <p className="mt-2 text-gray-400">
                Experience the future of collaborative data intelligence.
              </p>
            </div>

            {/* Name */}

            <div>
              <label className="mb-2 block text-sm">Full Name</label>

              <div className="flex items-center rounded-lg border border-[#373241] bg-[#1A1624]">
                <User className="ml-4 text-gray-500" size={18} />

                <input
                  className="w-full bg-transparent px-4 py-4 outline-none"
                  placeholder="Enter your full name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters",
                    },
                  })}
                />
              </div>

              {errors.name && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}

            <div>
              <label className="mb-2 block text-sm">Email Address</label>

              <div className="flex items-center rounded-lg border border-[#373241] bg-[#1A1624]">
                <Mail className="ml-4 text-gray-500" size={18} />

                <input
                  className="w-full bg-transparent px-4 py-4 outline-none"
                  placeholder="name@company.com"
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
                <p className="mt-1 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}

            <div>
              <label className="mb-2 block text-sm">Password</label>

              <div className="flex items-center rounded-lg border border-[#373241] bg-[#1A1624]">
                <Lock className="ml-4 text-gray-500" size={18} />

                <input
                  type="password"
                  className="w-full bg-transparent px-4 py-4 outline-none"
                  placeholder="••••••••"
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
                <p className="mt-1 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}

              <div className="mt-3 flex gap-2">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className={`h-1 flex-1 rounded-full ${
                      strength >= item
                        ? "bg-violet-400"
                        : "bg-gray-700"
                    }`}
                  />
                ))}
              </div>

              <p className="mt-1 text-sm text-violet-300">
                {strength === 3
                  ? "Strong password"
                  : strength === 2
                  ? "Medium password"
                  : "Weak password"}
              </p>
            </div>

            {/* Terms */}

            <div>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  {...register("terms", {
                    required: "Please accept Terms & Conditions",
                  })}
                />

                <span className="text-gray-400">
                  I agree to the Terms of Service and Privacy Policy.
                </span>
              </label>

              {errors.terms && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.terms.message}
                </p>
              )}
            </div>

            {/* Submit */}

            <button
              type="submit"
              className="w-full rounded-lg bg-violet-500 py-4 text-lg font-semibold transition hover:bg-violet-400"
            >
              Create Account
            </button>

            <div className="relative py-2 text-center">
              <div className="absolute left-0 top-1/2 h-px w-full bg-gray-700"></div>

              <span className="relative bg-[#111018] px-4 text-sm text-gray-500">
                OR CONTINUE WITH
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="rounded-lg border border-[#373241] py-4 hover:border-violet-500"
              >
                Google
              </button>

              <button
                type="button"
                className="rounded-lg border border-[#373241] py-4 hover:border-violet-500"
              >
                SSO
              </button>
            </div>

            <p className="text-center text-gray-400">
              Already have an account?{" "}
              <span onClick={() => navigate("/")} className="cursor-pointer font-semibold text-violet-400">
                Log In
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}