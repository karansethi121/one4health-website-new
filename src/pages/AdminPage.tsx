import { useState, type FormEvent } from 'react';
import { 
  BarChart3, 
  Settings, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  Check, 
  HelpCircle,
  Database,
  ShieldCheck,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useFAQs, useTestimonials } from '@/hooks/useSupabase';
import { LoadingState } from '@/components/ui/LoadingState';
import { useAdminSession } from '@/hooks/useAdminSession';

type AdminTab = 'overview' | 'faqs' | 'testimonials' | 'settings';

export function AdminPage() {
  const [password, setPassword] = useState('');
  const { authenticated, checking, submitting, error, login, logout } = useAdminSession();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const success = await login(password);
    if (success) {
      setPassword('');
    }
  };

  const handleLogout = async () => {
    await logout();
    setPassword('');
  };

  if (checking) {
    return <LoadingState fullPage message="Verifying admin session..." />;
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-sage-50 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-[32px] p-10 shadow-soft border border-sage-100">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-sage-100 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-sage-600" />
            </div>
          </div>
          <h1 className="text-3xl font-heading font-bold text-center text-charcoal-900 mb-2">Admin Dashboard</h1>
          <p className="text-center text-charcoal-500 mb-8">Please enter the administrator password to continue.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-sage-50 border border-sage-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-500/20 focus:border-sage-300 transition-all"
                autoFocus
              />
              {error && <p className="text-red-500 text-sm mt-2 ml-1">{error}</p>}
            </div>
            <button type="submit" disabled={submitting} className="btn-primary w-full py-4 text-sm tracking-widest disabled:opacity-60">
              {submitting ? 'SIGNING IN...' : 'ENTER DASHBOARD'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={handleLogout} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const { faqs, loading: faqsLoading } = useFAQs();
  const { testimonials } = useTestimonials();

  return (
    <div className="min-h-screen bg-sage-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-sage-100 flex flex-col fixed h-full z-10">
        <div className="p-8 border-b border-sage-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sage-700 rounded-xl flex items-center justify-center shadow-lg">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-heading font-bold text-charcoal-900 tracking-tight">O4H Dashboard</p>
              <p className="text-[10px] text-sage-600 font-bold uppercase tracking-widest">v1.2.0 • Pro</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          <SidebarItem 
            icon={<BarChart3 className="w-5 h-5" />} 
            label="Overview" 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
          />
          <SidebarItem 
            icon={<HelpCircle className="w-5 h-5" />} 
            label="Manage FAQs" 
            active={activeTab === 'faqs'} 
            onClick={() => setActiveTab('faqs')} 
          />
          <SidebarItem 
            icon={<MessageSquare className="w-5 h-5" />} 
            label="Testimonials" 
            active={activeTab === 'testimonials'} 
            onClick={() => setActiveTab('testimonials')} 
          />
          <SidebarItem 
            icon={<Settings className="w-5 h-5" />} 
            label="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
        </nav>
        
        <div className="p-6 mt-auto border-t border-sage-50">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-charcoal-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10 pt-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="flex justify-between items-end mb-12">
            <div>
              <h1 className="text-4xl font-heading font-bold text-charcoal-900 mb-2">
                {activeTab === 'overview' && 'System Overview'}
                {activeTab === 'faqs' && 'Frequently Asked Questions'}
                {activeTab === 'testimonials' && 'Customer Testimonials'}
                {activeTab === 'settings' && 'System Settings'}
              </h1>
              <p className="text-charcoal-500">Manage your website content and platform configuration.</p>
            </div>
            
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-5 py-3 bg-white border border-sage-100 rounded-2xl text-charcoal-600 font-semibold shadow-soft-sm hover:shadow-soft transition-all text-sm">
                <Search className="w-4 h-4" />
                Search
              </button>
              {(activeTab === 'faqs' || activeTab === 'testimonials') && (
                <button className="flex items-center gap-2 px-5 py-3 bg-sage-700 text-white rounded-2xl font-bold shadow-soft hover:bg-sage-800 transition-all text-sm">
                  <Plus className="w-4 h-4" />
                  Add New
                </button>
              )}
            </div>
          </header>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard title="Active FAQs" value={faqs.length} icon={<HelpCircle className="text-sage-600" />} color="bg-sage-50" />
                <StatCard title="Testimonials" value={testimonials.length} icon={<MessageSquare className="text-amber-600" />} color="bg-amber-50" />
                <StatCard title="System Health" value="Healthy" icon={<ShieldCheck className="text-blue-600" />} color="bg-blue-50" />
              </div>
            )}

            {activeTab === 'faqs' && (
              <div className="bg-white rounded-[32px] p-8 shadow-soft border border-sage-100 overflow-hidden">
                {faqsLoading ? (
                  <LoadingState message="Loading database records..." />
                ) : (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-sage-50 text-charcoal-400 font-bold uppercase text-[10px] tracking-widest">
                        <th className="pb-6 pl-2">Question</th>
                        <th className="pb-6">Category</th>
                        <th className="pb-6 text-right pr-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sage-50">
                      {faqs.map((faq, i) => (
                        <tr key={i} className="group transition-colors hover:bg-sage-50/50">
                          <td className="py-6 pl-2 pr-10">
                            <p className="text-charcoal-900 font-bold mb-1 line-clamp-1">{faq.question}</p>
                            <p className="text-sm text-charcoal-500 line-clamp-1">{faq.answer}</p>
                          </td>
                          <td className="py-6">
                            <span className="inline-block px-3 py-1 bg-sage-50 text-sage-700 rounded-full text-[10px] font-bold uppercase tracking-wide">
                              Product
                            </span>
                          </td>
                          <td className="py-6 text-right pr-2">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 text-charcoal-400 hover:text-sage-700 hover:bg-white rounded-lg transition-all shadow-sm">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-charcoal-400 hover:text-red-600 hover:bg-white rounded-lg transition-all shadow-sm">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="grid md:grid-cols-2 gap-8">
                {testimonials.map((t) => (
                  <div key={t.id} className="bg-white p-8 rounded-[32px] shadow-soft-sm border border-sage-100 relative group">
                    <div className="flex items-center gap-4 mb-6">
                      <img src={t.image} alt={t.name} className="w-14 h-14 rounded-2xl object-cover" />
                      <div>
                        <p className="font-bold text-charcoal-900">{t.name}</p>
                        <p className="text-xs text-sage-600 font-bold uppercase tracking-widest">{t.role}</p>
                      </div>
                    </div>
                    <p className="text-charcoal-600 italic leading-relaxed mb-4">"{t.quote}"</p>
                    <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-sage-50 text-charcoal-400 hover:text-sage-700 rounded-lg transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-sage-50 text-charcoal-400 hover:text-red-600 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="bg-white rounded-[32px] p-10 shadow-soft border border-sage-100 max-w-2xl">
                <h3 className="text-xl font-bold text-charcoal-900 mb-8 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-sage-600" />
                  Security Settings
                </h3>
                <div className="space-y-8">
                  <div className="flex items-center justify-between p-6 bg-sage-50 rounded-2xl border border-sage-100">
                    <div>
                      <p className="font-bold text-charcoal-900">Admin Password</p>
                      <p className="text-sm text-charcoal-500">Update your access credentials.</p>
                    </div>
                    <button className="btn-secondary px-6 py-2.5 text-xs tracking-widest">CHANGE</button>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-sage-50 rounded-2xl border border-sage-100">
                    <div>
                      <p className="font-bold text-charcoal-900">Database Connection</p>
                      <p className="text-sm text-sage-600 font-medium">Supabase Linked (o4h-database-ref)</p>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      <Check className="w-3 h-3" />
                      Online
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { 
  icon: React.ReactNode, 
  label: string, 
  active: boolean, 
  onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-between w-full px-5 py-4 rounded-2xl transition-all duration-300 font-semibold text-sm group
        ${active 
          ? 'bg-sage-700 text-white shadow-soft-lg' 
          : 'text-charcoal-400 hover:text-sage-700 hover:bg-sage-50/50'
        }
      `}
    >
      <div className="flex items-center gap-4">
        <span className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110 text-charcoal-300'}`}>
          {icon}
        </span>
        {label}
      </div>
      {active && <ChevronRight className="w-4 h-4 text-white/50" />}
    </button>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: string | number, icon: React.ReactNode, color: string }) {
  return (
    <div className={`p-8 rounded-[32px] ${color} border border-sage-100 shadow-soft-sm hover:shadow-soft transition-all duration-500 transform hover:-translate-y-1 group`}>
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-soft-sm group-hover:shadow-soft transition-all">
          {icon}
        </div>
        <span className="text-[10px] font-bold text-sage-600 uppercase tracking-[0.2em] bg-white/50 px-2 py-1 rounded-lg">Realtime</span>
      </div>
      <p className="text-sm text-charcoal-500 font-bold uppercase tracking-widest mb-1">{title}</p>
      <p className="text-4xl font-heading font-bold text-charcoal-900 tracking-tight">{value}</p>
    </div>
  );
}
