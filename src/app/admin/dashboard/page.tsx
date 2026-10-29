"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  RiDashboardLine,
  RiFileListLine,
  RiPhoneLine,
  RiBarChartBoxLine,
  RiDatabase2Line,
  RiLogoutBoxRLine,
  RiSearchLine,
  RiRefreshLine,
  RiDownload2Line,
  RiEyeLine,
  RiMailLine,
  RiWhatsappLine,
  RiCheckDoubleLine,
  RiCloseLine,
  RiDeleteBin6Line,
  RiSaveLine,
  RiArrowRightUpLine,
  RiInboxArchiveLine,
  RiMenuLine,
} from "react-icons/ri";

interface Submission {
  id: string;
  token: string;
  type: string;
  name: string;
  email: string;
  phone?: string | null;
  discipline?: string | null;
  budget?: string | null;
  timeline?: string | null;
  message?: string | null;
  date?: string | null;
  timeSlot?: string | null;
  timezone?: string | null;
  platform?: string | null;
  callTopic?: string | null;
  status: string;
  notes?: string | null;
  ip?: string | null;
  userAgent?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface StatsData {
  metrics: {
    total: number;
    today: number;
    last7Days: number;
    last30Days: number;
    new: number;
    inquiries: number;
    calls: number;
    totalVisits: number;
    visits7Days: number;
  };
  statusBreakdown: Record<string, number>;
  disciplineBreakdown: Array<{ name: string; count: number }>;
  budgetBreakdown: Array<{ range: string; count: number }>;
  timeline: Array<{ date: string; label: string; count: number; calls: number; inquiries: number }>;
  recentSubmissions: Submission[];
}

interface UserSession {
  id: string;
  email: string;
  name: string;
  role: string;
}

function AdminDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (searchParams?.get("tab") as any) || "overview";
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "leads" | "calls" | "analytics" | "database">(
    ["overview", "leads", "calls", "analytics", "database"].includes(initialTab) ? initialTab : "overview"
  );

  // Mobile navigation drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Data states
  const [stats, setStats] = useState<StatsData | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filter & Search states
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Drawer / Inspection state
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [editingNotes, setEditingNotes] = useState("");
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [statusChangeLoading, setStatusChangeLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // 1. Initial Authentication Check
  useEffect(() => {
    async function initAuth() {
      try {
        const res = await fetch("/api/admin/auth/me");
        if (!res.ok) {
          router.replace("/admin/login");
          return;
        }
        const data = await res.json();
        setCurrentUser(data.user);
      } catch {
        router.replace("/admin/login");
      }
    }
    initAuth();
  }, [router]);

  // 2. Fetch Data when Filters Change
  useEffect(() => {
    if (!currentUser) return;
    loadDashboardData();
  }, [currentUser, statusFilter, typeFilter, searchQuery, currentPage]);

  const loadDashboardData = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);

    try {
      const [statsRes, subsRes, analyticsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch(
          `/api/admin/submissions?status=${statusFilter}&type=${typeFilter}&search=${encodeURIComponent(
            searchQuery
          )}&page=${currentPage}&limit=50`
        ),
        fetch("/api/analytics/track?days=30"),
      ]);

