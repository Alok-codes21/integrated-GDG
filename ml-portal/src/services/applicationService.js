import api from "./api";
import { applicationsData } from "../data/applications";

const APPLICATIONS_KEY = "sahayak_applications_data";

export async function getApplications() {
  try {
    const response = await api.get("/applications");
    return response.data;
  } catch {
    const stored = localStorage.getItem(APPLICATIONS_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return applicationsData;
      }
    }
    return applicationsData;
  }
}

export async function getApplicationById(id) {
  try {
    const response = await api.get(`/applications/${id}`);
    return response.data;
  } catch {
    const apps = await getApplications();
    return apps.find((a) => a.id === id) || apps[0];
  }
}

export async function createApplication(data) {
  try {
    const response = await api.post("/applications", data);
    return response.data;
  } catch {
    const apps = await getApplications();
    const newApp = {
      id: `app-${Date.now()}`,
      schemeName: data.schemeName || "Government Welfare Entitlement",
      department: data.department || "Government Department",
      referenceNumber: `MH-REG-${Math.floor(10000 + Math.random() * 90000)}`,
      office: "Nashik District Collectorate",
      initiatedDate: "Today",
      sanctionBenefit: data.benefit || "Fiscal Assistance",
      benefitUnit: "",
      currentStatus: "Draft Application Initiated",
      statusType: "draft",
      steps: [
        { number: 1, title: "Step 1: Profile Reviewed", date: "Today", status: "completed", description: "Demographic criteria pre-filled." },
        { number: 2, title: "Step 2: Documents Vault Attached", date: "Today", status: "completed", description: "Verified documents synced." },
        { number: 3, title: "Step 3: Portal Submission", date: "In Progress", status: "current", description: "Ready to push to official portal." }
      ]
    };
    const updated = [newApp, ...apps];
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updated));
    return { success: true, application: newApp };
  }
}

export async function toggleChecklistItem(appId, itemId) {
  const apps = await getApplications();
  const updated = apps.map((app) => {
    if (app.id === appId && app.checklist) {
      return {
        ...app,
        checklist: app.checklist.map((item) =>
          item.id === itemId ? { ...item, completed: !item.completed } : item
        )
      };
    }
    return app;
  });
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updated));
  return updated;
}

export default {
  getApplications,
  getApplicationById,
  createApplication,
  toggleChecklistItem
};
