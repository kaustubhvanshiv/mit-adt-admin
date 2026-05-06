import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AdminPanel from './AdminPanel';
import mitLogo from '../images/mit_adt_logo.png?url';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import StaffPage from './components/StaffPage';
import AboutPageNew from './components/AboutPage';
import AcademicsPageNew from './components/AcademicsPage';
import AdminHiddenPage from './components/AdminHiddenPage';
// ...existing code...
import { 
  Shield, 
  Search, 
  LayoutDashboard, 
  Globe, 
  Lock, 
  Server, 
  Terminal,
  ChevronRight,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Menu,
  X,
  Database,
  Key,
  FileText,
  History,
  Settings,
  Activity,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube
} from 'lucide-react';

// --- Types ---

type Page = 'landing' | 'admin' | 'submission' | 'about' | 'academics' | 'diagnostic' | 'login' | 'profile' | 'staff' | 'hidden-admin';

interface SolvedState {
  ssrf: boolean;
  robots: boolean;
  'hidden-api': boolean;
  'student-delete': boolean;
  'ssrf-delete': boolean;
}

// --- Components ---

const Header = ({ onNavigate, currentPage, user }: { onNavigate: (page: Page) => void, currentPage: Page, user: string | null }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showXssResult, setShowXssResult] = useState(false);
  const [xssToast, setXssToast] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setShowXssResult(true);

    // XSS Simulation: If the input looks like a script, show toast with flag
    if (searchQuery.toLowerCase().includes('<script>') || searchQuery.toLowerCase().includes('alert(') || searchQuery.toLowerCase().includes('onerror') || searchQuery.toLowerCase().includes('onload')) {
      setXssToast(true);
      setTimeout(() => setXssToast(false), 8000);
    }
  };

  return (
    <>
      {/* XSS Flag Toast Notification */}
      {xssToast && (
        <div className="fixed top-4 right-4 z-[9999] flex items-start gap-3 bg-slate-900 border border-emerald-500 text-white rounded-2xl shadow-2xl p-5 max-w-sm">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-1">XSS Exploit Triggered!</p>
            <p className="text-[11px] text-slate-400 mb-2">Reflected XSS via search input — script injected into DOM.</p>
            <code className="text-sm font-mono font-bold text-white bg-white/10 px-2 py-1 rounded block">
              FLAG&#123;xss-search-injection-9912&#125;
            </code>
          </div>
          <button onClick={() => setXssToast(false)} className="text-slate-500 hover:text-white transition shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="relative top-0 left-0 right-0 z-50">
        {/* Colorful Top Accent Bar */}
        <div className="h-2 flex w-full">
          <div className="h-full w-1/4 bg-mit-red" />
          <div className="h-full w-1/4 bg-mit-orange" />
          <div className="h-full w-1/4 bg-mit-green" />
          <div className="h-full w-1/4 bg-mit-cyan" />
        </div>

        {/* Main Header */}
        <header className="bg-mit-purple text-white px-8 py-0 shadow-lg">
          <div className="max-w-7xl mx-auto">
            {/* Top Row */}
            <div className="flex items-center justify-between mb-0">
              <div className="flex items-center cursor-pointer" onClick={() => onNavigate('landing')}>
                <div className="w-64 h-30 flex items-center justify-center flex-shrink-0 py-5">
                  <img src={mitLogo} alt="MIT ADT Logo" className="w-full h-full object-contain" />
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-1.5">
                  <button className="bg-mit-cyan text-white px-4 py-1.5 rounded text-[12px] font-bold uppercase tracking-wider hover:brightness-110 transition-all">VC-SMS</button>
                  <button className="bg-mit-orange text-white px-4 py-1.5 rounded text-[12px] font-bold uppercase tracking-wider hover:brightness-110 transition-all">ODL / OL</button>
                  <button
                    onClick={() => onNavigate(user ? 'profile' : 'login')}
                    className="bg-mit-green text-white px-4 py-1.5 rounded text-[12px] font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-2"
                  >
                    {user ? (
                      <>
                        <div className="w-4 h-4 rounded-full bg-white/20 overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user}`} alt="" />
                        </div>
                        Profile
                      </>
                    ) : 'Login'}
                  </button>
                  <button className="bg-mit-red text-white px-4 py-1.5 rounded text-[12px] font-bold uppercase tracking-wider hover:brightness-110 transition-all">Life @ Campus</button>
                  <button className="bg-mit-cyan text-white px-4 py-1.5 rounded text-[12px] font-bold uppercase tracking-wider hover:brightness-110 transition-all">Contact Us</button>
                </div>
                <div className="text-[12px] flex gap-2 text-white/80">
                  <button className="hover:text-white transition">Careers</button>
                  <span className="text-white/50">|</span>
                  <button className="hover:text-white transition">Alumni</button>
                  <span className="text-white/50">|</span>
                  <button className="hover:text-white transition">Happenings</button>
                  <span className="text-white/50">|</span>
                  <button className="hover:text-white transition">Exams</button>
                  <span className="text-white/50">|</span>
                  <button className="hover:text-white transition">International</button>
                  <span className="text-white/50">|</span>
                  <button className="hover:text-white transition">NAAC</button>
                  <span className="text-white/50">|</span>
                  <button className="hover:text-white transition">Disclosures</button>
                </div>
              </div>
            </div>

            <div className="h-px bg-white/20 my-0"></div>

            <div className="flex items-center justify-between">
              <nav className="flex gap-8 items-center">
                <button onClick={() => onNavigate('landing')} className={`text-sm font-bold uppercase tracking-widest transition-all py-3 border-b-2 ${currentPage === 'landing' ? 'border-mit-orange text-mit-orange' : 'border-transparent text-white hover:text-mit-orange'}`}>Home</button>
                <button onClick={() => onNavigate('about')} className={`text-sm font-bold uppercase tracking-widest transition-all py-3 border-b-2 ${currentPage === 'about' ? 'border-mit-orange text-mit-orange' : 'border-transparent text-white hover:text-mit-orange'}`}>About Us</button>
                <button onClick={() => onNavigate('academics')} className={`text-sm font-bold uppercase tracking-widest transition-all py-3 border-b-2 ${currentPage === 'academics' ? 'border-mit-orange text-mit-orange' : 'border-transparent text-white hover:text-mit-orange'}`}>Academics</button>
                <button onClick={() => onNavigate('staff')} className={`text-sm font-bold uppercase tracking-widest transition-all py-3 border-b-2 ${currentPage === 'staff' ? 'border-mit-orange text-mit-orange' : 'border-transparent text-white hover:text-mit-orange'}`}>Staff Portal</button>
              </nav>

              <div className="flex gap-3 items-center">
                <form onSubmit={handleSearch} className="relative group mr-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search campus..."
                    className="bg-white/10 border border-white/20 rounded-full py-1.5 px-4 pr-10 text-xs text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all w-48 group-hover:w-64"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Search className="w-4 h-4 text-white/70 hover:text-white transition" />
                  </button>
                  {showXssResult && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl p-4 text-slate-900 border border-slate-200 z-[100]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Search Results for:</span>
                        <button onClick={() => setShowXssResult(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                      </div>
                      {/* VULNERABILITY: Reflected XSS */}
                      <div className="text-sm font-bold text-mit-purple break-all" dangerouslySetInnerHTML={{ __html: searchQuery }} />
                      <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 italic">
                        0 results found. Try broader keywords.
                      </div>
                    </div>
                  )}
                </form>

                <a href="#" className="w-9 h-9 bg-white text-mit-purple rounded-full flex items-center justify-center hover:brightness-95 transition-all"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="w-9 h-9 bg-white text-mit-purple rounded-full flex items-center justify-center hover:brightness-95 transition-all"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="w-9 h-9 bg-white text-mit-purple rounded-full flex items-center justify-center hover:brightness-95 transition-all"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="w-9 h-9 bg-white text-mit-purple rounded-full flex items-center justify-center hover:brightness-95 transition-all"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="w-9 h-9 bg-white text-mit-purple rounded-full flex items-center justify-center hover:brightness-95 transition-all"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

const Sidebar = ({ onNavigate, currentPage }: { onNavigate: (page: Page) => void, currentPage: Page }) => {
  const menuItems = [
    { id: 'home', label: 'Home Page', icon: LayoutDashboard, page: 'landing' as Page },
    { id: 'diagnostic', label: 'External Diagnostic Tool', icon: Terminal, page: 'diagnostic' as Page },
    { id: 'submission', label: 'Flag Submission', icon: Shield, page: 'submission' as Page },
  ];

  return (
    <aside className="w-64 bg-white border-r border-border py-8 flex flex-col gap-1 shrink-0 h-full overflow-y-auto shadow-sm">
      <div className="px-6 mb-6">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Navigation</p>
      </div>
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.page)}
          className={`px-6 py-3.5 flex items-center gap-3 text-sm font-semibold border-r-4 transition-all ${
            currentPage === item.page
              ? 'bg-mit-purple/5 text-mit-purple border-mit-purple'
              : 'text-slate-600 border-transparent hover:bg-slate-50'
          }`}
        >
          <item.icon className={`w-4 h-4 ${currentPage === item.page ? 'text-mit-purple' : 'text-slate-400'}`} />
          {item.label}
        </button>
      ))}
    </aside>
  );
};

