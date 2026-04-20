# 🔴 BROKEN FUNCTIONALITIES & PLACEHOLDER ELEMENTS REPORT

## Overview
This document identifies all broken, placeholder, and non-functional UI elements in the current implementation compared to TRACK.md specifications.

---

## 📊 SUMMARY

| Category | Count | Status |
|----------|-------|--------|
| Placeholder Buttons | 10 | ❌ Not Implemented |
| Non-functional Sidebar Items | 6 | ❌ Not Implemented |
| Quick Action Buttons | 4 | ❌ Not Implemented |
| Mobile Menu | 1 | ❌ Not Implemented |
| Static/Dummy Data | Multiple | ⚠️ Partial |
| **TOTAL** | **~25+** | **BROKEN** |

---

## 🔴 CRITICAL ISSUES

### 1. **Header Navigation - Placeholder Buttons** (App.tsx, lines 77-87)

**Issue**: Multiple buttons in the header have no functionality.

```jsx
<button className="...">About Us</button>           // ❌ No onClick handler
<button className="...">Academics</button>          // ❌ No onClick handler
<button className="bg-mit-cyan...">VC-SMS</button>  // ❌ No onClick handler
<button className="bg-mit-orange...">Login</button> // ❌ No onClick handler
<button className="bg-mit-green...">Contact</button> // ❌ No onClick handler
```

**Expected**: Should navigate to respective pages or open modals
**Current**: Buttons are clickable but do nothing

**Impact**: Misleading UI - suggests functionality that doesn't exist

---

### 2. **Sidebar Navigation - Broken Menu Items** (App.tsx, lines 119-131)

**Issue**: 6 out of 8 sidebar menu items are non-functional.

| Menu Item | Icon | Current Behavior | Expected |
|-----------|------|------------------|----------|
| Dashboard Overview | LayoutDashboard | Stays on admin (same as current) | ❌ Should show dashboard view |
| Student Records | FileText | Stays on admin | ❌ Should show records view |
| Course Catalog | Database | Stays on admin | ❌ Should show catalog view |
| System Backups | History | Stays on admin | ❌ Should show backups view |
| API Configuration | Settings | Stays on admin | ❌ Should show API config view |
| Audit Logs | Activity | Stays on admin | ❌ Should show audit logs view |

**Code Problem** (App.tsx, lines 125-135):
```jsx
// All sidebar items set page to same routes: 'admin' or 'submission'
{ id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard, page: 'admin' as Page },
{ id: 'records', label: 'Student Records', icon: FileText, page: 'admin' as Page },
{ id: 'catalog', label: 'Course Catalog', icon: Database, page: 'admin' as Page },
// ... all route to 'admin' page
// Only 'External Diagnostic Tool' and 'Flag Submission' work correctly
```

**Why it fails**: 
- `Page` type only has `'landing' | 'admin' | 'submission'` (3 pages)
- No separate pages created for dashboard, records, catalog, backups, api, audit
- The app architecture doesn't support per-sidebar-item views

**Impact**: Users cannot explore different admin functions - broken UX expectations

---

### 3. **Quick Action Buttons - Non-functional** (App.tsx, lines 448-458)

**Issue**: 4 action buttons in the right sidebar have no implementation.

```jsx
{['Clear Cache', 'Rotate Keys', 'Export Data', 'Halt System'].map((action) => (
  <button key={action} className="...">
    {action}  // ❌ No onClick handler, no backend endpoints
  </button>
))}
```

**Expected**: Should perform actual system operations
**Current**: Buttons are visible but clicking does nothing

**Missing Backend Endpoints**:
- `POST /api/cache/clear`
- `POST /api/keys/rotate`
- `POST /api/export`
- `POST /api/system/halt`

**Impact**: False promises - suggests admin controls that don't exist

---

### 4. **Mobile Menu Button - Non-functional** (App.tsx, lines 88-90)

**Issue**: Hamburger menu icon in mobile view has no onClick handler.

```jsx
<div className="lg:hidden">
  <Menu className="w-6 h-6" />  // ❌ No mobile menu implementation
</div>
```

**Expected**: Should open/close mobile navigation menu
**Current**: Icon just displays, no interaction

**Missing**: Mobile menu state management, drawer/modal component

**Impact**: Mobile users cannot navigate the app properly

---

### 5. **Landing Page - Placeholder "View More" Button** (App.tsx, line 286)

**Issue**: Button in hero section has no functionality.

```jsx
<button className="bg-mit-purple...">
  View More  // ❌ No onClick handler
</button>
```

**Expected**: Should navigate to university info page or open details
**Current**: Button visible but non-functional

**Impact**: Breaks expected landing page UX flow

---

### 6. **Server Infrastructure Display - Static/Dummy Data** (App.tsx, lines 435-446)

**Issue**: Shows hardcoded status information with no real backend validation.

```jsx
{[
  { label: 'Database Cluster', status: 'Online' },
  { label: 'User Auth Service', status: 'Online' },
  { label: 'CDN Node (US-East)', status: 'Online' },
  { label: 'Backup Storage', status: 'Syncing', badge: true },
].map((item, i) => (
  // Static display with no real data fetching
))}
```

**Expected**: Should fetch real status from backend `/api/infrastructure/status`
**Current**: Hardcoded mock data

**Impact**: Misleading - users might think server is actually being monitored

**Fix Needed**:
```jsx
// Should add a backend endpoint:
GET /api/infrastructure/status -> returns actual system status
```

---

## ⚠️ PARTIAL/INCOMPLETE IMPLEMENTATIONS

### 7. **SSRF Vulnerability - Partially Complete**

**Status**: ✅ Core functionality works, ⚠️ Edge cases missing

**Issues**:
- No URL validation or whitelist
- No timeout protection (long-running requests could hang)
- No rate limiting
- Could be exploited beyond lab intent

