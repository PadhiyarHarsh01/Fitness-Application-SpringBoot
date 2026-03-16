import React, { useState } from "react";
import jsPDF from "jspdf";
import {
  Sparkles,
  TrendingUp,
  Zap,
  Target,
  MessageCircle,
  Download,
  RefreshCw,
  CheckCircle,
} from "lucide-react";
import { generateAIReport } from "../api/aiApi";
import { toast } from "react-toastify";

export default function AIReport() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  const handleGenerateReport = async () => {
    setIsGenerating(true);

    try {
      const res = await generateAIReport();
      const candidates = res?.data?.candidates;

      if (!candidates || candidates.length === 0) {
        throw new Error("Invalid AI response format");
      }

      const rawText = candidates[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        throw new Error("No AI text returned");
      }

      let cleaned = rawText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(cleaned);
      parsed.consistency = parsed.consistency?.split("(")[0].trim();
      parsed.trend = parsed.trend?.split("(")[0].trim();

      setAiAnalysis(parsed);
      setReportGenerated(true);
      toast.success("AI report generated successfully!");
    } catch (error) {
      toast.error("Failed to generate report. Please try again.");
    }
    setIsGenerating(false);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("FitTrack AI Fitness Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Overall Score: ${aiAnalysis.overallScore}/100`, 20, 40);
    doc.text(`Consistency: ${aiAnalysis.consistency}`, 20, 50);
    doc.text(`Trend: ${aiAnalysis.trend}`, 20, 60);
    doc.text(`Weekly Workouts: ${aiAnalysis.weeklyWorkouts}`, 20, 70);

    doc.text("Summary:", 20, 85);
    doc.text(doc.splitTextToSize(aiAnalysis.summary, 170), 20, 95);

    let y = 120;

    doc.text("Key Insights:", 20, y);
    y += 10;

    aiAnalysis.insights.forEach((insight, index) => {
      doc.text(`${index + 1}. ${insight.title}`, 20, y);
      y += 8;
      doc.text(doc.splitTextToSize(insight.description, 170), 25, y);
      y += 20;
    });

    doc.save("FitTrack-AI-Report.pdf");
  };

  return (
    <div className="space-y-16">
      <div className="relative rounded-3xl overflow-hidden shadow-xl bg-white">
        <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-indigo-500 opacity-20" />
        <div className="relative py-20 px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow mb-6">
            <Sparkles className="text-emerald-600" size={18} />
            <span className="font-semibold text-sm">AI Fitness Report</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your AI Fitness Intelligence
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Personalized insights powered by AI based on your workout history
          </p>
        </div>
      </div>

      {/* =======================
          GENERATE SECTION
          ======================= */}
      {!reportGenerated && (
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Generate Your AI Report</h2>
          <p className="text-slate-600 mb-8">
            Let AI analyze your activities and create a personalized fitness
            roadmap
          </p>

          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 text-white font-semibold shadow-lg hover:bg-emerald-700 transition"
          >
            <Sparkles />
            {isGenerating
              ? "Analyzing workouts..."
              : "Building personalized roadmap..."}
          </button>
        </div>
      )}

      {/* =======================
          AI REPORT
          ======================= */}
      {reportGenerated && aiAnalysis && (
        <>
          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-6">
            <StatCard
              label="Overall Score"
              value={`${aiAnalysis.overallScore}/100`}
            />
            <StatCard label="Consistency" value={aiAnalysis.consistency} />
            <StatCard
              label="Weekly Workouts"
              value={aiAnalysis.weeklyWorkouts}
            />
            <StatCard label="Trend" value={aiAnalysis.trend} />
          </div>

          {/* SUMMARY */}
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <h2 className="text-3xl font-bold mb-4">AI Summary</h2>
            <p className="text-slate-600 text-lg">{aiAnalysis.summary}</p>
          </div>

          {/* INSIGHTS */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Key Insights</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {aiAnalysis.insights.map((insight, i) => {
                const Icon = insight.icon;
                return (
                  <div
                    key={i}
                    className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition"
                  >
                    <TrendingUp className="text-emerald-600 mb-4" size={32} />
                    <h3 className="text-xl font-bold mb-2">{insight.title}</h3>
                    <p className="text-slate-600">{insight.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ROADMAP */}
          <div>
            <h2 className="text-3xl font-bold mb-6">8-Week Roadmap</h2>
            <div className="space-y-4">
              {aiAnalysis.futureRecommendations.map((rec, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-md p-6 flex gap-4"
                >
                  <div className="h-12 w-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm text-emerald-600 font-semibold">
                      {rec.week}
                    </p>
                    <h3 className="text-lg font-bold">{rec.goal}</h3>
                    <p className="text-slate-600 text-sm">{rec.activities}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RISK & OPPORTUNITIES */}
          <div className="grid md:grid-cols-2 gap-8">
            <ListCard
              title="Risk Factors"
              items={aiAnalysis.riskFactors}
              danger
            />
            <ListCard title="Opportunities" items={aiAnalysis.opportunities} />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setReportGenerated(false)}
              className="px-6 py-3 rounded-full border shadow hover:bg-slate-50 flex items-center gap-2"
            >
              <RefreshCw size={18} />
              Regenerate
            </button>

            <button
              onClick={handleDownloadPDF}
              className="px-6 py-3 rounded-full bg-emerald-600 text-white shadow flex items-center gap-2">
              <Download size={18} />
              Download
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* =======================
   SMALL COMPONENTS
   ======================= */

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-3xl shadow-md p-6 text-center">
      <p className="text-sm text-slate-500 mb-1">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function ListCard({ title, items, danger }) {
  return (
    <div
      className={`rounded-3xl shadow-lg p-8 ${
        danger ? "bg-red-50" : "bg-green-50"
      }`}
    >
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <CheckCircle
              className={danger ? "text-red-500" : "text-green-600"}
            />
            <span className="text-slate-700">
              {typeof item === "string"
                ? item
                : item.title + " - " + item.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
