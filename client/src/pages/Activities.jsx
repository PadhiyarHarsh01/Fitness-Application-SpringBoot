import React, { useState, useMemo, useEffect } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { addActivity, deleteActivity, getActivities, updateActivity } from "../api/activityApi";
import { toast} from "react-toastify"

export default function Activities() {
  const [activities, setActivities] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "Cardio",
    duration: "",
    calories: "",
    date: new Date().toISOString().split("T")[0],
  });

  const activityTypes = ["Cardio", "Strength", "Flexibility", "Sports", "Other"];

  const activityImages = {
    Cardio: "/images/activity-running.jpg",
    Strength: "/images/activity-gym.jpg",
    Flexibility: "/images/activity-cycling.jpg",
    Sports: "/images/activity-cycling.jpg",
    Other: "/images/activity-running.jpg",
  };

  const fetchActivities = async () => {
    try {
      const res = await getActivities();
      setActivities(res.data);
    } catch (error) {
      toast.error("Failed to load activities");
      
    }
  }

  useEffect(() => {
    fetchActivities();
  } ,[])

  /* =======================
     STATS (backend ready)
     ======================= */
  const stats = useMemo(() => {
    const totalActivities = activities.length;
    const totalDuration = activities.reduce((sum, a) => sum + Number(a.duration), 0);
    const totalCalories = activities.reduce((sum, a) => sum + Number(a.calories), 0);

    return { totalActivities, totalDuration, totalCalories };
  }, [activities]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "Cardio",
      duration: "",
      calories: "",
      date: new Date().toISOString().split("T")[0],
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async() => {
    if (!formData.name || !formData.duration || !formData.calories) return;

    try {
      if (editingId) {
        await updateActivity(editingId, formData)
      } else {
        await addActivity(formData);
      }
      fetchActivities();
      resetForm();
      toast.success(`Activity ${editingId ? "updated" : "added"} successfully!`);
    } catch (error) {
      toast.error("Failed to save activity. Please try again.");
    }
  };

  const handleEdit = (activity) => {
    setFormData({
      name: activity.name,
      type: activity.type,
      duration: activity.duration,
      calories: activity.calories,
      date: activity.date
    })
    setEditingId(activity.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if(!confirm("Are you sure you want to delete this activity?")) return;

    try {
      await deleteActivity(id);
      fetchActivities();
      toast.success("Activity deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete activity.");
    }
  };

  return (
    <div className="space-y-16">
      {/* HERO */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl bg-white">
        <img
          src="/images/activity-running.jpg"
          alt="Track activities"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative py-20 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Track Your Activities
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto mb-10 text-lg">
            Monitor every workout and keep improving consistently
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-emerald-600 text-white font-semibold shadow-md hover:shadow-xl hover:bg-emerald-700 transition"
          >
            <Plus size={20} /> Add New Activity
          </button>
        </div>
      </div>

      {/* =======================
          STATS OVERVIEW CARDS
          ======================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition p-6">
          <p className="text-sm text-slate-500 mb-2">Total Activities</p>
          <p className="text-4xl font-bold">{stats.totalActivities}</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl shadow-md hover:shadow-xl transition p-6">
          <p className="text-sm text-slate-500 mb-2">Total Duration</p>
          <p className="text-4xl font-bold text-emerald-700">
            {stats.totalDuration} <span className="text-xl font-medium">min</span>
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-3xl shadow-md hover:shadow-xl transition p-6">
          <p className="text-sm text-slate-500 mb-2">Calories Burned</p>
          <p className="text-4xl font-bold text-indigo-700">
            {stats.totalCalories} <span className="text-xl font-medium">kcal</span>
          </p>
        </div>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {editingId ? "Edit Activity" : "Add Activity"}
            </h2>
            <button onClick={resetForm} className="p-2 rounded-full hover:bg-slate-100">
              <X />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <input className="bg-slate-50 p-4 rounded-xl" placeholder="Activity name"
              value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />

            <select className="bg-slate-50 p-4 rounded-xl"
              value={formData.type} onChange={(e) => handleChange("type", e.target.value)}>
              {activityTypes.map((t) => <option key={t}>{t}</option>)}
            </select>

            <input type="number" className="bg-slate-50 p-4 rounded-xl" placeholder="Duration (minutes)"
              value={formData.duration} onChange={(e) => handleChange("duration", e.target.value)} />

            <input type="number" className="bg-slate-50 p-4 rounded-xl" placeholder="Calories burned"
              value={formData.calories} onChange={(e) => handleChange("calories", e.target.value)} />

            <input type="date" className="bg-slate-50 p-4 rounded-xl"
              value={formData.date} onChange={(e) => handleChange("date", e.target.value)} />
          </div>

          <div className="flex gap-4 mt-8">
            <button onClick={handleSubmit}
              className="flex-1 py-3 rounded-full bg-emerald-600 text-white font-semibold shadow-md hover:shadow-xl">
              {editingId ? "Update Activity" : "Add Activity"}
            </button>
            <button onClick={resetForm}
              className="flex-1 py-3 rounded-full bg-slate-100 hover:bg-slate-200">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* CARDS (DESKTOP) */}
      <div className="hidden md:grid lg:grid-cols-2 gap-8">
        {activities.map((a) => (
          <div key={a.id}
            className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-1">
            <div className="h-52 relative rounded-t-3xl overflow-hidden">
              <img src={activityImages[a.type]} alt={a.name}
                className="w-full h-full object-cover" />
              <span className="absolute top-4 right-4 bg-emerald-600 text-white px-4 py-1 rounded-full text-sm">
                {a.type}
              </span>
            </div>

            <div className="p-7">
              <div className="flex justify-between mb-5">
                <h3 className="text-xl font-bold">{a.name}</h3>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(a)} className="p-2 rounded-full hover:bg-emerald-50">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(a.id)} className="p-2 rounded-full hover:bg-red-50">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Duration</p>
                  <p className="text-2xl font-bold">{a.duration} min</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Calories</p>
                  <p className="text-2xl font-bold text-emerald-600">{a.calories} kcal</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}