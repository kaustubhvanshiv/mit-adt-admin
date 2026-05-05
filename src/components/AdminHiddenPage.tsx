import React from 'react';
import { AlertTriangle } from 'lucide-react';
import AdminPanel from '../AdminPanel';

const AdminHiddenPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen">
      {/* Robots.txt discovery banner — the actual vulnerability */}
      <div className="bg-amber-500 text-white text-xs font-bold py-2.5 px-6 flex items-center gap-3 tracking-widest uppercase sticky top-0 z-50">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        Restricted Area — Unauthorized access is monitored. This console is not indexed by search engines.
      </div>

      {/* Full Admin Panel */}
      <AdminPanel onDeleteAttempt={() => {}} />
    </div>
  );
};

export default AdminHiddenPage;
