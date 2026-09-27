import api from "./api";

const TOKEN_KEY = "sahayak_token";
const USER_KEY = "sahayak_user";

export async function login(data) {
  try {
    const response = await api.post("/auth/login", data);
    if (response.data?.token) {
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data.user || { name: "Rahul Kumar", mobile: data.mobile }));
    }
    return response.data;
  } catch {
    // Graceful fallback for offline prototype mode
    const mockUser = {
      name: "Rahul Kumar",
      mobile: data.mobile || "9876543210",
      district: "Nashik",
      state: "Maharashtra",
      role: "citizen"
    };
    localStorage.setItem(TOKEN_KEY, "demo_jwt_token_sahayak_2026");
    localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
    return { success: true, token: "demo_jwt_token_sahayak_2026", user: mockUser, mode: "demo_fallback" };
  }
}

export async function register(data) {
  try {
    const response = await api.post("/auth/register", data);
    if (response.data?.token) {
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data.user || data));
    }
    return response.data;
  } catch {
    // Graceful fallback for offline prototype mode
    const newUser = {
      name: data.name || "Rahul Kumar",
      mobile: data.mobile,
      role: "citizen"
    };
    localStorage.setItem(TOKEN_KEY, "demo_jwt_token_sahayak_2026");
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    return { success: true, token: "demo_jwt_token_sahayak_2026", user: newUser, mode: "demo_fallback" };
  }
}

export async function forgotPassword(mobile) {
  try {
    const response = await api.post("/auth/forgot-password", { mobile });
    return response.data;
  } catch {
    return { success: true, message: "Recovery instructions sent (Demo mode)", mode: "demo_fallback" };
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getCurrentUser() {
  try {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : { name: "Rahul Kumar", district: "Nashik, MH" };
  } catch {
    return { name: "Rahul Kumar", district: "Nashik, MH" };
  }
}

export default {
  login,
  register,
  forgotPassword,
  logout,
  getCurrentUser
};
