import React from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    ShieldAlert,
    TrendingUp,
    Globe,
    CheckCircle,
    AlertTriangle,
    LayoutDashboard,
    Search
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex">
            {/* Sidebar */}
            <div className="w-64 glass border-r border-white/10 p-6 hidden lg:flex flex-col">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg">Panafrican Auth</span>
                </div>

                <nav className="flex-1 space-y-4">
                    <NavItem active icon={<LayoutDashboard size={20} />} label="Overview" />
                    <NavItem icon={<Users size={20} />} label="Identities" />
                    <NavItem icon={<ShieldAlert size={20} />} label="Fraud Detection" />
                    <NavItem icon={<Globe size={20} />} label="Regional Mobility" />
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                <header className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-900/20 backdrop-blur-sm sticky top-0 z-10">
                    <div>
                        <h1 className="text-2xl font-bold">University Admin Portal</h1>
                        <p className="text-slate-400 text-sm">Managing Identity & Mobility • West African Hub</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
                                placeholder="Search student ID..."
                            />
                        </div>
                        <div className="flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-500/20">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            Live Sync Active
                        </div>
                    </div>
                </header>

                <main className="p-8 space-y-8">
                    {/* Continental Strategic Insights */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 glass-card bg-gradient-to-br from-primary-600/10 to-indigo-600/10 border-primary-500/20">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-lg font-bold">Continental Education Intelligence</h3>
                                    <p className="text-xs text-slate-400">Strategic analytics for Panafrican University Governance</p>
                                </div>
                                <div className="bg-primary-500/20 px-3 py-1 rounded-full text-[10px] font-bold text-primary-400 border border-primary-500/30">
                                    AfCFTA ALIGNED
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 glass rounded-2xl border-white/5">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Mobility Index</p>
                                    <p className="text-2xl font-bold">0.68</p>
                                    <p className="text-[10px] text-green-500 font-bold">+12% YoY</p>
                                </div>
                                <div className="p-4 glass rounded-2xl border-white/5">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Trust Integrity</p>
                                    <p className="text-2xl font-bold">99.8%</p>
                                    <p className="text-[10px] text-primary-400 font-bold">W3C VERIFIED</p>
                                </div>
                                <div className="p-4 glass rounded-2xl border-white/5">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Admin Savings</p>
                                    <p className="text-2xl font-bold">$1.4M</p>
                                    <p className="text-[10px] text-slate-400 font-bold">PER HUB</p>
                                </div>
                                <div className="p-4 glass rounded-2xl border-white/5">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Verified Diplomas</p>
                                    <p className="text-2xl font-bold">4.2M</p>
                                    <p className="text-[10px] text-green-500 font-bold">INSTANT CHECK</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card border-amber-500/20 bg-amber-500/5">
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <AlertTriangle className="text-amber-500" size={18} />
                                Early Warning System
                            </h3>
                            <p className="text-xs text-slate-400 mb-4">AI prediction for student dropout risk zones</p>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-2 glass rounded-lg border-white/5">
                                    <span className="text-xs font-medium">Sahel Region</span>
                                    <span className="text-[10px] font-bold text-red-400 px-2 py-0.5 bg-red-400/10 rounded-full">HIGH RISK</span>
                                </div>
                                <div className="flex items-center justify-between p-2 glass rounded-lg border-white/5">
                                    <span className="text-xs font-medium">Central Hub</span>
                                    <span className="text-[10px] font-bold text-green-400 px-2 py-0.5 bg-green-400/10 rounded-full">STABLE</span>
                                </div>
                            </div>
                            <button className="w-full mt-4 text-[10px] font-bold text-primary-400 uppercase tracking-widest hover:underline">
                                Deploy Intervention Hub
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard icon={<Users className="text-primary-400" />} label="Total Students" value="12,482" grow="+12%" />
                        <StatCard icon={<CheckCircle className="text-green-400" />} label="Identities Issued" value="11,920" grow="95.5%" />
                        <StatCard icon={<ShieldAlert className="text-red-400" />} label="Fraud Attempts" value="42" grow="Blocked" />
                        <StatCard icon={<TrendingUp className="text-amber-400" />} label="Cross-border Transfers" value="156" grow="+8.4%" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Recent Fraud Alerts */}
                        <div className="lg:col-span-1 glass-card overflow-hidden">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold flex items-center gap-2">
                                    <AlertTriangle className="text-amber-500" size={20} />
                                    AI Security Watch
                                </h3>
                                <span className="text-[10px] uppercase font-bold text-slate-500">Global Registry</span>
                            </div>
                            <div className="space-y-4">
                                <FraudAlert id="CMR-221" reason="Double Biometric Entry" location="Yaounde" />
                                <FraudAlert id="CIV-992" reason="Invalid Transcript Sign" location="Abidjan" />
                                <FraudAlert id="SEN-105" reason="Identity Mismatch" location="Dakar" />
                            </div>
                            <button className="w-full mt-6 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">
                                Review Full Audit Log
                            </button>
                        </div>

                        {/* Mobility Map Simulation */}
                        <div className="lg:col-span-2 glass-card">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold flex items-center gap-2">
                                    <Globe className="text-primary-400" size={20} />
                                    Regional Student Mobility Heatmap
                                </h3>
                                <div className="flex gap-2">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-primary-500" />
                                        <span className="text-[10px] text-slate-500">Active</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <span className="text-[10px] text-slate-500">Verified</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-64 bg-slate-900/50 rounded-xl relative flex items-center justify-center overflow-hidden border border-white/5">
                                {/* Mock Map Visualization */}
                                <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-[length:200px] pointer-events-none" />
                                <div className="relative z-10 flex gap-12 items-center">
                                    <CityPoint name="Lagos" active />
                                    <div className="relative flex items-center -mx-4">
                                        <div className="w-24 h-[1px] bg-gradient-to-r from-primary-500 to-transparent opacity-50" />
                                        <motion.div
                                            animate={{ x: [0, 96] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            className="absolute w-2 h-2 bg-primary-400 rounded-full blur-[2px]"
                                        />
                                    </div>
                                    <CityPoint name="Accra" active />
                                    <div className="relative flex items-center -mx-4">
                                        <div className="w-24 h-[1px] bg-gradient-to-r from-green-500 to-transparent opacity-50" />
                                        <motion.div
                                            animate={{ x: [0, 96] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
                                            className="absolute w-2 h-2 bg-green-400 rounded-full blur-[2px]"
                                        />
                                    </div>
                                    <CityPoint name="Abidjan" />
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-4 gap-4 text-center">
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Continental Hubs</p>
                                    <p className="font-bold text-lg">42</p>
                                </div>
                                <div className="border-x border-white/5">
                                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Inter-Uni Sync</p>
                                    <p className="font-bold text-lg">99.9%</p>
                                </div>
                                <div className="border-r border-white/5">
                                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Avg. Transfer</p>
                                    <p className="font-bold text-lg">24h</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Regulatory Score</p>
                                    <p className="font-bold text-lg text-green-400">A+</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

const NavItem = ({ icon, label, active = false }: any) => (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${active ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
        {icon}
        <span className="font-medium">{label}</span>
    </div>
);

const StatCard = ({ icon, label, value, grow }: any) => (
    <div className="glass-card !p-5">
        <div className="flex justify-between items-start mb-4">
            <div className="bg-white/5 p-2 rounded-lg">{icon}</div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${grow === 'Blocked' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                {grow}
            </span>
        </div>
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold mt-1 tracking-tight">{value}</p>
    </div>
);

const FraudAlert = ({ id, reason, location }: any) => (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
        <div>
            <p className="text-xs font-bold text-slate-200">{id} • {location}</p>
            <p className="text-[10px] text-red-400">{reason}</p>
        </div>
        <button className="text-[10px] text-primary-400 font-bold hover:underline">Review</button>
    </div>
);

const CityPoint = ({ name, active = false }: any) => (
    <div className="flex flex-col items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${active ? 'bg-primary-500 shadow-[0_0_10px_rgba(14,165,233,0.8)]' : 'bg-slate-700'}`} />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{name}</span>
    </div>
);

export default AdminDashboard;
