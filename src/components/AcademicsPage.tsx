import React, { useState } from 'react';
import { BookOpen, Code, PenTool, BarChart, Microscope, Briefcase, Globe } from 'lucide-react';
import { motion } from 'motion/react';

const AcademicsPage: React.FC = () => {
  const [proxyUrl, setProxyUrl] = useState('http://localhost:3000/api/status');
  const [proxyResult, setProxyResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleProxyCheck = async () => {
    setLoading(true);
    setProxyResult(null);
    try {
      const res = await fetch('/api/fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: proxyUrl })
      });
      const data = await res.text();
      setProxyResult(data);
    } catch (err) {
      setProxyResult('Error: Failed to connect to proxy service.');
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    {
      title: 'School of Engineering',
      icon: Code,
      color: 'bg-mit-purple',
      desc: 'Advancing technical excellence through research-oriented engineering programs.'
    },
    {
      title: 'Institute of Design',
      icon: PenTool,
      color: 'bg-mit-orange',
      desc: 'Nurturing creative minds to solve complex problems through human-centric design.'
    },
    {
      title: 'College of Management',
      icon: BarChart,
      color: 'bg-mit-green',
      desc: 'Developing future leaders with a focus on innovation and entrepreneurship.'
    },
    {
      title: 'Bio-Engineering',
      icon: Microscope,
      color: 'bg-mit-cyan',
      desc: 'Bridging the gap between biology and technology for a better tomorrow.'
    },
    {
      title: 'Maritime Studies',
      icon: Briefcase,
      color: 'bg-mit-red',
      desc: 'World-class training for the next generation of maritime professionals.'
    },
    {
      title: 'Humanities & Social Sciences',
      icon: BookOpen,
      color: 'bg-slate-700',
      desc: 'Exploring the human experience through critical thinking and diverse perspectives.'
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col items-center text-center space-y-4">
        <span className="px-4 py-1.5 bg-mit-purple/10 text-mit-purple rounded-full text-xs font-black uppercase tracking-[0.2em]">Academic Excellence</span>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Our Academic Ecosystem</h1>
        <p className="text-text-muted max-w-2xl font-medium">
          A multi-disciplinary approach to learning that prepares students for the challenges of the 21st century.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Academic Proxy Tool (Vulnerable to SSRF) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card border-2 border-mit-orange/20 bg-mit-orange/5"
        >
          <div className="w-12 h-12 bg-mit-orange text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-3">Library Resource Proxy</h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">
            Access internal academic journals and check seat availability in the Central Library.
          </p>
          <div className="space-y-3">
            <input 
              type="text" 
              value={proxyUrl}
              onChange={(e) => setProxyUrl(e.target.value)}
              className="input bg-white"
              placeholder="http://library.internal"
            />
            <button 
              onClick={handleProxyCheck}
              disabled={loading}
              className="btn !bg-mit-orange hover:!bg-mit-orange/90 w-full"
            >
              {loading ? 'Fetching...' : 'Check Availability'}
            </button>
          </div>
          
          {loading && (
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-mit-orange animate-pulse"></span>
              Fetching resource...
            </div>
          )}
          {proxyResult !== null && !loading && (
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 font-mono">
              ✓ Response received. Intercept traffic in Burp Suite to inspect payload.
            </div>
          )}
        </motion.div>

        {departments.map((dept, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card group hover:-translate-y-2 transition-all duration-300"
          >
            <div className={`w-12 h-12 ${dept.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
              <dept.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3">{dept.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              {dept.desc}
            </p>
            <button className="text-sm font-bold text-mit-purple flex items-center gap-2 group-hover:gap-3 transition-all">
              Learn More 
              <span className="text-lg">→</span>
            </button>
          </motion.div>
        ))}
      </div>

      <div className="card !bg-slate-900 text-white p-12 text-center space-y-6">
        <h2 className="text-3xl font-black">Ready to Start Your Journey?</h2>
        <p className="text-white/60 max-w-xl mx-auto">
          Admissions are now open for the academic year 2026-27. Join thousands of students shaping the future.
        </p>
        <button className="btn !bg-mit-orange hover:!bg-mit-orange/90 !text-white px-10 py-4 text-base rounded-full">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default AcademicsPage;
