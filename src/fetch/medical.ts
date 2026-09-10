import { ref, get } from "firebase/database";
import { realtimeDb } from "../services/api/firebasedb";

export interface Symptom {
  id: string;
  title?: string;
  description?: string;
  iconUrl?: string;
  category?: string;
  keywords?: string[];
}

export async function fetchSymptoms(): Promise<Symptom[]> {
  try {
    console.log("🔥 Fetching MedicalKnowledge...");

    const snapshot = await get(ref(realtimeDb, "MedicalKnowledge"));

    if (!snapshot.exists()) {
      console.log("❌ MedicalKnowledge is empty");
      return [];
    }

    const data = snapshot.val();

    console.log("🔥 Raw data:", data);

    return Object.entries(data).map(([id, value]) => ({
      id,
      ...(value as Omit<Symptom, "id">),
    }));
  } catch (error) {
    console.error("❌ Error fetching MedicalKnowledge:", error);
    throw error;
  }
}
