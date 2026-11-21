# AarogyaGo — Healthcare Without Borders

> **AI-Assisted Healthcare Journey Coordination Platform**  
> Developed for **Hack Days at NFSU Nagpur** (Major League Hacking Programme).

[![Next.js](https://img.shields.io/badge/Next.js-15_App_Router-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-8E75C4?style=flat&logo=google)](https://ai.google.dev/)
[![Framer Motion](https://img.shields.io/badge/Motion-Framer_Motion_12-FF0055?style=flat&logo=framer)](https://www.framer.com/motion/)

---

## 01. Product Overview & Purpose

**AarogyaGo** is an AI-assisted healthcare journey coordination platform designed to eliminate the logistical maze patients and their caregivers face during planned medical journeys. 

While doctors and hospitals provide clinical care, patients and outstation families often struggle through dozens of disconnected phone calls, travel bookings, language barriers, and lodging searches. AarogyaGo brings all non-clinical coordination services into **one calm, connected, and predictable patient experience**.

### Non-Clinical Safety Mandates & Boundaries
* **Strictly Non-Clinical**: AarogyaGo is **not** a hospital, healthcare provider, or medical authority.
* **Zero Medical Diagnosis**: The platform never diagnoses medical conditions, prescribes drugs, recommends medical treatments, or provides clinical triage.
* **Clinical Integrity**: All clinical decisions remain strictly between licensed healthcare professionals and the patient.
* **Demonstration Transparency**: All hospital records and partner data are clearly identified as illustrative demonstration profiles.

---

## 02. Core Platform Capabilities

1. **Hospital Discovery Engine (`/discover`)**
   - Multi-city medical network search across Nagpur, Mumbai, New Delhi, Bengaluru, and Hyderabad.
   - Filter by clinical specialty and destination city.
   - Transparent non-clinical logistics: airport/railway transit distance, companion guest houses, Dharmashalas, and regional language facilitation desks.
   - Interactive logistics modal with direct "Plan Visit" action.

2. **Plan My Visit Wizard (`/plan`)**
   - 3-step structured request flow:
     - Step 1: Patient details, origin town/city, and contact information.
     - Step 2: Destination medical center and preferred/alternate dates.
     - Step 3: Non-clinical service toggles (Registration Queue Coordination, Outstation Lodging, Station Transit, Regional Interpreter, Wheelchair/Ramp Support, Attendant Canteen Passes).
   - Generates unique tracking reference (e.g. `ARG-2026-XXXX`).
   - Client-side persistence via `localStorage` with celebratory feedback.

3. **Patient Journey Tracker (`/journey`)**
   - Live 4-stage coordination progress timeline:
     1. `Request Submitted`
     2. `Under Review`
     3. `Hospital Contacted`
     4. `Appointment Update`
   - Real-time audit history log of milestone transitions.
   - Coordinator dispatch notes visible directly to the patient.
   - Print & PDF export summary functionality.

4. **Google Gemini 2.5 Journey Assistant (`/assistant`)**
   - Built on official `@google/generative-ai` SDK using `gemini-2.5-flash`.
   - Generates customized non-clinical document checklists, file indexing tips, and companion travel preparation.
   - Context-aware: automatically loads target hospital and date from your active request.
   - Instant text export and clipboard copying.
   - Resilient fallback engine ensuring zero downtime even under network latency.

5. **Demonstration Coordinator Desk (`/coordinator`)**
   - Simulated operational workspace for patient facilitators.
   - Review incoming requests, filter by status, and inspect patient needs.
   - Advance milestone stages and dispatch coordinator notes that reflect immediately on the patient's live tracker.

---

## 03. Design System & Motion

* **ChokasOne Visual Identity**:
  - **Light Theme**: Background `#F6F7F9`, Surface `#FFFFFF`, Primary `#3D43C8`, Typography `#161A2C`.
  - **Dark Theme**: Background `#0B0D12`, Surface `#151821`, Primary `#A5AAFF`, Typography `#F2F4F8`.
  - Frosted glassmorphism (`backdrop-filter: blur`), subtle indigo ambient gradients, and crisp typography.
* **QuietPulse Motion Architecture**:
  - Smooth page-to-page entrances using cubic bezier easing `[0.16, 1, 0.3, 1]`.
  - Staggered component animations.
  - Floating ambient background orbs.
  - Micro-interactions on buttons, toggles, and modals with reduced-motion support.

---

## 04. Technology Stack

* **Framework**: Next.js 15 (App Router, Server Actions, API Routes)
* **Language**: TypeScript 5.7
* **Styling**: Tailwind CSS 3.4
* **Animations**: Framer Motion 12
* **AI Engine**: Google Gemini API (`gemini-2.5-flash`) via `@google/generative-ai`
* **Icons**: Lucide React
* **Persistence**: Browser `localStorage` (with pre-seeded demo journeys for offline judging)

---

## 05. Getting Started

### Prerequisites
* Node.js v18+ or v20+
* Google Gemini API Key

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/U-Didpaye/AarGo.git
   cd AarGo
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   NEXT_PUBLIC_APP_NAME="AarogyaGo"
   NEXT_PUBLIC_APP_TAGLINE="Healthcare Without Borders"
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production**
   ```bash
   npm run build
   npm run start
   ```

---

## 06. Team & Event Credits

* **Event**: Hack Days at NFSU Nagpur
* **Organised Under**: Major League Hacking (MLH) Hack Days Programme
* **Team**: HackMaster_Restart
* **Team Leader**: Ujwal Didpaye
* **Institution**: G. H. Raisoni College of Engineering, Nagpur
* **Repository**: [https://github.com/U-Didpaye/AarGo.git](https://github.com/U-Didpaye/AarGo.git)

---

*AarogyaGo — Healthcare Without Borders.*
