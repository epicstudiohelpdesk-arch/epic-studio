"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface VisitData {
  total: number;
  visitsByDay: Record<string, number>;
  topPages: [string, number][];
  topReferrers: [string, number][];
  recentVisits: any[];
}

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
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"analytics" | "forms">("analytics");
  const [analytics, setAnalytics] = useState<VisitData | null>(null);
  const [forms, setForms] = useState<FormSubmission[]>([]);
  const [selectedForm, setSelectedForm] = useState<FormSubmission | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth !== "true") {
      router.push("/admin/login");
    }
  }, [router]);

  useEffect(() => {
    fetchAnalytics();
    fetchForms();
  }, [statusFilter]);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/analytics/track?days=30");
      const data = await res.json();
      setAnalytics(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchForms = async () => {
    try {
      const res = await fetch(`/api/submissions?status=${statusFilter}`);
      const data = await res.json();
      setForms(data.forms || []);
    } catch (e) {
      console.error(e);
    }
  };

  const updateFormStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchForms();
      if (selectedForm?.id === id) {
        setSelectedForm({ ...selectedForm, status });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    router.push("/admin/login");
  };

  const days = analytics?.visitsByDay ? Object.keys(analytics.visitsByDay).sort() : [];
  const maxVisits = days.length ? Math.max(...days.map(d => analytics!.visitsByDay[d])) : 1;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">EPIC STUDIO Admin</h1>
          <p className="text-sm text-gray-400">Website Analytics & Form Submissions</p>
        </div>
        <button onClick={handleLogout} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-sm">
          Logout
        </button>
      </header>

      <div className="border-b border-gray-800 px-6">
        <nav className="flex gap-6">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`py-3 px-1 border-b-2 ${activeTab === "analytics" ? "border-blue-500 text-white" : "border-transparent text-gray-400 hover:text-white"}`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("forms")}
            className={`py-3 px-1 border-b-2 ${activeTab === "forms" ? "border-blue-500 text-white" : "border-transparent text-gray-400 hover:text-white"}`}
          >
            Form Submissions ({forms.length})
          </button>
        </nav>
      </div>

      <main className="p-6">
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <p className="text-gray-400 text-sm">Total Visits (30 days)</p>
                <p className="text-3xl font-bold mt-2">{analytics?.total || 0}</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <p className="text-gray-400 text-sm">Form Submissions</p>
                <p className="text-3xl font-bold mt-2">{forms.length}</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <p className="text-gray-400 text-sm">New Submissions</p>
                <p className="text-3xl font-bold mt-2">{forms.filter(f => f.status === "new").length}</p>
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h2 className="text-lg font-semibold mb-4">Daily Visits</h2>
              <div className="flex items-end gap-2 h-40">
                {days.map(day => (
                  <div key={day} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${(analytics!.visitsByDay[day] / maxVisits) * 100}%` }}
                      title={`${day}: ${analytics!.visitsByDay[day]} visits`}
                    />
                    <span className="text-xs text-gray-400 transform -rotate-45 origin-top-left mt-2">
                      {new Date(day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h2 className="text-lg font-semibold mb-4">Top Pages</h2>
                <div className="space-y-2">
                  {analytics?.topPages.map(([page, count]) => (
                    <div key={page} className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-300 truncate">{page}</span>
                      <span className="text-white font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h2 className="text-lg font-semibold mb-4">Recent Visits</h2>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {analytics?.recentVisits.map((visit) => (
                    <div key={visit.id} className="py-2 border-b border-gray-800 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">{visit.path}</span>
                        <span className="text-gray-500">{new Date(visit.createdAt).toLocaleTimeString()}</span>
                      </div>
                      {visit.ip && <span className="text-xs text-gray-600">{visit.ip}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "forms" && (
          <div className="space-y-4">
            <div className="flex gap-2">
              {["all", "new", "in_progress", "contacted", "converted", "archived"].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded text-sm capitalize ${statusFilter === status ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"}`}
                >
                  {status.replace("_", " ")}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <div className="divide-y divide-gray-800 max-h-[70vh] overflow-y-auto">
                  {forms.map(form => (
                    <button
                      key={form.id}
                      onClick={() => setSelectedForm(form)}
                      className={`w-full text-left p-4 hover:bg-gray-800 ${selectedForm?.id === form.id ? "bg-gray-800" : ""}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{form.name}</p>
                          <p className="text-sm text-gray-400">{form.email}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded capitalize ${
                          form.status === "new" ? "bg-blue-900 text-blue-300" :
                          form.status === "converted" ? "bg-green-900 text-green-300" :
                          form.status === "contacted" ? "bg-yellow-900 text-yellow-300" :
                          "bg-gray-700 text-gray-300"
                        }`}>
                          {form.status.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {form.type === "call" ? `Call - ${form.date} ${form.timeSlot}` : form.discipline || "Inquiry"} • {new Date(form.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Token: {form.token}</p>
                    </button>
                  ))}
                  {forms.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No submissions found</p>
                  )}
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                {selectedForm ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold">{selectedForm.name}</h2>
                        <p className="text-gray-400">{selectedForm.email}</p>
                        {selectedForm.phone && <p className="text-gray-400">{selectedForm.phone}</p>}
                      </div>
                      <select
                        value={selectedForm.status}
                        onChange={(e) => updateFormStatus(selectedForm.id, e.target.value)}
                        className="px-3 py-1 bg-black border border-gray-700 rounded text-sm"
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div className="border-t border-gray-800 pt-4">
                      <p className="text-sm text-gray-400 mb-2">Reference</p>
                      <p className="font-mono text-sm">{selectedForm.token}</p>
                    </div>

                    <div className="border-t border-gray-800 pt-4">
                      <p className="text-sm text-gray-400 mb-2">Type</p>
                      <p className="capitalize">{selectedForm.type === "call" ? "Consultation Call" : "Project Inquiry"}</p>
                    </div>

                    {selectedForm.type === "call" ? (
                      <>
                        <div className="border-t border-gray-800 pt-4 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Date</p>
                            <p>{selectedForm.date}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Time Slot</p>
                            <p>{selectedForm.timeSlot}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Timezone</p>
                            <p>{selectedForm.timezone}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Platform</p>
                            <p>{selectedForm.platform}</p>
                          </div>
                        </div>
                        {selectedForm.callTopic && (
                          <div className="border-t border-gray-800 pt-4">
                            <p className="text-sm text-gray-400 mb-1">Topic</p>
                            <p>{selectedForm.callTopic}</p>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="border-t border-gray-800 pt-4 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Discipline</p>
                            <p>{selectedForm.discipline || "N/A"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Budget</p>
                            <p>{selectedForm.budget || "N/A"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Timeline</p>
                            <p>{selectedForm.timeline || "N/A"}</p>
                          </div>
                        </div>
                        {selectedForm.message && (
                          <div className="border-t border-gray-800 pt-4">
                            <p className="text-sm text-gray-400 mb-1">Message</p>
                            <p className="whitespace-pre-wrap text-sm leading-relaxed">{selectedForm.message}</p>
                          </div>
                        )}
                      </>
                    )}

                    <div className="border-t border-gray-800 pt-4">
                      <p className="text-sm text-gray-400 mb-1">Submitted</p>
                      <p className="text-sm">{new Date(selectedForm.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-12">
                    Select a submission to view details
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
