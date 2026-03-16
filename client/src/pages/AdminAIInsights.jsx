import React, { useState } from "react";
import { aiInsights } from "../api/adminApi";
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Target,
  Download,
  RefreshCw,
} from "lucide-react";
import jsPDF from "jspdf";
import { toast } from "react-toastify";

export default function AdminAIInsights() {
  const [data, setData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateInsights = async () => {
    setIsGenerating(true);

    try {
      const res = await aiInsights();
      setData(res.data);
      toast.success("AI insights generated successfully!");
    } catch (error) {
      toast.error("Failed to fetch AI insights");
    }

    setIsGenerating(false);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("FitTrack Platform AI Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Platform Score: ${data.platformScore}/100`, 20, 40);
    doc.text(`Growth Trend: ${data.growthTrend}`, 20, 50);

    doc.text("Summary:", 20, 65);
    doc.text(doc.splitTextToSize(data.summary, 170), 20, 75);

    let y = 100;

    doc.text("Key Insights:", 20, y);
    y += 10;

    data.keyInsights?.forEach((insight, i) => {
      doc.text(`${i + 1}. ${insight.title}`, 20, y);
      y += 8;
      doc.text(doc.splitTextToSize(insight.description, 170), 25, y);
      y += 18;
    });

    doc.addPage();
    y = 20;

    doc.text("Strategic Recommendations:", 20, y);
    y += 10;

    data.recommendations?.forEach((rec, i) => {
      doc.text(`${i + 1}. ${rec.title}`, 20, y);
      y += 8;
      doc.text(doc.splitTextToSize(rec.description, 170), 25, y);
      y += 18;
    });

    doc.save("FitTrack-Platform-AI-Report.pdf");
  };

  return (
    <div className="space-y-16 ml-64 p-8">

      {/* HERO HEADER */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl bg-white">

        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-indigo-500 opacity-20" />

        <div className="relative py-20 px-6 text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow mb-6">
            <Sparkles className="text-emerald-600" size={18} />
            <span className="font-semibold text-sm">
              AI Platform Intelligence
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4">
            FitTrack AI Platform Report
          </h1>

          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            AI powered insights analyzing platform usage, growth,
            and engagement trends.
          </p>

          {!data && (
            <button
              onClick={generateInsights}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 text-white font-semibold shadow-lg hover:bg-emerald-700 transition"
            >
              <Sparkles />

              {isGenerating
                ? "Analyzing platform..."
                : "Generate AI Insights"}
            </button>
          )}
        </div>
      </div>

      {/* REPORT CONTENT */}
      {data && (
        <>

          {/* STATS */}
          <div className="grid md:grid-cols-2 gap-6">
            <StatCard
              label="Platform Score"
              value={`${data.platformScore}/100`}
            />

            <StatCard
              label="Growth Trend"
              value={data.growthTrend}
            />
          </div>

          {/* SUMMARY */}
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <h2 className="text-3xl font-bold mb-4">
              Executive Summary
            </h2>

            <p className="text-slate-600 text-lg">
              {data.summary}
            </p>
          </div>

          {/* KEY INSIGHTS */}
          <Section title="Key Insights" icon={<TrendingUp />}>

            {data.keyInsights?.map((insight, i) => (
              <Card
                key={i}
                title={insight.title}
                desc={insight.description}
              />
            ))}

          </Section>

          {/* RECOMMENDATIONS */}
          <Section title="Strategic Recommendations" icon={<Target />}>

            {data.recommendations?.map((rec, i) => (
              <Card
                key={i}
                title={rec.title}
                desc={rec.description}
              />
            ))}

          </Section>

          {/* RISK FACTORS */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="text-red-500" />
              <h2 className="text-2xl font-bold">
                Risk Factors
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              {data.riskFactors?.map((risk, i) => (
                <div
                  key={i}
                  className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow"
                >
                  {risk}
                </div>
              ))}

            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-center gap-6 pt-6">

            <button
              onClick={generateInsights}
              className="px-6 py-3 rounded-full border shadow hover:bg-slate-50 flex items-center gap-2"
            >
              <RefreshCw size={18} />
              Regenerate
            </button>

            <button
              onClick={downloadPDF}
              className="px-6 py-3 rounded-full bg-emerald-600 text-white shadow hover:bg-emerald-700 flex items-center gap-2"
            >
              <Download size={18} />
              Export PDF
            </button>

          </div>

        </>
      )}
    </div>
  );
}


/* SMALL COMPONENTS */

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-3xl shadow-md p-8 text-center hover:shadow-xl transition">

      <p className="text-sm text-slate-500 mb-2">
        {label}
      </p>

      <p className="text-3xl font-bold">
        {value}
      </p>

    </div>
  );
}

function Section({ title, children, icon }) {
  return (
    <div>

      <div className="flex items-center gap-2 mb-6">
        {icon}
        <h2 className="text-2xl font-bold">
          {title}
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {children}
      </div>

    </div>
  );
}

function Card({ title, desc }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">

      <TrendingUp className="text-emerald-600 mb-4" size={28} />

      <h3 className="text-xl font-bold mb-2">
        {title}
      </h3>

      <p className="text-slate-600">
        {desc}
      </p>

    </div>
  );
}