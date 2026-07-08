import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Plus, 
  Calendar, 
  UserCheck, 
  FileText,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  ChevronRight,
  X,
  RefreshCw
} from 'lucide-react';
import { Application } from '../types';

interface AdminPanelProps {
  applications: Application[];
  onUpdateStatus: (id: string, status: Application['status'], notes?: string) => void;
  onDeleteApplication: (id: string) => void;
  onAddApplication: (app: Application) => void;
  onResetDatabase: () => void;
}

export default function AdminPanel({ 
  applications, 
  onUpdateStatus, 
  onDeleteApplication, 
  onAddApplication,
  onResetDatabase
}: AdminPanelProps) {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  
  // Custom Notes Editing State
  const [editingNotes, setEditingNotes] = useState('');
  
  // Interview Booking State
  const [bookingTime, setBookingTime] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Filter application list
  const filteredApps = applications.filter(app => {
    const matchesSearch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = statusFilter === 'all' ? true : app.status === statusFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleSelectApp = (app: Application) => {
    setSelectedApp(app);
    setEditingNotes(app.notes || '');
    setBookingDate('');
    setBookingTime('');
  };

  const handleSaveNotes = () => {
    if (!selectedApp) return;
    onUpdateStatus(selectedApp.id, selectedApp.status, editingNotes);
    // Update local selected state
    setSelectedApp({
      ...selectedApp,
      notes: editingNotes
    });
  };

  const handlePromoteStatus = (newStatus: Application['status']) => {
    if (!selectedApp) return;
    
    if (newStatus === 'interview_scheduled') {
      setIsBookingModalOpen(true);
      return;
    }

    onUpdateStatus(selectedApp.id, newStatus, selectedApp.notes);
    setSelectedApp({
      ...selectedApp,
      status: newStatus
    });
  };

  const handleConfirmInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp || !bookingDate || !bookingTime) return;

    const appointmentNotes = `🗓️ Interview confirmed for ${bookingDate} at ${bookingTime} EST.\n\n${editingNotes}`;
    onUpdateStatus(selectedApp.id, 'interview_scheduled', appointmentNotes);
    
    setSelectedApp({
      ...selectedApp,
      status: 'interview_scheduled',
      notes: appointmentNotes
    });

    setEditingNotes(appointmentNotes);
    setIsBookingModalOpen(false);
  };

  const handleSimulateNewCandidate = () => {
    const randomNames = ["Naomi Watts", "Maria Lopez", "Elena Rostova", "Sasha Grey", "Clara Sterling"];
    const randomNic = ["Glamour & Fashion", "Fitness & Yoga", "Alternative Cosplay", "ASMR Artist", "Lifestyle & Travel"];
    const randName = randomNames[Math.floor(Math.random() * randomNames.length)];
    const randNic = randomNic[Math.floor(Math.random() * randomNic.length)];
    
    const simApp: Application = {
      id: `IPEX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: `${randName} (Simulated)`,
      email: `${randName.toLowerCase().replace(' ', '')}@simulated.io`,
      instagram: `${randName.toLowerCase().replace(' ', '_')}`,
      tiktok: `${randName.toLowerCase().replace(' ', '')}_vlogs`,
      currentRevenue: Math.random() > 0.5 ? 2500 : 0,
      hasOnlyFans: Math.random() > 0.4,
      ofLink: "https://onlyfans.com/simulated_profile",
      hoursPerWeek: Math.floor(5 + Math.random() * 30),
      biggestChallenge: "traffic",
      status: 'pending',
      dateSubmitted: new Date().toISOString(),
      notes: `✨ Automatically generated simulated candidate interested in ${randNic} management.`
    };

    onAddApplication(simApp);
    handleSelectApp(simApp);
  };

  const getStatusBadge = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/10 px-2.5 py-1 rounded-full text-xs font-mono">Pending Audit</span>;
      case 'reviewing':
        return <span className="bg-blue-500/10 text-blue-400 border border-blue-500/10 px-2.5 py-1 rounded-full text-xs font-mono">Active Review</span>;
      case 'interview_scheduled':
        return <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/10 px-2.5 py-1 rounded-full text-xs font-mono">Interview Booked</span>;
      case 'accepted':
        return <span className="bg-green-500/10 text-green-400 border border-green-500/10 px-2.5 py-1 rounded-full text-xs font-mono">Partner Approved</span>;
      case 'declined':
        return <span className="bg-red-500/10 text-red-400 border border-red-500/10 px-2.5 py-1 rounded-full text-xs font-mono">Archived</span>;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0b1e] text-white overflow-hidden pb-24">
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />

      {/* Main Container */}
      <div className="relative mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        
        {/* Header Dashboard Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/5 pb-8 mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="font-mono text-xs font-semibold text-orange-400 tracking-wider uppercase">
                Creator Operations Control Center
              </span>
            </div>
            <h1 className="mt-2 font-display text-3xl font-black text-white sm:text-4xl">
              Onboarding Portal
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Manage incoming creator profiles, review traffic audit metrics, and schedule onboarding strategy sessions.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Simulate candidate */}
            <button
              onClick={handleSimulateNewCandidate}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2.5 text-xs font-bold text-white hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4" />
              <span>Simulate Candidate</span>
            </button>

            {/* Reset DB */}
            <button
              onClick={onResetDatabase}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs font-semibold text-gray-300 hover:bg-white/10 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset Database</span>
            </button>
          </div>
        </div>

        {/* Database Stats Bar */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-10">
          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-5">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Total Intake Pool</span>
            <div className="text-2xl font-black font-mono text-white mt-1">
              {applications.length}
            </div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-5">
            <span className="text-[10px] font-mono text-yellow-400 uppercase tracking-wider block">Pending Audits</span>
            <div className="text-2xl font-black font-mono text-white mt-1">
              {applications.filter(a => a.status === 'pending').length}
            </div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-5">
            <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider block">Interviews Scheduled</span>
            <div className="text-2xl font-black font-mono text-white mt-1">
              {applications.filter(a => a.status === 'interview_scheduled').length}
            </div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-5">
            <span className="text-[10px] font-mono text-green-400 uppercase tracking-wider block">Approved Partners</span>
            <div className="text-2xl font-black font-mono text-white mt-1">
              {applications.filter(a => a.status === 'accepted').length} / 5 slots
            </div>
          </div>
        </div>

        {/* Portal Workspace Grid */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          
          {/* LEFT COLUMN: CANDIDATE SELECTOR DATABASE */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Search and Filters */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search name, email, or file ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:border-orange-500/50 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="h-3.5 w-3.5 text-gray-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="flex-grow appearance-none rounded-xl border border-white/10 bg-black/40 py-2 px-3 text-xs text-gray-400 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Intake States</option>
                  <option value="pending">Pending Audit</option>
                  <option value="reviewing">Active Review</option>
                  <option value="interview_scheduled">Interview Booked</option>
                  <option value="accepted">Approved Partner</option>
                  <option value="declined">Archived</option>
                </select>
              </div>
            </div>

            {/* Application List */}
            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {filteredApps.length === 0 ? (
                <div className="text-center py-12 rounded-2xl border border-dashed border-white/5 bg-white/[0.01]">
                  <Users className="h-8 w-8 text-gray-600 mx-auto mb-3" />
                  <p className="text-xs text-gray-500 font-mono">No matching candidates found.</p>
                </div>
              ) : (
                filteredApps.map((app) => {
                  const isSelected = selectedApp?.id === app.id;
                  return (
                    <div
                      key={app.id}
                      onClick={() => handleSelectApp(app)}
                      className={`cursor-pointer rounded-xl border p-4 text-left transition-all duration-200 ${
                        isSelected 
                          ? 'bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/40 shadow-md shadow-orange-500/5' 
                          : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="font-display text-sm font-bold text-white">
                            {app.fullName}
                          </h4>
                          <span className="text-[10px] text-gray-500 font-mono block mt-0.5">
                            ID: {app.id} • {new Date(app.dateSubmitted).toLocaleDateString()}
                          </span>
                        </div>
                        {getStatusBadge(app.status)}
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400 font-mono border-t border-white/5 pt-3">
                        <span>Rev: ${app.currentRevenue === 0 ? "New" : `${app.currentRevenue.toLocaleString()}/mo`}</span>
                        <span>Hours: {app.hoursPerWeek}h/wk</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: ACTIVE AUDIT INTAKE DETAILS */}
          <div className="lg:col-span-7">
            {selectedApp ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border border-white/5 bg-white/[0.01] p-6 sm:p-8 space-y-6 relative overflow-hidden"
              >
                {/* Header Action Row */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/5 pb-6">
                  <div>
                    <span className="font-mono text-xs font-semibold text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-md">
                      Audit File Active
                    </span>
                    <h2 className="mt-2 font-display text-xl font-bold text-white">
                      {selectedApp.fullName}
                    </h2>
                    <span className="text-xs text-gray-500 font-mono block mt-0.5">
                      Contact: {selectedApp.email} • Submitted: {new Date(selectedApp.dateSubmitted).toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onDeleteApplication(selectedApp.id);
                      setSelectedApp(null);
                    }}
                    className="p-2 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/15 transition-colors cursor-pointer"
                    title="Delete Application"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Simulated Social Handles Metrics */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl bg-black/40 border border-white/5 p-4 text-center">
                    <span className="text-[10px] font-mono text-gray-500 uppercase">Instagram</span>
                    <span className="text-xs font-bold text-white block mt-1.5 truncate">
                      {selectedApp.instagram ? `@${selectedApp.instagram}` : 'Not Provided'}
                    </span>
                  </div>
                  <div className="rounded-xl bg-black/40 border border-white/5 p-4 text-center">
                    <span className="text-[10px] font-mono text-gray-500 uppercase">TikTok</span>
                    <span className="text-xs font-bold text-white block mt-1.5 truncate">
                      {selectedApp.tiktok ? `@${selectedApp.tiktok}` : 'Not Provided'}
                    </span>
                  </div>
                  <div className="rounded-xl bg-black/40 border border-white/5 p-4 text-center">
                    <span className="text-[10px] font-mono text-gray-500 uppercase">Current OnlyFans</span>
                    <span className="text-xs font-bold text-orange-400 block mt-1.5 truncate">
                      {selectedApp.hasOnlyFans ? "Active Account" : "Brand New"}
                    </span>
                  </div>
                </div>

                {/* Audit specifications */}
                <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-5 space-y-4 text-xs leading-relaxed">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500 uppercase font-mono tracking-wider text-[10px]">Baseline Monthly Revenue</span>
                    <span className="text-white font-mono font-bold">${selectedApp.currentRevenue.toLocaleString()} / mo</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500 uppercase font-mono tracking-wider text-[10px]">Hours Allocated / Week</span>
                    <span className="text-white font-mono font-bold">{selectedApp.hoursPerWeek} Hours</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500 uppercase font-mono tracking-wider text-[10px]">Primary Bottleneck</span>
                    <span className="text-white font-bold uppercase tracking-wider font-mono text-[10px]">{selectedApp.biggestChallenge}</span>
                  </div>
                  {selectedApp.notes && (
                    <div className="pt-2">
                      <span className="text-gray-500 uppercase font-mono tracking-wider text-[10px] block mb-1">Candidate Profile Notes / Cover Memo:</span>
                      <p className="text-gray-400 italic">"{selectedApp.notes}"</p>
                    </div>
                  )}
                </div>

                {/* INTERACTIVE WORKFLOW STATUS CONTROLLER */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                    🚨 Simulated Action Desk:
                  </h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {/* Move to reviewing */}
                    {selectedApp.status === 'pending' && (
                      <button
                        onClick={() => handlePromoteStatus('reviewing')}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/20 border border-blue-500/20 text-blue-400 px-3 py-2 text-xs font-bold hover:bg-blue-500/30 transition-all cursor-pointer"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>Move to Active Review</span>
                      </button>
                    )}

                    {/* Move to schedule interview */}
                    {(selectedApp.status === 'pending' || selectedApp.status === 'reviewing') && (
                      <button
                        onClick={() => handlePromoteStatus('interview_scheduled')}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500/20 border border-indigo-500/20 text-indigo-400 px-3 py-2 text-xs font-bold hover:bg-indigo-500/30 transition-all cursor-pointer"
                      >
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Book Onboarding Interview</span>
                      </button>
                    )}

                    {/* Move to accepted */}
                    {selectedApp.status !== 'accepted' && (
                      <button
                        onClick={() => handlePromoteStatus('accepted')}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-green-500/20 border border-green-500/20 text-green-400 px-3 py-2 text-xs font-bold hover:bg-green-500/30 transition-all cursor-pointer"
                      >
                        <UserCheck className="h-3.5 w-3.5" />
                        <span>Approve Partnership</span>
                      </button>
                    )}

                    {/* Move to declined */}
                    {selectedApp.status !== 'declined' && (
                      <button
                        onClick={() => handlePromoteStatus('declined')}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/20 border border-red-500/20 text-red-400 px-3 py-2 text-xs font-bold hover:bg-red-500/30 transition-all cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                        <span>Archive Application</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* DIRECT EDITING AUDITOR NOTES */}
                <div className="space-y-2.5 pt-4 border-t border-white/5">
                  <label className="block text-xs font-semibold font-mono uppercase tracking-wider text-gray-500">
                    Direct Auditor Memo Logs (CRUD):
                  </label>
                  <textarea
                    rows={3}
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    placeholder="E.g., verified IG metrics at 24k followers. Strong cosplay aesthetics. Audit suggests +450% revenue ceiling if DM chatting is fully staffed..."
                    className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 px-4 text-xs text-white placeholder-gray-600 focus:border-orange-500/60 focus:outline-none resize-none font-mono"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveNotes}
                      className="cursor-pointer rounded-lg bg-orange-500/10 border border-orange-500/25 px-4 py-2 text-xs font-bold text-orange-400 hover:bg-orange-500/20 transition-all"
                    >
                      Save Auditor Note
                    </button>
                  </div>
                </div>

              </motion.div>
            ) : (
              <div className="h-full rounded-3xl border border-dashed border-white/5 bg-white/[0.01] p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <FileText className="h-12 w-12 text-gray-600 mb-4" />
                <h3 className="font-display text-lg font-bold text-white mb-1">
                  Intake Dashboard Ready
                </h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  Select a candidate file from the list on the left to review social statistics, current monthly earnings, and manage the onboarding pipeline.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* BOOKING INTERVIEW SCHEDULE MODAL */}
      {isBookingModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-[#0d0e2c] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 h-16 w-16 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-400" />
                <span>Schedule Interview</span>
              </h3>
              <button 
                onClick={() => setIsBookingModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmInterview} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                  Select Date:
                </label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 px-4 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                  Select Time Slot (EST):
                </label>
                <select
                  required
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 px-4 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="">Choose time slot</option>
                  <option value="10:00 AM">10:00 AM EST (Morning Session)</option>
                  <option value="11:30 AM">11:30 AM EST (Morning Session)</option>
                  <option value="2:00 PM">2:00 PM EST (Afternoon Session)</option>
                  <option value="3:30 PM">3:30 PM EST (Afternoon Session)</option>
                  <option value="5:00 PM">5:00 PM EST (Twilight Session)</option>
                </select>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-xl text-[11px] text-gray-400 leading-normal flex items-start gap-2.5">
                <ShieldAlert className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>Simulated auto-invitations will schedule on your calendar. An automated note with verification details will be appended.</span>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-3.5 font-bold text-xs text-white hover:opacity-90 transition-opacity mt-4"
              >
                Confirm Interview Appointment
              </button>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
