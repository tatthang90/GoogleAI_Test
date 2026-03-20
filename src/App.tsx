/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  LayoutGrid, 
  RefreshCw, 
  ClipboardList, 
  Settings, 
  Map as MapIcon,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  UserCircle2,
  Database,
  ShieldCheck,
  Zap,
  Edit2,
  Save,
  X,
  Plus,
  Trash2
} from 'lucide-react';
import { cloneDeep, set } from 'lodash';
import { projects, ProjectData } from './data';

// --- Helper Components ---

interface BadgeProps {
  children: React.ReactNode;
  type?: string;
  key?: React.Key;
}

const Badge = ({ children, type = 'gray' }: BadgeProps) => {
  const styles: Record<string, string> = {
    blue: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    purple: 'bg-olive-50 text-olive-600 border-olive-100',
    teal: 'bg-teal-50 text-teal-600 border-teal-100',
    green: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    pink: 'bg-stone-100 text-stone-700 border-stone-200',
    gray: 'bg-stone-100 text-stone-600 border-stone-200',
    red: 'bg-red-50 text-red-700 border-red-100',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${styles[type] || styles.gray}`}>
      {children}
    </span>
  );
};

interface SectionHeaderProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}

const SectionHeader = ({ icon: Icon, title, subtitle }: SectionHeaderProps) => (
  <div className="flex items-start gap-4 mb-8">
    <div className="w-10 h-10 bg-vib-blue rounded-xl flex items-center justify-center text-white shadow-lg shadow-nature-forest/20">
      <Icon size={20} />
    </div>
    <div>
      <h2 className="text-lg font-bold text-stone-800 leading-tight">{title}</h2>
      <p className="text-xs text-stone-500 mt-1">{subtitle}</p>
    </div>
  </div>
);

// --- Main App Component ---

export default function App() {
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id);
  const [allProjects, setAllProjects] = useState<ProjectData[]>(projects);
  const [activeTab, setActiveTab] = useState('om');
  const [isEditing, setIsEditing] = useState(false);
  const [tempProjects, setTempProjects] = useState<ProjectData[]>(projects);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('MULTI_PROJECT_DASHBOARD_DATA');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setAllProjects(parsedData);
        setTempProjects(parsedData);
      } catch (e) {
        console.error('Failed to parse saved data', e);
      }
    }
  }, []);

  const activeProject = (isEditing ? tempProjects : allProjects).find(p => p.id === activeProjectId) || allProjects[0];

  const handleEdit = () => {
    setTempProjects(cloneDeep(allProjects));
    setIsEditing(true);
  };

  const handleSave = () => {
    setAllProjects(tempProjects);
    localStorage.setItem('MULTI_PROJECT_DASHBOARD_DATA', JSON.stringify(tempProjects));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const updateField = (path: string, value: any) => {
    const newProjects = cloneDeep(tempProjects);
    const projectIndex = newProjects.findIndex(p => p.id === activeProjectId);
    if (projectIndex !== -1) {
      set(newProjects[projectIndex], path, value);
      setTempProjects(newProjects);
    }
  };

  const tabs = [
    { id: 'om', label: '🗺️ Operating Model' },
    { id: 'org', label: '🏗️ Cơ cấu Tổ chức' },
    { id: 'teams', label: '👥 Phân bổ Nhân sự' },
    { id: 'process', label: '🔄 Luồng Phối hợp' },
    { id: 'raci', label: '📋 Ma trận RACI' },
    { id: 'governance', label: '📌 Governance & Issues' }
  ];

  const { metadata, operatingModel, orgChart, teams, smartsales, processes, governance, raci } = activeProject;

  return (
    <div className="flex h-screen bg-nature-mist overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-nature-moss text-white flex flex-col shrink-0 border-r border-white/10">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-vib-blue rounded-lg flex items-center justify-center">
              <Database size={18} className="text-white" />
            </div>
            <span className="font-bold text-sm tracking-tight">VIB PROJECT PORTAL</span>
          </div>
          <p className="text-[10px] text-stone-200 uppercase tracking-widest font-bold">Quản trị vận hành & RACI</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          <div className="px-3 py-2 text-[10px] font-bold text-stone-200 uppercase tracking-wider">Danh sách dự án</div>
          {allProjects.map((project) => {
            const Icon = project.icon;
            const isActive = activeProjectId === project.id;
            return (
              <button
                key={project.id}
                onClick={() => setActiveProjectId(project.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-vib-blue text-white shadow-lg shadow-nature-forest/20' 
                    : 'text-stone-100 hover:bg-stone-600 hover:text-white'
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-stone-600 group-hover:bg-stone-500'}`}>
                  <Icon size={16} />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold leading-none mb-1">{project.name}</div>
                  <div className={`text-[9px] truncate w-36 ${isActive ? 'text-white/70' : 'text-stone-100'}`}>{project.description}</div>
                </div>
                {isActive && <ChevronRight size={14} className="ml-auto opacity-50" />}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold text-white">HỆ THỐNG ĐANG CHẠY</span>
            </div>
            <p className="text-[9px] text-stone-200 leading-relaxed">Dữ liệu được đồng bộ hóa thời gian thực với LocalStorage.</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-vib-blue text-white p-10 md:px-12 md:py-10 relative overflow-hidden shrink-0">
          <div className="absolute top-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute bottom-[-40px] left-[30%] w-[200px] h-[200px] rounded-full bg-vib-orange/15 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3.5 py-1 text-[11px] font-medium tracking-wider">
                🏦 VIB · {metadata.title} <span className="bg-vib-orange text-white px-2 py-0.5 rounded-full text-[10px] font-bold ml-2">{metadata.version}</span>
              </div>
            
            <div className="flex gap-2">
              {!isEditing ? (
                <button 
                  onClick={handleEdit}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-xs font-bold transition-all"
                >
                  <Edit2 size={14} /> Chỉnh sửa
                </button>
              ) : (
                <>
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 border border-emerald-400 rounded-lg px-4 py-2 text-xs font-bold transition-all shadow-lg"
                  >
                    <Save size={14} /> Lưu thay đổi
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-xs font-bold transition-all"
                  >
                    <X size={14} /> Hủy
                  </button>
                </>
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-3 max-w-2xl">
              <input 
                value={metadata.title}
                onChange={(e) => updateField('metadata.title', e.target.value)}
                className="text-3xl font-bold leading-tight bg-white/10 border border-white/20 rounded px-2 w-full focus:outline-none focus:ring-2 focus:ring-vib-orange"
                placeholder="Tiêu đề chính"
              />
              <input 
                value={metadata.subtitle}
                onChange={(e) => updateField('metadata.subtitle', e.target.value)}
                className="text-3xl font-bold leading-tight bg-white/10 border border-white/20 rounded px-2 w-full focus:outline-none focus:ring-2 focus:ring-vib-orange"
                placeholder="Tiêu đề phụ"
              />
              <textarea 
                value={metadata.description}
                onChange={(e) => updateField('metadata.description', e.target.value)}
                className="text-sm opacity-80 font-light bg-white/10 border border-white/20 rounded px-2 w-full h-20 focus:outline-none focus:ring-2 focus:ring-vib-orange resize-none"
                placeholder="Mô tả"
              />
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold leading-tight mb-2">{metadata.title}<br />{metadata.subtitle}</h1>
              <p className="text-sm opacity-80 font-light mb-6 max-w-2xl">{metadata.description}</p>
            </>
          )}
          
          <div className="flex flex-wrap gap-6 text-[11px] opacity-70 mt-6">
            <span className="flex items-center gap-1.5">
              <Clock size={12} /> 📅 
              {isEditing ? (
                <input 
                  value={metadata.effectiveDate}
                  onChange={(e) => updateField('metadata.effectiveDate', e.target.value)}
                  className="bg-white/10 border border-white/20 rounded px-1 focus:outline-none"
                />
              ) : (
                ` Hiệu lực từ ${metadata.effectiveDate}`
              )}
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={12} /> 👥 
              {isEditing ? (
                <input 
                  value={metadata.headcount}
                  onChange={(e) => updateField('metadata.headcount', e.target.value)}
                  className="bg-white/10 border border-white/20 rounded px-1 focus:outline-none"
                />
              ) : (
                ` ${metadata.headcount}`
              )}
            </span>
            <span className="flex items-center gap-1.5">
              <RefreshCw size={12} /> 🔄 
              {isEditing ? (
                <input 
                  value={metadata.milestones}
                  onChange={(e) => updateField('metadata.milestones', e.target.value)}
                  className="bg-white/10 border border-white/20 rounded px-1 focus:outline-none"
                />
              ) : (
                ` ${metadata.milestones}`
              )}
            </span>
          </div>
        </div>
      </header>

      {/* NAV */}
      <nav className="bg-white border-b-2 border-vib-blue px-6 md:px-12 flex gap-1 sticky top-0 z-50 overflow-x-auto scrollbar-hide shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3.5 text-xs font-semibold whitespace-nowrap transition-all border-b-2 -mb-[2px] ${
              activeTab === tab.id 
                ? 'text-vib-blue border-vib-blue' 
                : 'text-stone-500 border-transparent hover:text-vib-blue'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* CONTENT */}
      <main className="flex-1 overflow-y-auto p-8 md:px-12 bg-stone-50 custom-scrollbar">
        <div className="max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeProjectId}-${activeTab}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* OPERATING MODEL TAB */}
              {activeTab === 'om' && (
                <div className="space-y-8">
                  <SectionHeader 
                    icon={MapIcon} 
                    title={`Operating Model — ${metadata.title}`} 
                    subtitle={metadata.subtitle} 
                  />

                <div className="bg-vib-orange-light border-l-4 border-vib-orange p-4 rounded-r-xl mb-6">
                  <p className="text-xs text-stone-800">
                    <strong className="text-amber-700">⚡ Giai đoạn đặc biệt:</strong> Song song Hypercare (Deloitte đến 31/3) + fix issues digital card + CR003 đang phân tích + data migration new core. Sau 31/3 toàn bộ vận hành chuyển về BTS CRM. Cần clear governance ngay.
                  </p>
                </div>

                {/* Tiers */}
                <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-stone-50 border-b border-stone-200 px-5 py-3 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                    📐 MÔ HÌNH HỖ TRỢ — TỪ BU ĐẾN RESOLUTION
                  </div>
                  <div className="divide-y divide-stone-100">
                    {operatingModel.tiers.map((tier, tIdx) => (
                      <div key={tier.id} className="grid grid-cols-[120px_1fr] items-stretch relative group/tier">
                        <div className={`${tier.color} text-white p-4 flex flex-col items-center justify-center text-center leading-tight relative`}>
                          {isEditing && (
                            <button 
                              onClick={() => {
                                const newTiers = [...operatingModel.tiers];
                                newTiers.splice(tIdx, 1);
                                updateField('operatingModel.tiers', newTiers);
                              }}
                              className="absolute top-1 left-1 text-white/50 hover:text-white transition-colors"
                            >
                              <Trash2 size={12} />
                            </button>
                          )}
                          {isEditing ? (
                            <input 
                              value={tier.label}
                              onChange={(e) => updateField(`operatingModel.tiers[${tIdx}].label`, e.target.value)}
                              className="bg-white/20 border border-white/30 rounded px-1 w-full text-center text-xs font-bold focus:outline-none"
                            />
                          ) : (
                            <span className="text-xs font-bold">{tier.label}</span>
                          )}
                          {isEditing ? (
                            <input 
                              value={tier.subLabel}
                              onChange={(e) => updateField(`operatingModel.tiers[${tIdx}].subLabel`, e.target.value)}
                              className="bg-white/10 border border-white/20 rounded px-1 w-full text-center text-[10px] mt-1 focus:outline-none"
                            />
                          ) : (
                            <span className="text-[10px] opacity-80 mt-1">{tier.subLabel}</span>
                          )}
                        </div>
                        <div className="p-5">
                          {isEditing ? (
                            <div className="space-y-2">
                              <input 
                                value={tier.title}
                                onChange={(e) => updateField(`operatingModel.tiers[${tIdx}].title`, e.target.value)}
                                className="text-sm font-bold text-stone-900 w-full border border-stone-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-vib-blue"
                              />
                              <textarea 
                                value={tier.content}
                                onChange={(e) => updateField(`operatingModel.tiers[${tIdx}].content`, e.target.value)}
                                className="text-xs text-stone-600 w-full border border-stone-200 rounded px-2 py-1 h-20 focus:outline-none focus:ring-1 focus:ring-vib-blue resize-none"
                              />
                              <div className="flex flex-wrap gap-2 items-center">
                                <span className="text-[10px] font-bold text-stone-400">BADGES:</span>
                                {tier.badges.map((badge, bIdx) => (
                                  <div key={bIdx} className="flex items-center gap-1 bg-stone-100 rounded-full px-2 py-0.5 border border-stone-200">
                                    <input 
                                      value={badge.text}
                                      onChange={(e) => updateField(`operatingModel.tiers[${tIdx}].badges[${bIdx}].text`, e.target.value)}
                                      className="bg-transparent text-[10px] font-semibold focus:outline-none w-24"
                                    />
                                    <button 
                                      onClick={() => {
                                        const newBadges = [...tier.badges];
                                        newBadges.splice(bIdx, 1);
                                        updateField(`operatingModel.tiers[${tIdx}].badges`, newBadges);
                                      }}
                                      className="text-stone-400 hover:text-red-500"
                                    >
                                      <X size={10} />
                                    </button>
                                  </div>
                                ))}
                                <button 
                                  onClick={() => {
                                    const newBadges = [...tier.badges, { text: 'New Badge', type: 'gray' }];
                                    updateField(`operatingModel.tiers[${tIdx}].badges`, newBadges);
                                  }}
                                  className="p-1 rounded-full bg-stone-100 text-stone-400 hover:bg-stone-200 hover:text-vib-blue transition-colors"
                                >
                                  <Plus size={10} />
                                </button>
                              </div>
                              <div className="flex items-center gap-2">
                                <AlertCircle size={14} className="text-red-400" />
                                <input 
                                  value={tier.warning || ''}
                                  onChange={(e) => updateField(`operatingModel.tiers[${tIdx}].warning`, e.target.value)}
                                  placeholder="Cảnh báo (nếu có)"
                                  className="text-[10px] text-red-700 w-full border border-red-100 bg-red-50 rounded px-2 py-1 focus:outline-none"
                                />
                              </div>
                            </div>
                          ) : (
                            <>
                              <h4 className="text-sm font-bold text-stone-900 mb-1.5">{tier.title}</h4>
                              <p className="text-xs text-stone-600 leading-relaxed">{tier.content}</p>
                              {tier.badges.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                  {tier.badges.map((badge, idx) => (
                                    <Badge key={idx} type={badge.type}>{badge.text}</Badge>
                                  ))}
                                </div>
                              )}
                              {tier.warning && (
                                <div className="mt-3 p-2.5 bg-red-50 text-red-700 rounded-lg text-[10px] font-medium flex items-center gap-2 border border-red-100">
                                  <AlertCircle size={14} /> {tier.warning}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                    {isEditing && (
                      <button 
                        onClick={() => {
                          const newTiers = [...operatingModel.tiers, {
                            id: `tier-${Date.now()}`,
                            label: 'NEW TIER',
                            subLabel: 'Description',
                            color: 'bg-stone-500',
                            title: 'New Tier Title',
                            content: 'New Tier Content',
                            badges: []
                          }];
                          updateField('operatingModel.tiers', newTiers);
                        }}
                        className="w-full p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-center gap-2 text-stone-400 hover:text-vib-blue transition-colors font-bold text-xs"
                      >
                        <Plus size={14} /> THÊM TIER HỖ TRỢ
                      </button>
                    )}
                  </div>
                </div>

                {/* Workstreams */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {operatingModel.workstreams.map((ws, wIdx) => (
                    <div 
                      key={ws.id} 
                      className={`bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm flex flex-col relative group/ws ${ws.fullWidth ? 'md:col-span-2' : ''}`}
                    >
                      <div className={`px-5 py-3.5 text-xs font-bold text-white flex items-center justify-between ${
                        ws.color === 'blue' ? 'bg-vib-blue' : 
                        ws.color === 'purple' ? 'bg-olive-600' : 
                        ws.color === 'teal' ? 'bg-emerald-600' : 
                        ws.color === 'orange' ? 'bg-vib-orange' : 
                        ws.color === 'amber' ? 'bg-amber-700' : 
                        ws.color === 'green' ? 'bg-emerald-600' : 'bg-stone-600'
                      }`}>
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-[11px]">{ws.id}</span>
                          {isEditing ? (
                            <input 
                              value={ws.title}
                              onChange={(e) => updateField(`operatingModel.workstreams[${wIdx}].title`, e.target.value)}
                              className="bg-white/10 border border-white/20 rounded px-2 py-0.5 focus:outline-none w-full"
                            />
                          ) : ws.title}
                        </div>
                        {isEditing && (
                          <button 
                            onClick={() => {
                              const newWS = [...operatingModel.workstreams];
                              newWS.splice(wIdx, 1);
                              updateField('operatingModel.workstreams', newWS);
                            }}
                            className="text-white/50 hover:text-white transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                      <div className="p-5 flex-1">
                        {ws.subItems ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {ws.subItems.map((item, idx) => (
                              <div key={idx} className={`p-4 rounded-xl border relative group/subitem ${
                                item.type === 'blue' ? 'bg-vib-blue-light border-vib-blue/10' : 'bg-pink-50 border-pink-100'
                              }`}>
                                {isEditing ? (
                                  <div className="space-y-2">
                                    <div className="flex justify-between items-start">
                                      <input 
                                        value={item.title}
                                        onChange={(e) => updateField(`operatingModel.workstreams[${wIdx}].subItems[${idx}].title`, e.target.value)}
                                        className={`text-[11px] font-bold bg-white/50 border border-black/5 rounded px-1 w-full focus:outline-none ${
                                          item.type === 'blue' ? 'text-vib-blue-dark' : 'text-pink-700'
                                        }`}
                                      />
                                      <button 
                                        onClick={() => {
                                          const newSubItems = [...ws.subItems!];
                                          newSubItems.splice(idx, 1);
                                          updateField(`operatingModel.workstreams[${wIdx}].subItems`, newSubItems);
                                        }}
                                        className="text-stone-400 hover:text-red-500 ml-1"
                                      >
                                        <X size={12} />
                                      </button>
                                    </div>
                                    <textarea 
                                      value={item.content}
                                      onChange={(e) => updateField(`operatingModel.workstreams[${wIdx}].subItems[${idx}].content`, e.target.value)}
                                      className="text-[11px] text-stone-600 bg-white/50 border border-black/5 rounded px-1 w-full h-24 focus:outline-none resize-none"
                                    />
                                  </div>
                                ) : (
                                  <>
                                    <h5 className={`text-[11px] font-bold mb-2 ${
                                      item.type === 'blue' ? 'text-vib-blue-dark' : 'text-pink-700'
                                    }`}>{item.title}</h5>
                                    <div className="text-[11px] text-stone-600 whitespace-pre-line leading-relaxed">
                                      {item.content}
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}
                            {isEditing && (
                              <button 
                                onClick={() => {
                                  const newSubItems = [...(ws.subItems || []), { title: 'New Item', content: 'Content', type: 'blue' }];
                                  updateField(`operatingModel.workstreams[${wIdx}].subItems`, newSubItems);
                                }}
                                className="border-2 border-dashed border-stone-200 rounded-xl p-4 flex flex-col items-center justify-center text-stone-400 hover:border-vib-blue hover:text-vib-blue transition-all"
                              >
                                <Plus size={20} />
                                <span className="text-[10px] font-bold mt-1">THÊM MỤC</span>
                              </button>
                            )}
                          </div>
                        ) : ws.split ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {ws.split.map((part, idx) => (
                              <div key={idx} className="space-y-2">
                                {isEditing ? (
                                  <>
                                    <input 
                                      value={part.lead}
                                      onChange={(e) => updateField(`operatingModel.workstreams[${wIdx}].split[${idx}].lead`, e.target.value)}
                                      className="text-[10px] font-bold border border-stone-200 rounded px-2 py-0.5 w-full focus:outline-none"
                                    />
                                    <textarea 
                                      value={part.content}
                                      onChange={(e) => updateField(`operatingModel.workstreams[${wIdx}].split[${idx}].content`, e.target.value)}
                                      className="text-[11px] text-stone-600 border border-stone-200 rounded px-2 py-1 w-full h-24 focus:outline-none resize-none"
                                    />
                                  </>
                                ) : (
                                  <>
                                    <Badge type={idx === 0 ? 'orange' : 'teal'}>{part.lead}</Badge>
                                    <div className="text-[11px] text-stone-600 whitespace-pre-line leading-relaxed mt-3">
                                      {part.content}
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {isEditing ? (
                              <>
                                <input 
                                  value={ws.lead || ''}
                                  onChange={(e) => updateField(`operatingModel.workstreams[${wIdx}].lead`, e.target.value)}
                                  placeholder="Lead"
                                  className="text-[10px] font-bold border border-stone-200 rounded px-2 py-0.5 w-full focus:outline-none"
                                />
                                <input 
                                  value={ws.subLead || ''}
                                  onChange={(e) => updateField(`operatingModel.workstreams[${wIdx}].subLead`, e.target.value)}
                                  placeholder="Sub Lead"
                                  className="text-[10px] border border-stone-200 rounded px-2 py-0.5 w-full focus:outline-none mt-1"
                                />
                                <textarea 
                                  value={ws.content || ''}
                                  onChange={(e) => updateField(`operatingModel.workstreams[${wIdx}].content`, e.target.value)}
                                  className="text-[11px] text-stone-600 border border-stone-200 rounded px-2 py-1 w-full h-32 focus:outline-none resize-none mt-2"
                                />
                              </>
                            ) : (
                              <>
                                {ws.lead && <Badge type={ws.color}>{ws.lead}</Badge>}
                                {ws.subLead && <div className="mt-1.5"><Badge type="gray">{ws.subLead}</Badge></div>}
                                <div className="text-[11px] text-stone-600 whitespace-pre-line leading-relaxed mt-3">
                                  {ws.content}
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isEditing && (
                    <button 
                      onClick={() => {
                        const newWS = [...operatingModel.workstreams, {
                          id: operatingModel.workstreams.length + 1,
                          title: 'New Workstream',
                          color: 'blue',
                          content: 'Content here...'
                        }];
                        updateField('operatingModel.workstreams', newWS);
                      }}
                      className="border-2 border-dashed border-stone-200 rounded-2xl p-8 flex flex-col items-center justify-center text-stone-400 hover:border-vib-blue hover:text-vib-blue transition-all"
                    >
                      <Plus size={32} />
                      <span className="text-xs font-bold mt-2">THÊM WORKSTREAM</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ORG CHART TAB */}
            {activeTab === 'org' && (
              <div className="space-y-8">
                <SectionHeader 
                  icon={LayoutGrid} 
                  title={`Cơ cấu Tổ chức — ${metadata.title}`} 
                  subtitle="Sơ đồ quản lý và tuyến báo cáo" 
                />

                <div className="bg-vib-blue-light border-l-4 border-vib-blue p-4 rounded-r-xl">
                  <p className="text-xs text-stone-800">
                    <strong>📌 Thay đổi mới nhất:</strong> Trần Huyền Trang & Nguyễn Thùy Dung (PO team) merge vào SA&QA Team của Trần Linh Chi. PM dự án tham gia điều phối ngang với Head CRM.
                  </p>
                </div>

                <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm">
                  {isEditing ? (
        <input 
          value={orgChart.title}
          onChange={(e) => updateField('orgChart.title', e.target.value)}
          className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-8 text-center w-full bg-transparent border-b border-stone-200 focus:outline-none"
        />
      ) : (
        <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-8 text-center">{orgChart.title}</div>
      )}
                  
                  {/* BOD */}
                  <div className="flex justify-center mb-4">
                    <div className="bg-stone-600 text-white px-6 py-2.5 rounded-xl text-[11px] font-bold shadow-lg">
                      BOD / BOM — VIB Leadership
                    </div>
                  </div>
                  
                  <div className="flex justify-center mb-4">
                    <div className="w-px h-6 bg-stone-200" />
                  </div>

                  {/* Head & PM */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
                    <div className="bg-vib-blue text-white p-5 rounded-2xl w-full max-w-[280px] shadow-xl shadow-vib-blue/20 relative group/head">
                      {isEditing ? (
                        <div className="space-y-2">
                          <input 
                            value={orgChart.head.name}
                            onChange={(e) => updateField('orgChart.head.name', e.target.value)}
                            className="font-bold text-sm bg-white/10 border border-white/20 rounded px-2 w-full focus:outline-none"
                          />
                          <input 
                            value={orgChart.head.role}
                            onChange={(e) => updateField('orgChart.head.role', e.target.value)}
                            className="text-[10px] opacity-80 bg-white/10 border border-white/20 rounded px-2 w-full focus:outline-none"
                          />
                          <input 
                            value={orgChart.head.subRole}
                            onChange={(e) => updateField('orgChart.head.subRole', e.target.value)}
                            className="text-[9px] opacity-60 italic bg-white/10 border border-white/20 rounded px-2 w-full focus:outline-none"
                          />
                          <div className="mt-4 space-y-1.5 bg-white/10 rounded-xl p-3 text-[10px]">
                            {orgChart.head.responsibilities.map((r, i) => (
                              <div key={i} className="flex gap-2 items-center">
                                <span className="text-vib-orange">✓</span>
                                <input 
                                  value={r}
                                  onChange={(e) => {
                                    const newResp = [...orgChart.head.responsibilities];
                                    newResp[i] = e.target.value;
                                    updateField('orgChart.head.responsibilities', newResp);
                                  }}
                                  className="bg-transparent border-b border-white/10 focus:outline-none w-full"
                                />
                                <button 
                                  onClick={() => {
                                    const newResp = [...orgChart.head.responsibilities];
                                    newResp.splice(i, 1);
                                    updateField('orgChart.head.responsibilities', newResp);
                                  }}
                                  className="text-white/30 hover:text-white"
                                >
                                  <X size={10} />
                                </button>
                              </div>
                            ))}
                            <button 
                              onClick={() => {
                                const newResp = [...orgChart.head.responsibilities, 'New responsibility'];
                                updateField('orgChart.head.responsibilities', newResp);
                              }}
                              className="text-white/50 hover:text-white flex items-center gap-1 mt-1"
                            >
                              <Plus size={10} /> Thêm
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="font-bold text-sm">{orgChart.head.name}</div>
                          <div className="text-[10px] opacity-80 mt-0.5">{orgChart.head.role}</div>
                          <div className="text-[9px] opacity-60 italic">{orgChart.head.subRole}</div>
                          <div className="mt-4 space-y-1.5 bg-white/10 rounded-xl p-3 text-[10px]">
                            {orgChart.head.responsibilities.map((r, i) => (
                              <div key={i} className="flex gap-2">
                                <span className="text-vib-orange">✓</span> {r}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="text-stone-300 hidden md:block">
                      <ChevronRight size={32} />
                    </div>

                    <div className="bg-pink-600 text-white p-5 rounded-2xl w-full max-w-[280px] shadow-xl shadow-pink-600/20 relative group/pm">
                      {isEditing ? (
                        <div className="space-y-2">
                          <input 
                            value={orgChart.pm.name}
                            onChange={(e) => updateField('orgChart.pm.name', e.target.value)}
                            className="font-bold text-sm bg-white/10 border border-white/20 rounded px-2 w-full focus:outline-none"
                          />
                          <input 
                            value={orgChart.pm.role}
                            onChange={(e) => updateField('orgChart.pm.role', e.target.value)}
                            className="text-[10px] opacity-80 bg-white/10 border border-white/20 rounded px-2 w-full focus:outline-none"
                          />
                          <div className="mt-4 space-y-1.5 bg-white/10 rounded-xl p-3 text-[10px]">
                            {orgChart.pm.responsibilities.map((r, i) => (
                              <div key={i} className="flex gap-2 items-center">
                                <span className="text-pink-300">✓</span>
                                <input 
                                  value={r}
                                  onChange={(e) => {
                                    const newResp = [...orgChart.pm.responsibilities];
                                    newResp[i] = e.target.value;
                                    updateField('orgChart.pm.responsibilities', newResp);
                                  }}
                                  className="bg-transparent border-b border-white/10 focus:outline-none w-full"
                                />
                                <button 
                                  onClick={() => {
                                    const newResp = [...orgChart.pm.responsibilities];
                                    newResp.splice(i, 1);
                                    updateField('orgChart.pm.responsibilities', newResp);
                                  }}
                                  className="text-white/30 hover:text-white"
                                >
                                  <X size={10} />
                                </button>
                              </div>
                            ))}
                            <button 
                              onClick={() => {
                                const newResp = [...orgChart.pm.responsibilities, 'New responsibility'];
                                updateField('orgChart.pm.responsibilities', newResp);
                              }}
                              className="text-white/50 hover:text-white flex items-center gap-1 mt-1"
                            >
                              <Plus size={10} /> Thêm
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="font-bold text-sm">{orgChart.pm.name}</div>
                          <div className="text-[10px] opacity-80 mt-0.5">{orgChart.pm.role}</div>
                          <div className="mt-4 space-y-1.5 bg-white/10 rounded-xl p-3 text-[10px]">
                            {orgChart.pm.responsibilities.map((r, i) => (
                              <div key={i} className="flex gap-2">
                                <span className="text-pink-300">✓</span> {r}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center mb-8">
                    <div className="w-px h-8 bg-stone-200" />
                  </div>

                  {/* Teams Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {orgChart.teams.map((team, idx) => (
                      <div 
                        key={idx} 
                        className={`p-4 rounded-xl text-center flex flex-col items-center justify-center text-white shadow-sm relative group/team ${
                          team.color === 'purple' ? 'bg-olive-600' :
                          team.color === 'teal' ? 'bg-emerald-600' :
                          team.color === 'amber' ? 'bg-amber-700' :
                          team.color === 'blue' ? 'bg-vib-blue' : 'bg-stone-400'
                        }`}
                      >
                        {isEditing ? (
                          <div className="space-y-1 w-full">
                            <input 
                              value={team.name}
                              onChange={(e) => updateField(`orgChart.teams[${idx}].name`, e.target.value)}
                              className="font-bold text-[11px] leading-tight bg-white/10 border border-white/20 rounded px-1 w-full text-center focus:outline-none"
                            />
                            <input 
                              value={team.sub}
                              onChange={(e) => updateField(`orgChart.teams[${idx}].sub`, e.target.value)}
                              className="text-[9px] opacity-70 bg-white/10 border border-white/20 rounded px-1 w-full text-center focus:outline-none"
                            />
                            <input 
                              value={team.head}
                              onChange={(e) => updateField(`orgChart.teams[${idx}].head`, e.target.value)}
                              className="text-[10px] font-medium mt-2 pt-2 border-t border-white/20 w-full bg-transparent text-center focus:outline-none"
                            />
                            <input 
                              value={team.count}
                              onChange={(e) => updateField(`orgChart.teams[${idx}].count`, e.target.value)}
                              className="text-[9px] opacity-60 bg-white/10 border border-white/20 rounded px-1 w-full text-center focus:outline-none mt-1"
                            />
                            <button 
                              onClick={() => {
                                const newTeams = [...orgChart.teams];
                                newTeams.splice(idx, 1);
                                updateField('orgChart.teams', newTeams);
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover/team:opacity-100 transition-opacity"
                            >
                              <Trash2 size={10} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="font-bold text-[11px] leading-tight">{team.name}</div>
                            <div className="text-[9px] opacity-70 mt-0.5">{team.sub}</div>
                            <div className="text-[10px] font-medium mt-2 pt-2 border-t border-white/20 w-full">{team.head}</div>
                            <div className="text-[9px] opacity-60 mt-1">{team.count}</div>
                          </>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <button 
                        onClick={() => {
                          const newTeams = [...orgChart.teams, { name: 'New Team', sub: '', head: 'Lead Name', count: '0 members', color: 'blue' }];
                          updateField('orgChart.teams', newTeams);
                        }}
                        className="p-4 rounded-xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center text-stone-400 hover:border-vib-blue hover:text-vib-blue transition-all"
                      >
                        <Plus size={20} />
                        <span className="text-[10px] font-bold mt-1">THÊM TEAM</span>
                      </button>
                    )}
                  </div>

                  <div className="mt-12 pt-6 border-t border-stone-100 text-center">
                    {/* Vacancies */}
                    <div className="space-y-2">
                      {orgChart.vacancies && orgChart.vacancies.map((v, i) => (
                        <div key={i} className="p-4 bg-stone-50 rounded-2xl border border-dashed border-stone-300 flex items-center justify-center relative group/vacancy">
                          {isEditing ? (
                            <div className="flex items-center gap-2 w-full">
                              <input 
                                value={v}
                                onChange={(e) => {
                                  const newVacancies = [...orgChart.vacancies!];
                                  newVacancies[i] = e.target.value;
                                  updateField('orgChart.vacancies', newVacancies);
                                }}
                                className="text-[10px] text-stone-400 font-medium uppercase tracking-widest w-full bg-transparent border-b border-stone-200 focus:outline-none text-center"
                              />
                              <button 
                                onClick={() => {
                                  const newVacancies = orgChart.vacancies!.filter((_, idx) => idx !== i);
                                  updateField('orgChart.vacancies', newVacancies);
                                }}
                                className="p-1 text-red-500 hover:bg-red-50 rounded opacity-0 group-hover/vacancy:opacity-100 transition-opacity"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          ) : (
                            <span className="text-[10px] text-stone-400 font-medium uppercase tracking-widest">{v}</span>
                          )}
                        </div>
                      ))}
                      {isEditing && (
                        <button 
                          onClick={() => {
                            const newVacancies = [...(orgChart.vacancies || []), '📍 New Vacancy'];
                            updateField('orgChart.vacancies', newVacancies);
                          }}
                          className="w-full p-2 border border-dashed border-stone-300 rounded-xl text-[10px] text-stone-400 hover:bg-stone-50 transition-colors flex items-center justify-center gap-2"
                        >
                          <Plus size={12} /> THÊM VACANCY
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TEAMS TAB */}
            {activeTab === 'teams' && (
              <div className="space-y-8">
                <SectionHeader 
                  icon={Users} 
                  title={`Phân bổ Nhân sự — ${metadata.title}`} 
                  subtitle="Danh sách thực tế từ hệ thống" 
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {teams.map((team, tIdx) => (
                    <div 
                      key={team.id} 
                      className={`bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm relative group/team ${team.gridCols === 2 ? 'lg:col-span-2' : ''}`}
                    >
                      <div className={`px-5 py-3 text-[11px] font-bold text-white flex items-center justify-between ${
                        team.color === 'blue' ? 'bg-vib-blue' :
                        team.color === 'purple' ? 'bg-olive-600' :
                        team.color === 'teal' ? 'bg-emerald-600' :
                        team.color === 'amber' ? 'bg-amber-700' : 'bg-stone-600'
                      }`}>
                        <div className="flex items-center gap-2">
                          {isEditing ? (
                            <input 
                              value={team.title}
                              onChange={(e) => updateField(`teams[${tIdx}].title`, e.target.value)}
                              className="bg-white/10 border border-white/20 rounded px-2 py-0.5 focus:outline-none w-full"
                            />
                          ) : team.title}
                        </div>
                        {isEditing && (
                          <div className="flex items-center gap-2">
                            <select 
                              value={team.color}
                              onChange={(e) => updateField(`teams[${tIdx}].color`, e.target.value)}
                              className="bg-white/10 border border-white/20 rounded text-[9px] focus:outline-none"
                            >
                              <option value="blue">Blue</option>
                              <option value="purple">Purple</option>
                              <option value="teal">Teal</option>
                              <option value="amber">Amber</option>
                              <option value="gray">Gray</option>
                            </select>
                            <button 
                              onClick={() => {
                                const newTeams = [...teams];
                                newTeams.splice(tIdx, 1);
                                updateField('teams', newTeams);
                              }}
                              className="text-white/50 hover:text-white transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className={`p-4 grid gap-4 ${team.gridCols === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                        {team.members.map((member, idx) => (
                          <div key={idx} className={`flex items-start gap-3 p-2 rounded-xl transition-colors relative group/member ${member.highlight ? 'bg-olive-50' : ''}`}>
                            {isEditing && (
                              <button 
                                onClick={() => {
                                  const newMembers = [...team.members];
                                  newMembers.splice(idx, 1);
                                  updateField(`teams[${tIdx}].members`, newMembers);
                                }}
                                className="absolute -top-1 -right-1 bg-red-500 text-white p-0.5 rounded-full shadow-sm opacity-0 group-hover/member:opacity-100 transition-opacity z-10"
                              >
                                <Trash2 size={8} />
                              </button>
                            )}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                              member.specialColor || 'bg-stone-100 text-stone-500'
                            } ${member.specialColor ? 'text-white' : ''}`}>
                              {isEditing ? (
                                <input 
                                  value={member.initials}
                                  onChange={(e) => updateField(`teams[${tIdx}].members[${idx}].initials`, e.target.value)}
                                  className="bg-transparent text-center w-full focus:outline-none"
                                />
                              ) : member.initials}
                            </div>
                            <div className="min-w-0 flex-1">
                              {isEditing ? (
                                <div className="space-y-1">
                                  <input 
                                    value={member.name}
                                    onChange={(e) => updateField(`teams[${tIdx}].members[${idx}].name`, e.target.value)}
                                    className="text-[11px] font-bold text-stone-900 w-full border border-stone-200 rounded px-1 focus:outline-none"
                                  />
                                  <input 
                                    value={member.role}
                                    onChange={(e) => updateField(`teams[${tIdx}].members[${idx}].role`, e.target.value)}
                                    className="text-[10px] text-stone-500 w-full border border-stone-200 rounded px-1 focus:outline-none"
                                  />
                                  <input 
                                    value={member.note || ''}
                                    onChange={(e) => updateField(`teams[${tIdx}].members[${idx}].note`, e.target.value)}
                                    placeholder="Ghi chú"
                                    className="text-[10px] text-vib-orange w-full border border-stone-200 rounded px-1 focus:outline-none"
                                  />
                                </div>
                              ) : (
                                <>
                                  <div className="text-[11px] font-bold text-stone-900 truncate">{member.name}</div>
                                  <div className="text-[10px] text-stone-500 leading-tight mt-0.5">{member.role}</div>
                                  {member.note && <div className="text-[10px] text-vib-orange font-medium mt-1 leading-relaxed">{member.note}</div>}
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                        {isEditing && (
                          <button 
                            onClick={() => {
                              const newMembers = [...team.members, { name: 'New Member', role: 'Role', initials: 'NM' }];
                              updateField(`teams[${tIdx}].members`, newMembers);
                            }}
                            className="w-full py-2 border border-dashed border-stone-200 rounded-xl text-[10px] font-bold text-stone-400 hover:text-vib-blue hover:border-vib-blue transition-all"
                          >
                            <Plus size={14} className="inline mr-1" /> THÊM NHÂN SỰ
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {isEditing && (
                    <button 
                      onClick={() => {
                        const newTeams = [...teams, {
                          id: `team-${Date.now()}`,
                          title: 'New Team',
                          color: 'blue',
                          members: []
                        }];
                        updateField('teams', newTeams);
                      }}
                      className="border-2 border-dashed border-stone-200 rounded-2xl p-8 flex flex-col items-center justify-center text-stone-400 hover:border-vib-blue hover:text-vib-blue transition-all"
                    >
                      <Plus size={32} />
                      <span className="text-xs font-bold mt-2">THÊM NHÓM MỚI</span>
                    </button>
                  )}

                  {/* SmartSales Special Section */}
                  {smartsales && (
                    <div className="lg:col-span-3 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                      <div className="bg-stone-600 px-5 py-3 text-[11px] font-bold text-white">
                        {smartsales.title}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-100">
                        {/* Dev Lead */}
                        <div className="p-5 relative group/dev">
                          {isEditing ? (
                            <div className="space-y-3">
                              <div className="text-[10px] font-bold text-teal-600 uppercase tracking-wider flex items-center gap-2">
                                ⚙️ Dev Lead — 
                                <input 
                                  value={smartsales.dev.lead}
                                  onChange={(e) => updateField('smartsales.dev.lead', e.target.value)}
                                  className="bg-transparent border-b border-teal-200 focus:outline-none"
                                />
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                                  <input 
                                    value={smartsales.dev.initials}
                                    onChange={(e) => updateField('smartsales.dev.initials', e.target.value)}
                                    className="bg-transparent text-center w-full focus:outline-none"
                                  />
                                </div>
                                <div className="flex-1">
                                  <input 
                                    value={smartsales.dev.lead}
                                    onChange={(e) => updateField('smartsales.dev.lead', e.target.value)}
                                    className="text-[11px] font-bold text-stone-900 w-full border border-stone-200 rounded px-1 focus:outline-none"
                                  />
                                  <input 
                                    value={smartsales.dev.role}
                                    onChange={(e) => updateField('smartsales.dev.role', e.target.value)}
                                    className="text-[10px] text-stone-500 w-full border border-stone-200 rounded px-1 focus:outline-none mt-1"
                                  />
                                </div>
                              </div>
                              <div className="text-[10px] font-semibold text-stone-400">Dev team (SmartSales app):</div>
                              <textarea 
                                value={smartsales.dev.members}
                                onChange={(e) => updateField('smartsales.dev.members', e.target.value)}
                                className="text-[10px] text-stone-600 w-full border border-stone-200 rounded px-2 py-1 h-20 focus:outline-none resize-none"
                              />
                              <input 
                                value={smartsales.dev.note}
                                onChange={(e) => updateField('smartsales.dev.note', e.target.value)}
                                className="text-[10px] text-stone-400 italic w-full border border-stone-200 rounded px-1 focus:outline-none"
                              />
                            </div>
                          ) : (
                            <>
                              <div className="text-[10px] font-bold text-teal-600 uppercase tracking-wider mb-4">⚙️ Dev Lead — {smartsales.dev.lead}</div>
                              <div className="flex items-start gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                                  {smartsales.dev.initials}
                                </div>
                                <div>
                                  <div className="text-[11px] font-bold text-stone-900">{smartsales.dev.lead}</div>
                                  <div className="text-[10px] text-stone-500">{smartsales.dev.role}</div>
                                </div>
                              </div>
                              <div className="text-[10px] font-semibold text-stone-400 mb-2">Dev team (SmartSales app):</div>
                              <div className="text-[10px] text-stone-600 leading-relaxed">
                                {smartsales.dev.members}
                              </div>
                              <p className="text-[10px] text-stone-400 italic mt-4">{smartsales.dev.note}</p>
                            </>
                          )}
                        </div>

                        {/* Business Lead */}
                        <div className="p-5 relative group/biz">
                          {isEditing ? (
                            <div className="space-y-3">
                              <div className="text-[10px] font-bold text-olive-600 uppercase tracking-wider flex items-center gap-2">
                                📋 Nghiệp vụ Lead — 
                                <input 
                                  value={smartsales.business.lead}
                                  onChange={(e) => updateField('smartsales.business.lead', e.target.value)}
                                  className="bg-transparent border-b border-olive-200 focus:outline-none"
                                />
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-olive-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                                  <input 
                                    value={smartsales.business.initials}
                                    onChange={(e) => updateField('smartsales.business.initials', e.target.value)}
                                    className="bg-transparent text-center w-full focus:outline-none"
                                  />
                                </div>
                                <div className="flex-1">
                                  <input 
                                    value={smartsales.business.lead}
                                    onChange={(e) => updateField('smartsales.business.lead', e.target.value)}
                                    className="text-[11px] font-bold text-stone-900 w-full border border-stone-200 rounded px-1 focus:outline-none"
                                  />
                                  <input 
                                    value={smartsales.business.role}
                                    onChange={(e) => updateField('smartsales.business.role', e.target.value)}
                                    className="text-[10px] text-stone-500 w-full border border-stone-200 rounded px-1 focus:outline-none mt-1"
                                  />
                                </div>
                              </div>
                              <div className="space-y-3">
                                {smartsales.business.members.map((m, i) => (
                                  <div key={i} className="flex items-start gap-3 relative group/bizmem">
                                    {isEditing && (
                                      <button 
                                        onClick={() => {
                                          const newMembers = [...smartsales.business.members];
                                          newMembers.splice(i, 1);
                                          updateField('smartsales.business.members', newMembers);
                                        }}
                                        className="absolute -top-1 -right-1 bg-red-500 text-white p-0.5 rounded-full shadow-sm opacity-0 group-hover/bizmem:opacity-100 transition-opacity z-10"
                                      >
                                        <Trash2 size={8} />
                                      </button>
                                    )}
                                    <div className="w-7 h-7 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-[9px] font-bold shrink-0">
                                      <input 
                                        value={m.initials}
                                        onChange={(e) => updateField(`smartsales.business.members[${i}].initials`, e.target.value)}
                                        className="bg-transparent text-center w-full focus:outline-none"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <input 
                                        value={m.name}
                                        onChange={(e) => updateField(`smartsales.business.members[${i}].name`, e.target.value)}
                                        className="text-[10px] font-bold text-stone-900 w-full border border-stone-200 rounded px-1 focus:outline-none"
                                      />
                                      <input 
                                        value={m.role}
                                        onChange={(e) => updateField(`smartsales.business.members[${i}].role`, e.target.value)}
                                        className="text-[9px] text-stone-500 w-full border border-stone-200 rounded px-1 focus:outline-none mt-0.5"
                                      />
                                    </div>
                                  </div>
                                ))}
                                <button 
                                  onClick={() => {
                                    const newMembers = [...smartsales.business.members, { name: 'New Member', role: 'Role', initials: 'NM' }];
                                    updateField('smartsales.business.members', newMembers);
                                  }}
                                  className="w-full py-2 border border-dashed border-stone-200 rounded-lg text-[9px] font-bold text-stone-400 hover:text-vib-blue hover:border-vib-blue transition-all"
                                >
                                  <Plus size={10} className="inline mr-1" /> THÊM NHÂN SỰ
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="text-[10px] font-bold text-olive-600 uppercase tracking-wider mb-4">📋 Nghiệp vụ Lead — {smartsales.business.lead}</div>
                              <div className="flex items-start gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-olive-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                                  {smartsales.business.initials}
                                </div>
                                <div>
                                  <div className="text-[11px] font-bold text-stone-900">{smartsales.business.lead}</div>
                                  <div className="text-[10px] text-stone-500">{smartsales.business.role}</div>
                                </div>
                              </div>
                              <div className="space-y-3">
                                {smartsales.business.members.map((m, i) => (
                                  <div key={i} className="flex items-start gap-3">
                                    <div className="w-7 h-7 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-[9px] font-bold shrink-0">{m.initials}</div>
                                    <div>
                                      <div className="text-[10px] font-bold text-stone-900">{m.name}</div>
                                      <div className="text-[9px] text-stone-500">{m.role}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>

                        {/* CRM Assignments */}
                        <div className="p-5 bg-amber-50/50 relative group/assign">
                          {isEditing ? (
                    <input 
                      value={smartsales.assignmentTitle}
                      onChange={(e) => updateField('smartsales.assignmentTitle', e.target.value)}
                      className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-4 w-full bg-transparent border-b border-amber-200 focus:outline-none"
                    />
                  ) : (
                    <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-4">{smartsales.assignmentTitle}</div>
                  )}
                          <div className="space-y-3">
                            {smartsales.crmAssignments.map((a, i) => (
                              <div key={i} className={`p-3 bg-white rounded-xl border-l-4 shadow-sm relative group/assignitem ${
                                a.color === 'purple' ? 'border-olive-600' :
                                a.color === 'orange' ? 'border-amber-500' :
                                a.color === 'teal' ? 'border-emerald-600' : 'border-emerald-500'
                              }`}>
                                {isEditing && (
                                  <button 
                                    onClick={() => {
                                      const newAssign = [...smartsales.crmAssignments];
                                      newAssign.splice(i, 1);
                                      updateField('smartsales.crmAssignments', newAssign);
                                    }}
                                    className="absolute -top-1 -right-1 bg-red-500 text-white p-0.5 rounded-full shadow-sm opacity-0 group-hover/assignitem:opacity-100 transition-opacity z-10"
                                  >
                                    <Trash2 size={8} />
                                  </button>
                                )}
                                {isEditing ? (
                                  <div className="space-y-1">
                                    <input 
                                      value={a.name}
                                      onChange={(e) => updateField(`smartsales.crmAssignments[${i}].name`, e.target.value)}
                                      className="text-[11px] font-bold text-stone-900 w-full border border-stone-200 rounded px-1 focus:outline-none"
                                    />
                                    <textarea 
                                      value={a.detail}
                                      onChange={(e) => updateField(`smartsales.crmAssignments[${i}].detail`, e.target.value)}
                                      className="text-[10px] text-stone-500 w-full border border-stone-200 rounded px-1 focus:outline-none h-16 resize-none"
                                    />
                                  </div>
                                ) : (
                                  <>
                                    <div className="text-[11px] font-bold text-stone-900">{a.name}</div>
                                    <div className="text-[10px] text-stone-500 mt-1 leading-relaxed">{a.detail}</div>
                                  </>
                                )}
                              </div>
                            ))}
                            {isEditing && (
                              <button 
                                onClick={() => {
                                  const newAssign = [...smartsales.crmAssignments, { name: 'New Assignment', detail: 'Detail here...', color: 'purple' }];
                                  updateField('smartsales.crmAssignments', newAssign);
                                }}
                                className="w-full py-3 border-2 border-dashed border-amber-200 rounded-xl text-[10px] font-bold text-amber-400 hover:text-amber-600 hover:border-amber-400 transition-all"
                              >
                                <Plus size={14} className="inline mr-1" /> THÊM PHÂN BỔ
                              </button>
                            )}
                          </div>
                          <div className="mt-6 p-3 bg-red-50 rounded-xl border border-red-100">
                            <p className="text-[10px] text-red-700 font-bold leading-relaxed">
                              ⏰ Từ 1/7/2026: Trang, Nga, Huy back về SmartSales only (sau khi Go-live Corebank ổn định)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PROCESS TAB */}
            {activeTab === 'process' && (
              <div className="space-y-12">
                <SectionHeader 
                  icon={RefreshCw} 
                  title={`Luồng Phối hợp — ${metadata.title}`} 
                  subtitle="Quy trình xử lý từng loại yêu cầu — ai làm gì, bàn giao ở đâu" 
                />

                <div className="bg-stone-600 text-white p-6 rounded-3xl mb-8">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="text-vib-orange shrink-0" size={20} />
                    <div>
                      <h4 className="text-sm font-bold mb-2">Nguyên tắc cốt lõi:</h4>
                      <ul className="text-xs opacity-80 space-y-1.5 list-disc pl-4">
                        <li>MỌI yêu cầu từ BU vào qua Support Team.</li>
                        <li>Không BU nào liên hệ trực tiếp SA/Dev.</li>
                        <li>Change cần phê duyệt — PO thu thập backlog → Head CRM phê duyệt ưu tiên.</li>
                        <li>Head CRM là người chi phối dự án; PM điều phối công việc hàng ngày; PO là đầu mối tương tác BU về product.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {processes.map((proc, idx) => (
                  <div key={idx} className="space-y-4 relative group/proc">
                    <div className="flex items-center justify-between border-l-4 border-vib-blue pl-3">
                      {isEditing ? (
                        <input 
                          value={proc.title}
                          onChange={(e) => updateField(`processes[${idx}].title`, e.target.value)}
                          className="text-sm font-bold text-stone-900 bg-transparent border-b border-stone-200 focus:outline-none w-full"
                        />
                      ) : (
                        <h3 className="text-sm font-bold text-stone-900">{proc.title}</h3>
                      )}
                      {isEditing && (
                        <button 
                          onClick={() => {
                            const newProc = [...processes];
                            newProc.splice(idx, 1);
                            updateField('processes', newProc);
                          }}
                          className="text-stone-300 hover:text-red-500 ml-4"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    <div className="flex flex-col md:flex-row gap-2">
                      {proc.steps.map((step, sIdx) => (
                        <div key={sIdx} className="flex-1 bg-white border border-stone-200 rounded-xl p-4 relative group/step">
                          {isEditing && (
                            <button 
                              onClick={() => {
                                const newSteps = [...proc.steps];
                                newSteps.splice(sIdx, 1);
                                updateField(`processes[${idx}].steps`, newSteps);
                              }}
                              className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full shadow-sm opacity-0 group-hover/step:opacity-100 transition-opacity z-10"
                            >
                              <Trash2 size={10} />
                            </button>
                          )}
                          {isEditing ? (
                            <div className="space-y-2">
                              <input 
                                value={step.num}
                                onChange={(e) => updateField(`processes[${idx}].steps[${sIdx}].num`, e.target.value)}
                                className="text-[10px] font-bold text-stone-400 tracking-widest bg-transparent border-b border-stone-100 focus:outline-none w-full"
                              />
                              <input 
                                value={step.title}
                                onChange={(e) => updateField(`processes[${idx}].steps[${sIdx}].title`, e.target.value)}
                                className="text-[11px] font-bold text-stone-900 bg-transparent border-b border-stone-100 focus:outline-none w-full"
                              />
                              <textarea 
                                value={step.who}
                                onChange={(e) => updateField(`processes[${idx}].steps[${sIdx}].who`, e.target.value)}
                                className="text-[10px] text-stone-500 bg-transparent border-b border-stone-100 focus:outline-none w-full h-12 resize-none"
                              />
                            </div>
                          ) : (
                            <>
                              <div className="text-[10px] font-bold text-stone-400 tracking-widest mb-2">{step.num}</div>
                              <div className="text-[11px] font-bold text-stone-900 mb-1">{step.title}</div>
                              <div className="text-[10px] text-stone-500 leading-relaxed">{step.who}</div>
                            </>
                          )}
                          {sIdx < proc.steps.length - 1 && (
                            <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 items-center justify-center text-vib-blue font-bold text-lg">
                              →
                            </div>
                          )}
                        </div>
                      ))}
                      {isEditing && (
                        <button 
                          onClick={() => {
                            const newSteps = [...proc.steps, { num: `B${proc.steps.length + 1}`, title: 'New Step', who: 'Who' }];
                            updateField(`processes[${idx}].steps`, newSteps);
                          }}
                          className="flex-1 border-2 border-dashed border-stone-200 rounded-xl p-4 flex flex-col items-center justify-center text-stone-400 hover:border-vib-blue hover:text-vib-blue transition-all"
                        >
                          <Plus size={20} />
                          <span className="text-[10px] font-bold mt-1">THÊM BƯỚC</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {isEditing && (
                  <button 
                    onClick={() => {
                      const newProc = [...processes, {
                        title: 'New Process Flow',
                        steps: [{ num: 'B1', title: 'Start', who: 'Description' }]
                      }];
                      updateField('processes', newProc);
                    }}
                    className="w-full py-6 border-2 border-dashed border-stone-200 rounded-2xl flex flex-col items-center justify-center text-stone-400 hover:border-vib-blue hover:text-vib-blue transition-all"
                  >
                    <Plus size={32} />
                    <span className="text-xs font-bold mt-2">THÊM QUY TRÌNH MỚI</span>
                  </button>
                )}

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-stone-900 border-l-4 border-vib-blue pl-3">3. Phân loại Vận hành: Routine vs. ITSM vs. Change Request</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                      <div className="text-[10px] font-bold text-emerald-600 tracking-wider mb-2">✅ ROUTINE OPS</div>
                      <div className="text-[11px] font-bold text-stone-900 mb-2">Không cần raise change</div>
                      <div className="text-[10px] text-stone-600 leading-relaxed">
                        Upload data campaign theo template SOP đã duyệt · Chạy journey đã có · Export report thông thường · User permission theo quy trình chuẩn
                      </div>
                    </div>
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                      <div className="text-[10px] font-bold text-amber-700 tracking-wider mb-2">⚡ ITSM TICKET</div>
                      <div className="text-[11px] font-bold text-stone-900 mb-2">Raise ITSM, Ops xử lý</div>
                      <div className="text-[10px] text-stone-600 leading-relaxed">
                        Thay đổi cấu hình hệ thống · Permission ngoài quy trình chuẩn · Incident/outage · Thay đổi schedule job · Config change Mulesoft
                      </div>
                    </div>
                    <div className="bg-olive-50 border border-olive-100 rounded-2xl p-5">
                      <div className="text-[10px] font-bold text-olive-600 tracking-wider mb-2">🔄 CHANGE REQUEST</div>
                      <div className="text-[11px] font-bold text-stone-900 mb-2">PO Backlog → phê duyệt</div>
                      <div className="text-[10px] text-stone-600 leading-relaxed">
                        Tính năng mới · Thay đổi logic nghiệp vụ · Tích hợp mới · Thay đổi data model · CR003 scope items
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* RACI TAB */}
            {activeTab === 'raci' && (
              <div className="space-y-8">
                <SectionHeader 
                  icon={ShieldCheck} 
                  title={`Ma trận RACI — ${metadata.title}`} 
                  subtitle="Phân định trách nhiệm cho các hoạt động chính" 
                />

                <div className="flex flex-wrap gap-4 bg-stone-100 p-4 rounded-xl mb-6">
                  <div className="flex items-center gap-2"><span className="w-6 h-6 rounded bg-vib-blue text-white flex items-center justify-center text-[10px] font-bold">R</span> <span className="text-[11px] font-medium text-stone-600">Responsible</span></div>
                  <div className="flex items-center gap-2"><span className="w-6 h-6 rounded bg-vib-orange text-white flex items-center justify-center text-[10px] font-bold">A</span> <span className="text-[11px] font-medium text-stone-600">Accountable</span></div>
                  <div className="flex items-center gap-2"><span className="w-6 h-6 rounded bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">C</span> <span className="text-[11px] font-medium text-stone-600">Consulted</span></div>
                  <div className="flex items-center gap-2"><span className="w-6 h-6 rounded bg-stone-300 text-stone-700 flex items-center justify-center text-[10px] font-bold">I</span> <span className="text-[11px] font-medium text-stone-600">Informed</span></div>
                  <div className="flex items-center gap-2"><span className="w-6 h-6 rounded bg-olive-100 text-olive-600 flex items-center justify-center text-[10px] font-bold">S</span> <span className="text-[11px] font-medium text-stone-600">Support</span></div>
                </div>

                <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
                  <table className="w-full border-collapse text-[11px] min-w-[1000px]">
                    <thead>
                      <tr className="bg-stone-600 text-white">
                        <th rowSpan={2} className="p-4 text-left border-r border-white/10 w-[280px] align-bottom">Hoạt động / Activity</th>
                        {raci.roles.map((group, idx) => (
                          <th key={idx} colSpan={group.items.length} className={`p-2 text-[9px] uppercase tracking-widest border-r border-white/10 ${
                            group.group === 'LEADERSHIP' ? 'bg-vib-blue-dark' :
                            group.group === 'SUPPORT' ? 'bg-olive-600' :
                            group.group === 'SA & QA + PO' ? 'bg-emerald-600' :
                            group.group === 'DEV & OPS' ? 'bg-emerald-600' :
                            group.group === 'DATA & BI' ? 'bg-amber-700' : 'bg-stone-600'
                          }`}>
                            {group.group}
                          </th>
                        ))}
                      </tr>
                      <tr className="bg-stone-600 text-white">
                        {raci.roles.flatMap(g => g.items).map((role, idx) => (
                          <th key={idx} className="h-32 p-2 border-r border-white/10 relative">
                            <div className="raci-vertical-text absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px]">
                              {role.name}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {raci.sections.map((section, sIdx) => (
                        <React.Fragment key={sIdx}>
                          <tr className="bg-stone-50 group/racisection">
                            <td colSpan={14} className="p-2.5 font-bold text-stone-500 uppercase tracking-wider border-b border-stone-200 relative">
                              {isEditing ? (
                                <div className="flex items-center gap-2">
                                  <input 
                                    value={section.title}
                                    onChange={(e) => updateField(`raci.sections[${sIdx}].title`, e.target.value)}
                                    className="bg-transparent border-b border-stone-200 focus:outline-none w-full"
                                  />
                                  <button 
                                    onClick={() => {
                                      const newSections = [...raci.sections];
                                      newSections.splice(sIdx, 1);
                                      updateField('raci.sections', newSections);
                                    }}
                                    className="text-stone-300 hover:text-red-500"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              ) : section.title}
                            </td>
                          </tr>
                          {section.activities.map((act, aIdx) => (
                            <tr key={aIdx} className="hover:bg-stone-50 transition-colors group/raciact">
                              <td className="p-3 border-b border-stone-100 border-r-2 border-stone-200 font-medium text-stone-800 relative">
                                {isEditing && (
                                  <button 
                                    onClick={() => {
                                      const newActivities = [...section.activities];
                                      newActivities.splice(aIdx, 1);
                                      updateField(`raci.sections[${sIdx}].activities`, newActivities);
                                    }}
                                    className="absolute top-1 left-1 text-stone-200 hover:text-red-500 opacity-0 group-hover/raciact:opacity-100 transition-opacity"
                                  >
                                    <Trash2 size={10} />
                                  </button>
                                )}
                                {isEditing ? (
                                  <textarea 
                                    value={act.task}
                                    onChange={(e) => updateField(`raci.sections[${sIdx}].activities[${aIdx}].task`, e.target.value)}
                                    className="w-full bg-transparent border-b border-stone-100 focus:outline-none resize-none h-12"
                                  />
                                ) : act.task}
                              </td>
                              {raci.roles.flatMap(g => g.items).map((role, rIdx) => {
                                const val = (act as any)[role.key];
                                return (
                                  <td key={rIdx} className="p-2 border-b border-stone-100 border-r border-stone-100 text-center">
                                    {isEditing ? (
                                      <select 
                                        value={val || ''}
                                        onChange={(e) => updateField(`raci.sections[${sIdx}].activities[${aIdx}].${role.key}`, e.target.value)}
                                        className="bg-transparent border border-stone-200 rounded text-[9px] focus:outline-none w-8 h-8 text-center"
                                      >
                                        <option value=""></option>
                                        <option value="R">R</option>
                                        <option value="A">A</option>
                                        <option value="C">C</option>
                                        <option value="I">I</option>
                                        <option value="S">S</option>
                                      </select>
                                    ) : (
                                      val && (
                                        <span className={`w-6 h-6 rounded flex items-center justify-center mx-auto text-[10px] font-bold ${
                                          val === 'R' ? 'bg-vib-blue text-white' :
                                          val === 'A' ? 'bg-vib-orange text-white' :
                                          val === 'C' ? 'bg-teal-600 text-white' :
                                          val === 'I' ? 'bg-stone-200 text-stone-600' :
                                          val === 'S' ? 'bg-purple-100 text-purple-700' : ''
                                        }`}>
                                          {val}
                                        </span>
                                      )
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                          {isEditing && (
                            <tr>
                              <td colSpan={14} className="p-2 border-b border-stone-200">
                                <button 
                                  onClick={() => {
                                    const newActivities = [...section.activities, { task: 'New Activity' }];
                                    updateField(`raci.sections[${sIdx}].activities`, newActivities);
                                  }}
                                  className="w-full py-2 border border-dashed border-stone-200 rounded-lg text-stone-400 hover:text-vib-blue hover:border-vib-blue transition-all text-[10px] font-bold"
                                >
                                  <Plus size={12} className="inline mr-1" /> THÊM HOẠT ĐỘNG
                                </button>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                      {isEditing && (
                        <tr>
                          <td colSpan={14} className="p-4">
                            <button 
                              onClick={() => {
                                const newSections = [...raci.sections, { title: 'NEW SECTION', activities: [] }];
                                updateField('raci.sections', newSections);
                              }}
                              className="w-full py-4 border-2 border-dashed border-stone-200 rounded-2xl flex flex-col items-center justify-center text-stone-400 hover:border-vib-blue hover:text-vib-blue transition-all"
                            >
                              <Plus size={24} />
                              <span className="text-xs font-bold mt-1">THÊM PHẦN RACI MỚI</span>
                            </button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* RACI Notes */}
                {(raci.notes || isEditing) && (
                  <div className="mt-8 p-6 bg-stone-50 rounded-2xl border border-stone-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xs font-bold text-stone-900 uppercase tracking-widest">Ghi chú vận hành RACI</h4>
                      {isEditing && (
                        <button 
                          onClick={() => {
                            const newNotes = [...(raci.notes || []), 'Ghi chú mới'];
                            updateField('raci.notes', newNotes);
                          }}
                          className="p-1 text-vib-blue hover:bg-vib-blue/10 rounded transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      )}
                    </div>
                    <ul className="text-xs text-stone-600 space-y-2 list-disc pl-4">
                      {raci.notes?.map((note, i) => (
                        <li key={i} className="relative group/racinote">
                          {isEditing ? (
                            <div className="flex items-center gap-2">
                              <input 
                                value={note}
                                onChange={(e) => {
                                  const newNotes = [...raci.notes!];
                                  newNotes[i] = e.target.value;
                                  updateField('raci.notes', newNotes);
                                }}
                                className="w-full bg-transparent border-b border-stone-200 focus:outline-none"
                              />
                              <button 
                                onClick={() => {
                                  const newNotes = raci.notes!.filter((_, idx) => idx !== i);
                                  updateField('raci.notes', newNotes);
                                }}
                                className="p-1 text-red-500 hover:bg-red-50 rounded opacity-0 group-hover/racinote:opacity-100 transition-opacity"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          ) : (
                            <span>{note}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* GOVERNANCE TAB */}
            {activeTab === 'governance' && (
              <div className="space-y-12">
                <SectionHeader 
                  icon={Settings} 
                  title={`Governance & Issues — ${metadata.title}`} 
                  subtitle="Câu hỏi chưa clear + đề xuất giải pháp cụ thể + action plan ưu tiên" 
                />

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-stone-900 border-l-4 border-vib-blue pl-3">Q&A & Đề xuất Giải pháp</h3>
                  <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full border-collapse text-[11px]">
                      <thead>
                        <tr className="bg-stone-600 text-white">
                          <th className="p-4 text-left w-1/4">Vấn đề</th>
                          <th className="p-4 text-left w-1/3">Giải pháp đề xuất</th>
                          <th className="p-4 text-left">Owner</th>
                          <th className="p-4 text-left">Deadline</th>
                          <th className="p-4 text-left">Ưu tiên</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {governance.issues.map((item, idx) => (
                          <tr key={idx} className="hover:bg-stone-50 transition-colors group/issue">
                            <td className="p-4 font-bold text-stone-900 relative">
                              {isEditing && (
                                <button 
                                  onClick={() => {
                                    const newIssues = [...governance.issues];
                                    newIssues.splice(idx, 1);
                                    updateField('governance.issues', newIssues);
                                  }}
                                  className="absolute top-1 left-1 text-stone-300 hover:text-red-500 opacity-0 group-hover/issue:opacity-100 transition-opacity"
                                >
                                  <Trash2 size={12} />
                                </button>
                              )}
                              {isEditing ? (
                                <textarea 
                                  value={item.issue}
                                  onChange={(e) => updateField(`governance.issues[${idx}].issue`, e.target.value)}
                                  className="w-full bg-transparent border-b border-stone-100 focus:outline-none resize-none h-20"
                                />
                              ) : item.issue}
                            </td>
                            <td className="p-4 text-stone-600 leading-relaxed">
                              {isEditing ? (
                                <textarea 
                                  value={item.solution}
                                  onChange={(e) => updateField(`governance.issues[${idx}].solution`, e.target.value)}
                                  className="w-full bg-transparent border-b border-stone-100 focus:outline-none resize-none h-20"
                                />
                              ) : item.solution}
                            </td>
                            <td className="p-4 text-stone-500">
                              {isEditing ? (
                                <input 
                                  value={item.owner}
                                  onChange={(e) => updateField(`governance.issues[${idx}].owner`, e.target.value)}
                                  className="w-full bg-transparent border-b border-stone-100 focus:outline-none"
                                />
                              ) : item.owner}
                            </td>
                            <td className="p-4 font-medium text-stone-900">
                              {isEditing ? (
                                <input 
                                  value={item.deadline}
                                  onChange={(e) => updateField(`governance.issues[${idx}].deadline`, e.target.value)}
                                  className="w-full bg-transparent border-b border-stone-100 focus:outline-none"
                                />
                              ) : item.deadline}
                            </td>
                            <td className="p-4">
                              {isEditing ? (
                                <select 
                                  value={item.priority}
                                  onChange={(e) => updateField(`governance.issues[${idx}].priority`, e.target.value)}
                                  className="bg-transparent border border-stone-200 rounded text-[10px] focus:outline-none"
                                >
                                  <option value="Critical">Critical</option>
                                  <option value="High">High</option>
                                  <option value="Medium">Medium</option>
                                  <option value="Low">Low</option>
                                </select>
                              ) : (
                                <Badge type={item.priority === 'Critical' ? 'red' : 'amber'}>{item.priority}</Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {isEditing && (
                      <button 
                        onClick={() => {
                          const newIssues = [...governance.issues, {
                            issue: 'New Issue',
                            solution: 'Proposed Solution',
                            owner: 'Owner',
                            deadline: 'Deadline',
                            priority: 'High'
                          }];
                          updateField('governance.issues', newIssues);
                        }}
                        className="w-full py-3 bg-stone-50 border-t border-stone-100 text-stone-400 hover:text-vib-blue transition-colors font-bold text-xs flex items-center justify-center gap-2"
                      >
                        <Plus size={14} /> THÊM VẤN ĐỀ MỚI
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-stone-900 border-l-4 border-vib-blue pl-3">📅 Meetings & Cadence</h3>
                  <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full border-collapse text-[11px]">
                      <thead>
                        <tr className="bg-stone-600 text-white">
                          <th className="p-4 text-left w-1/4">Cuộc họp</th>
                          <th className="p-4 text-left">Tần suất</th>
                          <th className="p-4 text-left">Chủ trì</th>
                          <th className="p-4 text-left">Thành phần</th>
                          <th className="p-4 text-left">Output chính</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {governance.meetings?.map((item, idx) => (
                          <tr key={idx} className="hover:bg-stone-50 transition-colors group/meeting">
                            <td className="p-4 font-bold text-stone-900 relative">
                              {isEditing && (
                                <button 
                                  onClick={() => {
                                    const newMeetings = [...governance.meetings];
                                    newMeetings.splice(idx, 1);
                                    updateField('governance.meetings', newMeetings);
                                  }}
                                  className="absolute top-1 left-1 text-stone-300 hover:text-red-500 opacity-0 group-hover/meeting:opacity-100 transition-opacity"
                                >
                                  <Trash2 size={12} />
                                </button>
                              )}
                              {isEditing ? (
                                <input 
                                  value={item.name}
                                  onChange={(e) => updateField(`governance.meetings[${idx}].name`, e.target.value)}
                                  className="w-full bg-transparent border-b border-stone-100 focus:outline-none"
                                />
                              ) : item.name}
                            </td>
                            <td className="p-4 text-stone-600">
                              {isEditing ? (
                                <input 
                                  value={item.freq}
                                  onChange={(e) => updateField(`governance.meetings[${idx}].freq`, e.target.value)}
                                  className="w-full bg-transparent border-b border-stone-100 focus:outline-none"
                                />
                              ) : item.freq}
                            </td>
                            <td className="p-4 text-stone-500">
                              {isEditing ? (
                                <input 
                                  value={item.lead}
                                  onChange={(e) => updateField(`governance.meetings[${idx}].lead`, e.target.value)}
                                  className="w-full bg-transparent border-b border-stone-100 focus:outline-none"
                                />
                              ) : item.lead}
                            </td>
                            <td className="p-4 text-stone-500">
                              {isEditing ? (
                                <textarea 
                                  value={item.participants}
                                  onChange={(e) => updateField(`governance.meetings[${idx}].participants`, e.target.value)}
                                  className="w-full bg-transparent border-b border-stone-100 focus:outline-none resize-none h-12"
                                />
                              ) : item.participants}
                            </td>
                            <td className="p-4 text-stone-600 italic">
                              {isEditing ? (
                                <textarea 
                                  value={item.output}
                                  onChange={(e) => updateField(`governance.meetings[${idx}].output`, e.target.value)}
                                  className="w-full bg-transparent border-b border-stone-100 focus:outline-none resize-none h-12"
                                />
                              ) : item.output}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {isEditing && (
                      <button 
                        onClick={() => {
                          const newMeetings = [...(governance.meetings || []), {
                            name: 'New Meeting',
                            freq: 'Frequency',
                            lead: 'Lead',
                            participants: 'Participants',
                            output: 'Key Output'
                          }];
                          updateField('governance.meetings', newMeetings);
                        }}
                        className="w-full py-3 bg-stone-50 border-t border-stone-100 text-stone-400 hover:text-vib-blue transition-colors font-bold text-xs flex items-center justify-center gap-2"
                      >
                        <Plus size={14} /> THÊM CUỘC HỌP MỚI
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-stone-900 border-l-4 border-vib-blue pl-3">📅 Action Plan — Ưu tiên thực hiện</h3>
                  <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full border-collapse text-[11px]">
                      <thead>
                        <tr className="bg-stone-600 text-white">
                          <th className="p-4 text-left w-12">#</th>
                          <th className="p-4 text-left">Action Item</th>
                          <th className="p-4 text-left">Owner</th>
                          <th className="p-4 text-left">Deadline</th>
                          <th className="p-4 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {governance.actionPlan.map((item, idx) => (
                          <tr key={item.id} className="hover:bg-stone-50 transition-colors group/action">
                            <td className="p-4 text-stone-400 font-bold relative">
                              {isEditing && (
                                <button 
                                  onClick={() => {
                                    const newPlan = [...governance.actionPlan];
                                    newPlan.splice(idx, 1);
                                    updateField('governance.actionPlan', newPlan);
                                  }}
                                  className="absolute top-1 left-1 text-stone-300 hover:text-red-500 opacity-0 group-hover/action:opacity-100 transition-opacity"
                                >
                                  <Trash2 size={12} />
                                </button>
                              )}
                              {isEditing ? (
                                <input 
                                  value={item.id}
                                  onChange={(e) => updateField(`governance.actionPlan[${idx}].id`, e.target.value)}
                                  className="w-full bg-transparent border-b border-stone-100 focus:outline-none"
                                />
                              ) : item.id}
                            </td>
                            <td className="p-4 font-medium text-stone-900">
                              {isEditing ? (
                                <textarea 
                                  value={item.item}
                                  onChange={(e) => updateField(`governance.actionPlan[${idx}].item`, e.target.value)}
                                  className="w-full bg-transparent border-b border-stone-100 focus:outline-none resize-none h-12"
                                />
                              ) : item.item}
                            </td>
                            <td className="p-4 text-stone-500">
                              {isEditing ? (
                                <input 
                                  value={item.owner}
                                  onChange={(e) => updateField(`governance.actionPlan[${idx}].owner`, e.target.value)}
                                  className="w-full bg-transparent border-b border-stone-100 focus:outline-none"
                                />
                              ) : item.owner}
                            </td>
                            <td className="p-4 font-bold text-stone-900">
                              {isEditing ? (
                                <input 
                                  value={item.deadline}
                                  onChange={(e) => updateField(`governance.actionPlan[${idx}].deadline`, e.target.value)}
                                  className="w-full bg-transparent border-b border-stone-100 focus:outline-none"
                                />
                              ) : item.deadline}
                            </td>
                            <td className="p-4">
                              {isEditing ? (
                                <select 
                                  value={item.status}
                                  onChange={(e) => updateField(`governance.actionPlan[${idx}].status`, e.target.value)}
                                  className="bg-transparent border border-stone-200 rounded text-[10px] focus:outline-none"
                                >
                                  <option value="Chưa làm">Chưa làm</option>
                                  <option value="Cần khởi động">Cần khởi động</option>
                                  <option value="Đang làm">Đang làm</option>
                                  <option value="Hoàn thành">Hoàn thành</option>
                                </select>
                              ) : (
                                <Badge type={item.status === 'Chưa làm' ? 'red' : item.status === 'Hoàn thành' ? 'green' : 'amber'}>{item.status}</Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {isEditing && (
                      <button 
                        onClick={() => {
                          const newPlan = [...governance.actionPlan, {
                            id: governance.actionPlan.length + 1,
                            item: 'New Action Item',
                            owner: 'Owner',
                            deadline: 'Deadline',
                            status: 'Chưa làm'
                          }];
                          updateField('governance.actionPlan', newPlan);
                        }}
                        className="w-full py-3 bg-stone-50 border-t border-stone-100 text-stone-400 hover:text-vib-blue transition-colors font-bold text-xs flex items-center justify-center gap-2"
                      >
                        <Plus size={14} /> THÊM ACTION ITEM MỚI
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>

      <footer className="bg-stone-100 border-t border-stone-200 p-6 text-center text-[10px] text-stone-400 uppercase tracking-widest">
        © 2026 {activeProject.name} · Confidential & Internal Use Only
      </footer>
      </div>
    </div>
  );
}
