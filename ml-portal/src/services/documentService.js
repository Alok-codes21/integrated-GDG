import api from "./api";
import { documentsData } from "../data/documents";

const DOCUMENTS_KEY = "sahayak_documents_vault";

export async function getDocuments() {
  try {
    const response = await api.get("/documents");
    return response.data;
  } catch {
    const stored = localStorage.getItem(DOCUMENTS_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return documentsData;
      }
    }
    return documentsData;
  }
}

export async function uploadDocument(documentInfo) {
  try {
    const response = await api.post("/documents/upload", documentInfo);
    return response.data;
  } catch {
    const current = await getDocuments();
    const updated = current.map((doc) => {
      if (doc.id === documentInfo.id || doc.name.toLowerCase().includes((documentInfo.type || "").toLowerCase())) {
        return {
          ...doc,
          status: "pending_verification",
          badgeText: "● Uploaded (Pending OCR Verification)",
          lastVerified: "Uploaded Just Now",
          previewAvailable: true
        };
      }
      return doc;
    });
    localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(updated));
    return { success: true, documents: updated };
  }
}

export async function verifyDocument(id, extractedData = null) {
  try {
    const response = await api.post(`/documents/${id}/verify`, { extractedData });
    return response.data;
  } catch {
    const current = await getDocuments();
    const updated = current.map((doc) => {
      if (doc.id === id || doc.id === "doc-income") {
        return {
          ...doc,
          status: "verified",
          badgeText: "✓ Demo Verification Complete (Valid till 2029)",
          lastVerified: "Verified Today",
          extractedData: extractedData || doc.extractedData
        };
      }
      return doc;
    });
    localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(updated));
    return { success: true, message: "Demo verification complete", documents: updated };
  }
}

export default {
  getDocuments,
  uploadDocument,
  verifyDocument
};
