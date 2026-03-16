import React, { useState } from "react";
import { Mail, Lock, User, Dumbbell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password)
      newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
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
      await api.post("/api/auth/register", {
        name : formData.name,
        email: formData.email,
        password: formData.password,
      })

      navigate("/login");
      toast.success("Registration successful! Please log in.");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
  className="
    min-h-screen
    bg-linear-to-br from-indigo-300 via-white to-white
    grid place-items-center
    px-4
  "
>
      <div className="w-full max-w-5xl">
        <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl bg-white border border-slate-200">

          {/* LEFT IMAGE */}
          <div className="hidden md:block relative bg-indigo-600">
            <img
              src="/images/activity-running.jpg"
              alt="Start your fitness journey"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Start Your Journey
              </h2>
              <p className="text-white/90 text-sm">
                Build consistency. Track progress. Get results.
              </p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="p-5 md:p-8 flex flex-col justify-center">
            {/* HEADER */}
            <div className="mb-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold">FitTrack</h1>
              </div>

              <h2 className="text-xl md:text-2xl font-bold mb-1">
                Create Account
              </h2>
              <p className="text-slate-600 text-sm">
                Start tracking your fitness today
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* NAME */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    className="
                      w-full pl-10 pr-4 py-2
                      border rounded-md
                      focus:ring-2 focus:ring-indigo-500
                      transition
                    "
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      handleChange("name", e.target.value)
                    }
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="email"
                    className="
                      w-full pl-10 pr-4 py-2
                      border rounded-md
                      focus:ring-2 focus:ring-indigo-500
                      transition
                    "
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      handleChange("email", e.target.value)
                    }
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="password"
                    className="
                      w-full pl-10 pr-4 py-2
                      border rounded-md
                      focus:ring-2 focus:ring-indigo-500
                      transition
                    "
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      handleChange("password", e.target.value)
                    }
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="password"
                    className="
                      w-full pl-10 pr-4 py-2
                      border rounded-md
                      focus:ring-2 focus:ring-indigo-500
                      transition
                    "
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleChange("confirmPassword", e.target.value)
                    }
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isLoading}
                className="
                  w-full py-2.5 rounded-md
                  bg-indigo-600 text-white font-semibold
                  shadow-md
                  hover:-translate-y-1 hover:shadow-lg
                  active:translate-y-0
                  transition-all duration-200
                "
              >
                {isLoading ? "Creating..." : "Create Account"}
              </button>
            </form>

            {/* SWITCH */}
            <div className="mt-5 pt-5 border-t border-slate-200">
              <p className="text-center text-slate-600 text-sm">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  Sign In
                </button>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
