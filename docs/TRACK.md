# MASTER TRACK DOCUMENT: ADT University Admin Panel (Simulation)

## 📌 PURPOSE OF THIS FILE

This file defines the complete vision of the final system, including features, vulnerabilities, and lab behavior.

---

## 📌 1. System Overview

* **Project Name**: ADT University Admin Panel (Simulation)
* **Type**: Internal Tool (App 4)
* **Description**: A cybersecurity lab inspired by PortSwigger, designed for learning web vulnerabilities like SSRF and Information Disclosure.

---

## 📌 2. Final System Architecture

* **Frontend**:
    * Landing page (University website)
    * Admin panel dashboard (Internal tool)
    * Submission panel (Flag validation)
* **Backend**:
    * Express server
    * API routes for diagnostics and status
    * Internal-only routes (simulated)
    * Dynamic flag generation system

---

## 📌 3. Core Features (Final State)

* [x] Landing page (Public entry point)
* [x] Admin panel UI (Internal dashboard)
* [x] Fetch Resource feature (SSRF entry point)
* [x] robots.txt file (Information disclosure)
* [x] Hidden API endpoints (Sensitive data exposure)
* [x] Flag submission system (Validation & Progress)
* [x] Final result page (Congratulations screen)

---

## 📌 4. Vulnerabilities (Final Implementation)

### SSRF (Server-Side Request Forgery)
* **Endpoint**: `/api/fetch`
* **Outcome**: Access internal-only routes like `/admin`.
* **Status**: Implemented.

### robots.txt Exposure
* **Endpoint**: `/robots.txt`
* **Outcome**: Discover hidden endpoints like `/api/internal/config`.
* **Status**: Implemented.

### Hidden API (No Auth)
* **Endpoint**: `/api/internal/config`
* **Outcome**: Exposure of database credentials and a flag.
* **Status**: Implemented.

---

## 📌 5. Flag System Design

* **Format**: `FLAG{lab-xxxx-xxxx-xxxx-xxxx}`
* **Generation**: Dynamic per request/session.
* **Mapping**: Each vulnerability has a unique flag.

---

## 📌 6. Lab Workflow (User Journey)

1. Open landing page.
2. Navigate to admin panel.
3. Intercept requests using Burp Suite.
4. Discover vulnerabilities (SSRF, robots.txt).
5. Exploit endpoints to extract flags.
6. Submit flags in the submission panel.
7. Get final success page upon completion.

---

## 📌 7. Submission & Validation System

* **Vulnerability Selection**: Dropdown (SSRF, robots.txt, Hidden API, +2 dummy).
* **Flag Input**: Text field for the extracted flag.
* **Validation**: Backend check against generated flags.
* **Progress**: Visual indicators for solved vulnerabilities.

---

## 📌 8. Final Output (Completion State)

* **Success Message**: "Congratulations – Lab Solved"
* **Summary Table**: List of solved vulnerabilities and their flags.

---

## 📌 9. Testing & Tools

* Burp Suite
* Postman
* OWASP ZAP

---

## 📌 10. Deployment Goal

* Deploy on Vercel / Cloud Run.
* Accessible for remote security testing.
