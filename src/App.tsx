import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import mitLogo from '../images/mit_adt_logo.png?url';
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

type Page = 'landing' | 'admin' | 'submission' | 'about' | 'academics';

interface SolvedState {
  ssrf: boolean;
  robots: boolean;
  'hidden-api': boolean;
}

// --- Components ---

const Header = ({ onNavigate, currentPage }: { onNavigate: (page: Page) => void, currentPage: Page }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Colorful Top Accent Bar */}
      <div className="h-2 flex w-full">
        <div className="h-full w-1/4 bg-mit-red" />
        <div className="h-full w-1/4 bg-mit-orange" />
        <div className="h-full w-1/4 bg-mit-green" />
        <div className="h-full w-1/4 bg-mit-cyan" />
      </div>

      {/* Main Header */}
      <header className="bg-mit-purple text-white px-8 py-0">
        <div className="max-w-7xl mx-auto">
          {/* Top Row: Logo, Branding, and Top Right Links */}
          <div className="flex items-center justify-between mb-0">
            {/* Logo Only */}
            <div className="flex items-center cursor-pointer" onClick={() => onNavigate('landing')}>
              <div className="w-64 h-30 flex items-center justify-center flex-shrink-0 py-5">
                <img 
                  src={mitLogo}
                  alt="MIT ADT Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Top Right: Quick Links and Buttons */}
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-1.5">
                <button className="bg-mit-cyan text-white px-4 py-1.5 rounded text-[12px] font-bold uppercase tracking-wider hover:brightness-110 transition-all">VC-SMS</button>
                <button className="bg-mit-orange text-white px-4 py-1.5 rounded text-[12px] font-bold uppercase tracking-wider hover:brightness-110 transition-all">ODL / OL</button>
                <button className="bg-mit-green text-white px-4 py-1.5 rounded text-[12px] font-bold uppercase tracking-wider hover:brightness-110 transition-all">Login</button>
                <button className="bg-mit-red text-white px-4 py-1.5 rounded text-[12px] font-bold uppercase tracking-wider hover:brightness-110 transition-all">Life @ Campus</button>
                <button className="bg-mit-cyan text-white px-4 py-1.5 rounded text-[12px] font-bold uppercase tracking-wider hover:brightness-110 transition-all">Contact Us</button>
              </div>
              {/* Secondary Links */}
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

          {/* Divider Line */}
          <div className="h-px bg-white/20 my-0"></div>

          {/* Social Icons and Main Navigation */}
          <div className="flex items-center justify-between">
            {/* Main Navigation */}
            <nav className="flex gap-8 items-center">
              <button 
                onClick={() => onNavigate('landing')}
                className={`text-sm font-bold uppercase tracking-widest transition-all py-2 border-b-2 ${currentPage === 'landing' ? 'border-mit-orange text-mit-orange' : 'border-transparent text-white hover:text-mit-orange'}`}
              >
                Home
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className={`text-sm font-bold uppercase tracking-widest transition-all py-2 border-b-2 ${currentPage === 'about' ? 'border-mit-orange text-mit-orange' : 'border-transparent text-white hover:text-mit-orange'}`}
              >
                About Us
              </button>
              <button 
                onClick={() => onNavigate('academics')}
                className={`text-sm font-bold uppercase tracking-widest transition-all py-2 border-b-2 ${currentPage === 'academics' ? 'border-mit-orange text-mit-orange' : 'border-transparent text-white hover:text-mit-orange'}`}
              >
                Academics
              </button>
              <button 
                onClick={() => onNavigate('admin')}
                className={`text-sm font-bold uppercase tracking-widest transition-all py-2 border-b-2 ${currentPage === 'admin' ? 'border-mit-orange text-mit-orange' : 'border-transparent text-white hover:text-mit-orange'}`}
              >
                System Console
              </button>
              <button 
                onClick={() => onNavigate('submission')}
                className={`text-sm font-bold uppercase tracking-widest transition-all py-2 border-b-2 ${currentPage === 'submission' ? 'border-mit-orange text-mit-orange' : 'border-transparent text-white hover:text-mit-orange'}`}
              >
                Flag Submission
              </button>
            </nav>

            {/* Social Media Icons */}
            <div className="flex gap-3 items-center">
              <a href="#" className="w-9 h-9 bg-white text-mit-purple rounded-full flex items-center justify-center hover:brightness-95 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 bg-white text-mit-purple rounded-full flex items-center justify-center hover:brightness-95 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 bg-white text-mit-purple rounded-full flex items-center justify-center hover:brightness-95 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 bg-white text-mit-purple rounded-full flex items-center justify-center hover:brightness-95 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 bg-white text-mit-purple rounded-full flex items-center justify-center hover:brightness-95 transition-all">
                <Youtube className="w-5 h-5" />
              </a>
              <Search className="w-6 h-6 text-white cursor-pointer hover:text-mit-orange transition" />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

