import React from 'react';
import { Globe, Award, Target, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import campusPhoto from '../../images/it_building.jpg';

const AboutPage: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black text-slate-900 tracking-tight">About MIT ADT University</h1>
        <p className="text-xl text-text-muted max-w-3xl mx-auto font-medium">
          A world-class hub of excellence dedicated to art, design, and technology.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-[40px] overflow-hidden shadow-2xl bg-slate-100 aspect-[4/3]">
          <img 
            src={campusPhoto}
            alt="University Campus" 
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="space-y-8">
          <div className="space-y-3">
            <span className="text-mit-purple font-black uppercase tracking-[0.3em] text-sm">Our Legacy</span>
            <h2 className="text-3xl font-black text-slate-900 leading-tight">Empowering Minds Since Inception</h2>
            <p className="text-slate-600 leading-relaxed">
              MIT Art, Design and Technology University, Pune is established under the MIT Art, Design and Technology University Act, 2015. The university is a multi-disciplinary university which has been awarded as "The Best University Campus" at the 10th National Education Excellence Awards 2017 by ASSOCHAM.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <Target className="w-8 h-8 text-mit-orange mb-4" />
              <h4 className="font-bold text-slate-900 mb-2">Our Mission</h4>
              <p className="text-xs text-slate-500 leading-relaxed">To provide value-based education and promote innovative research.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <Globe className="w-8 h-8 text-mit-cyan mb-4" />
              <h4 className="font-bold text-slate-900 mb-2">Global Vision</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Preparing students to become global leaders in their fields.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-mit-purple rounded-[40px] p-12 text-white">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-black mb-2">125+</div>
            <div className="text-xs font-bold uppercase tracking-widest text-white/60">Programs</div>
          </div>
          <div>
            <div className="text-4xl font-black mb-2">3500+</div>
            <div className="text-xs font-bold uppercase tracking-widest text-white/60">Annual Graduates</div>
          </div>
          <div>
            <div className="text-4xl font-black mb-2">400+</div>
            <div className="text-xs font-bold uppercase tracking-widest text-white/60">Global Partners</div>
          </div>
          <div>
            <div className="text-4xl font-black mb-2">A+</div>
            <div className="text-xs font-bold uppercase tracking-widest text-white/60">NAAC Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
