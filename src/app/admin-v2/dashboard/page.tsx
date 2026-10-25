"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  RiDashboardLine, RiFileListLine, RiEyeLine, RiMailLine, 
  RiPhoneLine, RiCalendarLine, RiArrowUpLine, RiLogoutBoxLine,
  RiBarChartBoxLine, RiUserLine
} from "react-icons/ri";

interface Stats {
  visits: { today: number; last7Days: number; last30Days: number; total: number };
  forms: { today: number; last7Days: number; last30Days: number; total: number; new: number };
  charts: { visitsByDay: Array<{ date: string; label: string; count: number }>; visitsByHour: Array<{ hour: number; count: number }> };
  topPages: Array<{ path: string; count: number }>;
  formStatusBreakdown: { new: number; in_progress: number; contacted: number; converted: number; archived: number };
  recentForms: any[];
}

export default function AdminDashboardV2() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin-v2/stats");
      if (res.status === 401) {
        router.push("/admin-v2/login");
        return;
      }
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin-v2/auth/logout", { method: "POST" });
    router.push("/admin-v2/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const maxDayVisits = stats ? Math.max(...stats.charts.visitsByDay.map(d => d.count), 1) : 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-900">Epic Studio</h1>
          <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
        </div>
        
        <nav className="p-4 space-y-1">
          <Link href="/admin-v2/dashboard" className="flex items-center gap-3 px-3 py-2 bg-gray-100 text-gray-900 rounded-lg">
            <RiDashboardLine className="w-5 h-5" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link href="/admin-v2/submissions" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
            <RiFileListLine className="w-5 h-5" />
            <span className="text-sm">Form Submissions</span>
            {stats && stats.forms.new > 0 && (
              <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                {stats.forms.new}
              </span>
            )}
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
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Dashboard Overview</h2>
              <p className="text-sm text-gray-600 mt-1">Monitor website traffic and form submissions</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <RiCalendarLine className="w-4 h-4" />
              <span>Last 30 days</span>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <RiEyeLine className="w-5 h-5 text-blue-600" />
                </div>
                <span className="flex items-center gap-1 text-xs text-green-600">
                  <RiArrowUpLine className="w-3 h-3" />
                  +{stats?.visits.today || 0}
                </span>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{stats?.visits.total.toLocaleString() || 0}</p>
              <p className="text-sm text-gray-600 mt-1">Total Visits</p>
              <p className="text-xs text-gray-500 mt-2">{stats?.visits.today || 0} today • {stats?.visits.last7Days || 0} this week</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <RiMailLine className="w-5 h-5 text-green-600" />
                </div>
                <span className="flex items-center gap-1 text-xs text-green-600">
                  <RiArrowUpLine className="w-3 h-3" />
                  +{stats?.forms.today || 0}
                </span>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{stats?.forms.total || 0}</p>
              <p className="text-sm text-gray-600 mt-1">Total Submissions</p>
              <p className="text-xs text-gray-500 mt-2">{stats?.forms.today || 0} today • {stats?.forms.last7Days || 0} this week</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                  <RiFileListLine className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{stats?.forms.new || 0}</p>
              <p className="text-sm text-gray-600 mt-1">New Submissions</p>
              <p className="text-xs text-gray-500 mt-2">Awaiting review</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <RiUserLine className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{stats?.formStatusBreakdown?.converted || 0}</p>
              <p className="text-sm text-gray-600 mt-1">Converted</p>
              <p className="text-xs text-gray-500 mt-2">Successful leads</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-base font-semibold text-gray-900">Traffic Overview</h3>
                <p className="text-sm text-gray-600 mt-1">Daily visits for the last 30 days</p>
              </div>
              <div className="p-6">
                <div className="flex items-end gap-1 h-48">
                  {stats?.charts.visitsByDay.map((day, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="relative w-full flex items-end justify-center h-40">
                        <div
                          className="w-full bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-colors cursor-pointer"
                          style={{ height: `${(day.count / maxDayVisits) * 100}%` }}
                          title={`${day.label}: ${day.count} visits`}
                        />
                      </div>
                      {idx % 5 === 0 && (
                        <span className="text-xs text-gray-500">{day.label}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-base font-semibold text-gray-900">Submission Status</h3>
                <p className="text-sm text-gray-600 mt-1">Current pipeline</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">New</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{stats?.formStatusBreakdown.new}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">In Progress</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{stats?.formStatusBreakdown.in_progress}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Contacted</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{stats?.formStatusBreakdown.contacted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Converted</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{stats?.formStatusBreakdown.converted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-700">Archived</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{stats?.formStatusBreakdown.archived}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Submissions & Top Pages */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Recent Submissions</h3>
                  <p className="text-sm text-gray-600 mt-1">Latest form entries</p>
                </div>
                <Link href="/admin-v2/submissions" className="text-sm text-blue-600 hover:text-blue-700">View all</Link>
              </div>
              <div className="divide-y divide-gray-100">
                {stats?.recentForms.map((form) => (
                  <Link key={form.id} href={`/admin-v2/submissions?id=${form.id}`} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <RiUserLine className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{form.name}</p>
                      <p className="text-xs text-gray-500 truncate">{form.email}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        form.status === 'new' ? 'bg-blue-100 text-blue-700' :
                        form.status === 'converted' ? 'bg-green-100 text-green-700' :
                        form.status === 'contacted' ? 'bg-purple-100 text-purple-700' :
                        form.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {form.status.replace('_', ' ')}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{new Date(form.createdAt).toLocaleDateString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-base font-semibold text-gray-900">Top Pages</h3>
                <p className="text-sm text-gray-600 mt-1">Most visited pages</p>
              </div>
              <div className="divide-y divide-gray-100">
                {stats?.topPages.map((page, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-400 w-4">{idx + 1}</span>
                      <span className="text-sm text-gray-900 truncate max-w-[200px]">{page.path}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{page.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
