import React from 'react';
import { Users, Mail, Phone, Briefcase, BadgeCheck, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

const StaffPage: React.FC = () => {
  const staff = [
    {
      name: 'Dr. Ganesh Pathak',
      role: 'Dean - School of Computing',
      dept: 'Computer Engineering & IT',
      email: 'ganeshp.s@mituniversity.edu.in',
      phone: '+91 20 1234 5678',
      img: new URL('../../images/dean.png', import.meta.url).href
    },
    {
      name: 'Dr. Prashant Dhotre',
      role: 'Head of Department',
      dept: 'Information Technology',
      email: 'prashant.dhotre@mituniversity.edu.in',
      phone: '+91 20 1234 5679',
      img: new URL('../../images/prashant_dhotre.png', import.meta.url).href
    },
    {
      name: 'Dr. Ishwari Raskar',
      role: 'Professor',
      dept: 'Information Technology',
      email: 'ishwari.raskar@mituniversity.edu.in',
      phone: '+91 20 1234 5680',
      img: new URL('../../images/iswari_raskar.png', import.meta.url).href
    },
    {
      name: 'Prof. Rahul Bhole',
      role: 'Professor',
      dept: 'Information Technology',
      email: 'rahul.bhole@mituniversity.edu.in',
      phone: '+91 20 1234 5681',
      img: new URL('../../images/rahul_bhole.png', import.meta.url).href
    },
    {
      name: 'Mr. Sunil Gavaskar',
      role: 'Sports Coordinator',
      dept: 'Physical Education',
      email: 'sunil.g@mituniversity.edu.in',
      phone: '+91 20 1234 5682',
      img: new URL('../../images/sunil_g.png', import.meta.url).href
    },
    {
      name: 'Dr. Meena Kumari',
      role: 'Director',
      dept: 'Research & Innovation',
      email: 'meena.k@mituniversity.edu.in',
      phone: '+91 20 1234 5683',
      img: new URL('../../images/meena.png', import.meta.url).href
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 flex items-center gap-4">
          <Users className="w-10 h-10 text-mit-purple" />
          Our Distinguished Faculty
        </h1>
        <p className="text-text-muted mt-4 max-w-3xl text-lg leading-relaxed font-medium">
          Meet the visionary educators and industry experts who guide our students toward excellence and innovation at MIT ADT University.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {staff.map((person, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="card group hover:shadow-xl hover:border-mit-purple/30 transition-all cursor-default"
          >
            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 rounded-full bg-slate-100 overflow-hidden ring-4 ring-slate-50 group-hover:ring-mit-purple/10 transition-all">
                <img src={person.img} alt={person.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 group-hover:text-mit-purple transition-colors">{person.name}</h3>
                <p className="text-xs font-bold text-mit-orange uppercase tracking-widest">{person.dept}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Briefcase className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-600">{person.role}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-600">{person.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-600">{person.phone}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex gap-3">
              <BadgeCheck className="w-5 h-5 text-mit-green" />
              <GraduationCap className="w-5 h-5 text-mit-cyan" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StaffPage;
