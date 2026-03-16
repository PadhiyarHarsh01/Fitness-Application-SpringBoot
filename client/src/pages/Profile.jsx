import React, { useEffect, useState } from "react";
import { User, Edit2, Lock } from "lucide-react";
import { getProfile, updateProfile, changePassword } from "../api/userApi";
import { toast } from "react-toastify";

/**
 * PROFILE PAGE
 * React + Tailwind
 * Connected to Spring Boot (JWT Protected)
 */
export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  /* =======================
     FETCH PROFILE
     ======================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.data);
        setFormData(res.data);
      } catch (err) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p className="text-center">Loading profile...</p>;
  }

  /* =======================
     HANDLERS
     ======================= */
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile(formData);
      setUser(formData);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handlePasswordChange = async () => {
    const errs = {};

    if (!passwordData.currentPassword) errs.currentPassword = "Required";
    if (passwordData.newPassword.length < 6)
      errs.newPassword = "Minimum 6 characters";
    if (passwordData.newPassword !== passwordData.confirmPassword)
      errs.confirmPassword = "Passwords do not match";

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      toast.success("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordForm(false);
    } catch (err) {
      toast.error("Failed to change password");
    }
  };

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold">Profile</h1>
        <p className="text-slate-500 mt-2">
          Manage your personal information and security
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* LEFT CARD */}
        <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <User className="text-emerald-600" size={40} />
          </div>
          <h2 className="text-xl font-bold">{user?.name}</h2>
          <p className="text-slate-500">{user?.email}</p>
        </div>

        {/* RIGHT CONTENT */}
        <div className="md:col-span-2 space-y-6">
          {/* PERSONAL INFO */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Personal Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-slate-50"
              >
                <Edit2 size={16} />
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            {isEditing ? (
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Name"
                  value={formData.name || ""}
                  onChange={(v) => handleChange("name", v)}
                />

                <Input label="Email" value={formData.email || ""} disabled />

                <Input
                  label="Age"
                  type="number"
                  value={formData.age || ""}
                  onChange={(v) => handleChange("age", v)}
                />

                <Input
                  label="Height (cm)"
                  type="number"
                  value={formData.height || ""}
                  onChange={(v) => handleChange("height", v)}
                />

                <Input
                  label="Weight (kg)"
                  type="number"
                  value={formData.weight || ""}
                  onChange={(v) => handleChange("weight", v)}
                />

                {/* ✅ GOAL INPUT (THIS WAS MISSING) */}
                <div>
                  <label className="text-sm font-medium">Goal</label>
                  <select
                    value={formData.goal ?? ""}
                    onChange={(e) => handleChange("goal", e.target.value)}
                    className="w-full mt-1 p-3 rounded-xl bg-slate-50 focus:outline-none"
                  >
                    <option value="" disabled>
                      Select your fitness goal
                    </option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="Endurance">Endurance</option>
                    <option value="Flexibility">Flexibility</option>
                  </select>
                </div>

                <Input
                  label="Daily Calorie Goal"
                  type="number"
                  value={formData.dailyCalorieGoal || ""}
                  onChange={(v) => handleChange("dailyCalorieGoal", v)}
                />

                <div className="md:col-span-2 flex gap-4 mt-4">
                  <PrimaryButton onClick={handleSaveProfile}>
                    Save Changes
                  </PrimaryButton>
                  <OutlineButton onClick={() => setIsEditing(false)}>
                    Cancel
                  </OutlineButton>
                </div>
              </div>
            ) : (
              <ProfileView user={user} />
            )}
          </div>

          {/* SECURITY */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold flex gap-2">
                <Lock /> Security
              </h2>
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="px-4 py-2 rounded-full border hover:bg-slate-50"
              >
                Change Password
              </button>
            </div>

            {showPasswordForm && (
              <div className="space-y-4">
                <PasswordInput
                  label="Current Password"
                  value={passwordData.currentPassword}
                  onChange={(v) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: v,
                    })
                  }
                  error={errors.currentPassword}
                />
                <PasswordInput
                  label="New Password"
                  value={passwordData.newPassword}
                  onChange={(v) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: v,
                    })
                  }
                  error={errors.newPassword}
                />
                <PasswordInput
                  label="Confirm Password"
                  value={passwordData.confirmPassword}
                  onChange={(v) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: v,
                    })
                  }
                  error={errors.confirmPassword}
                />

                <div className="flex gap-4 pt-4">
                  <PrimaryButton onClick={handlePasswordChange}>
                    Update Password
                  </PrimaryButton>
                  <OutlineButton onClick={() => setShowPasswordForm(false)}>
                    Cancel
                  </OutlineButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =======================
   SMALL COMPONENTS
   ======================= */

function ProfileView({ user }) {
  if (!user) return null;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Info label="Age" value={user.age ?? "—"} />
      <Info label="Height" value={user.height ? `${user.height} cm` : "—"} />
      <Info label="Weight" value={user.weight ? `${user.weight} kg` : "—"} />
      <Info
        label="Daily Calories"
        value={user.dailyCalorieGoal ? `${user.dailyCalorieGoal} kcal` : "—"}
      />
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function Input({ label, value, type = "text", onChange, disabled }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full mt-1 p-3 rounded-xl bg-slate-50 focus:outline-none"
      />
    </div>
  );
}

function PasswordInput({ label, value, onChange, error }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 p-3 rounded-xl bg-slate-50"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 py-3 rounded-full bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700"
    >
      {children}
    </button>
  );
}

function OutlineButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 py-3 rounded-full border hover:bg-slate-50"
    >
      {children}
    </button>
  );
}
