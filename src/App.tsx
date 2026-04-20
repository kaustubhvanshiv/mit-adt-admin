import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Activity
} from 'lucide-react';

// --- Types ---

type Page = 'landing' | 'admin' | 'submission';

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
      <div className="h-1.5 flex w-full">
        <div className="h-full w-1/4 bg-mit-red" />
        <div className="h-full w-1/4 bg-mit-orange" />
        <div className="h-full w-1/4 bg-mit-green" />
        <div className="h-full w-1/4 bg-mit-cyan" />
      </div>
      
      <header className="h-20 bg-mit-purple flex items-center justify-between px-6 text-white border-b border-white/10 shrink-0 shadow-lg">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 shadow-inner">
            <Shield className="text-mit-purple w-8 h-8" />
          </div>
          <div>
            <div className="font-bold text-lg leading-none tracking-tight">MIT-ADT UNIVERSITY</div>
            <div className="text-[10px] text-white/70 uppercase tracking-[0.2em] mt-1">Pune, India</div>
          </div>
        </div>
        
        <nav className="hidden lg:flex gap-8 items-center">
          <button 
            onClick={() => onNavigate('landing')}
            className={`text-xs font-bold uppercase tracking-widest transition-all hover:text-mit-orange ${currentPage === 'landing' ? 'text-mit-orange' : 'text-white'}`}
          >
            Home
          </button>
          <button className="text-xs font-bold uppercase tracking-widest text-white hover:text-mit-orange transition-all">About Us</button>
          <button className="text-xs font-bold uppercase tracking-widest text-white hover:text-mit-orange transition-all">Academics</button>
          <button 
            onClick={() => onNavigate('admin')}
            className={`text-xs font-bold uppercase tracking-widest transition-all hover:text-mit-orange ${currentPage === 'admin' ? 'text-mit-orange' : 'text-white'}`}
          >
            System Console
          </button>
          <button 
            onClick={() => onNavigate('submission')}
            className={`text-xs font-bold uppercase tracking-widest transition-all hover:text-mit-orange ${currentPage === 'submission' ? 'text-mit-orange' : 'text-white'}`}
          >
            Flag Submission
          </button>
          
          <div className="flex gap-2 ml-4">
            <button className="bg-mit-cyan text-white px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider hover:brightness-110 transition-all">VC-SMS</button>
            <button className="bg-mit-orange text-white px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider hover:brightness-110 transition-all">Login</button>
            <button className="bg-mit-green text-white px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider hover:brightness-110 transition-all">Contact</button>
          </div>
        </nav>
        
        <div className="lg:hidden">
          <Menu className="w-6 h-6" />
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
      
      <div className="flex grow mt-[86px] h-[calc(100vh-86px)] overflow-hidden">
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
