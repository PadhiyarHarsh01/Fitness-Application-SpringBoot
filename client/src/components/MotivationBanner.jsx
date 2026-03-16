import React from "react";

const quotes = [
  "Progress over perfection.",
  "Small steps lead to big results.",
  "Discipline beats motivation.",
  "Your body can stand almost anything.",
];

export default function MotivationBanner() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
      <img
        src="/images/dashboard-hero.jpg"
        alt="Motivation"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="relative py-20 px-8 bg-gradient-to-r from-emerald-600/80 to-indigo-600/80">
        <p className="text-2xl md:text-3xl font-bold text-white italic max-w-3xl">
          “{quote}”
        </p>
      </div>
    </div>
  );
}