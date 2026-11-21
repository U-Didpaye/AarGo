export type JourneyStatus =
  | "Request Submitted"
  | "Under Review"
  | "Hospital Contacted"
  | "Appointment Update";

export interface ServiceRequirements {
  appointmentCoordination: boolean;
  accommodationSupport: boolean;
  localTransport: boolean;
  languageInterpreter: boolean;
  wheelchairSpecialAssistance: boolean;
  dietaryOrCulturalPreferences: boolean;
}

export interface VisitRequest {
  id: string;
  createdAt: string;
  patientName: string;
  contactEmail: string;
  contactPhone: string;
  destinationCity: string;
  selectedHospitalId: string;
  selectedHospitalName: string;
  preferredDate: string;
  alternateDate?: string;
  travelOriginCity: string;
  services: ServiceRequirements;
  languagePreference?: string;
  specialNotes?: string;
  status: JourneyStatus;
  statusHistory: {
    status: JourneyStatus;
    timestamp: string;
    note: string;
  }[];
  coordinatorNotes?: string;
}

export interface Hospital {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  specialties: string[];
  languagesSupported: string[];
  amenities: string[];
  nearbyTransit: string;
  guestAccommodationNearby: string;
  accreditation: string;
  illustrativeBadge: boolean;
  ratingScore: number;
  description: string;
}
