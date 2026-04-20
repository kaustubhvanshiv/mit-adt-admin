Create a new file:

docs/TRACK.md

This file should act as a MASTER TRACK DOCUMENT that defines the complete vision of the final system.

---

## 📌 PURPOSE OF THIS FILE

This file should clearly answer:

* What the final system should look like
* What features must exist
* What vulnerabilities must be implemented
* How the lab should behave when complete

This is NOT a checklist.
This is the FINAL TARGET SYSTEM.

---

## 📌 STRUCTURE

### 1. System Overview

* Brief description of the project
* Mention:

  * ADT University Admin Panel (Simulation)
  * Internal Tool (App 4)
  * Cybersecurity lab inspired by PortSwigger

---

### 2. Final System Architecture

Explain high-level structure:

* Frontend:

  * Landing page (company website)
  * Admin panel dashboard
  * Submission panel (for flags)

* Backend:

  * Express server
  * API routes
  * Internal-only routes
  * Flag generation system

---

### 3. Core Features (Final State)

List all features the completed system must have:

* Landing page (NOT direct admin access)
* Admin panel UI
* Fetch Resource feature
* robots.txt file
* Hidden API endpoints
* Flag submission system
* Final result page (congratulations screen)

---

### 4. Vulnerabilities (Final Implementation)

Clearly define all vulnerabilities:

#### SSRF

* Endpoint: /fetch
* Outcome: Access internal route

#### robots.txt Exposure

* Endpoint: /robots.txt
* Outcome: Discover hidden endpoints

#### Hidden API (No Auth)

* Endpoint: /api/internal/config
* Outcome: Sensitive data exposure

---

### 5. Flag System Design

Define how flags should work:

* Format:
  FLAG{lab-xxxx-xxxx-xxxx-xxxx}
* Generated dynamically
* Unique per solve
* Mapped to vulnerabilities
* Used in submission panel

---

### 6. Lab Workflow (User Journey)

Explain step-by-step how a user solves the lab:

1. Open landing page
2. Navigate to admin panel
3. Intercept requests using Burp Suite
4. Discover vulnerabilities
5. Exploit endpoints
6. Extract flags
7. Submit flags
8. Get final success page

---

### 7. Submission & Validation System

Define:

* Dropdown to select vulnerability:

  * SSRF
  * robots.txt
  * Hidden API
  * * 2 dummy options

* Input field for flag

* Validation logic

* Progress tracking

* Final success trigger

---

### 8. Final Output (Completion State)

When all vulnerabilities are solved:

* Show:

  * “Congratulations – Lab Solved”
  * Table with:

    * Vulnerability name
    * Corresponding flag

---

### 9. Testing & Tools

Mention tools used:

* Burp Suite
* Postman
* OWASP ZAP

---

### 10. Deployment Goal

* Deploy on Vercel
* Accessible remotely
* Usable with proxy tools (Burp/ZAP)

---

## 📌 STYLE RULES

* Clear and structured
* No emojis
* Professional tone
* Easy to read
* Not too long, but complete

---

IMPORTANT:
Do NOT modify existing files.
Only create docs/TRACK.md
