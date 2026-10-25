"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  RiDashboardLine, RiFileListLine, RiBarChartBoxLine, RiLogoutBoxLine,
  RiSearchLine, RiFilterLine, RiMailLine, RiPhoneLine, RiCalendarLine,
  RiUserLine, RiCloseLine, RiCheckLine
} from "react-icons/ri";

interface FormSubmission {
  id: string;
  token: string;
  type: string;
  name: string;
  email: string;
  phone?: string;
  discipline?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  date?: string;
  timeSlot?: string;
  timezone?: string;
  platform?: string;
  callTopic?: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  ip?: string;
}

function SubmissionsContent() {
  const [forms, setForms] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState<FormSubmission | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      fetchForm(id);
    }
    fetchForms();
  }, [statusFilter, typeFilter, search]);

  const fetchForms = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (typeFilter !== "all") params.append("type", typeFilter);
      if (search) params.append("search", search);
      
      const res = await fetch(`/api/admin-v2/submissions?${params}`);
      if (res.status === 401) {
        router.push("/admin-v2/login");
        return;
      }
      const data = await res.json();
      setForms(data.forms || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchForm = async (id: string) => {
    try {
      const res = await fetch(`/api/admin-v2/submissions/${id}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedForm(data.form);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin-v2/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchForms();
        if (selectedForm?.id === id) {
          setSelectedForm({ ...selectedForm, status });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin-v2/auth/logout", { method: "POST" });
    router.push("/admin-v2/login");
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      new: "bg-blue-100 text-blue-700",
      in_progress: "bg-yellow-100 text-yellow-700",
      contacted: "bg-purple-100 text-purple-700",
      converted: "bg-green-100 text-green-700",
      archived: "bg-gray-100 text-gray-700",
    };
    return styles[status] || styles.new;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-900">Epic Studio</h1>
          <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
        </div>
        
        <nav className="p-4 space-y-1">
          <Link href="/admin-v2/dashboard" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
            <RiDashboardLine className="w-5 h-5" />
            <span className="text-sm">Dashboard</span>
          </Link>
          <Link href="/admin-v2/submissions" className="flex items-center gap-3 px-3 py-2 bg-gray-100 text-gray-900 rounded-lg">
            <RiFileListLine className="w-5 h-5" />
            <span className="text-sm font-medium">Form Submissions</span>
          </Link>
          <Link href="/admin-v2/analytics" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
            <RiBarChartBoxLine className="w-5 h-5" />
            <span className="text-sm">Analytics</span>
          </Link>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors w-full">
            <RiLogoutBoxLine className="w-5 h-5" />
            <span className="text-sm">Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64">
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Form Submissions</h2>
              <p className="text-sm text-gray-600 mt-1">Manage all contact form and consultation requests</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone, token..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="archived">Archived</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="all">All Types</option>
              <option value="inquiry">Project Inquiry</option>
              <option value="call">Consultation Call</option>
            </select>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Submissions List */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-base font-semibold text-gray-900">{forms.length} Submissions</h3>
              </div>
              <div className="divide-y divide-gray-100 max-h-[calc(100vh-300px)] overflow-y-auto">
                {loading ? (
                  <div className="p-8 flex justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                  </div>
                ) : forms.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">No submissions found</div>
                ) : (
                  forms.map((form) => (
                    <button
                      key={form.id}
                      onClick={() => setSelectedForm(form)}
                      className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                        selectedForm?.id === form.id ? "bg-blue-50 border-l-2 border-blue-500" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <RiUserLine className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{form.name}</p>
                            <p className="text-xs text-gray-500">{form.email}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(form.status)}`}>
                          {form.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="ml-13 space-y-1">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            {form.type === "call" ? <RiPhoneLine className="w-3 h-3" /> : <RiMailLine className="w-3 h-3" />}
                            {form.type === "call" ? "Consultation Call" : "Project Inquiry"}
                          </span>
                          <span className="flex items-center gap-1">
                            <RiCalendarLine className="w-3 h-3" />
                            {new Date(form.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 font-mono">Token: {form.token}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Submission Details */}
            <div className="bg-white rounded-xl border border-gray-200 sticky top-8">
              {selectedForm ? (
                <div>
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">{selectedForm.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{selectedForm.email}</p>
                        {selectedForm.phone && <p className="text-sm text-gray-600">{selectedForm.phone}</p>}
                      </div>
                      <button onClick={() => setSelectedForm(null)} className="text-gray-400 hover:text-gray-600">
                        <RiCloseLine className="w-5 h-5" />
                      </button>
                    </div>
                    <select
                      value={selectedForm.status}
                      onChange={(e) => updateStatus(selectedForm.id, e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    >
                      <option value="new">New</option>
                      <option value="in_progress">In Progress</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  
                  <div className="p-6 space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Reference</p>
                      <p className="text-sm font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded">{selectedForm.token}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Submission Type</p>
                      <p className="text-sm text-gray-900">{selectedForm.type === "call" ? "Consultation Call" : "Project Inquiry"}</p>
                    </div>
                    
                    {selectedForm.type === "call" ? (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Date</p>
                            <p className="text-sm text-gray-900">{selectedForm.date || "-"}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Time Slot</p>
                            <p className="text-sm text-gray-900">{selectedForm.timeSlot || "-"}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Timezone</p>
                            <p className="text-sm text-gray-900">{selectedForm.timezone || "-"}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Platform</p>
                            <p className="text-sm text-gray-900">{selectedForm.platform || "-"}</p>
                          </div>
                        </div>
                        {selectedForm.callTopic && (
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Topic</p>
                            <p className="text-sm text-gray-900">{selectedForm.callTopic}</p>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Discipline</p>
                            <p className="text-sm text-gray-900">{selectedForm.discipline || "-"}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Budget</p>
                            <p className="text-sm text-gray-900">{selectedForm.budget || "-"}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 mb-1">Timeline</p>
                          <p className="text-sm text-gray-900">{selectedForm.timeline || "-"}</p>
                        </div>
                        {selectedForm.message && (
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Project Brief</p>
                            <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed bg-gray-50 p-3 rounded-lg">{selectedForm.message}</p>
                          </div>
                        )}
                      </>
                    )}
                    
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs font-medium text-gray-500 mb-1">Submitted At</p>
                      <p className="text-sm text-gray-900">{new Date(selectedForm.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <RiFileListLine className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">Select a submission to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function SubmissionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">Loading...</div>}>
      <SubmissionsContent />
    </Suspense>
  );
}