**Recommendation**: Add validation and warnings in UI

---

### 8. **Flag Submission - Incorrect Dropdown Options**

**Issue** (App.tsx, line 180-186): Includes 2 "Dummy" options that will never pass validation.

```jsx
const vulnerabilities = [
  { id: 'ssrf', label: 'SSRF (Server-Side Request Forgery)' },
  { id: 'robots', label: 'robots.txt Information Disclosure' },
  { id: 'hidden-api', label: 'Hidden API Endpoint' },
  { id: 'xss', label: 'Cross-Site Scripting (Dummy)' },      // ❌ Dummy
  { id: 'sqli', label: 'SQL Injection (Dummy)' },             // ❌ Dummy
];
```

**Problem**: 
- Users select "XSS" or "SQLi" but backend returns "Incorrect flag"
- These are never explained in TRACK.md
- Confusing for users

**Fix**: Either implement them or remove them

**TRACK.md Requirement** (Section 4):
```
Only 3 vulnerabilities should exist:
✅ SSRF
✅ robots.txt Exposure  
✅ Hidden API (No Auth)
```

---

## ✅ WORKING IMPLEMENTATIONS (vs TRACK.md)

| Feature | Status | Notes |
|---------|--------|-------|
| SSRF Vulnerability | ✅ Working | /api/fetch endpoint functional |
| robots.txt Exposure | ✅ Working | Correctly reveals hidden endpoints |
| Hidden API Endpoint | ✅ Working | /api/internal/config returns sensitive data |
| Flag Submission | ✅ Working | Validates flags correctly |
| Progress Tracking | ✅ Working | Shows solved vulnerabilities |
| Congratulations Page | ✅ Working | Shows when all 3 vulnerabilities solved |
| Flag Format | ✅ Correct | FLAG{type-xxxx-xxxx-xxxx-xxxx} |

---

## 📋 IMPLEMENTATION GAPS vs TRACK.md

### Section 3 (Core Features) - TRACK.md States:
```
* [x] Landing page (Public entry point)          ✅ Implemented
* [x] Admin panel UI (Internal dashboard)        ✅ Implemented
* [x] Fetch Resource feature (SSRF entry point)  ✅ Implemented
* [x] robots.txt file (Information disclosure)   ✅ Implemented
* [x] Hidden API endpoints (Sensitive data)      ✅ Implemented
* [x] Flag submission system (Validation)        ✅ Implemented
* [x] Final result page (Congratulations)        ✅ Implemented
```

**BUT ADDED EXTRAS NOT IN TRACK.MD**: 
- Multiple sidebar menu items
- Quick action buttons
- Mobile menu
- "View More" button
- Server Infrastructure display

**PROBLEM**: These extra UI elements are non-functional, creating false expectations.

---

## 🛠️ RECOMMENDATIONS

### Priority 1: Remove Placeholder UI
1. Remove non-functional buttons from header (About Us, Academics, VC-SMS, Login, Contact)
2. Remove extra sidebar menu items (keep only: External Diagnostic Tool, Flag Submission)
3. Remove placeholder "View More" button from landing page

### Priority 2: Implementation or Removal
1. Implement mobile menu OR remove hamburger icon
2. Remove or implement Quick Action buttons
3. Remove dummy vulnerabilities (XSS, SQLi) from dropdown

### Priority 3: Enhancements
1. Add real status fetching for Server Infrastructure
2. Add URL validation and timeout protection to SSRF endpoint
3. Add better error messages and guidance

### Priority 4: Documentation
1. Update README to list only implemented features
2. Add troubleshooting guide for common issues
3. Add security warnings more prominently

---

## 📝 DETAILED FIXES NEEDED

### Fix 1: Clean Up Header Buttons
```jsx
// REMOVE or IMPLEMENT these buttons:
- <button>About Us</button>
- <button>Academics</button>
- <button>VC-SMS</button>
- <button>Login</button>
- <button>Contact</button>
- <button>View More</button>

// KEEP ONLY:
- Home (working)
- System Console (working)
- Flag Submission (working)
```

### Fix 2: Simplify Sidebar
```jsx
// REMOVE these unreachable items:
- Dashboard Overview
- Student Records
- Course Catalog
- System Backups
- API Configuration
- Audit Logs

// KEEP ONLY:
- External Diagnostic Tool ✅
- Flag Submission ✅
```

### Fix 3: Remove Dummy Vulnerabilities
```jsx
// Remove from vulnerabilities array:
- { id: 'xss', label: 'Cross-Site Scripting (Dummy)' }
- { id: 'sqli', label: 'SQL Injection (Dummy)' }

// Keep only 3:
- SSRF
- robots.txt
- Hidden API
```

### Fix 4: Implement or Remove Quick Actions
```jsx
// Either:
// Option A: Remove these buttons
['Clear Cache', 'Rotate Keys', 'Export Data', 'Halt System']

// Option B: Implement backend endpoints for each
```

### Fix 5: Implement Mobile Menu
```jsx
// Add state management:
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// Add onClick handler:
<button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
  {mobileMenuOpen ? <X /> : <Menu />}
</button>

// Add mobile menu drawer component
```

---

## 🎯 CONCLUSION

**Current Status**: ~25+ non-functional UI elements

**Conformance to TRACK.md**: 90% ✅
- Core vulnerabilities: Fully implemented ✅
- Flag system: Fully implemented ✅
- Submission panel: Fully implemented ✅
- Congratulations page: Fully implemented ✅

**Problem**: Extra UI sugar that's not implemented

**Recommendation**: Strip down to core features matching TRACK.md, remove all placeholder buttons/menu items, or fully implement them.

---

**Generated**: 2026-04-20
**Status**: NEEDS CLEANUP