const Sidebar = ({ onNavigate, currentPage }: { onNavigate: (page: Page) => void, currentPage: Page }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard, page: 'admin' as Page },
    { id: 'records', label: 'Student Records', icon: FileText, page: 'admin' as Page },
    { id: 'catalog', label: 'Course Catalog', icon: Database, page: 'admin' as Page },
    { id: 'diagnostic', label: 'External Diagnostic Tool', icon: Terminal, page: 'admin' as Page },
    { id: 'submission', label: 'Flag Submission', icon: Shield, page: 'submission' as Page },
    { id: 'backups', label: 'System Backups', icon: History, page: 'admin' as Page },
    { id: 'api', label: 'API Configuration', icon: Settings, page: 'admin' as Page },
    { id: 'audit', label: 'Audit Logs', icon: Activity, page: 'admin' as Page },
  ];

  return (
    <aside className="w-64 bg-white border-r border-border py-8 flex flex-col gap-1 shrink-0 h-full overflow-y-auto shadow-sm">
      <div className="px-6 mb-6">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Management</p>
      </div>
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.page)}
          className={`px-6 py-3.5 flex items-center gap-3 text-sm font-semibold border-r-4 transition-all ${
            currentPage === item.page && (item.id === 'diagnostic' || item.id === 'submission')
              ? 'bg-mit-purple/5 text-mit-purple border-mit-purple'
              : 'text-slate-600 border-transparent hover:bg-slate-50'
          }`}
        >
          <item.icon className={`w-4 h-4 ${currentPage === item.page && (item.id === 'diagnostic' || item.id === 'submission') ? 'text-mit-purple' : 'text-slate-400'}`} />
          {item.label}
        </button>
      ))}
    </aside>
  );
};

