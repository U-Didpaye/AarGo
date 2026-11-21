import { Hospital } from "../journey/types";

export const SAMPLE_HOSPITALS: Hospital[] = [
  {
    id: "hosp-ngp-01",
    name: "AIIMS Nagpur Medical Complex",
    city: "Nagpur",
    state: "Maharashtra",
    address: "MIHAN SEZ, Plot No. 2, Nagpur 441108",
    specialties: ["Cardiology", "Neurology", "Oncology", "Orthopaedics", "Pulmonology"],
    languagesSupported: ["English", "Hindi", "Marathi"],
    amenities: ["Wheelchair Accessible", "Patient Transit Desk", "Cafeteria", "Pharmacy 24x7", "Ambulance Bay"],
    nearbyTransit: "12 km from Dr. Babasaheb Ambedkar International Airport, 18 km from Nagpur Junction Railway",
    guestAccommodationNearby: "Dharmashala inside campus, 6 guest houses within 3 km in MIHAN sector",
    accreditation: "National Institute of Importance / NABH Standards",
    illustrativeBadge: true,
    ratingScore: 4.8,
    description: "Premier apex healthcare and medical research institution in Vidarbha, offering multidisciplinary specialized departments with comprehensive patient facilitation wings."
  },
  {
    id: "hosp-ngp-02",
    name: "Kingsway Hospitals (Illustrative Profile)",
    city: "Nagpur",
    state: "Maharashtra",
    address: "Opp. Kasturchand Park, Kingsway, Nagpur 440001",
    specialties: ["Cardiac Sciences", "Joint Replacement", "Gastroenterology", "Nephrology", "Critical Care"],
    languagesSupported: ["English", "Hindi", "Marathi", "Gujarati"],
    amenities: ["International Patient Lounge", "Valet Parking", "Multi-cuisine Dining", "ATM", "Dedicated Attendant Waiting Rooms"],
    nearbyTransit: "Adjacent to Nagpur Central Railway Station (500m), 9 km from Airport",
    guestAccommodationNearby: "8 business and budget hotels within 1 km on Station Road",
    accreditation: "NABH / NABL Accredited",
    illustrativeBadge: true,
    ratingScore: 4.7,
    description: "Centrally located multi-specialty tertiary care center with specialized patient coordination services and dedicated arrival assistance desks."
  },
  {
    id: "hosp-mum-01",
    name: "Kokilaben Dhirubhai Ambani Hospital (Illustrative)",
    city: "Mumbai",
    state: "Maharashtra",
    address: "Rao Saheb Achutrao Patwardhan Marg, Four Bungalows, Andheri West, Mumbai 400053",
    specialties: ["Bone & Joint", "Cancer Center", "Cardiac Sciences", "Neurosciences", "Robotic Surgery"],
    languagesSupported: ["English", "Hindi", "Marathi", "Bengali", "Arabic"],
    amenities: ["Inter-city Patient Welcome Lounge", "Wheelchair Support", "Prayer Room", "Foreign Exchange Desk"],
    nearbyTransit: "8 km from Chhatrapati Shivaji Maharaj International Airport T2, 4 km from Andheri Railway Station",
    guestAccommodationNearby: "Multiple serviced apartments and medical-stay lodges within 2 km",
    accreditation: "JCI & NABH Accredited",
    illustrativeBadge: true,
    ratingScore: 4.9,
    description: "Comprehensive quaternary care hospital featuring Full Time Specialist System (FTSS) and full non-clinical companion services for domestic and international visitors."
  },
  {
    id: "hosp-del-01",
    name: "Max Super Speciality Hospital, Saket (Illustrative)",
    city: "New Delhi",
    state: "Delhi NCR",
    address: "1, 2, Press Enclave Marg, Saket Institutional Area, New Delhi 110017",
    specialties: ["Oncology", "Cardio-Thoracic Surgery", "Organ Transplant", "Minimal Access Surgery", "Spine Surgery"],
    languagesSupported: ["English", "Hindi", "Punjabi", "Urdu", "Russian", "French"],
    amenities: ["Dedicated Travel Desk", "Regional Language Facilitators", "Airport Pickup Coordination", "Private Patient Suites"],
    nearbyTransit: "14 km from Indira Gandhi International Airport T3, 1 km from Malviya Nagar Metro Station",
    guestAccommodationNearby: "Extensive bed & breakfast lodging network and medical guest houses in Saket Institutional Area",
    accreditation: "JCI, NABH & NABL Accredited",
    illustrativeBadge: true,
    ratingScore: 4.8,
    description: "Leading tertiary institution in the capital, renowned for complex medical procedures and systematic foreign and outstation patient concierge services."
  },
  {
    id: "hosp-blr-01",
    name: "Manipal Hospital, Old Airport Road (Illustrative)",
    city: "Bengaluru",
    state: "Karnataka",
    address: "98, HAL Old Airport Rd, Kodihalli, Bengaluru 560017",
    specialties: ["Organ Transplant", "Cardiology", "Neurology & Neurosurgery", "Pediatrics", "Oncology"],
    languagesSupported: ["English", "Hindi", "Kannada", "Tamil", "Telugu", "Malayalam"],
    amenities: ["Multilingual Assistance", "Attendant Stay Facilities", "Luggage Concierge", "Dietary Consultation for Escorts"],
    nearbyTransit: "40 km from Kempegowda International Airport (direct Vayu Vajra bus connection), 10 km from Majestic",
    guestAccommodationNearby: "Over 15 corporate guest suites and budget service apartments along Indiranagar and Old Airport Road",
    accreditation: "NABH Accredited & AAHRPP Certified",
    illustrativeBadge: true,
    ratingScore: 4.8,
    description: "Flagship healthcare institute in South India providing end-to-end medical logistics, language translation desks, and integrated family support ecosystems."
  },
  {
    id: "hosp-hyd-01",
    name: "Yashoda Hospitals, Hitec City (Illustrative)",
    city: "Hyderabad",
    state: "Telangana",
    address: "Mindspace Road, HITEC City, Madhapur, Hyderabad 500081",
    specialties: ["Gastroenterology", "Heart & Lung Transplant", "Robotic Oncology", "Joint Replacement"],
    languagesSupported: ["English", "Hindi", "Telugu", "Bengali", "Odia"],
    amenities: ["Priority Lounge", "Express Non-Clinical Check-In", "Escort Accommodation Desk", "Shuttle Service"],
    nearbyTransit: "32 km from Rajiv Gandhi International Airport via Outer Ring Road, 2 km from Raidurg Metro Station",
    guestAccommodationNearby: "Budget and 3-star business hotels within 1.5 km in Hitec City and Madhapur",
    accreditation: "NABH & NABL Accredited",
    illustrativeBadge: true,
    ratingScore: 4.7,
    description: "Modern healthcare campus in Hyderabad's tech hub with dedicated non-clinical patient coordinators assisting regional visitors with transport and boarding."
  }
];

export const CITIES = ["All Cities", "Nagpur", "Mumbai", "New Delhi", "Bengaluru", "Hyderabad"];
export const SPECIALTIES = [
  "All Specialties",
  "Cardiology",
  "Oncology",
  "Neurology",
  "Orthopaedics",
  "Organ Transplant",
  "Gastroenterology",
  "Pulmonology"
];
