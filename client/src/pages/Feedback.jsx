import React, { useState } from "react";
import { Star, Send } from "lucide-react";
import { submitFeedback } from "../api/feedbackApi";
import { toast } from "react-toastify";

export default function Feedback() {

  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    if (rating === 0) {
      toast.warning("Please select rating");
      return;
    }

    setLoading(true);

    try {

      await submitFeedback({
        rating,
        message
      });

      toast.success("Thank you for your feedback!");

      setRating(0);
      setMessage("");

    } catch (error) {

      toast.error("Failed to submit feedback");

    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto space-y-8">

      <div>
        <h1 className="text-3xl font-bold">Give Feedback</h1>
        <p className="text-slate-500">
          Help us improve FitTrack
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow space-y-6">

        {/* STAR RATING */}
        <div>

          <p className="font-medium mb-3">
            Your Rating
          </p>

          <div className="flex gap-2">

            {[1,2,3,4,5].map((star) => (

              <Star
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer w-8 h-8 transition ${
                  rating >= star
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-slate-300"
                }`}
              />

            ))}

          </div>

        </div>

        {/* MESSAGE */}

        <div>

          <p className="font-medium mb-2">
            Message
          </p>

          <textarea
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            placeholder="Write your feedback..."
            className="w-full border rounded-lg p-3 h-32"
          />

        </div>

        {/* SUBMIT */}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg"
        >
          <Send size={18}/>
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>

      </div>

    </div>
  );
}