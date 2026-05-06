import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Globe, 
  Users, 
  Activity, 
  Server, 
  History, 
  FileText, 
  Trash2, 
  Terminal, 
  AlertCircle, 
  CheckCircle2, 
  Database, 
  Settings,
  X
} from 'lucide-react';

interface AdminPanelProps {
  onDeleteAttempt: (name: string) => void;
}

const AdminPanel = ({ onDeleteAttempt }: AdminPanelProps) => {
  type AdminTab = 'overview' | 'records' | 'catalog' | 'diagnostic' | 'backups' | 'api' | 'audit';

  const [url, setUrl] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [discoveredFlag, setDiscoveredFlag] = useState<string | null>(null);

  const [students, setStudents] = useState([
    { id: 'MITA2401', name: 'Aarav Deshmukh', program: 'B.Tech. CSE', year: 'FY', status: 'Active', gpa: '8.9' },
    { id: 'MITA2402', name: 'Diya Patil', program: 'BBA', year: 'SY', status: 'Active', gpa: '9.2' },
    { id: 'MITA2403', name: 'Kabir Shah', program: 'M.Des.', year: 'FY', status: 'Active', gpa: '8.4' },
    { id: 'MITA2404', name: 'Meera Kulkarni', program: 'B.Arch.', year: 'TY', status: 'On Track', gpa: '8.7' },
    { id: 'MITA2405', name: 'Ishaan Verma', program: 'MBA', year: 'SY', status: 'Probation', gpa: '6.8' },
  ]);

  const [auditLogs, setAuditLogs] = useState([
    'Student records view opened by admissions desk',
    'Course catalog exported for academic review',
    'Diagnostic URL checked from admin console',
    'Backup storage verified successfully',
  ]);

  const handleDelete = (id: string, name: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    const flag = "FLAG{student-delete-access-granted-2026}";
    setAuditLogs(prev => [
      `SECURITY ALERT: Unauthorized deletion of ${name}`,
      `SYSTEM_FLAG: ${flag}`,
      ...prev
    ]);
    setDiscoveredFlag(flag);
    onDeleteAttempt(name);
  };

  const tabs: { id: AdminTab; label: string }[] = [
    { id: 'overview', label: 'Dashboard Overview' },
    { id: 'records', label: 'Student Records' },
    { id: 'catalog', label: 'Course Catalog' },
    { id: 'diagnostic', label: 'External Diagnostic Tool' },
    { id: 'backups', label: 'System Backups' },
    { id: 'api', label: 'API Configuration' },
    { id: 'audit', label: 'Audit Logs' },
  ];

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
    <div className="min-h-full bg-slate-50 text-slate-900">
      {/* Flag Discovery Banner */}
      {discoveredFlag && (
        <div className="bg-emerald-600 text-white px-8 py-3 flex items-center justify-between animate-in slide-in-from-top duration-500">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-widest">New Flag Captured:</span>
            <code className="bg-white/20 px-3 py-1 rounded font-mono font-bold text-lg">{discoveredFlag}</code>
          </div>
          <button onClick={() => setDiscoveredFlag(null)} className="hover:opacity-70">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      {/* Admin Top Bar */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-mit-purple rounded-lg flex items-center justify-center shadow-lg shadow-mit-purple/20">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">System Console</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Administrative Environment v4.2.0</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">System Live</span>
          </div>
          <div className="h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-2 text-slate-400">
            <Activity className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">ID: 0x8F22A1</span>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                  ? 'bg-mit-purple text-white shadow-lg shadow-mit-purple/20' 
                  : 'text-slate-500 hover:text-mit-purple hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Network Throughput', value: '1.2 GB/s', icon: Globe, color: 'text-mit-cyan' },
                    { label: 'Active Sessions', value: '428', icon: Users, color: 'text-mit-orange' },
                    { label: 'Uptime', value: '99.98%', icon: Activity, color: 'text-mit-green' },
                    { label: 'Security Score', value: 'A+', icon: Shield, color: 'text-mit-purple' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-6 hover:border-mit-purple/30 transition shadow-sm group">
                      <div className="flex items-center justify-between mb-4">
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time</span>
                      </div>
                      <div className="text-3xl font-black text-slate-900">{item.value}</div>
                      <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">{item.label}</div>
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-mit-purple/10 rounded-lg">
                        <Server className="w-5 h-5 text-mit-purple" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">System Core Performance</h3>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {[
                      { label: 'CPU Load', value: 34 },
                      { label: 'Memory Usage', value: 68 },
                      { label: 'Disk I/O', value: 12 },
                    ].map((metric) => (
                      <div key={metric.label}>
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                          <span className="text-slate-500">{metric.label}</span>
                          <span className="text-slate-900 font-black">{metric.value}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-mit-purple transition-all duration-1000" 
                            style={{ width: `${metric.value}%` }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-8 h-fit shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-mit-orange/10 rounded-lg">
                    <History className="w-5 h-5 text-mit-orange" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
                </div>
                <div className="space-y-4">
                  {auditLogs.map((log, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-slate-200 group-first:bg-mit-orange" />
                        <div className="w-px grow bg-slate-100" />
                      </div>
                      <div className="pb-4">
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">{log}</p>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 block">3m ago</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'records' && (
            <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-mit-cyan/10 rounded-lg">
                    <FileText className="w-5 h-5 text-mit-cyan" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Master Student Registry</h3>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition">
                  Export Data
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="text-[10px] uppercase tracking-widest text-slate-400 font-bold bg-slate-50">
                    <tr>
                      <th className="px-8 py-4 border-b border-slate-100">Serial / ID</th>
                      <th className="px-8 py-4 border-b border-slate-100">Identity</th>
                      <th className="px-8 py-4 border-b border-slate-100">Department</th>
                      <th className="px-8 py-4 border-b border-slate-100">Progression</th>
                      <th className="px-8 py-4 border-b border-slate-100">Standing</th>
                      <th className="px-8 py-4 border-b border-slate-100">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50 transition group">
                        <td className="px-8 py-4 font-mono text-[11px] text-slate-400">{student.id}</td>
                        <td className="px-8 py-4">
                          <div className="font-bold text-slate-900">{student.name}</div>
                        </td>
                        <td className="px-8 py-4 text-slate-600">{student.program}</td>
                        <td className="px-8 py-4 text-slate-600 font-mono">{student.year}</td>
                        <td className="px-8 py-4">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                            student.status === 'Probation' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="px-8 py-4">
                          <button 
                            onClick={() => handleDelete(student.id, student.name)}
                            aria-label={`Delete ${student.name}`}
                            className="inline-flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-bold uppercase tracking-widest text-red-600 transition hover:border-red-200 hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'diagnostic' && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-mit-purple/10 rounded-lg">
                    <Terminal className="w-5 h-5 text-mit-purple" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">External Diagnostic Tool</h3>
                </div>
                <p className="text-sm text-slate-500 mb-8 max-w-2xl leading-relaxed">
                  The diagnostic utility allows administrators to probe external API endpoints and verify system connectivity.
                  <span className="block mt-2 font-mono text-red-500 text-xs">WARNING: All outbound requests are logged for security audits.</span>
                </p>

                <form onSubmit={handleFetch} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Target Resource URL</label>
                    <input 
                      type="text" 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="http://status.adt-university.internal"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-mit-purple/20 transition shadow-inner"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 bg-mit-purple text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:brightness-110 disabled:opacity-50 shadow-lg shadow-mit-purple/20 transition"
                  >
                    {loading ? 'Initializing Fetch...' : 'Execute Probe'}
                  </button>
                </form>

                {error && (
                  <div className="mt-8 p-5 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4">
                    <AlertCircle className="text-red-500 w-5 h-5 shrink-0 mt-0.5" />
                    <div className="text-xs text-red-600 font-mono leading-relaxed">{error}</div>
                  </div>
                )}

                {response && (
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Server Response Payload</label>
                      <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                        <CheckCircle2 className="w-3 h-3" />
                        200 OK
                      </div>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 font-mono text-[11px] text-emerald-400 whitespace-pre-wrap overflow-x-auto max-h-[500px] shadow-2xl">
                      <div dangerouslySetInnerHTML={{ __html: response }} />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Internal Endpoints</h4>
                  <div className="space-y-3">
                    {[
                      'auth.internal:8080',
                      'db-node-01.cluster:5432',
                      'config-service.local',
                      'backup-storage.s3'
                    ].map(endpoint => (
                      <div key={endpoint} className="text-xs font-mono text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                        {endpoint}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-linear-to-br from-mit-purple to-mit-orange p-8 text-white shadow-lg">
                  <h4 className="text-sm font-black uppercase tracking-widest mb-4">Challenge Info</h4>
                  <p className="text-xs text-white/80 leading-relaxed">
                    SSRF (Server-Side Request Forgery) can be used to reach internal resources. 
                    Try probing local services to find the admin console.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backups' && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-mit-green/10 rounded-lg">
                  <History className="w-5 h-5 text-mit-green" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">System Backup Log</h3>
              </div>
              <div className="space-y-4">
                {backups.map((backup) => (
                  <div key={backup.name} className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 bg-white hover:border-mit-green/30 hover:bg-slate-50 transition group shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-mit-green/10 group-hover:text-mit-green transition">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{backup.name}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">TS: {backup.time}</div>
                      </div>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                      {backup.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-mit-orange/10 rounded-lg">
                  <Activity className="w-5 h-5 text-mit-orange" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Live Audit Stream</h3>
              </div>
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4 font-mono shadow-inner">
                {auditLogs.map((log, i) => (
                  <div key={i} className="text-xs text-slate-600 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                    <span className="text-slate-400 mr-4">[{new Date().toLocaleTimeString()}]</span>
                    <span className="text-mit-purple font-bold mr-2">SYS_EVENT:</span>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