      if (statsRes.status === 401 || subsRes.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      if (subsRes.ok) {
        const subsData = await subsRes.json();
        const loadedSubs = subsData.submissions || [];
        setSubmissions(loadedSubs);
        setCounts(subsData.counts || {});

        if (searchParams?.get("open") === "first" && loadedSubs.length > 0 && !selectedSubmission) {
          setSelectedSubmission(loadedSubs[0]);
          setEditingNotes(loadedSubs[0].notes || "");
        }
      }

      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        setAnalytics(analyticsData);
      }
    } catch (err) {
      console.error("[Dashboard Fetch Error]", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
    }
  };

  const openDrawer = (sub: Submission) => {
    setSelectedSubmission(sub);
    setEditingNotes(sub.notes || "");
  };

  const closeDrawer = () => {
    setSelectedSubmission(null);
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setStatusChangeLoading(true);
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setSubmissions((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedSubmission?.id === id) {
          setSelectedSubmission((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        showFeedback(`Status updated to "${newStatus.replace("_", " ")}"`);
        fetch("/api/admin/stats")
          .then((r) => r.json())
          .then((d) => setStats(d))
          .catch(() => {});
      }
    } catch (err) {
      console.error(err);
    } finally {
      setStatusChangeLoading(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedSubmission) return;
    setIsSavingNotes(true);
    try {
      const res = await fetch(`/api/admin/submissions/${selectedSubmission.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: editingNotes }),
      });

      if (res.ok) {
        setSelectedSubmission((prev) => (prev ? { ...prev, notes: editingNotes } : null));
        setSubmissions((prev) =>
          prev.map((item) =>
            item.id === selectedSubmission.id ? { ...item, notes: editingNotes } : item
          )
        );
        showFeedback("Internal note saved to SQLite database.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleDeleteSubmission = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this lead from the database?")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSubmissions((prev) => prev.filter((item) => item.id !== id));
        if (selectedSubmission?.id === id) {
          closeDrawer();
        }
        showFeedback("Lead permanently deleted.");
        loadDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const showFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 4000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            New Lead
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            In Progress
          </span>
        );
      case "contacted":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            Contacted
          </span>
        );
      case "converted":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            Converted
          </span>
        );
      case "archived":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            Archived
          </span>
        );
    }
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-600">
        <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs uppercase tracking-widest text-slate-500 font-mono">
          Connecting to SQLite Database & Services...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white pb-16 md:pb-0">
      {/* Toast Feedback Alert */}
      {feedbackMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 bg-white border border-slate-300 text-slate-800 text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-bottom-2 fade-in">
          <RiCheckDoubleLine className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium">{feedbackMessage}</span>
        </div>
      )}

      {/* Main Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <RiCloseLine className="w-5 h-5" /> : <RiMenuLine className="w-5 h-5" />}
          </button>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-sm group-hover:bg-blue-700 transition-colors">
              E
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-wider text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                EPIC STUDIO
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                Admin Console
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-slate-200 text-xs text-slate-600 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium">SQLite DB Online</span>
            {stats && (
              <span className="ml-1.5 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-semibold">
                {stats.metrics.total} leads stored
              </span>
            )}
          </div>
        </div>

        {/* Global Action Header Items */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => loadDashboardData(true)}
            disabled={refreshing}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
            title="Refresh Data"
          >
            <RiRefreshLine className={`w-4 h-4 ${refreshing ? "animate-spin text-blue-600" : ""}`} />
          </button>

          <a
            href="/api/admin/export"
            download
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors shadow-xs"
          >
            <RiDownload2Line className="w-3.5 h-3.5 text-blue-600" />
            <span>Export CSV</span>
          </a>

          <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-semibold text-slate-800 leading-tight">
                {currentUser?.name || "Admin"}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {currentUser?.email || "admin@epicstudio.in"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
              title="Sign Out"
            >
              <RiLogoutBoxRLine className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 flex relative">
        {/* Mobile Navigation Drawer Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar (Desktop Persistent + Mobile Slide-In) */}
        <aside
          className={`fixed md:sticky top-0 md:top-[57px] left-0 z-40 h-full md:h-[calc(100vh-57px)] w-64 bg-white border-r border-slate-200 p-4 flex flex-col justify-between shrink-0 transition-transform duration-200 ease-in-out shadow-lg md:shadow-none ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="space-y-1 w-full">
            <div className="md:hidden pb-3 mb-2 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold font-mono uppercase text-slate-500">Navigation Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-700"
              >
                <RiCloseLine className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => {
                setActiveTab("overview");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "overview"
                  ? "bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/30"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <RiDashboardLine className="w-4 h-4 shrink-0" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("leads");
                setTypeFilter("all");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "leads" && typeFilter === "all"
                  ? "bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/30"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <RiFileListLine className="w-4 h-4 shrink-0" />
                <span>All Submissions</span>
              </div>
              {counts.new > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-emerald-500 text-white font-bold">
                  {counts.new}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab("calls");
                setTypeFilter("call");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "calls"
                  ? "bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/30"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <RiPhoneLine className="w-4 h-4 shrink-0" />
                <span>Consultation Calls</span>
              </div>
              {counts.call > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-slate-100 text-slate-700 font-mono font-bold">
                  {counts.call}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab("analytics");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "analytics"
                  ? "bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/30"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <RiBarChartBoxLine className="w-4 h-4 shrink-0" />
              <span>Traffic & Visitors</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("database");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === "database"
                  ? "bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/30"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <RiDatabase2Line className="w-4 h-4 shrink-0" />
              <span>DB Health & Engine</span>
            </button>
          </div>

          {/* Sidebar System Parameters Info */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1.5">
            <div className="flex items-center justify-between">
              <span>Database Engine:</span>
              <span className="font-mono font-semibold text-slate-800">SQLite + Prisma</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Security Token:</span>
              <span className="font-mono font-semibold text-emerald-700">JWT HttpOnly</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Total DB Leads:</span>
              <span className="font-mono font-semibold text-blue-700">{stats?.metrics.total || 0}</span>
            </div>
          </div>
        </aside>

        {/* Dynamic Content Main Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
              {/* Header Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    Executive Lead Overview
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Real-time monitoring of contact submissions, inquiries, and booked consultations.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => loadDashboardData(true)}
                    disabled={refreshing}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <RiRefreshLine className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-blue-600" : ""}`} />
                    <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
                  </button>
                  <a
                    href="/api/admin/export"
                    download
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <RiDownload2Line className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Export CSV</span>
                  </a>
                </div>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {/* Total Leads */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span className="uppercase tracking-wider font-semibold">Submissions</span>
                    <RiFileListLine className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-mono">
                    {stats?.metrics.total || 0}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                    <span className="text-emerald-600 font-bold font-mono">+{stats?.metrics.last7Days || 0}</span>
                    <span>this week</span>
                  </div>
                </div>

                {/* Action Required */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span className="uppercase tracking-wider font-semibold">Action Required</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-2 font-mono">
                    {stats?.metrics.new || 0}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1.5 truncate">
                    <span>New unreviewed leads</span>
                  </div>
                </div>

                {/* Consultations Booked */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span className="uppercase tracking-wider font-semibold">Calls Booked</span>
                    <RiPhoneLine className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-mono">
                    {stats?.metrics.calls || 0}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1.5 truncate">
                    <span className="text-blue-600 font-semibold">{stats?.metrics.inquiries || 0}</span> inquiries
                  </div>
                </div>

                {/* Total Traffic / Visits */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span className="uppercase tracking-wider font-semibold">Impressions</span>
                    <RiBarChartBoxLine className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-mono">
                    {stats?.metrics.totalVisits || 0}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                    <span className="text-purple-600 font-semibold font-mono">+{stats?.metrics.visits7Days || 0}</span>
                    <span>past 7 days</span>
                  </div>
                </div>
              </div>

              {/* 14-Day Timeline Influx Chart */}
              {stats?.timeline && (
                <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-slate-900">Lead Influx Timeline</h2>
                      <p className="text-xs text-slate-500">Daily frequency of project briefs and consultations</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded bg-blue-600" />
                        <span className="text-slate-600">Inquiries</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded bg-indigo-500" />
                        <span className="text-slate-600">Calls</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 flex items-end justify-between gap-1 sm:gap-2 h-40 sm:h-44 border-b border-slate-100 pb-2">
                    {stats.timeline.map((day, idx) => {
                      const maxVal = Math.max(...stats.timeline.map((d) => d.count), 4);
                      const heightPercent = Math.round((day.count / maxVal) * 100);

                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                          <span className="text-[10px] font-mono text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            {day.count}
                          </span>
                          <div
                            style={{ height: `${Math.max(heightPercent, 8)}%` }}
                            className="w-full max-w-[28px] rounded-t-lg bg-gradient-to-t from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer shadow-xs"
                            title={`${day.label}: ${day.count} total (${day.inquiries} inquiries, ${day.calls} calls)`}
                          />
                          <span className="text-[10px] text-slate-500 font-mono mt-1 whitespace-nowrap">
                            {day.label.split(" ")[1]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Two Column Grid: Recent Inquiries + Breakdowns */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Submissions List (2 cols) */}
                <div className="lg:col-span-2 p-4 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-slate-900">Recent Leads & Bookings</h2>
                      <p className="text-xs text-slate-500">Awaiting administrator action and follow-up</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("leads")}
                      className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                    >
                      <span>View All Leads</span>
                      <RiArrowRightUpLine className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {stats?.recentSubmissions && stats.recentSubmissions.length > 0 ? (
                    <div className="divide-y divide-slate-100">
                      {stats.recentSubmissions.map((sub) => (
                        <div
                          key={sub.id}
                          onClick={() => openDrawer(sub)}
                          className="py-3 sm:py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 rounded-xl px-2 sm:px-3 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                              {sub.type === "call" ? (
                                <RiPhoneLine className="w-4 h-4" />
                              ) : (
                                <RiFileListLine className="w-4 h-4" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                  {sub.name}
                                </span>
                                <span className="text-[10px] font-mono text-slate-500">
                                  [{sub.token}]
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 truncate mt-0.5">
                                {sub.type === "call"
                                  ? `Scheduled for ${sub.date} @ ${sub.timeSlot}`
                                  : sub.discipline || sub.message || "Project Inquiry"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                            {getStatusBadge(sub.status)}
                            <span className="hidden sm:inline text-[11px] font-mono text-slate-500">
                              {new Date(sub.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-14 text-center flex flex-col items-center justify-center">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 mb-2.5">
                        <RiInboxArchiveLine className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-semibold text-slate-700">No submissions yet</p>
                      <p className="text-[11px] text-slate-400 max-w-xs mt-0.5">
                        Client inquiries and booked calls will appear here automatically in real time.
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Column: Discipline & Budget Breakdown */}
                <div className="space-y-6">
                  {/* Discipline Breakdown */}
                  <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                    <h2 className="text-sm font-bold text-slate-900">Discipline Demand</h2>
                    <div className="space-y-3">
                      {stats?.disciplineBreakdown && stats.disciplineBreakdown.length > 0 ? (
                        stats.disciplineBreakdown.map((item, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-700 font-medium truncate max-w-[180px]">{item.name}</span>
                              <span className="font-mono text-slate-500 font-semibold">{item.count} leads</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                style={{
                                  width: `${Math.round((item.count / (stats.metrics.total || 1)) * 100)}%`,
                                }}
                                className="h-full bg-blue-600 rounded-full"
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500 py-2">No discipline data recorded yet.</p>
                      )}
                    </div>
                  </div>

                  {/* Budget Ranges */}
                  <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                    <h2 className="text-sm font-bold text-slate-900">Budget Distribution</h2>
                    <div className="space-y-2">
                      {stats?.budgetBreakdown && stats.budgetBreakdown.length > 0 ? (
                        stats.budgetBreakdown.map((b, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                          >
                            <span className="text-slate-700 font-mono">{b.range}</span>
                            <span className="font-bold text-emerald-700 font-mono">{b.count}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500 py-2">No budget data available yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2 & 3: LEADS & CALLS VIEW (DUAL TABLE & MOBILE CARDS) */}
          {(activeTab === "leads" || activeTab === "calls") && (
            <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
              {/* Header Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {activeTab === "calls" ? "Booked Consultations" : "Client Leads & Inquiries"}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Search, filter, update statuses, and log internal notes directly in SQLite.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="/api/admin/export"
                    download
                    className="flex sm:hidden items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs"
                  >
                    <RiDownload2Line className="w-3.5 h-3.5 text-blue-600" />
                    <span>Export</span>
                  </a>
                </div>
              </div>

              {/* Filters & Search Toolbar */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex flex-col md:flex-row items-center gap-2.5 sm:gap-3">
                  {/* Search input */}
                  <div className="relative flex-1 w-full">
                    <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name, email, token, phone, or keyword..."
                      className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-mono"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                      >
                        <RiCloseLine className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Type Filter */}
                  {activeTab !== "calls" && (
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="w-full md:w-48 py-2 sm:py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-blue-600 font-medium"
                    >
                      <option value="all">All Submission Types</option>
                      <option value="inquiry">Project Inquiries</option>
                      <option value="call">Booked Calls</option>
                    </select>
                  )}
                </div>

                {/* Status Chips */}
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pt-1 pb-1">
                  {[
                    { key: "all", label: "All Leads", count: counts.all || 0 },
                    { key: "new", label: "New", count: counts.new || 0 },
                    { key: "in_progress", label: "In Progress", count: counts.in_progress || 0 },
                    { key: "contacted", label: "Contacted", count: counts.contacted || 0 },
                    { key: "converted", label: "Converted", count: counts.converted || 0 },
                    { key: "archived", label: "Archived", count: counts.archived || 0 },
                  ].map((chip) => (
                    <button
                      key={chip.key}
                      onClick={() => setStatusFilter(chip.key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                        statusFilter === chip.key
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-transparent"
                      }`}
                    >
                      <span>{chip.label}</span>
                      <span className="font-mono text-[10px] opacity-80">({chip.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 1. MOBILE RESPONSIVE CARDS (Visible on < 768px screens) */}
              <div className="block md:hidden space-y-3">
                {submissions.length > 0 ? (
                  submissions.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => openDrawer(sub)}
                      className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs active:bg-slate-50 transition-colors cursor-pointer space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-mono text-xs font-bold text-blue-600">
                            {sub.token}
                          </span>
                          <h3 className="text-sm font-bold text-slate-900 mt-0.5">{sub.name}</h3>
                          <p className="text-xs text-slate-500 font-mono">{sub.email}</p>
                          {sub.phone && <p className="text-xs text-slate-500 font-mono">{sub.phone}</p>}
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          {getStatusBadge(sub.status)}
                          <span className="text-[10px] font-mono text-slate-400">
                            {new Date(sub.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-600 font-medium truncate max-w-[180px]">
                          {sub.type === "call" ? `${sub.date} @ ${sub.timeSlot}` : sub.discipline || "Project Lead"}
                        </span>
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          {sub.phone && (
                            <a
                              href={`https://wa.me/${sub.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                `Hi ${sub.name}, this is Epic Studio regarding your inquiry (${sub.token}).`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                              title="WhatsApp"
                            >
                              <RiWhatsappLine className="w-4 h-4" />
                            </a>
                          )}
                          <a
                            href={`mailto:${sub.email}?subject=${encodeURIComponent(
                              `Epic Studio — Regarding Your Inquiry [${sub.token}]`
                            )}`}
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
                            title="Email"
                          >
                            <RiMailLine className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 mb-2.5">
                      <RiInboxArchiveLine className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-slate-700">No submissions found</p>
                    <p className="text-[11px] text-slate-400 max-w-xs mt-0.5">
                      {searchQuery || statusFilter !== "all" || typeFilter !== "all"
                        ? "No leads matched your search and filter criteria."
                        : "Incoming client inquiries from the website will appear here automatically."}
                    </p>
                  </div>
                )}
              </div>

              {/* 2. DESKTOP TABULAR GRID (Visible on >= 768px screens) */}
              <div className="hidden md:block rounded-2xl bg-white border border-slate-200/90 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-mono uppercase tracking-wider text-slate-600">
                        <th className="py-3.5 px-4 font-bold">Reference Token</th>
                        <th className="py-3.5 px-4 font-bold">Client</th>
                        <th className="py-3.5 px-4 font-bold">Type & Topic</th>
                        <th className="py-3.5 px-4 font-bold">Budget / Schedule</th>
                        <th className="py-3.5 px-4 font-bold">Status</th>
                        <th className="py-3.5 px-4 font-bold">Received</th>
                        <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                      {submissions.length > 0 ? (
                        submissions.map((sub) => (
                          <tr
                            key={sub.id}
                            className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                            onClick={() => openDrawer(sub)}
                          >
                            {/* Token */}
                            <td className="py-4 px-4 font-mono text-[11px] font-bold text-blue-600 whitespace-nowrap">
                              {sub.token}
                            </td>

                            {/* Client */}
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                {sub.name}
                              </div>
                              <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                                {sub.email}
                              </div>
                              {sub.phone && (
                                <div className="text-[11px] text-slate-500 font-mono">
                                  {sub.phone}
                                </div>
                              )}
                            </td>

                            {/* Type & Discipline */}
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                                    sub.type === "call"
                                      ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                                      : "bg-blue-50 text-blue-700 border border-blue-200"
                                  }`}
                                >
                                  {sub.type}
                                </span>
                                <span className="text-slate-800 font-semibold truncate max-w-[200px]">
                                  {sub.type === "call" ? sub.callTopic || "Consultation" : sub.discipline || "Project"}
                                </span>
                              </div>
                              {sub.message && (
                                <p className="text-[11px] text-slate-500 truncate max-w-[260px] mt-1">
                                  {sub.message}
                                </p>
                              )}
                            </td>

                            {/* Budget / Schedule */}
                            <td className="py-4 px-4 whitespace-nowrap">
                              {sub.type === "call" ? (
                                <div>
                                  <div className="font-mono text-emerald-700 font-semibold">{sub.date}</div>
                                  <div className="text-[10px] text-slate-500 font-mono">{sub.timeSlot} ({sub.timezone})</div>
                                </div>
                              ) : (
                                <div>
                                  <div className="font-mono text-emerald-700 font-semibold">{sub.budget || "Open"}</div>
                                  <div className="text-[10px] text-slate-500 font-medium">{sub.timeline || "Flexible"}</div>
                                </div>
                              )}
                            </td>

                            {/* Status */}
                            <td className="py-4 px-4 whitespace-nowrap">
                              {getStatusBadge(sub.status)}
                            </td>

                            {/* Date */}
                            <td className="py-4 px-4 whitespace-nowrap font-mono text-[11px] text-slate-500">
                              {new Date(sub.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </td>

                            {/* Actions */}
                            <td
                              className="py-4 px-4 text-right whitespace-nowrap"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex items-center justify-end gap-1.5">
                                {sub.phone && (
                                  <a
                                    href={`https://wa.me/${sub.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                      `Hi ${sub.name}, this is Epic Studio regarding your inquiry (${sub.token}).`
                                    )}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="WhatsApp Client"
                                    className="p-1.5 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                                  >
                                    <RiWhatsappLine className="w-4 h-4" />
                                  </a>
                                )}
                                <a
                                  href={`mailto:${sub.email}?subject=${encodeURIComponent(
                                    `Epic Studio — Inquiry [${sub.token}]`
                                  )}`}
                                  title="Send Email"
                                  className="p-1.5 rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
                                >
                                  <RiMailLine className="w-4 h-4" />
                                </a>
                                <button
                                  onClick={() => openDrawer(sub)}
                                  title="Review Lead Details"
                                  className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors"
                                >
                                  <RiEyeLine className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="py-14 text-center text-slate-500">
                            <div className="flex flex-col items-center justify-center">
                              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                                <RiInboxArchiveLine className="w-6 h-6" />
                              </div>
                              <p className="text-sm font-semibold text-slate-700">No submissions found</p>
                              <p className="text-xs text-slate-400 max-w-sm mt-1">
                                {searchQuery || statusFilter !== "all" || typeFilter !== "all"
                                  ? "No leads matched your search and filter criteria."
                                  : "Incoming client inquiries from the website will appear here automatically."}
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ANALYTICS & AUDIENCE */}
          {activeTab === "analytics" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Website Audience & Impressions
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Real-time analytics and visitor impressions captured in SQLite `Visit` table.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Top Visited Pages */}
                <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                  <h2 className="text-sm sm:text-base font-bold text-slate-900">Top Visited Routes</h2>
                  <div className="space-y-2">
                    {analytics?.topPages && analytics.topPages.length > 0 ? (
                      analytics.topPages.map((page: [string, number], idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                        >
                          <span className="font-mono text-slate-800 font-semibold">{page[0]}</span>
                          <span className="font-mono text-blue-600 font-bold">{page[1]} views</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500 py-3">No page view records yet.</p>
                    )}
                  </div>
                </div>

                {/* Top Referrers */}
                <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                  <h2 className="text-sm sm:text-base font-bold text-slate-900">Traffic Referrers</h2>
                  <div className="space-y-2">
                    {analytics?.topReferrers && analytics.topReferrers.length > 0 ? (
                      analytics.topReferrers.map((ref: [string, number], idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                        >
                          <span className="font-mono text-slate-800 truncate max-w-[220px]">{ref[0]}</span>
                          <span className="font-mono text-emerald-700 font-bold">{ref[1]} visits</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500 py-3">Direct navigation / No referrer headers.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DATABASE HEALTH */}
          {activeTab === "database" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Database Engine & Integrity
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Active Prisma ORM configuration, SQLite persistence, and lead backfill verification.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500">
                    FormSubmission Table
                  </span>
                  <div className="text-2xl font-bold text-slate-900 font-mono">{stats?.metrics.total || 0} Records</div>
                  <p className="text-xs text-slate-500">Client briefs and consultations stored</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500">
                    Visit Table
                  </span>
                  <div className="text-2xl font-bold text-slate-900 font-mono">{stats?.metrics.totalVisits || 0} Records</div>
                  <p className="text-xs text-slate-500">Audience impressions and analytics</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500">
                    AdminUser Enclave
                  </span>
                  <div className="text-2xl font-bold text-emerald-700 font-mono">1 Active Enclave</div>
                  <p className="text-xs text-slate-500">Bcrypt password encryption active</p>
                </div>
              </div>

              {/* Operations Box */}
              <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <h2 className="text-sm sm:text-base font-bold text-slate-900">Database Tools & Utilities</h2>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="/api/admin/export"
                    download
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                  >
                    <RiDownload2Line className="w-4 h-4" />
                    <span>Download Full Leads Export (CSV)</span>
                  </a>

                  <button
                    onClick={() => loadDashboardData(true)}
                    disabled={refreshing}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                  >
                    <RiRefreshLine className={`w-4 h-4 ${refreshing ? "animate-spin text-blue-600" : "text-slate-600"}`} />
                    <span>{refreshing ? "Syncing..." : "Sync Database Cache"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Quick Navigation Bar (Sticky on < 768px screens) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[10px] font-medium transition-colors ${
            activeTab === "overview" ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <RiDashboardLine className="w-5 h-5" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("leads");
            setTypeFilter("all");
          }}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[10px] font-medium relative transition-colors ${
            activeTab === "leads" ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <RiFileListLine className="w-5 h-5" />
          <span>Leads</span>
          {counts.new > 0 && (
            <span className="absolute top-0.5 right-1 w-2 h-2 rounded-full bg-emerald-500" />
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab("calls");
            setTypeFilter("call");
          }}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[10px] font-medium transition-colors ${
            activeTab === "calls" ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <RiPhoneLine className="w-5 h-5" />
          <span>Calls</span>
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[10px] font-medium transition-colors ${
            activeTab === "analytics" ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <RiBarChartBoxLine className="w-5 h-5" />
          <span>Traffic</span>
        </button>

        <button
          onClick={() => setActiveTab("database")}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[10px] font-medium transition-colors ${
            activeTab === "database" ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <RiDatabase2Line className="w-5 h-5" />
          <span>DB</span>
        </button>
      </nav>

      {/* Slide-Over Inspection Drawer for Selected Lead (Responsive Full-screen on mobile, 560px on desktop) */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full sm:max-w-xl bg-white border-l border-slate-200 h-full overflow-y-auto flex flex-col justify-between p-5 sm:p-6 shadow-2xl relative animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-blue-600 font-bold">
                    {selectedSubmission.token}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                      selectedSubmission.type === "call"
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}
                  >
                    {selectedSubmission.type}
                  </span>
                </div>
                <button
                  onClick={closeDrawer}
                  className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <RiCloseLine className="w-5 h-5" />
                </button>
              </div>

              {/* Client Info Card */}
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{selectedSubmission.name}</h3>
                    <p className="text-xs text-slate-600 font-mono mt-0.5">{selectedSubmission.email}</p>
                    {selectedSubmission.phone && (
                      <p className="text-xs text-slate-600 font-mono mt-0.5">{selectedSubmission.phone}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedSubmission.phone && (
                      <a
                        href={`https://wa.me/${selectedSubmission.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Hi ${selectedSubmission.name}, this is Epic Studio regarding your project (${selectedSubmission.token}).`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <RiWhatsappLine className="w-4 h-4" />
                      </a>
                    )}
                    <a
                      href={`mailto:${selectedSubmission.email}?subject=${encodeURIComponent(
                        `Epic Studio — Inquiry [${selectedSubmission.token}]`
                      )}`}
                      className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
                      title="Send Email"
                    >
                      <RiMailLine className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Status Selector */}
              <div className="mt-5 space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider font-bold text-slate-600">
                  Lead Status (Saved in SQLite)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: "new", label: "New" },
                    { key: "in_progress", label: "In Progress" },
                    { key: "contacted", label: "Contacted" },
                    { key: "converted", label: "Converted" },
                    { key: "archived", label: "Archived" },
                  ].map((st) => (
                    <button
                      key={st.key}
                      onClick={() => handleUpdateStatus(selectedSubmission.id, st.key)}
                      disabled={statusChangeLoading}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-colors ${
                        selectedSubmission.status === st.key
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Parameters Breakdown */}
              <div className="mt-5 space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-600">
                  Submission Parameters
                </h4>

                {selectedSubmission.type === "call" ? (
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-semibold">Scheduled Date</span>
                      <span className="text-slate-900 font-mono font-bold">{selectedSubmission.date}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-semibold">Time Slot</span>
                      <span className="text-slate-900 font-mono font-bold">{selectedSubmission.timeSlot}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-semibold">Format / Platform</span>
                      <span className="text-slate-900 font-mono font-bold">{selectedSubmission.platform || "Google Meet"}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-semibold">Timezone</span>
                      <span className="text-slate-900 font-mono font-bold">{selectedSubmission.timezone || "IST"}</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-semibold">Discipline</span>
                      <span className="text-slate-900 font-semibold">{selectedSubmission.discipline || "General"}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-semibold">Budget</span>
                      <span className="text-emerald-700 font-mono font-bold">{selectedSubmission.budget || "Open"}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-semibold">Timeline</span>
                      <span className="text-slate-900 font-semibold">{selectedSubmission.timeline || "Flexible"}</span>
                    </div>
                  </div>
                )}

                {/* Project Brief / Message */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                    {selectedSubmission.type === "call" ? "Consultation Topic" : "Client Project Brief"}
                  </span>
                  <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                    {selectedSubmission.type === "call"
                      ? selectedSubmission.callTopic || "General Technical Consultation"
                      : selectedSubmission.message || "No project description provided."}
                  </p>
                </div>

                {/* Internal Admin Notes */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono uppercase tracking-wider font-bold text-slate-600">
                      Internal Admin Notes
                    </label>
                    <span className="text-[10px] text-slate-500 font-mono">SQLite DB Record</span>
                  </div>
                  <textarea
                    rows={4}
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    placeholder="Enter private follow-up notes, call logs, proposal estimates..."
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 font-sans"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveNotes}
                      disabled={isSavingNotes}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors disabled:opacity-50 shadow-xs"
                    >
                      <RiSaveLine className="w-3.5 h-3.5" />
                      <span>{isSavingNotes ? "Saving..." : "Save Note"}</span>
                    </button>
                  </div>
                </div>

                {/* Enclave Metadata */}
                <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-500 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Submitted Timestamp:</span>
                    <span className="text-slate-800 font-semibold">
                      {new Date(selectedSubmission.createdAt).toLocaleString()}
                    </span>
                  </div>
                  {selectedSubmission.ip && (
                    <div className="flex items-center justify-between">
                      <span>Client IP:</span>
                      <span className="text-slate-800">{selectedSubmission.ip}</span>
                    </div>
                  )}
                  {selectedSubmission.userAgent && (
                    <div className="truncate">
                      <span>User Agent: </span>
                      <span className="text-slate-800">{selectedSubmission.userAgent}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-6">
              <button
                onClick={() => handleDeleteSubmission(selectedSubmission.id)}
                className="flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"
              >
                <RiDeleteBin6Line className="w-4 h-4" />
                <span>Delete Lead</span>
              </button>

              <button
                onClick={closeDrawer}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-600">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-xs uppercase tracking-widest text-slate-500 font-mono">
            Loading Admin Console...
          </p>
        </div>
      }
    >
      <AdminDashboardContent />
    </Suspense>
  );
}
