"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';
import { GoldButton, PremiumCard } from '../components/PremiumUI';
import { 
  BarChart, FolderOpen, Mail, Settings, 
  Terminal, Layers, Wrench, Edit, Trash, Plus 
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { admin, loading: authLoading, logoutAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const [enquiries, setEnquiries] = useState([]);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [skills, setSkills] = useState([]);
  const [messages, setMessages] = useState([]);
  const [siteSettings, setSiteSettings] = useState({});
  const [seoSettings, setSeoSettings] = useState({});

  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formFields, setFormFields] = useState({});

  useEffect(() => {
    if (!authLoading && !admin) {
      navigate('/admin/login');
    }
  }, [admin, authLoading, navigate]);

  const loadStats = async () => {
    try {
      const res = await apiFetch('/admin/stats');
      if (res.success) {
        setStats(res.stats);
        setEnquiries(res.latestEnquiries);
        setMessages(res.latestMessages);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!admin) return;

    async function loadData() {
      setLoading(true);
      await loadStats();
      setLoading(false);
    }
    loadData();
  }, [admin]);

  const fetchTabData = async (tab) => {
    setLoading(true);
    setEditingItem(null);
    setIsAdding(false);
    try {
      if (tab === 'stats') {
        await loadStats();
      } else if (tab === 'enquiries') {
        const res = await apiFetch('/enquiries');
        if (res.success) setEnquiries(res.data);
      } else if (tab === 'projects') {
        const res = await apiFetch('/projects/admin/all');
        if (res.success) setProjects(res.data);
      } else if (tab === 'services') {
        const res = await apiFetch('/services/admin/all');
        if (res.success) setServices(res.data);
      } else if (tab === 'skills') {
        const res = await apiFetch('/skills');
        if (res.success) setSkills(res.data);
      } else if (tab === 'messages') {
        const res = await apiFetch('/messages');
        if (res.success) setMessages(res.data);
      } else if (tab === 'settings') {
        const siteRes = await apiFetch('/settings/site');
        const seoRes = await apiFetch('/settings/seo');
        if (siteRes.success) setSiteSettings(siteRes.data);
        if (seoRes.success) setSeoSettings(seoRes.data);
      }
    } catch (err) {
      console.error('Failed to load tab data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    fetchTabData(tab);
  };

  const handleSave = async (e, endpoint, isNew, id) => {
    e.preventDefault();
    try {
      const method = isNew ? 'POST' : 'PUT';
      const path = isNew ? endpoint : `${endpoint}/${id}`;
      
      const res = await apiFetch(path, {
        method,
        body: JSON.stringify(formFields),
      });

      if (res.success) {
        setIsAdding(false);
        setEditingItem(null);
        setFormFields({});
        fetchTabData(activeTab);
      }
    } catch (err) {
      alert('Error saving record. Verify inputs.');
    }
  };

  const handleDelete = async (endpoint, id) => {
    if (!confirm('Confirm delete record?')) return;
    try {
      const res = await apiFetch(`${endpoint}/${id}`, {
        method: 'DELETE',
      });
      if (res.success) {
        fetchTabData(activeTab);
      }
    } catch (err) {
      alert('Failed to delete item.');
    }
  };

  const handleSettingsSave = async (e, type) => {
    e.preventDefault();
    try {
      const body = type === 'site' ? siteSettings : seoSettings;
      const res = await apiFetch(`/settings/${type}`, {
        method: 'PUT',
        body: JSON.stringify(body),
      });
      if (res.success) {
        alert('Settings updated successfully in database!');
      }
    } catch (err) {
      alert('Failed to save settings.');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center font-sans text-gold font-medium animate-pulse">
        DECRYPTING ADMIN CONSOLE...
      </div>
    );
  }

  if (!admin) return null;

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto font-sans text-xs md:text-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border border-navy/5 bg-white p-6 mb-8 rounded-lg shadow-premium gap-4 select-none">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gold text-white flex items-center justify-center font-bold font-pixel text-xl rounded-full">
            A
          </div>
          <div>
            <h1 className="font-serif text-lg text-navy font-bold uppercase tracking-wider">
              ADMIN CONTROL PANEL
            </h1>
            <p className="text-[10px] text-navy/50 uppercase font-sans tracking-widest mt-0.5 font-bold">
              Operator: {admin.username} / Role: {admin.role}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <GoldButton variant="outline" size="sm" onClick={() => navigate('/')}>
            Exit Console
          </GoldButton>
          <GoldButton variant="navy" size="sm" onClick={logoutAdmin}>
            Terminate Session
          </GoldButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-3 space-y-2 border-r-0 lg:border-r border-navy/5 pr-0 lg:pr-4">
          <button
            onClick={() => handleTabChange('stats')}
            className={`w-full text-left p-3 font-sans font-semibold text-xs uppercase tracking-wider border rounded-md flex items-center gap-2 transition-all ${
              activeTab === 'stats' ? 'border-gold bg-gold/5 text-gold' : 'border-navy/5 bg-white text-navy/70'
            }`}
          >
            <BarChart className="w-4 h-4" /> Overview Dashboard
          </button>
          <button
            onClick={() => handleTabChange('enquiries')}
            className={`w-full text-left p-3 font-sans font-semibold text-xs uppercase tracking-wider border rounded-md flex items-center gap-2 transition-all ${
              activeTab === 'enquiries' ? 'border-gold bg-gold/5 text-gold' : 'border-navy/5 bg-white text-navy/70'
            }`}
          >
            <Layers className="w-4 h-4" /> Project Enquiries
          </button>
          <button
            onClick={() => handleTabChange('projects')}
            className={`w-full text-left p-3 font-sans font-semibold text-xs uppercase tracking-wider border rounded-md flex items-center gap-2 transition-all ${
              activeTab === 'projects' ? 'border-gold bg-gold/5 text-gold' : 'border-navy/5 bg-white text-navy/70'
            }`}
          >
            <Terminal className="w-4 h-4" /> Portfolio Projects
          </button>
          <button
            onClick={() => handleTabChange('services')}
            className={`w-full text-left p-3 font-sans font-semibold text-xs uppercase tracking-wider border rounded-md flex items-center gap-2 transition-all ${
              activeTab === 'services' ? 'border-gold bg-gold/5 text-gold' : 'border-navy/5 bg-white text-navy/70'
            }`}
          >
            <Wrench className="w-4 h-4" /> Services Config
          </button>
          <button
            onClick={() => handleTabChange('skills')}
            className={`w-full text-left p-3 font-sans font-semibold text-xs uppercase tracking-wider border rounded-md flex items-center gap-2 transition-all ${
              activeTab === 'skills' ? 'border-gold bg-gold/5 text-gold' : 'border-navy/5 bg-white text-navy/70'
            }`}
          >
            <FolderOpen className="w-4 h-4" /> Tech Inventory
          </button>
          <button
            onClick={() => handleTabChange('messages')}
            className={`w-full text-left p-3 font-sans font-semibold text-xs uppercase tracking-wider border rounded-md flex items-center gap-2 transition-all ${
              activeTab === 'messages' ? 'border-gold bg-gold/5 text-gold' : 'border-navy/5 bg-white text-navy/70'
            }`}
          >
            <Mail className="w-4 h-4" /> Inbox Messages
          </button>
          <button
            onClick={() => handleTabChange('settings')}
            className={`w-full text-left p-3 font-sans font-semibold text-xs uppercase tracking-wider border rounded-md flex items-center gap-2 transition-all ${
              activeTab === 'settings' ? 'border-gold bg-gold/5 text-gold' : 'border-navy/5 bg-white text-navy/70'
            }`}
          >
            <Settings className="w-4 h-4" /> Site / SEO Settings
          </button>
        </div>

        <div className="lg:col-span-9">
          {loading ? (
            <div className="text-center py-20 font-sans text-gold font-medium animate-pulse">
              SYNCHRONIZING CORE CONTEXTS...
            </div>
          ) : (
            <>
              {activeTab === 'stats' && stats && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="border border-navy/5 bg-white p-5 text-center rounded-md shadow-premium">
                      <div className="font-sans font-bold text-[10px] text-navy/40 uppercase">Total Enquiries</div>
                      <div className="font-sans font-bold text-2xl text-gold mt-1">{stats.totalEnquiries}</div>
                    </div>
                    <div className="border border-navy/5 bg-white p-5 text-center rounded-md shadow-premium">
                      <div className="font-sans font-bold text-[10px] text-navy/40 uppercase">New Tickets</div>
                      <div className="font-sans font-bold text-2xl text-sage mt-1 animate-pulse">{stats.newEnquiries}</div>
                    </div>
                    <div className="border border-navy/5 bg-white p-5 text-center rounded-md shadow-premium">
                      <div className="font-sans font-bold text-[10px] text-navy/40 uppercase">Active Builders</div>
                      <div className="font-sans font-bold text-2xl text-gold mt-1">{stats.inProgressEnquiries}</div>
                    </div>
                    <div className="border border-navy/5 bg-white p-5 text-center rounded-md shadow-premium">
                      <div className="font-sans font-bold text-[10px] text-navy/40 uppercase">Portfolio Sites</div>
                      <div className="font-sans font-bold text-2xl text-navy mt-1">{stats.totalProjects}</div>
                    </div>
                  </div>

                  <h3 className="font-serif text-sm font-bold text-navy border-b border-navy/5 pb-2 mb-3">LATEST TICKETS INBOX</h3>
                  <div className="space-y-3 font-sans">
                    {enquiries.map((enq) => (
                      <div key={enq._id} className="border border-navy/5 bg-white p-4 flex justify-between items-center gap-4 rounded-md shadow-premium">
                        <div>
                          <div className="font-sans font-bold text-xs uppercase text-navy">{enq.projectType}</div>
                          <p className="text-xs text-navy/70 mt-1 leading-normal max-w-lg truncate">{enq.description}</p>
                          <span className="text-[10px] text-navy/40 font-semibold block mt-1">Sender: {enq.user ? enq.user.name : enq.guestInfo?.name} / Mail: {enq.user ? enq.user.email : enq.guestInfo?.email}</span>
                        </div>
                        <GoldButton variant="outline" size="sm" onClick={() => handleTabChange('enquiries')}>
                          Inspect
                        </GoldButton>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'enquiries' && (
                <div className="space-y-6">
                  {editingItem ? (
                    <PremiumCard>
                      <h3 className="font-serif text-lg font-bold text-navy mb-4 border-b border-navy/5 pb-2">UPDATE ENQUIRY STATUS</h3>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const body = {
                            status: formFields.status,
                            adminNotes: formFields.adminNotes,
                            timelineNote: formFields.timelineNote || `Administrator updated status to ${formFields.status}.`,
                          };
                          apiFetch(`/enquiries/${editingItem._id}`, {
                            method: 'PUT',
                            body: JSON.stringify(body),
                          }).then(() => fetchTabData('enquiries'));
                        }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-[10px] font-sans font-bold text-navy/60 uppercase mb-1.5">Update Status</label>
                          <select
                            value={formFields.status || editingItem.status}
                            onChange={(e) => setFormFields({ ...formFields, status: e.target.value })}
                            className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Discussion">In Discussion</option>
                            <option value="Proposal Sent">Proposal Sent</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-sans font-bold text-navy/60 uppercase mb-1.5">Timeline Log Message</label>
                          <input
                            type="text"
                            value={formFields.timelineNote || ''}
                            onChange={(e) => setFormFields({ ...formFields, timelineNote: e.target.value })}
                            placeholder="e.g. Discussed details via call. Blueprint approved."
                            className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-sans font-bold text-navy/60 uppercase mb-1.5">Internal Admin Notes</label>
                          <textarea
                            rows={4}
                            value={formFields.adminNotes || editingItem.adminNotes || ''}
                            onChange={(e) => setFormFields({ ...formFields, adminNotes: e.target.value })}
                            className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                          />
                        </div>

                        <div className="flex gap-2 justify-end">
                          <GoldButton variant="outline" size="sm" type="button" onClick={() => setEditingItem(null)}>
                            Cancel
                          </GoldButton>
                          <GoldButton variant="navy" size="sm" type="submit">
                            Save Status Change
                          </GoldButton>
                        </div>
                      </form>
                    </PremiumCard>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="font-serif text-sm font-bold text-navy border-b border-navy/5 pb-2 mb-4">CLIENT BLUEPRINT APPLICATIONS</h3>
                      {enquiries.length === 0 ? (
                        <p className="text-center font-sans text-xs text-navy/40">Queue Empty.</p>
                      ) : (
                        enquiries.map((enq) => (
                          <div key={enq._id} className="border border-navy/5 bg-white p-5 space-y-3 rounded-md shadow-premium">
                            <div className="flex justify-between items-center">
                              <span className="font-sans font-bold text-xs text-gold uppercase">{enq.projectType}</span>
                              <span className="text-[10px] font-sans font-bold border border-sage text-sage px-2 py-0.5 uppercase bg-offwhite rounded-sm">{enq.status}</span>
                            </div>
                            <p className="text-xs text-navy/80 font-sans leading-normal bg-offwhite p-3 rounded-md">{enq.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-navy/50">
                              <div>Budget: {enq.budget} / Timeline: {enq.timeline}</div>
                              <div>Contact Info: {enq.user ? enq.user.name : enq.guestInfo?.name} / {enq.user ? enq.user.email : enq.guestInfo?.email} ({enq.preferredContact})</div>
                            </div>
                            {enq.adminNotes && (
                              <div className="text-xs text-gold font-sans bg-gold/5 p-3 border border-gold/10 rounded-sm">
                                Note: {enq.adminNotes}
                              </div>
                            )}
                            <div className="flex justify-end gap-2 pt-3 border-t border-navy/5">
                              <GoldButton variant="outline" size="sm" onClick={() => {
                                setEditingItem(enq);
                                setFormFields({ status: enq.status, adminNotes: enq.adminNotes });
                              }}>
                                Edit Status
                              </GoldButton>
                              <GoldButton variant="navy" size="sm" onClick={() => handleDelete('/enquiries', enq._id)}>
                                Delete
                              </GoldButton>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="space-y-6">
                  {isAdding || editingItem ? (
                    <PremiumCard>
                      <h3 className="font-serif text-lg font-bold text-navy mb-4 border-b border-navy/5 pb-2">
                        {isAdding ? 'ADD PORTFOLIO PROJECT' : 'EDIT PROJECT BLUEPRINT'}
                      </h3>
                      <form onSubmit={(e) => handleSave(e, '/projects', isAdding, editingItem?._id)} className="space-y-4 font-sans text-xs">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Project Title</label>
                            <input
                              type="text"
                              required
                              value={formFields.title || ''}
                              onChange={(e) => setFormFields({ ...formFields, title: e.target.value })}
                              className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Project Slug</label>
                            <input
                              type="text"
                              required
                              value={formFields.slug || ''}
                              onChange={(e) => setFormFields({ ...formFields, slug: e.target.value })}
                              className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Category</label>
                            <select
                              value={formFields.category || 'Websites'}
                              onChange={(e) => setFormFields({ ...formFields, category: e.target.value })}
                              className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                            >
                              <option value="Websites">Websites</option>
                              <option value="Web Apps">Web Apps</option>
                              <option value="Software">Software</option>
                              <option value="E-commerce">E-commerce</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Client/Business Name</label>
                            <input
                              type="text"
                              value={formFields.clientName || ''}
                              onChange={(e) => setFormFields({ ...formFields, clientName: e.target.value })}
                              className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Description</label>
                          <textarea
                            rows={3}
                            required
                            value={formFields.description || ''}
                            onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
                            className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Live Demo URL</label>
                            <input
                              type="url"
                              value={formFields.liveUrl || ''}
                              onChange={(e) => setFormFields({ ...formFields, liveUrl: e.target.value })}
                              className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">GitHub URL</label>
                            <input
                              type="url"
                              value={formFields.githubUrl || ''}
                              onChange={(e) => setFormFields({ ...formFields, githubUrl: e.target.value })}
                              className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Cover Image URL *</label>
                          <input
                            type="text"
                            required
                            value={formFields.coverImage || '/uploads/project1-cover.png'}
                            onChange={(e) => setFormFields({ ...formFields, coverImage: e.target.value })}
                            className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                          />
                        </div>

                        <div className="flex gap-2 justify-end">
                          <GoldButton variant="outline" size="sm" type="button" onClick={() => { setIsAdding(false); setEditingItem(null); }}>
                            Cancel
                          </GoldButton>
                          <GoldButton variant="navy" size="sm" type="submit">
                            Save Project
                          </GoldButton>
                        </div>
                      </form>
                    </PremiumCard>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-navy/5 pb-2 mb-4">
                        <h3 className="font-serif text-sm font-bold text-navy">PORTFOLIO PROJECTS</h3>
                        <GoldButton variant="solid" size="sm" onClick={() => { setIsAdding(true); setFormFields({ category: 'Websites', coverImage: '/uploads/project1-cover.png' }); }}>
                          <Plus className="w-4 h-4 mr-1.5" /> Add Project
                        </GoldButton>
                      </div>

                      {projects.map((proj) => (
                        <div key={proj._id} className="border border-navy/5 bg-white p-4 flex justify-between items-center gap-4 rounded-md shadow-premium">
                          <div>
                            <div className="font-serif text-sm font-bold text-navy">{proj.title}</div>
                            <span className="text-[10px] text-sage font-bold uppercase">Cat: {proj.category} / Slug: {proj.slug}</span>
                          </div>
                          <div className="flex gap-2">
                            <GoldButton variant="outline" size="sm" onClick={() => { setEditingItem(proj); setFormFields(proj); }}>
                              <Edit className="w-4 h-4" />
                            </GoldButton>
                            <GoldButton variant="navy" size="sm" onClick={() => handleDelete('/projects', proj._id)}>
                              <Trash className="w-4 h-4" />
                            </GoldButton>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'services' && (
                <div className="space-y-6">
                  {isAdding || editingItem ? (
                    <PremiumCard>
                      <h3 className="font-serif text-lg font-bold text-navy mb-4 border-b border-navy/5 pb-2">
                        {isAdding ? 'ADD SERVICE CHANNEL' : 'EDIT SERVICE CHANNEL'}
                      </h3>
                      <form onSubmit={(e) => handleSave(e, '/services', isAdding, editingItem?._id)} className="space-y-4 font-sans text-xs">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Service Name</label>
                            <input
                              type="text"
                              required
                              value={formFields.name || ''}
                              onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                              className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Slug</label>
                            <input
                              type="text"
                              required
                              value={formFields.slug || ''}
                              onChange={(e) => setFormFields({ ...formFields, slug: e.target.value })}
                              className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Lucide Icon Name</label>
                            <input
                              type="text"
                              required
                              value={formFields.icon || 'Monitor'}
                              onChange={(e) => setFormFields({ ...formFields, icon: e.target.value })}
                              className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Ordering Number</label>
                            <input
                              type="number"
                              required
                              value={formFields.order || 0}
                              onChange={(e) => setFormFields({ ...formFields, order: parseInt(e.target.value) })}
                              className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Description</label>
                          <textarea
                            rows={3}
                            required
                            value={formFields.description || ''}
                            onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
                            className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                          />
                        </div>

                        <div className="flex gap-2 justify-end">
                          <GoldButton variant="outline" size="sm" type="button" onClick={() => { setIsAdding(false); setEditingItem(null); }}>
                            Cancel
                          </GoldButton>
                          <GoldButton variant="navy" size="sm" type="submit">
                            Save Service
                          </GoldButton>
                        </div>
                      </form>
                    </PremiumCard>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-navy/5 pb-2 mb-4">
                        <h3 className="font-serif text-sm font-bold text-navy">SERVICE STATIONS</h3>
                        <GoldButton variant="solid" size="sm" onClick={() => { setIsAdding(true); setFormFields({ icon: 'Monitor', order: 0 }); }}>
                          <Plus className="w-4 h-4 mr-1.5" /> Add Service
                        </GoldButton>
                      </div>

                      {services.map((serv) => (
                        <div key={serv._id} className="border border-navy/5 bg-white p-4 flex justify-between items-center gap-4 rounded-md shadow-premium">
                          <div>
                            <div className="font-serif text-sm font-bold text-navy">{serv.name}</div>
                            <span className="text-[10px] text-sage font-bold uppercase">Icon: {serv.icon} / Order: {serv.order}</span>
                          </div>
                          <div className="flex gap-2">
                            <GoldButton variant="outline" size="sm" onClick={() => { setEditingItem(serv); setFormFields(serv); }}>
                              <Edit className="w-4 h-4" />
                            </GoldButton>
                            <GoldButton variant="navy" size="sm" onClick={() => handleDelete('/services', serv._id)}>
                              <Trash className="w-4 h-4" />
                            </GoldButton>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-6">
                  {isAdding || editingItem ? (
                    <PremiumCard>
                      <h3 className="font-serif text-lg font-bold text-navy mb-4 border-b border-navy/5 pb-2">
                        {isAdding ? 'ADD TECH SKILL' : 'EDIT SKILL SPECIFICATION'}
                      </h3>
                      <form onSubmit={(e) => handleSave(e, '/skills', isAdding, editingItem?._id)} className="space-y-4 font-sans text-xs">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Skill Name</label>
                            <input
                              type="text"
                              required
                              value={formFields.name || ''}
                              onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                              className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Skill Level</label>
                            <input
                              type="text"
                              required
                              value={formFields.level || ''}
                              onChange={(e) => setFormFields({ ...formFields, level: e.target.value })}
                              className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Category Slot</label>
                            <select
                              value={formFields.category || 'Frontend'}
                              onChange={(e) => setFormFields({ ...formFields, category: e.target.value })}
                              className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                            >
                              <option value="Frontend">Frontend</option>
                              <option value="Backend">Backend</option>
                              <option value="Database">Database</option>
                              <option value="Tools">Tools</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Category Icon Identifier</label>
                            <input
                              type="text"
                              required
                              value={formFields.icon || 'code'}
                              onChange={(e) => setFormFields({ ...formFields, icon: e.target.value })}
                              className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Description</label>
                          <textarea
                            rows={3}
                            required
                            value={formFields.description || ''}
                            onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
                            className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                          />
                        </div>

                        <div className="flex gap-2 justify-end">
                          <GoldButton variant="outline" size="sm" type="button" onClick={() => { setIsAdding(false); setEditingItem(null); }}>
                            Cancel
                          </GoldButton>
                          <GoldButton variant="navy" size="sm" type="submit">
                            Save Skill
                          </GoldButton>
                        </div>
                      </form>
                    </PremiumCard>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-navy/5 pb-2 mb-4">
                        <h3 className="font-serif text-sm font-bold text-navy">SKILL INVENTORY</h3>
                        <GoldButton variant="solid" size="sm" onClick={() => { setIsAdding(true); setFormFields({ category: 'Frontend', icon: 'code' }); }}>
                          <Plus className="w-4 h-4 mr-1.5" /> Add Skill
                        </GoldButton>
                      </div>

                      {skills.map((sk) => (
                        <div key={sk._id} className="border border-navy/5 bg-white p-4 flex justify-between items-center gap-4 rounded-md shadow-premium">
                          <div>
                            <div className="font-serif text-sm font-bold text-navy">{sk.name}</div>
                            <span className="text-[10px] text-sage font-bold uppercase">Level: {sk.level} / Cat: {sk.category}</span>
                          </div>
                          <div className="flex gap-2">
                            <GoldButton variant="outline" size="sm" onClick={() => { setEditingItem(sk); setFormFields(sk); }}>
                              <Edit className="w-4 h-4" />
                            </GoldButton>
                            <GoldButton variant="navy" size="sm" onClick={() => handleDelete('/skills', sk._id)}>
                              <Trash className="w-4 h-4" />
                            </GoldButton>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <h3 className="font-serif text-sm font-bold text-navy border-b border-navy/5 pb-2 mb-4">COMMUNICATIONS LOGGER</h3>
                  {messages.length === 0 ? (
                    <p className="text-center font-sans text-xs text-navy/40">Logs clean. No transmissions.</p>
                  ) : (
                    messages.map((msg) => (
                      <div key={msg._id} className="border border-navy/5 bg-white p-4 flex justify-between items-start gap-4 rounded-md shadow-premium">
                        <div>
                          <div className="font-serif text-sm font-bold text-navy">{msg.subject}</div>
                          <p className="text-xs text-navy/70 leading-normal mt-1.5 p-3 bg-offwhite rounded-md">{msg.message}</p>
                          <div className="text-[10px] text-navy/40 font-semibold mt-2">Sender: {msg.name} ({msg.email}) / Received: {new Date(msg.createdAt).toLocaleDateString()}</div>
                        </div>
                        <GoldButton variant="navy" size="sm" onClick={() => handleDelete('/messages', msg._id)}>
                          Delete
                        </GoldButton>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-8">
                  <PremiumCard>
                    <h3 className="font-serif text-base font-bold text-navy mb-4 border-b border-navy/5 pb-2">BRAND & SYSTEM SETTINGS</h3>
                    <form onSubmit={(e) => handleSettingsSave(e, 'site')} className="space-y-4 font-sans text-xs">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Brand Name</label>
                          <input
                            type="text"
                            value={siteSettings.brandName || ''}
                            onChange={(e) => setSiteSettings({ ...siteSettings, brandName: e.target.value })}
                            className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Logo Text</label>
                          <input
                            type="text"
                            value={siteSettings.logoText || ''}
                            onChange={(e) => setSiteSettings({ ...siteSettings, logoText: e.target.value })}
                            className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Contact Email</label>
                          <input
                            type="email"
                            value={siteSettings.email || ''}
                            onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                            className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Availability Status</label>
                          <select
                            value={siteSettings.availabilityStatus || 'Available'}
                            onChange={(e) => setSiteSettings({ ...siteSettings, availabilityStatus: e.target.value })}
                            className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                          >
                            <option value="Available">Available</option>
                            <option value="Busy">Busy</option>
                            <option value="On Vacation">On Vacation</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Currently Building</label>
                          <input
                            type="text"
                            value={siteSettings.currentlyBuilding || ''}
                            onChange={(e) => setSiteSettings({ ...siteSettings, currentlyBuilding: e.target.value })}
                            className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Currently Learning</label>
                          <input
                            type="text"
                            value={siteSettings.currentlyLearning || ''}
                            onChange={(e) => setSiteSettings({ ...siteSettings, currentlyLearning: e.target.value })}
                            className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Profile Photo Image URL</label>
                        <input
                          type="text"
                          value={siteSettings.profileImage || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, profileImage: e.target.value })}
                          placeholder="e.g. /uploads/abhishek-avatar.png"
                          className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                        />
                      </div>

                      <GoldButton type="submit" variant="navy" size="sm">
                        Save Brands Config
                      </GoldButton>
                    </form>
                  </PremiumCard>

                  <PremiumCard>
                    <h3 className="font-serif text-base font-bold text-navy mb-4 border-b border-navy/5 pb-2">SEO & INDEX METRICS</h3>
                    <form onSubmit={(e) => handleSettingsSave(e, 'seo')} className="space-y-4 font-sans text-xs">
                      <div>
                        <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Site Title Tag</label>
                        <input
                          type="text"
                          value={seoSettings.siteTitle || ''}
                          onChange={(e) => setSeoSettings({ ...seoSettings, siteTitle: e.target.value })}
                          className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-sans font-bold text-navy/60 uppercase mb-1">Default Meta Description</label>
                        <textarea
                          rows={3}
                          value={seoSettings.defaultDescription || ''}
                          onChange={(e) => setSeoSettings({ ...seoSettings, defaultDescription: e.target.value })}
                          className="w-full border border-navy/10 bg-offwhite p-3 text-xs outline-none rounded-sm"
                        />
                      </div>

                      <GoldButton type="submit" variant="solid" size="sm">
                        Save SEO Settings
                      </GoldButton>
                    </form>
                  </PremiumCard>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
