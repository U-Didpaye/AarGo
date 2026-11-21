import { VisitRequest, JourneyStatus } from "./types";

const STORAGE_KEY = "aarogyago_journey_requests_v1";

const SEED_REQUESTS: VisitRequest[] = [
  {
    id: "ARG-2026-7821",
    createdAt: "2026-11-20T10:30:00.000Z",
    patientName: "Sample Traveler 01",
    contactEmail: "traveler01@example.com",
    contactPhone: "Not a real number",
    destinationCity: "Nagpur",
    selectedHospitalId: "hosp-ngp-01",
    selectedHospitalName: "AIIMS Nagpur Medical Complex",
    preferredDate: "2026-12-05",
    alternateDate: "2026-12-08",
    travelOriginCity: "Raipur, Chhattisgarh",
    services: {
      appointmentCoordination: true,
      accommodationSupport: true,
      localTransport: true,
      languageInterpreter: false,
      wheelchairSpecialAssistance: true,
      dietaryOrCulturalPreferences: false,
    },
    languagePreference: "Hindi / Marathi",
    specialNotes: "Example note: requests step-free access and nearby lodging.",
    status: "Under Review",
    statusHistory: [
      {
        status: "Request Submitted",
        timestamp: "2026-11-20T10:30:00.000Z",
        note: "Initial visit coordination request submitted online."
      },
      {
        status: "Under Review",
        timestamp: "2026-11-20T14:15:00.000Z",
        note: "Example status update: sample lodging options are under review."
      }
    ],
    coordinatorNotes: "Example coordination note: lodging options are being reviewed. No real reservation has been made."
  },
  {
    id: "ARG-2026-9140",
    createdAt: "2026-11-18T09:00:00.000Z",
    patientName: "Sample Traveler 02",
    contactEmail: "traveler02@example.com",
    contactPhone: "Not a real number",
    destinationCity: "New Delhi",
    selectedHospitalId: "hosp-del-01",
    selectedHospitalName: "Max Super Speciality Hospital, Saket (Illustrative)",
    preferredDate: "2026-11-28",
    alternateDate: "2026-11-30",
    travelOriginCity: "Kolkata, West Bengal",
    services: {
      appointmentCoordination: true,
      accommodationSupport: true,
      localTransport: true,
      languageInterpreter: true,
      wheelchairSpecialAssistance: false,
      dietaryOrCulturalPreferences: true,
    },
    languagePreference: "Bengali / English",
    specialNotes: "Example note: requests Bengali-language assistance at registration.",
    status: "Hospital Contacted",
    statusHistory: [
      {
        status: "Request Submitted",
        timestamp: "2026-11-18T09:00:00.000Z",
        note: "Travel request received."
      },
      {
        status: "Under Review",
        timestamp: "2026-11-18T11:20:00.000Z",
        note: "Outstation visitor desk assigned."
      },
      {
        status: "Hospital Contacted",
        timestamp: "2026-11-19T16:45:00.000Z",
        note: "Example status update: a sample registration slot is being discussed."
      }
    ],
    coordinatorNotes: "Example coordination note: a pre-visit checklist is ready to review. No hospital contact has been made."
  }
];

export function getStoredRequests(): VisitRequest[] {
  if (typeof window === "undefined") {
    return SEED_REQUESTS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_REQUESTS));
      return SEED_REQUESTS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return SEED_REQUESTS;

    const sanitizedSamples = new Map(
      SEED_REQUESTS.map((request) => [request.id, request])
    );
    const legacySampleNames = new Set([
      "Rameshwar Sharma",
      "Ananya Mukherjee",
    ]);
    const legacySamplePhones = new Set([
      "+91 90000 00001",
      "+91 90000 00002",
    ]);

    return parsed.map((request) => {
      const sample = sanitizedSamples.get(request?.id);
      const isLegacySample =
        legacySampleNames.has(request?.patientName) ||
        legacySamplePhones.has(request?.contactPhone);
      return sample && isLegacySample ? sample : request;
    });
  } catch {
    return SEED_REQUESTS;
  }
}

export function saveRequest(request: VisitRequest): void {
  if (typeof window === "undefined") return;
  const current = getStoredRequests();
  const updated = [request, ...current.filter((r) => r.id !== request.id)];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function updateRequestStatus(
  id: string,
  newStatus: JourneyStatus,
  note: string,
  coordinatorNotes?: string
): VisitRequest | null {
  if (typeof window === "undefined") return null;
  const current = getStoredRequests();
  const index = current.findIndex((r) => r.id === id);
  if (index === -1) return null;

  const target = current[index];
  const updatedHistory = [
    ...target.statusHistory,
    {
      status: newStatus,
      timestamp: new Date().toISOString(),
      note,
    },
  ];

  const updatedRequest: VisitRequest = {
    ...target,
    status: newStatus,
    statusHistory: updatedHistory,
    coordinatorNotes: coordinatorNotes !== undefined ? coordinatorNotes : target.coordinatorNotes,
  };

  current[index] = updatedRequest;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  return updatedRequest;
}

export function getRequestById(id: string): VisitRequest | undefined {
  const current = getStoredRequests();
  return current.find((r) => r.id.toLowerCase() === id.trim().toLowerCase());
}
