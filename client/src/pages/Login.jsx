import React, { useState } from "react";
import { Mail, Lock, Dumbbell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
      })

      localStorage.setItem("token", res.data.token);

      const decoded = jwtDecode(res.data.token);

      if(decoded.role === "SUPER_ADMIN" || decoded.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
      toast.success("Login successful! Welcome back.");
    } catch (err) {
      toast.error("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="
  min-h-screen
  bg-linear-to-br from-emerald-300 via-white to-white
  grid place-items-center
  px-4
">
      <div className="w-full max-w-5xl">
        <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl bg-white border border-slate-200">

          {/* LEFT IMAGE */}
          <div className="hidden md:block relative bg-emerald-700">
            <img
              src="/images/dashboard-hero.jpg"
              alt="Fitness journey"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
              <h2 className="text-3xl font-bold text-white mb-3 leading-snug">
                Welcome Back, Athlete!
              </h2>
              <p className="text-white/90 text-lg">
                Stay consistent. Track progress. Win every day.
              </p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="p-6 md:p-10 flex flex-col justify-center">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-emerald-700 rounded-xl flex items-center justify-center shadow-md">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">
                  FitTrack
                </h1>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-1">
                Sign In
              </h2>
              <p className="text-slate-600">
                Welcome back! Please enter your details.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* EMAIL */}
              <div>
                <label className="block mb-1 text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 text-slate-400 group-focus-within:text-emerald-600 transition" />
                  <input
                    type="email"
                    className="
                      w-full pl-10 pr-4 py-2.5
                      border rounded-md
                      transition-all duration-200
                      focus:ring-2 focus:ring-emerald-500
                      focus:-translate-y-px focus:shadow-md
                    "
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email)
                        setErrors({ ...errors, email: "" });
                    }}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block mb-1 text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 text-slate-400 group-focus-within:text-emerald-600 transition" />
                  <input
                    type="password"
                    className="
                      w-full pl-10 pr-4 py-2.5
                      border rounded-md
                      transition-all duration-200
                      focus:ring-2 focus:ring-emerald-500
                      focus:-translate-y-px focus:shadow-md
                    "
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        setErrors({ ...errors, password: "" });
                    }}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isLoading}
                className="
                  w-full py-3 rounded-md
                  bg-emerald-700 text-white font-semibold
                  shadow-md
                  hover:-translate-y-1 hover:shadow-xl
                  active:translate-y-0 active:shadow-md
                  transition-all duration-200
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* SWITCH */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-center text-slate-600 text-sm">
                New to FitTrack?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold transition"
                >
                  Create an account
                </button>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
