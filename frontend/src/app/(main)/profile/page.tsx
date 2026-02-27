"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { Card, Button, Input } from "@/components/ui";
import { DIETARY_OPTIONS, COMMON_ALLERGIES } from "@/lib/constants";
import { getInitials } from "@/lib/utils";
import { Lock, X } from "lucide-react";
import { DietaryPreference } from "@/types";

export default function ProfilePage() {
  const { currentUser, updateProfile } = useAuth();
  const { showToast } = useToast();

  // State
  const [fullName, setFullName] = useState(currentUser?.fullName || "");
  const [username, setUsername] = useState(currentUser?.username || "");
  const [selectedDiets, setSelectedDiets] = useState<string[]>(
    currentUser?.dietaryPreferences || [],
  );
  const [allergies, setAllergies] = useState<string[]>(
    currentUser?.allergies || [],
  );
  const [allergyInput, setAllergyInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Update form when user data changes
  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.fullName || "");
      setUsername(currentUser.username || "");
      setSelectedDiets(currentUser.dietaryPreferences || []);
      setAllergies(currentUser.allergies || []);
    }
  }, [currentUser]);

  async function handleSave() {
    setIsLoading(true);
    await updateProfile({
      fullName,
      username,
      dietaryPreferences: selectedDiets,
      allergies,
    });

    showToast("Profile updated successfully! ✓", "success");
    setIsLoading(false);
    setHasChanges(false);
  }

  function handleCancel() {
    setFullName(currentUser?.fullName || "");
    setUsername(currentUser?.username || "");
    setSelectedDiets(currentUser?.dietaryPreferences || []);
    setAllergies(currentUser?.allergies || []);
    setAllergyInput("");
    setHasChanges(false);
  }

  function addAllergy() {
    const trimmed = allergyInput.trim();
    if (!trimmed) return;
    if (allergies.includes(trimmed)) return;

    setAllergies([...allergies, trimmed]);
    setAllergyInput("");
    setHasChanges(true);
  }

  function removeAllergy(allergy: string) {
    setAllergies(allergies.filter((a) => a !== allergy));
    setHasChanges(true);
  }

  function toggleDiet(diet: string) {
    if (selectedDiets.includes(diet)) {
      setSelectedDiets(selectedDiets.filter((d) => d !== diet));
    } else {
      setSelectedDiets([...selectedDiets, diet]);
    }
    setHasChanges(true);
  }

  function addCommonAllergy(allergy: string) {
    if (allergies.includes(allergy)) return;
    setAllergies([...allergies, allergy]);
    setHasChanges(true);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Personal Information Card */}
      <Card padding="lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Personal Information
        </h2>

        {/* Avatar Section */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mx-auto">
            {getInitials(currentUser?.fullName || "User")}
          </div>
          <p className="text-sm text-gray-500 mt-2">Edit Photo</p>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          <Input
            label="Full Name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setHasChanges(true);
            }}
            placeholder="Your full name"
          />

          <Input
            label="Email"
            value={currentUser?.email || ""}
            disabled
            leftIcon={<Lock size={16} className="text-gray-400" />}
            hint="Contact support to change email"
          />

          <Input
            label="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setHasChanges(true);
            }}
            placeholder="Your username"
          />
        </div>
      </Card>

      {/* Dietary Preferences Card */}
      <Card padding="lg">
        <h2 className="text-lg font-semibold text-gray-900">
          Dietary Preferences
        </h2>
        <p className="text-sm text-gray-500 mb-4">Select all that apply</p>

        <div className="grid grid-cols-2 gap-3">
          {DIETARY_OPTIONS.map((option) => (
            <label
              key={option}
              className={`cursor-pointer flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors ${
                selectedDiets.includes(option)
                  ? "border-primary bg-primary-light"
                  : "border-gray-200"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedDiets.includes(option)}
                onChange={() => toggleDiet(option)}
                className="accent-primary"
              />
              <span className="text-sm font-medium text-gray-700">
                {option}
              </span>
            </label>
          ))}
        </div>
      </Card>

      {/* Food Allergies Card */}
      <Card padding="lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Food Allergies
        </h2>

        {/* Current Allergies */}
        {allergies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {allergies.map((allergy) => (
              <div
                key={allergy}
                className="flex items-center gap-1 bg-primary-light text-primary-dark px-3 py-1 rounded-full text-sm font-medium"
              >
                {allergy}
                <button
                  onClick={() => removeAllergy(allergy)}
                  className="ml-1 hover:text-red-500 cursor-pointer"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add Allergy Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-1 h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary"
            placeholder="Type an allergy..."
            value={allergyInput}
            onChange={(e) => setAllergyInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addAllergy();
              }
            }}
          />
          <Button size="sm" variant="primary" onClick={addAllergy}>
            + Add
          </Button>
        </div>

        {/* Common Allergies */}
        <div>
          <p className="text-sm text-gray-500 mb-2">Quick add:</p>
          <div className="flex flex-wrap gap-2">
            {COMMON_ALLERGIES.map((allergy) => {
              const isAdded = allergies.includes(allergy);
              return (
                <button
                  key={allergy}
                  onClick={() => addCommonAllergy(allergy)}
                  disabled={isAdded}
                  className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                    isAdded
                      ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"
                      : "hover:bg-primary-light hover:border-primary hover:text-primary text-gray-600 border-gray-300"
                  }`}
                >
                  {allergy}
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          isLoading={isLoading}
          disabled={!hasChanges}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