const SubmissionPanel = ({ solved, onSolve }: { solved: SolvedState, onSolve: (vuln: keyof SolvedState) => void }) => {
  const [flag, setFlag] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Client-side flag registry — no server required
  const FLAG_MAP: Record<string, keyof SolvedState> = {
    'FLAG{xss-search-injection-9912}': 'ssrf',        // XSS via search bar
    'FLAG{info-robots-2026-flag}': 'robots',           // robots.txt discovery
    'FLAG{robots-txt-is-not-security-882}': 'robots',  // /admin via robots.txt
    'FLAG{ssrf-delete-user-9921}': 'ssrf-delete',      // SSRF delete exploit
    'FLAG{student-delete-access-granted-2026}': 'student-delete', // Admin panel delete
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const trimmed = flag.trim();
    const vulnerability = FLAG_MAP[trimmed];

    if (vulnerability) {
      setMessage({ type: 'success', text: `✅ Correct! You solved the "${vulnerability}" challenge.` });
      onSolve(vulnerability);
      setFlag('');
    } else {
      setMessage({ type: 'error', text: '❌ Incorrect flag. Check your exploit and try again.' });
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="card">
        <div className="card-title">
          <Shield className="w-4 h-4 text-mit-purple" />
          Flag Submission Panel
        </div>
        <p className="text-[13px] text-text-muted mb-8 leading-relaxed">
          Enter your submission and choose the matching category to validate it.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="label">Submission Value</label>
            <input 
              type="text"
              value={flag}
              onChange={(e) => setFlag(e.target.value)}
              placeholder="Enter your submission here"
              className="input"
            />
          </div>

          <button 
            type="submit"
            className="btn"
          >
            Submit Flag
          </button>
        </form>

        {message && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-8 p-4 rounded-md flex items-start gap-3 border ${
              message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'
            }`}
          >
            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
            <div className="text-sm font-medium">{message.text}</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const PublicDiagnosticTool = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="card border-2 border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Terminal className="w-5 h-5 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">External Diagnostic Utility</h3>
        </div>
        
        <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl mb-8 flex items-start gap-4">
          <Lock className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-amber-900">Access Restricted</h4>
            <p className="text-sm text-amber-700 leading-relaxed mt-1">
              The full diagnostic suite is only available to authorized system administrators. 
              Please log in through the primary administrative gateway to access advanced probing features.
            </p>
          </div>
        </div>

        <div className="space-y-6 opacity-50 grayscale pointer-events-none">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Resource Target URL</label>
            <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-400 font-mono text-sm">
              http://internal-status.adt.university
            </div>
          </div>
          <button className="px-8 py-4 bg-slate-200 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-xs">
            Execute Probe (Disabled)
          </button>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-100">
          <p className="text-xs text-slate-400 text-center font-medium">
            System Node: ADT-PN-EDGE-04 | Status: Idle
          </p>
        </div>
      </div>
    </div>
  );
};

const Congratulations = () => {
  return (
    <div className="p-8 flex items-center justify-center min-h-[600px]">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card max-w-lg text-center p-12 border-2 border-mit-purple shadow-2xl"
      >
        <div className="w-20 h-20 bg-mit-purple text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-mit-purple mb-4">Congratulations!</h1>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          You have successfully identified and exploited all vulnerabilities in the ADT University Admin Panel simulation.
        </p>
        <div className="bg-slate-50 p-6 rounded-lg border border-border mb-8">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Lab Status</p>
          <p className="text-2xl font-black text-mit-orange">COMPLETED</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="btn w-full"
        >
          Restart Lab
        </button>
      </motion.div>
    </div>
  );
};

const LandingPage = ({ onNavigate }: { onNavigate: (page: Page) => void }) => {
  const heroPanels = [
    {
      eyebrow: 'The New Age University for',
      title: 'Innovation & Entrepreneurship',
      text: 'A future-focused campus environment built for innovators, creators, scientists, and leaders.',
    },
    {
      eyebrow: 'The pursuit of',
      title: 'Excellence Begins Here',
      text: 'Academic ambition, industry exposure, and a holistic learning culture come together on one campus.',
    },
    {
      eyebrow: 'Global Thinkers.',
      title: 'Future Engineers. Inspiring Minds.',
      text: 'Programs and student life designed to shape confident, ready-to-build graduates.',
    },
    {
      eyebrow: 'Building Careers.',
      title: 'Transforming Lives.',
      text: 'Placement-oriented learning and strong partnerships support long-term student success.',
    },
    {
      eyebrow: 'The University for',
      title: 'Holistic Development',
      text: 'Academic depth, discipline, creativity, and campus culture working together as one experience.',
    },
  ];

  const highlightCards = [
    { label: 'A Grade', value: 'NAAC Accredited MIT-ADT University', color: 'from-mit-purple to-mit-purple/70' },
    { label: 'Student', value: 'Your Success. Our Tradition.', color: 'from-mit-orange to-mit-orange/70' },
    { label: 'Alumni', value: 'One Purpose. One Mission. One Dream.', color: 'from-mit-green to-mit-green/70' },
    { label: 'Corporate', value: 'Hire Fresh Talent at MIT-ADT University', color: 'from-mit-cyan to-mit-cyan/70' },
  ];

  const statCards = [
    { value: '37+', label: 'Startups Incubated' },
    { value: '2.7+ Cr', label: 'External Funding' },
    { value: '1313+', label: 'Publications' },
  ];

  const newsCards = [
    'MIT ADT University Partners with Bentley Systems; Launches Centre of Excellence for Infrastructure Innovation',
    'MIT-ADT University Pune becomes first in Maharashtra to earn DASCA accreditation for AI and data science programmes',
    'Viksit Bharat requires collective responsibility, says Vandana Chavan at MIT-ADT national conference',
    'India Needs Semiconductor Self-Reliance, Says Dr Mangesh Karad at national seminar on semiconductor technology',
  ];

  const programCards = [
    { title: 'Engineering', items: ['B.Tech.', 'M.Tech.', 'M.Sc.', 'Integrated M.Tech.', 'PhD Programme'], link: 'https://mituniversity.ac.in/academics/faculty/faculty-of-engineering/MIT-School-of-Engineering-and-Sciences/programs-offered/' },
    { title: 'Design', items: ['Bachelor of Design', 'Master of Design', 'PG Diploma in Innovation', 'PhD in Design'], link: 'https://mituniversity.ac.in/academics/faculty/faculty-of-design/mit-institute-of-design/programs-offered/' },
    { title: 'Management', items: ['BBA', 'BCom', 'BCA', 'MBA', 'MCA', 'PhD Programs'], link: 'https://mituniversity.ac.in/academics/faculty/faculty-of-management-and-leadership/mit-college-of-management/programs-offered/' },
    { title: 'Architecture', items: ['B.Arch.', 'M.Arch – TIAKS', 'M.Plan', 'PhD Programs'], link: 'https://mituniversity.ac.in/academics/faculty/faculty-of-design-and-architecture/mit-school-of-architecture/programs-offered/' },
    { title: 'Vedic Science / Psychology', items: ['BSc Hons. Psychology', 'MSc (Clinical Psychology)', 'PhD Program'], link: 'https://mituniversity.ac.in/academics/faculty/faculty-of-humanities-and-social-sciences/mit-school-of-vedic-sciences/programs-offered/' },
    { title: 'Bio-Engineering', items: ['B.Tech.', 'Integrated M.Tech', 'MSc. (Industrial Biotechnology)', 'PhD'], link: 'https://mituniversity.ac.in/academics/faculty/faculty-of-technology/mit-school-of-bio-engineering-sciences-and-research/programs-offered/' },
    { title: 'Education & Research', items: ['Bachelor of Education', 'Master of Art', 'M.SC. e-Learning', 'PhD Programs'], link: 'https://mituniversity.ac.in/academics/faculty/faculty-of-humanities-and-social-sciences/mit-school-of-education-research/programs-offered' },
    { title: 'Film & Television', items: ['B. Sc. (Film Making)', 'M. Sc. (Film Making)', 'B.A. in Dramatics', 'Direction & Screenplay Writing'], link: 'https://mituniversity.ac.in/academics/faculty/faculty-of-art-fine-art-and-performing-art/mit-school-of-film-and-theatre/programs-offered/' },
    { title: 'Fine Arts & Applied Arts', items: ['BFA (Applied Arts)', 'MFA (Painting)', 'MFA (Sculpture)', 'MFA (Art Therapy)', 'PhD'], link: 'https://mituniversity.ac.in/academics/faculty/faculty-of-art-fine-art-and-performing-art/mit-school-of-fine-art-applied-art/programs-offered/' },
    { title: 'Food Technology', items: ['B. Tech.', 'M. Tech.', 'PhD'], link: 'https://mituniversity.ac.in/academics/faculty/faculty-of-technology/mit-college-of-food-technology/programs-offered/' },
    { title: 'Performing Arts', items: ['BPA - Dance/Vocal/Instrumental', 'MPA - Dance/Vocal/Instrumental'], link: 'https://mituniversity.ac.in/academics/faculty/faculty-of-art-fine-art-and-performing-art/mit-vishwashanti-sangeet-kala-academy/programs-offered/' },
    { title: 'Marine Engineering', items: ['B.Tech.', 'B.Sc. Nautical Science'], link: 'https://mituniversity.ac.in/academics/faculty/faculty-of-maritime-studies/maharashtra-academy-of-naval-education-training/programs-offered/' },
    { title: 'Law', items: ['BBA LL.B.', 'LL.B.', 'LL.M.', 'PG certificate programme', 'Ph.D. in Law Program'], link: 'https://mituniversity.ac.in/academics/faculty/faculty-of-law/MIT-School-of-Law/programs-offered/' },
    { title: 'Humanities', items: ['B.A. (Hons.) English', 'PhD in English'], link: 'https://mituniversity.ac.in/academics/faculty/faculty-of-humanities-and-social-sciences/mit-school-of-humanities/programs-offered/' },
    { title: 'Journalism', items: ['B.A. (Journalism & Mass Comm.)', 'M.A. (Journalism & Mass Comm.)', 'PhD'], link: 'https://mituniversity.ac.in/academics/faculty/faculty-of-art-fine-art-and-performing-art/mit-international-school-of-broadcasting-and-journalism/programs-offered/' },
  ];

  const alumniCards = [
    {
      name: 'Aishwarya Vaidya',
      text: 'The university helped me discover my own potential and gave me the confidence to pursue ambitious goals.',
    },
    {
      name: 'Manish Poojari',
      text: 'Staying connected with the university and its alumni community continues to open valuable opportunities.',
    },
    {
      name: 'Saurabh Bharam',
      text: 'The campus environment, faculty guidance, and opportunities for growth shaped my overall development.',
    },
    {
      name: 'Sharvari Deshpande',
      text: 'The alumni network creates a space for collaboration, shared learning, and meaningful contribution back to campus.',
    },
  ];

  const researchCards = [
    {
      title: 'Research, Innovation & Entrepreneurship',
      text: 'A strong ecosystem for intellectual property, industry collaboration, and student-led innovation projects.',
    },
    {
      title: 'Academic-Industry Interface',
      text: 'Research and development are aligned with real-world needs, enabling practical outcomes and useful technologies.',
    },
    {
      title: 'AIC-MIT-ADT Incubator Forum',
      text: 'An incubator-led environment that encourages entrepreneurship, design thinking, and new venture development.',
    },
    {
      title: 'Research Metrics',
      text: 'The ecosystem includes hundreds of copyrights, patents, designs, and research projects across disciplines.',
    },
  ];

  const campusHighlights = [
    'Healthcare Facility',
    'Sports Complex',
    'Hostel & Accommodation',
    'Cafeteria & Mess',
    'Transport Facility',
    'Auditoriums & Seminar Halls',
    'Girls Hostel',
    'RK Memorial',
  ];

  const awards = ['ARIIA Excellence', '5 Star Rating', 'Best University Campus', 'Top Private University'];

  return (
    <div className="bg-white">
      <section className="max-w-7xl mx-auto px-6 pt-8 pb-10">
        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-6 items-stretch">
          <div className="relative overflow-hidden rounded-[30px] min-h-[560px] bg-linear-to-br from-mit-purple via-mit-purple/95 to-mit-orange shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1600"
              alt="MIT ADT University campus"
              className="absolute inset-0 h-full w-full object-cover opacity-20"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10 h-full p-8 md:p-12 text-white flex flex-col justify-between">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.35em]">
                  New
                </span>
                <span className="text-[11px] uppercase tracking-[0.28em] text-white/75">MIT-ADT University</span>
              </div>

              <div className="space-y-7 max-w-3xl">
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.35em] text-white/70">The New Age University for</p>
                  <h1 className="text-4xl md:text-6xl font-black leading-tight">Innovation &amp; Entrepreneurship</h1>
                  <p className="text-base md:text-lg text-white/85 max-w-2xl leading-relaxed">
                    A campus experience shaped around innovation, creativity, industry relevance, and holistic growth.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {heroPanels.map((panel, index) => (
                    <div key={index} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                      <p className="text-[11px] uppercase tracking-[0.25em] text-white/65">{panel.eyebrow}</p>
                      <h2 className="mt-2 text-xl font-bold">{panel.title}</h2>
                      <p className="mt-2 text-sm text-white/80 leading-relaxed">{panel.text}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a href="https://www.mituniversity.ac.in/about-us" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-widest text-mit-purple shadow-lg transition hover:brightness-95">
                    View More
                    <ChevronRight className="h-4 w-4" />
                  </a>
                  <button onClick={() => onNavigate('staff')} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-black uppercase tracking-widest text-white backdrop-blur-sm transition hover:bg-white/20">
                    Staff Portal
                  </button>
                  <button onClick={() => onNavigate('submission')} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-white/10">
                    Flag Submission
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.3em] text-mit-purple mb-3">
                <span>Official Links</span>
                <span>MIT ADT</span>
              </div>
              <div className="space-y-2">
                {highlightCards.map((card) => (
                  <a key={card.label} href="#" className={`block rounded-2xl bg-gradient-to-r ${card.color} px-5 py-4 text-white shadow-sm transition hover:brightness-105`}>
                    <div className="text-[10px] font-black uppercase tracking-[0.35em] opacity-80">{card.label}</div>
                    <div className="mt-1 text-sm font-semibold leading-relaxed">{card.value}</div>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em] text-slate-700">
                <span className="h-2 w-2 rounded-full bg-mit-orange" />
                News &amp; Events
              </div>
              <div className="mt-4 space-y-3">
                {newsCards.slice(0, 3).map((item, index) => (
                  <div key={index} className="rounded-xl bg-white p-4 border border-slate-200">
                    <p className="text-sm font-semibold text-slate-800 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em] text-slate-700">
                <span className="h-2 w-2 rounded-full bg-mit-green" />
                Quick Snapshot
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-[1fr_1fr_1.25fr] gap-3">
                {statCards.map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-slate-50 p-4 min-h-[128px] text-center border border-slate-200 flex flex-col items-center justify-center">
                    <div className="text-xl sm:text-2xl font-black text-mit-purple leading-none whitespace-nowrap">{stat.value}</div>
                    <div className="mt-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] leading-snug text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-slate-600">
            {['Latest News', 'Important Announcement', 'Publications', 'Exam Announcement'].map((tab, index) => (
              <span key={tab} className={`rounded-full px-4 py-2 ${index === 0 ? 'bg-mit-purple text-white' : 'bg-slate-100'}`}>
                {tab}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.35em] text-mit-purple">Why MIT Art, Design &amp; Technology University Pune India?</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-black text-slate-900">A New Generation University for innovators, business leaders, scientists, social transformers, and nation builders.</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              The university follows a holistic approach to education, encouraging academic depth, discipline, communication, physical fitness, meditation, and creative participation across campus life.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              'Ranked in the Band Excellent for innovation and entrepreneurship',
              'Awarded for a lush green, carbon-neutral campus with sustainability initiatives',
              'Granted Atal Incubation Centre recognition under NITI Aayog',
              'Recognized among top private universities in engineering category',
              'World-class curriculum with project-based learning',
              'CRIEYA innovation and product development ecosystem',
            ].map((item, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-3 w-3 rounded-full bg-mit-orange" />
                  <p className="text-sm font-medium leading-relaxed text-slate-700">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.35em] text-mit-purple">Programs Offered</p>
              <h2 className="mt-2 text-3xl font-black text-slate-900">Academic pathways across multiple disciplines</h2>
            </div>
            <button onClick={() => onNavigate('academics')} className="inline-flex items-center gap-2 rounded-full border border-mit-purple px-5 py-2.5 text-sm font-bold text-mit-purple transition hover:bg-mit-purple hover:text-white">
              Explore Academics
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {programCards.map((program) => (
              <div key={program.title} className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-[11px] font-black uppercase tracking-[0.3em] text-mit-purple">{program.title}</div>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {program.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-mit-orange" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={program.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-700 transition hover:border-mit-purple hover:text-mit-purple">
                    Check Eligibility
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <a href="https://mituniversity.ac.in/2026/Apply_Now" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-mit-orange px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:brightness-110">
                    Apply Now
                    <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <div className="rounded-[28px] bg-linear-to-br from-mit-purple to-mit-orange p-8 text-white shadow-xl">
            <p className="text-[11px] font-black uppercase tracking-[0.35em] text-white/75">Impeccable Placements</p>
            <h2 className="mt-3 text-3xl font-black">A strong focus on career readiness and industry-aligned learning.</h2>
            <p className="mt-4 text-sm leading-7 text-white/85">
              The corporate relations and placements cell supports internships, recruitment drives, and professional development opportunities for students across schools.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { value: '1200+', label: 'Job Offers' },
                { value: '61+ LPA', label: 'Highest Package' },
                { value: '600+', label: 'Internship Offers' },
                { value: '500+', label: 'Major Recruiters' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-white/10 p-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-black">{item.value}</div>
                  <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-white/80">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {alumniCards.map((item) => (
              <div key={item.name} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-[11px] font-black uppercase tracking-[0.3em] text-mit-purple">Alumni Speaks</div>
                <h3 className="mt-3 text-lg font-bold text-slate-900">{item.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] items-start">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.35em] text-mit-purple">Research, Innovation &amp; Entrepreneurship</p>
              <h2 className="mt-2 text-3xl font-black text-slate-900">Built for research orientation, patents, incubation, and product development.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {researchCards.map((item) => (
                <div key={item.title} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-[0.35em] text-mit-purple">Campus Life</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">A campus beyond books, with culture, discipline, creativity, and community.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Students experience clubs, committees, sports, festivals, healthcare, transport, and modern student facilities throughout the year.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {campusHighlights.map((item) => (
                <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-700 border border-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] bg-linear-to-br from-mit-purple to-mit-orange p-8 text-white shadow-xl">
              <p className="text-[11px] font-black uppercase tracking-[0.35em] text-white/70">Awards</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {awards.map((item) => (
                  <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-[0.35em] text-mit-purple">Enquire Now</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Connect with admissions, academics, or student support to explore programs and campus opportunities.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button onClick={() => onNavigate('about')} className="rounded-full bg-mit-purple px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110">
                  About Us
                </button>
                <button onClick={() => onNavigate('academics')} className="rounded-full border border-mit-orange px-5 py-2.5 text-sm font-bold text-mit-orange transition hover:bg-mit-orange/5">
                  Academics
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-14 grid gap-8 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-black uppercase tracking-[0.25em] text-white">About Us</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              {['Leadership', 'Governance', 'Accreditations', 'Mandatory Disclosures', 'History', 'Contact Us'].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-[0.25em] text-white">Academics</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              {['Engineering', 'Design', 'Management', 'Architecture', 'Humanities', 'Law'].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-[0.25em] text-white">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              {['Admissions', 'Placement', 'Research', 'Life @ Campus', 'News', 'Alumni'].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-[0.25em] text-white">Our Initiatives</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              {['Atal Incubation Centre', 'Persona Fest', 'Convocation', 'Vishwanath Sports Meet', 'MIT Vishwajyoti International School'].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              <a href="https://www.facebook.com/mitadtuniversity" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">f</a>
              <a href="https://www.instagram.com/accounts/login/?next=/mitadtuniversity/" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">i</a>
              <a href="https://www.linkedin.com/school/mit-art-design-&-technology-university/" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">in</a>
              <a href="https://twitter.com/mitadtpune" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">x</a>
              <a href="https://www.youtube.com/c/MITADTUniversityPune" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">yt</a>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
        <a href="https://mituniversity.ac.in/#enquire_now" target="_blank" rel="noreferrer" className="rounded-full bg-mit-purple px-5 py-3 text-sm font-black uppercase tracking-widest text-white shadow-xl transition hover:brightness-110">
          Enquire Now
        </a>
        <a href="https://mituniversity.ac.in/apply-now/" target="_blank" rel="noreferrer" className="rounded-full bg-mit-orange px-5 py-3 text-sm font-black uppercase tracking-widest text-white shadow-xl transition hover:brightness-110">
          Apply Now
        </a>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="p-10 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card mb-8 border-2 border-mit-purple/20"
      >
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-mit-purple mb-4">About MIT ADT University</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            MIT Art, Design and Technology University (MIT ADT), located in Pune, Maharashtra, is a multidisciplinary private university known for its focus on innovation, creativity, and industry-oriented education.
          </p>
        </div>
      </motion.div>

      <div className="space-y-8">
        {[
          {
            title: "Overview",
            content: "Established as part of the MIT Group of Institutions, MIT ADT bridges the gap between academic learning and real-world application by integrating practical exposure into its curriculum. The university aims to foster innovation and creativity while maintaining academic excellence.",
            icon: BookOpen,
            color: 'text-mit-cyan'
          },
          {
            title: "Academic Excellence",
            content: "MIT ADT has built a strong reputation for combining technology with design, arts, and management. It offers a wide range of undergraduate, postgraduate, and doctoral programs across multiple disciplines including engineering, design, management, fine arts, and film & media. The academic structure emphasizes experiential learning, encouraging students to participate in projects, research, and industry collaborations through workshops, labs, and interdisciplinary programs.",
            icon: GraduationCap,
            color: 'text-mit-purple'
          },
          {
            title: "Campus & Environment",
            content: "The campus in Pune provides a modern and dynamic learning environment with well-equipped laboratories, design studios, and collaborative spaces. Students are encouraged to engage in extracurricular activities, cultural events, and entrepreneurship initiatives, contributing to their overall personal and professional growth.",
            icon: Building2,
            color: 'text-mit-orange'
          },
          {
            title: "Vision & Development",
            content: "MIT ADT University focuses on holistic development, ensuring that students not only gain academic knowledge but also build leadership, communication, and problem-solving abilities. With a strong emphasis on industry readiness, the university prepares students to adapt to evolving global challenges and career opportunities through its commitment to quality education and innovation.",
            icon: Target,
            color: 'text-mit-green'
          }
        ].map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="card hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                <section.icon className={`${section.color} w-6 h-6`} />
              </div>
              <div className="grow">
                <h2 className="text-xl font-bold text-slate-800 mb-3">{section.title}</h2>
                <p className="text-slate-600 leading-relaxed">{section.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 p-8 bg-gradient-to-r from-mit-purple/10 to-mit-orange/10 rounded-lg border border-mit-purple/20"
      >
        <h3 className="text-2xl font-bold text-mit-purple mb-4">Ready to Join Us?</h3>
        <p className="text-slate-600 mb-6 leading-relaxed">
          MIT ADT University continues to nurture future-ready professionals equipped with the skills required in today's competitive world. Whether you're interested in pursuing your passion for technology, design, or management, we have the right program for you.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-mit-purple text-white px-6 py-2 rounded font-semibold text-sm hover:brightness-110 transition-all shadow-md">
            Admissions
          </button>
          <button className="border-2 border-mit-orange text-mit-orange px-6 py-2 rounded font-semibold text-sm hover:bg-mit-orange/5 transition-all">
            Learn More
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const AcademicsPage = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<string>('design');

  const faculties = [
    {
      id: 'design',
      name: 'Faculty of Design',
      description: "MAER's MIT Institute of Design started its operations in August 2006, guided by the leading minds in Indian design education, with a plan to develop its identity as a research & training institution of highest international quality.",
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=500',
      programs: [
        { name: 'Institute of Design (IOD)', icon: '🎨' }
      ],
      details: {
        overview: "The Faculty of Design focuses on combining technology with creative thinking to develop innovative solutions for real-world problems.",
        advantages: [
          "Hands-on design studio experience",
          "Industry collaboration and internships",
          "Research opportunities in emerging design fields",
          "International exchange programs",
          "Mentorship from renowned design professionals"
        ]
      }
    },
    {
      id: 'art',
      name: 'Faculty of Art, Fine Art and Performing Art',
      description: "The faculty of Art, Fine Art & Applied Art was formulated with an aim to form an amalgamation of various forms of art. We have meticulously chosen programs from a wide spectrum of Art such as music, dance, filmmaking and television techniques.",
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=500',
      programs: [
        { name: 'Vishwashanti Sangeet Kala Academy (VSKA)', icon: '🎵' },
        { name: 'School of Fine Arts and Applied Arts (SOFA)', icon: '🖼️' }
      ],
      details: {
        overview: "Explore various forms of artistic expression including music, dance, visual arts, and film production.",
        advantages: [
          "State-of-the-art performance and recording facilities",
          "Guidance from internationally acclaimed artists",
          "Regular exhibitions and performances",
          "Industry connections in media and entertainment",
          "Opportunities for cultural exchange"
        ]
      }
    },
    {
      id: 'engineering',
      name: 'Faculty of Engineering',
      description: "Combining cutting-edge technology with practical application, our engineering programs prepare students to solve real-world challenges through innovation and critical thinking.",
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=500',
      programs: [
        { name: 'School of Computer Science & Engineering', icon: '💻' },
        { name: 'School of Mechanical Engineering', icon: '⚙️' }
      ],
      details: {
        overview: "Advanced engineering education with focus on emerging technologies and sustainable solutions.",
        advantages: [
          "Advanced laboratories and maker spaces",
          "Industry partnerships with leading companies",
          "Research opportunities in AI, IoT, and robotics",
          "Global internship programs",
          "Placement support with top tech companies"
        ]
      }
    },
    {
      id: 'management',
      name: 'Faculty of Management',
      description: "Developing future leaders through rigorous management education that combines theoretical knowledge with practical business acumen.",
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=500',
      programs: [
        { name: 'School of Business Administration', icon: '📊' },
        { name: 'School of Entrepreneurship', icon: '🚀' }
      ],
      details: {
        overview: "Comprehensive management education preparing students for corporate leadership and entrepreneurship.",
        advantages: [
          "Case study-based learning methodology",
          "Executive mentorship programs",
          "Business incubation support",
          "International business exposure",
          "Strong alumni network in leading companies"
        ]
      }
    }
  ];

  const currentFaculty = faculties.find(f => f.id === selectedFaculty) || faculties[0];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-mit-purple via-mit-orange to-mit-orange relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" 
            alt="background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative px-8 py-12 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Academics</h1>
          <p className="text-white/80 text-lg max-w-2xl">Explore our diverse range of programs across multiple disciplines</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 p-8 max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="lg:w-72 shrink-0">
          <div className="sticky top-8">
            <div className="bg-mit-purple text-white px-6 py-4 rounded-lg mb-4">
              <h3 className="font-bold text-lg">Programs</h3>
            </div>
            
            <div className="space-y-2">
              {faculties.map((faculty) => (
                <button
                  key={faculty.id}
                  onClick={() => setSelectedFaculty(faculty.id)}
                  className={`w-full text-left px-6 py-4 rounded-lg font-semibold text-sm transition-all border-l-4 ${
                    selectedFaculty === faculty.id
                      ? 'bg-mit-purple/10 text-mit-purple border-mit-purple'
                      : 'text-slate-700 border-transparent hover:bg-slate-50 bg-white'
                  }`}
                >
                  {faculty.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1">
          <motion.div
            key={selectedFaculty}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch bg-gradient-to-r from-mit-orange to-mit-orange/80 rounded-lg overflow-hidden shadow-lg">
              {/* Image */}
              <div className="h-full min-h-[350px] overflow-hidden">
                <img 
                  src={currentFaculty.image} 
                  alt={currentFaculty.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-between text-white">
                <div>
                  <h2 className="text-3xl font-bold mb-6">{currentFaculty.name}</h2>
                  <p className="text-lg leading-relaxed mb-8 text-white/90">
                    {currentFaculty.description}
                  </p>
                </div>

                {/* Programs Box */}
                <div className="bg-white rounded-lg p-6 text-slate-800">
                  <div className="space-y-4">
                    {currentFaculty.programs.map((program, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="text-2xl">{program.icon}</div>
                        <div>
                          <p className="font-semibold text-mit-purple">{program.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-6 bg-mit-orange text-white py-2.5 px-4 rounded-full font-bold hover:brightness-110 transition-all">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Overview */}
              <div className="card">
                <h3 className="text-2xl font-bold text-mit-purple mb-4">Overview</h3>
                <p className="text-slate-600 leading-relaxed">
                  {currentFaculty.details.overview}
                </p>
              </div>

              {/* Key Statistics */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Programs Offered', value: currentFaculty.programs.length },
                  { label: 'Faculty Members', value: '50+' },
                  { label: 'Active Students', value: '2000+' },
                  { label: 'Industry Partners', value: '100+' }
                ].map((stat, idx) => (
                  <div key={idx} className="card bg-gradient-to-br from-mit-purple/10 to-mit-orange/10 border-2 border-mit-purple/20">
                    <p className="text-3xl font-bold text-mit-purple">{stat.value}</p>
                    <p className="text-sm text-slate-600 mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Advantages */}
            <div className="card">
              <h3 className="text-2xl font-bold text-mit-purple mb-8">Why Choose This Faculty?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentFaculty.details.advantages.map((advantage, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-mit-orange/20 flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 className="w-4 h-4 text-mit-orange" />
                    </div>
                    <p className="text-slate-700 font-medium">{advantage}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-mit-purple to-mit-orange rounded-lg p-8 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Ready to Join?</h3>
                  <p className="text-white/80 mb-6">
                    Start your journey with us today. Explore career opportunities and take the first step towards your future.
                  </p>
                </div>
                <div className="flex gap-4 lg:justify-end">
                  <button className="bg-white text-mit-purple px-8 py-3 rounded-full font-bold hover:brightness-95 transition-all shadow-lg">
                    Enquire Now
                  </button>
                  <button className="bg-mit-cyan text-white px-8 py-3 rounded-full font-bold hover:brightness-110 transition-all shadow-lg">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// AdminPanel has been moved to src/AdminPanel.tsx

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<string | null>(null);
  const [solved, setSolved] = useState<SolvedState>({
    ssrf: false,
    robots: false,
    'hidden-api': false,
    'student-delete': false,
    'ssrf-delete': false
  });

  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname.replace(/\/$/, '') || '/';
      if (path === '/admin') {
        setCurrentPage('hidden-admin');
      } else if (path === '/staff-portal') {
        setCurrentPage('admin');
      } else if (path === '/staff') {
        setCurrentPage('staff');
      } else if (path === '/submission') {
        setCurrentPage('submission');
      } else if (path === '/about') {
        setCurrentPage('about');
      } else if (path === '/academics') {
        setCurrentPage('academics');
      } else if (path === '/diagnostic') {
        setCurrentPage('diagnostic');
      } else if (path === '/login') {
        setCurrentPage('login');
      } else if (path === '/profile') {
        setCurrentPage('profile');
      } else {
        setCurrentPage('landing');
      }
    };

    // Initial check
    handleLocation();

    // Listen for back/forward buttons
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    const path = page === 'landing' ? '/' : `/${page}`;
    window.history.pushState({}, '', path);
  };

  const handleLogin = (username: string) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('landing');
  };

  const handleSolve = (vuln: keyof SolvedState) => {
    setSolved(prev => ({ ...prev, [vuln]: true }));
  };

  const isAllSolved = Object.values(solved).every(v => v === true);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header onNavigate={navigate} currentPage={currentPage} user={user} />
      
      <div className="flex grow overflow-hidden">
        <Sidebar onNavigate={navigate} currentPage={currentPage} />
        
        <main className="grow overflow-y-auto bg-bg p-8 min-h-screen">
          <div className="mb-4 p-2 bg-slate-100 text-[10px] font-mono text-slate-400 uppercase tracking-widest border-b border-slate-200">
            System Console Active | Node: ADT-SEC-01
          </div>
          {isAllSolved ? (
            <Congratulations />
          ) : currentPage === 'landing' ? (
            <LandingPage onNavigate={navigate} />
          ) : currentPage === 'about' ? (
            <AboutPageNew />
          ) : currentPage === 'academics' ? (
            <AcademicsPageNew />
          ) : currentPage === 'staff' ? (
            <StaffPage />
          ) : currentPage === 'login' ? (
            <LoginPage onLogin={handleLogin} onNavigate={navigate} />
          ) : currentPage === 'profile' ? (
            user ? <ProfilePage user={user} onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} onNavigate={navigate} />
          ) : currentPage === 'hidden-admin' ? (
            <AdminHiddenPage />
          ) : currentPage === 'diagnostic' ? (
            <PublicDiagnosticTool />
          ) : currentPage === 'admin' ? (
            <AdminPanel onDeleteAttempt={() => {}} />
          ) : (
            <SubmissionPanel solved={solved} onSolve={handleSolve} />
          )}
        </main>
      </div>
    </div>
  );
}
