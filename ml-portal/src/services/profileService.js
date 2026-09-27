import api from "./api";
import { initialCitizenProfile } from "../data/profile";

const PROFILE_KEY = "sahayak_citizen_profile";

export async function getProfile() {
  try {
    const response = await api.get("/profile");
    return response.data;
  } catch {
    // Read from localStorage if modified, otherwise use initial profile
    const stored = localStorage.getItem(PROFILE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return initialCitizenProfile;
      }
    }
    return initialCitizenProfile;
  }
}

export async function updateProfile(data) {
  try {
    const response = await api.put("/profile", data);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(response.data));
    return response.data;
  } catch {
    const current = await getProfile();
    const updated = { ...current, ...data };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    return updated;
  }
}

export async function saveProfile(data) {
  return updateProfile(data);
}

export default {
  getProfile,
  updateProfile,
  saveProfile
};
