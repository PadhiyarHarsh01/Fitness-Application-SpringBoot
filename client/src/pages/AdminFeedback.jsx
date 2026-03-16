import React, { useEffect, useState } from "react";
import { getAllFeedback } from "../api/feedbackApi";
import { Star } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminFeedback() {

  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedback = async () => {

    try {

      const res = await getAllFeedback();
      setFeedbacks(res.data);

    } catch (error) {

      toast.error("Feedback fetch error");

    }

  };

  useEffect(()=>{
    fetchFeedback();
  },[]);

  return (

    <div className="space-y-10 ml-65">

      <div>
        <h1 className="text-3xl font-bold">
          User Feedback
        </h1>
        <p className="text-slate-500">
          See what users think about the platform
        </p>
      </div>

      <div className="space-y-4">

        {feedbacks.map((f,i)=>(

          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow"
          >

            <div className="flex justify-between mb-2">

              <div>

                <p className="font-semibold">
                  {f.userName}
                </p>

                <p className="text-sm text-slate-500">
                  {f.email}
                </p>

              </div>

              <div className="flex">

                {[...Array(f.rating)].map((_,i)=>(
                  <Star
                    key={i}
                    className="text-yellow-400 fill-yellow-400"
                    size={18}
                  />
                ))}

              </div>

            </div>

            <p className="text-slate-700">
              {f.message}
            </p>

          </div>

        ))}

      </div>

    </div>

  );
}