import { VisitRequest, JourneyStatus } from "./types";

const STORAGE_KEY = "aarogyago_journey_requests_v1";

const SEED_REQUESTS: VisitRequest[] = [
  {
    id: "ARG-2026-7821",
    createdAt: "2026-11-20T10:30:00.000Z",
    patientName: "Rameshwar Sharma",
    contactEmail: "rameshwar.s@example.com",
    contactPhone: "+91 98223 45110",
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
    specialNotes: "Elderly patient needing ramp access and attendant lodging near MIHAN.",
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
        note: "Non-clinical coordinator assigned. Verifying guest house availability near MIHAN."
      }
    ],
    coordinatorNotes: "Coordinator Priya verified guest house availability at MIHAN sector. Awaiting confirmation from patient attendant."
  },
  {
    id: "ARG-2026-9140",
    createdAt: "2026-11-18T09:00:00.000Z",
    patientName: "Ananya Mukherjee",
    contactEmail: "ananya.m@example.com",
    contactPhone: "+91 94330 18274",
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
    specialNotes: "Requires Bengali language liaison for non-clinical registration desk.",
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
        note: "Hospital guest desk contacted for non-clinical registration slot on Nov 28."
      }
    ],
    coordinatorNotes: "Hospital international & outstation desk acknowledged. Pre-visit checklist sent to patient."
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
    return Array.isArray(parsed) ? parsed : SEED_REQUESTS;
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