const SubmissionPanel = ({ solved, onSolve }: { solved: SolvedState, onSolve: (vuln: keyof SolvedState) => void }) => {
  const [selectedVuln, setSelectedVuln] = useState<string>('ssrf');
  const [flag, setFlag] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/submit-flag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vulnerability: selectedVuln, flag })
      });
      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        onSolve(selectedVuln as keyof SolvedState);
        setFlag('');
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Connection failed. Is the server running?' });
    } finally {
      setLoading(false);
    }
  };

  const vulnerabilities = [
    { id: 'ssrf', label: 'SSRF (Server-Side Request Forgery)' },
    { id: 'robots', label: 'robots.txt Information Disclosure' },
    { id: 'hidden-api', label: 'Hidden API Endpoint' },
    { id: 'xss', label: 'Cross-Site Scripting (Dummy)' },
    { id: 'sqli', label: 'SQL Injection (Dummy)' },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="card">
        <div className="card-title">
          <Shield className="w-4 h-4 text-mit-purple" />
          Flag Submission Panel
        </div>
        <p className="text-[13px] text-text-muted mb-8 leading-relaxed">
          Found a flag? Select the vulnerability category and enter the flag string below to validate your solution and track your progress.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="label">Vulnerability Category</label>
              <select 
                value={selectedVuln}
                onChange={(e) => setSelectedVuln(e.target.value)}
                className="input bg-white"
              >
                {vulnerabilities.map(v => (
                  <option key={v.id} value={v.id}>{v.label}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="label">Flag String</label>
              <input 
                type="text"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                placeholder="FLAG{lab-xxxx-xxxx-xxxx-xxxx}"
                className="input"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="btn"
          >
            {loading ? 'Validating...' : 'Submit Flag'}
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

        <div className="mt-12">
          <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Lab Progress</h3>
          <div className="space-y-3">
            {vulnerabilities.filter(v => !v.label.includes('Dummy')).map(v => (
              <div key={v.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-md border border-border">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${solved[v.id as keyof SolvedState] ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                  <span className="text-sm font-semibold text-slate-700">{v.label}</span>
                </div>
                {solved[v.id as keyof SolvedState] ? (
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-100 px-2 py-1 rounded">Solved</span>
                ) : (
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-200 px-2 py-1 rounded">Pending</span>
                )}
              </div>
            ))}
          </div>
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
  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="card mb-10 overflow-hidden relative min-h-[400px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200" 
            alt="University Campus" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-mit-purple via-mit-purple/80 to-mit-orange/40" />
        </div>
        <div className="relative z-10 p-10 text-white">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-mit-orange text-white font-bold uppercase tracking-widest text-[10px] px-3 py-1 rounded mb-4">
              Global Thinkers
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Future Engineers. <br />
              <span className="text-mit-cyan">Inspiring Minds.</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
              ADT University provides world-class education and research opportunities in the heart of the digital age. Join our community of scholars and innovators.
            </p>
            <div className="flex gap-4">
              <button className="bg-mit-purple text-white px-8 py-3 rounded font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-lg">
                View More
              </button>
              <button 
                onClick={() => onNavigate('admin')}
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition-all"
              >
                Staff Portal
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Academic Rigor", desc: "Consistently ranked among the top 1% of universities globally.", icon: Shield, color: 'text-mit-purple' },
          { title: "Global Network", desc: "Connect with over 500,000 alumni across 120 countries.", icon: Globe, color: 'text-mit-orange' },
          { title: "Future Ready", desc: "Curriculum designed in partnership with industry leaders.", icon: Server, color: 'text-mit-green' }
        ].map((f, i) => (
          <div key={i} className="card hover:shadow-md transition-shadow group">
            <div className={`w-12 h-12 bg-slate-50 flex items-center justify-center rounded-lg mb-5 group-hover:scale-110 transition-transform`}>
              <f.icon className={`${f.color} w-6 h-6`} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-3">{f.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
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
            icon: Globe,
            color: 'text-mit-cyan'
          },
          {
            title: "Academic Excellence",
            content: "MIT ADT has built a strong reputation for combining technology with design, arts, and management. It offers a wide range of undergraduate, postgraduate, and doctoral programs across multiple disciplines including engineering, design, management, fine arts, and film & media. The academic structure emphasizes experiential learning, encouraging students to participate in projects, research, and industry collaborations through workshops, labs, and interdisciplinary programs.",
            icon: Shield,
            color: 'text-mit-purple'
          },
          {
            title: "Campus & Environment",
            content: "The campus in Pune provides a modern and dynamic learning environment with well-equipped laboratories, design studios, and collaborative spaces. Students are encouraged to engage in extracurricular activities, cultural events, and entrepreneurship initiatives, contributing to their overall personal and professional growth.",
            icon: Server,
            color: 'text-mit-orange'
          },
          {
            title: "Vision & Development",
            content: "MIT ADT University focuses on holistic development, ensuring that students not only gain academic knowledge but also build leadership, communication, and problem-solving abilities. With a strong emphasis on industry readiness, the university prepares students to adapt to evolving global challenges and career opportunities through its commitment to quality education and innovation.",
            icon: CheckCircle2,
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

const AdminPanel = () => {
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [systemStatus, setSystemStatus] = useState<any>(null);

  useEffect(() => {
    fetch('/api/status')
      .then(res => res.json())
      .then(data => setSystemStatus(data))
      .catch(() => {});
  }, []);

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      
      const data = await res.text();
      setResponse(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
      <div className="card">
        <div className="card-title">
          <Terminal className="w-4 h-4 text-mit-purple" />
          Resource Status Fetcher
        </div>
        <p className="text-[13px] text-text-muted mb-6 leading-relaxed">
          Enter a remote URL to test server-side connectivity and fetch system metadata. This utility is restricted to authorized university administrators.
        </p>

        <form onSubmit={handleFetch} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="label">Target Resource URL</label>
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="http://status.adt-university.internal/health-check"
              className="input"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="btn self-start"
          >
            {loading ? 'Fetching...' : 'Fetch Status'}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-md flex items-start gap-3">
            <AlertCircle className="text-red-500 w-4 h-4 shrink-0 mt-0.5" />
            <div className="text-xs text-red-600 font-medium">{error}</div>
          </div>
        )}

        {response && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <label className="label">Server Response</label>
              <div className="text-[10px] font-bold text-green-600 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                SUCCESS
              </div>
            </div>
            <div className="bg-slate-50 border border-border rounded-md p-4 font-mono text-[12px] text-text-muted whitespace-pre-wrap overflow-x-auto max-h-[400px]">
              <div dangerouslySetInnerHTML={{ __html: response }} />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <div className="card">
          <div className="card-title">
            <Server className="w-4 h-4 text-mit-purple" />
            Server Infrastructure
          </div>
          <div className="flex flex-col">
            {[
              { label: 'Database Cluster', status: 'Online' },
              { label: 'User Auth Service', status: 'Online' },
              { label: 'CDN Node (US-East)', status: 'Online' },
              { label: 'Backup Storage', status: 'Syncing', badge: true },
            ].map((item, i) => (
              <div key={i} className="flex justify-between py-3 border-b border-border last:border-0 text-[13px]">
                <span>{item.label}</span>
                <span className="flex items-center gap-2">
                  {item.badge ? (
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[11px] font-semibold">{item.status}</span>
                  ) : (
                    <>
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      {item.status}
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">
            <Activity className="w-4 h-4 text-mit-purple" />
            Quick Actions
          </div>
          <div className="grid grid-cols-2 gap-2">
            {['Clear Cache', 'Rotate Keys', 'Export Data', 'Halt System'].map((action) => (
              <button 
                key={action}
                className={`p-3 border border-border rounded-md text-[11px] font-medium text-center hover:bg-slate-50 transition-colors ${action === 'Halt System' ? 'text-red-600' : ''}`}
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        <div className="card bg-mit-purple text-white border-none shadow-lg">
          <div className="card-title text-white">
            <Shield className="w-4 h-4 text-mit-orange" />
            Lab Instructions
          </div>
          <ul className="space-y-3 text-[11px] opacity-90 leading-relaxed">
            <li className="flex gap-2">
              <span className="font-bold text-mit-orange">01.</span>
              <span>Identify the SSRF vulnerability in the resource fetcher.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-mit-orange">02.</span>
              <span>Attempt to access internal services (e.g., localhost).</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-mit-orange">03.</span>
              <span>Find the hidden admin panel and extract the flag.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [solved, setSolved] = useState<SolvedState>({
    ssrf: false,
    robots: false,
    'hidden-api': false
  });

  const handleSolve = (vuln: keyof SolvedState) => {
    setSolved(prev => ({ ...prev, [vuln]: true }));
  };

  const isAllSolved = Object.values(solved).every(v => v === true);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      
      <div className="flex grow mt-[160px] h-[calc(100vh-300px)] overflow-hidden">
        <Sidebar onNavigate={setCurrentPage} currentPage={currentPage} />
        
        <main className="grow overflow-y-auto bg-bg">
          <AnimatePresence mode="wait">
            {isAllSolved ? (
              <motion.div
                key="congrats"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Congratulations />
              </motion.div>
            ) : currentPage === 'landing' ? (
              <motion.div
                key="landing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <LandingPage onNavigate={setCurrentPage} />
              </motion.div>
            ) : currentPage === 'about' ? (
              <motion.div
                key="about"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AboutPage />
              </motion.div>
            ) : currentPage === 'academics' ? (
              <motion.div
                key="academics"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AcademicsPage />
              </motion.div>
            ) : currentPage === 'admin' ? (
              <motion.div
                key="admin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AdminPanel />
              </motion.div>
            ) : (
              <motion.div
                key="submission"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SubmissionPanel solved={solved} onSolve={handleSolve} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
