import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Award, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfilePageProps {
  user: string;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout }) => {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="card overflow-hidden !p-0">
        <div className="h-32 bg-linear-to-r from-mit-purple to-mit-orange"></div>
        <div className="px-8 pb-8 -mt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-lg">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user}`} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left mb-2">
                <h1 className="text-3xl font-black text-slate-900 capitalize">{user}</h1>
                <p className="text-mit-purple font-bold">B.Tech - Computer Science & Engineering</p>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="mb-2 flex items-center gap-2 px-4 py-2 rounded-full border border-red-200 text-red-500 font-bold text-xs uppercase tracking-widest hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-8">
          <div className="card">
            <h3 className="card-title"><User className="w-4 h-4" /> About Student</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">{user}@mituniversity.edu.in</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">Pune, Maharashtra</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">Joined: July 2023</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="card-title"><Award className="w-4 h-4" /> Badges & Achievements</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-mit-green/10 text-mit-green rounded-full text-[10px] font-bold uppercase tracking-wider">Dean's List</span>
              <span className="px-3 py-1 bg-mit-orange/10 text-mit-orange rounded-full text-[10px] font-bold uppercase tracking-wider">Hackathon Winner</span>
              <span className="px-3 py-1 bg-mit-cyan/10 text-mit-cyan rounded-full text-[10px] font-bold uppercase tracking-wider">Security Researcher</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <div className="card">
            <h3 className="card-title"><BookOpen className="w-4 h-4" /> Academic Progress</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-700">Overall CGPA</span>
                  <span className="text-sm font-black text-mit-purple">9.2 / 10.0</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    className="h-full bg-mit-purple"
                  ></motion.div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Attendance</div>
                  <div className="text-xl font-black text-slate-800">88%</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Credits Earned</div>
                  <div className="text-xl font-black text-slate-800">42 / 120</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="card-title">Recent Activities</h3>
            <div className="space-y-4">
              {[
                { activity: 'Submitted "Advanced Algorithms" Assignment', date: '2 days ago' },
                { activity: 'Registered for "CRIEYA Innovation" Workshop', date: '5 days ago' },
                { activity: 'Updated profile information', date: '1 week ago' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <span className="text-sm text-slate-600 font-medium">{item.activity}</span>
                  <span className="text-[11px] text-slate-400">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
