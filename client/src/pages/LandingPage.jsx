import React from "react";
import {
  Dumbbell,
  Activity,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function LandingPage({ onLoginClick, onRegisterClick }) {
  const features = [
    {
      icon: Activity,
      title: "Track Activities",
      description: "Log workouts, cardio, and exercises easily",
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description: "View detailed charts and insights",
    },
    {
      icon: Dumbbell,
      title: "Set Goals",
      description: "Create fitness goals and monitor progress",
    },
    {
      icon: Users,
      title: "User Dashboard",
      description: "See all your fitness data in one place",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ================= NAVBAR ================= */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-700 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">FitTrack</span>
          </div>

          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={onLoginClick}
              className="px-4 py-2 rounded-md text-slate-700 hover:bg-slate-100 transition"
            >
              Sign In
            </button>
            <button
              onClick={onRegisterClick}
              className="px-4 py-2 rounded-md bg-emerald-700 text-white hover:bg-emerald-700 transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <img
          src="/images/landing-hero.jpg"
          alt="Fitness journey"
          className="absolute inset-0 w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/90 to-white/70" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
            <Dumbbell className="w-8 h-8 text-emerald-600" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold mb-5 leading-tight">
            Your Personal Fitness Companion
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto mb-8">
            Track your workouts, analyze progress, and achieve your fitness
            goals with ease.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onRegisterClick}
              className="px-6 py-3 rounded-md bg-emerald-700 text-white text-lg hover:bg-emerald-800 flex items-center justify-center gap-2 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ease-out active:translate-y-0 active:shadow-md"
            >
              Start Free Today <ArrowRight size={20} />
            </button>

            <button
              onClick={onLoginClick}
              className="px-6 py-3 rounded-md border border-slate-300 hover:bg-slate-100 transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            What You Can Do
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-slate-600 text-sm">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= WHY FITTRACK ================= */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Why Choose FitTrack?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/dashboard-hero.jpg"
                alt="Fitness dashboard"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              {[
                "Real-time activity tracking",
                "Comprehensive progress reports",
                "Personalized fitness goals",
              ].map((text) => (
                <div key={text} className="flex items-center gap-3">
                  <CheckCircle className="text-emerald-600" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4 order-2 md:order-1">
              {[
                "Daily streak monitoring",
                "Calorie tracking integration",
                "Mobile-friendly experience",
              ].map((text) => (
                <div key={text} className="flex items-center gap-3">
                  <CheckCircle className="text-emerald-600" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="aspect-video rounded-lg overflow-hidden shadow-lg order-1 md:order-2">
              <img
                src="/images/progress-motivation.jpg"
                alt="Fitness motivation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-14 sm:py-16 bg-emerald-700 text-white text-center px-4">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Transform Your Fitness?
        </h2>
        <p className="mb-6 text-emerald-100 max-w-lg mx-auto">
          Join thousands of users tracking their fitness journey.
        </p>
        <button
          onClick={onRegisterClick}
          className="px-8 py-3 rounded-full bg-white text-emerald-600 font-semibold hover:bg-emerald-50 transition shadow-md"
        >
          Create Free Account
        </button>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-600 text-sm">
        © 2026 FitTrack. All rights reserved.
      </footer>
    </div>
  );
}
