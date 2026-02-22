import React, { useState, useEffect } from 'react';
import { motion, motionValue, useTransform, useSpring } from 'framer-motion';
import { CreditCard, Wallet, FileText, QrCode, LogOut, Bell, ShieldCheck, Wifi, WifiOff } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [sharingLevel, setSharingLevel] = useState<'Identity' | 'Full'>('Identity');
    const [trustScore, setTrustScore] = useState(98); // Mock initial score

    // 3D Parallax Values
    const x = motionValue(0);
    const y = motionValue(0);
    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);
    const springConfig = { damping: 20, stiffness: 300 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    function handleMouseMove(event: React.MouseEvent) {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Simulate real-time trust score updates
        const interval = setInterval(() => {
            setTrustScore(prev => Math.max(90, Math.min(100, prev + (Math.random() - 0.5))));
        }, 5000);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col md:flex-row perspective-1000">
            {/* Sidebar for Desktop */}
            <div className="hidden md:flex flex-col w-64 glass border-r border-white/10 p-6">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg">Panafrican</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <NavItem to="/dashboard" icon={<CreditCard size={20} />} label="Student ID" />
                    <NavItem to="/wallet" icon={<Wallet size={20} />} label="Wallet & Pay" />
                    <NavItem to="/documents" icon={<FileText size={20} />} label="Credentials" />
                </nav>

                <button className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors mt-auto pt-6 border-t border-white/10">
                    <LogOut size={20} />
                    <span>Disconnect</span>
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Header */}
                <header className="p-6 md:p-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">Hello, Jean-Paul</h2>
                        <p className="text-slate-400 text-sm">Yaoundé I University • Level 3</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${isOnline ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                            {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
                            {isOnline ? 'Network Online' : 'Offline Mode Active'}
                        </div>
                        <button className="relative p-2 glass rounded-full">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950" />
                        </button>
                    </div>
                </header>

                {/* Academic Passport Section */}
                <main className="p-6 md:p-8 space-y-8">
                    <section>
                        <div className="flex justify-between items-end mb-4 px-1">
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Panafrican Academic Passport</h3>
                                <p className="text-[10px] text-primary-400 font-bold uppercase tracking-widest mt-1">W3C Verifiable Credential v1.0</p>
                            </div>
                            <div className="flex items-center gap-2 glass px-3 py-1 rounded-full text-[10px] font-bold border-white/5">
                                <span className="opacity-50">Sharing Mode:</span>
                                <button
                                    onClick={() => setSharingLevel(prev => prev === 'Identity' ? 'Full' : 'Identity')}
                                    className={`transition-colors ${sharingLevel === 'Identity' ? 'text-primary-400' : 'text-slate-400'}`}
                                >
                                    {sharingLevel === 'Identity' ? 'Selective' : 'Universal'}
                                </button>
                            </div>
                        </div>

                        <div
                            className="w-full max-w-sm"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            <motion.div
                                style={{
                                    rotateX: springRotateX,
                                    rotateY: springRotateY,
                                    transformStyle: "preserve-3d",
                                }}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative w-full aspect-[1.586/1] rounded-[32px] overflow-hidden shadow-2xl shadow-primary-900/40 p-1 bg-gradient-to-br from-primary-400 via-primary-600 to-indigo-900 group cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-[url('/passport-pattern.svg')] opacity-10 pointer-events-none" />
                                <div className="relative h-full bg-slate-950/60 backdrop-blur-2xl rounded-[28px] p-6 flex flex-col justify-between border border-white/20">
                                    <div className="flex justify-between items-start" style={{ transform: "translateZ(60px)" }}>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] uppercase font-bold tracking-[3px] text-primary-300">Republique du Cameroun</span>
                                            <span className="font-extrabold text-xl tracking-tight">Academic Passport</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <ShieldCheck className={`transition-colors ${sharingLevel === 'Full' ? 'text-primary-400' : 'text-indigo-400'}`} />
                                            <span className="text-[8px] font-mono mt-1 opacity-40">did:pan:7729</span>
                                        </div>
                                    </div>

                                    <div className="flex items-end justify-between" style={{ transform: "translateZ(40px)" }}>
                                        <div className="space-y-1">
                                            <p className="text-[10px] opacity-60 font-medium">Passport Identifier</p>
                                            <p className="text-sm font-mono tracking-[2px]">PAN-CMR-2024-XP-9982</p>
                                            <div className="flex gap-2">
                                                <p className="text-[9px] mt-2 bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full inline-block border border-green-500/30 font-bold uppercase">SECURE PROOF</p>
                                                {sharingLevel === 'Full' && (
                                                    <p className="text-[9px] mt-2 bg-primary-500/20 text-primary-400 px-2 py-0.5 rounded-full inline-block border border-primary-500/30 font-bold uppercase">LIFELONG ASSETS</p>
                                                )}
                                            </div>
                                        </div>
                                        <motion.div
                                            className="bg-white p-2 rounded-xl shadow-inner relative overflow-hidden"
                                            animate={{ opacity: [0.9, 1, 0.9] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <QrCode className="text-slate-950 size-14" />
                                            {sharingLevel === 'Identity' && (
                                                <div className="absolute inset-0 bg-primary-500/10 flex items-center justify-center">
                                                    <div className="w-full h-0.5 bg-primary-500/30 animate-pulse" />
                                                </div>
                                            )}
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Lifelong Learning & Skills Badges */}
                    <section>
                        <h3 className="text-[10px] font-bold uppercase tracking-[2px] text-slate-500 mb-4 px-1">Lifelong Learning Assets</h3>
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            <SkillBadge icon="🐍" name="Python Master" level="Verifier: Google" />
                            <SkillBadge icon="🛡️" name="Cyber Trust" level="Verifier: AfCFTA" />
                            <SkillBadge icon="📊" name="Data Analytics" level="Verifier: IBM Africa" />
                        </div>
                    </section>

                    {/* Quick Access Grid */}
                    <section className="md:hidden grid grid-cols-3 gap-4">
                        <QuickAction to="/wallet" icon={<Wallet className="text-amber-400" />} label="Pay" />
                        <QuickAction to="/dashboard" icon={<QrCode className="text-primary-400" />} label="Scan" />
                        <QuickAction to="/documents" icon={<FileText className="text-indigo-400" />} label="Vault" />
                    </section>

                    {/* Security & Mobility Section */}
                    <section>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4 px-1">Infrastructure Status</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.div
                                className="glass-card flex items-center justify-between p-6 bg-gradient-to-br from-primary-500/5 to-transparent"
                                whileHover={{ scale: 1.01 }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-primary-500/20 p-3 rounded-2xl border border-primary-500/20">
                                        <ShieldCheck className="text-primary-400" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm tracking-tight">AI Trust Index</h4>
                                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Live Identity Health</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-black text-primary-400">{trustScore.toFixed(1)}%</p>
                                    <p className="text-[9px] font-black text-green-500 uppercase tracking-[2px]">High Trust</p>
                                </div>
                            </motion.div>

                            <div className="glass-card flex items-center gap-4 border border-green-500/10 hover:border-green-500/30 transition-colors cursor-pointer">
                                <div className="bg-green-500/20 p-3 rounded-2xl">
                                    <Wifi className="text-green-400" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">Universal Mobility</h4>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold">Connected Hub: West Africa (Accra)</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Mobile Navigation */}
                <div className="md:hidden mt-auto glass border-t border-white/10 px-8 py-4 flex justify-between items-center sticky bottom-0 z-50">
                    <NavIcon to="/dashboard" icon={<CreditCard size={24} />} />
                    <NavIcon to="/wallet" icon={<Wallet size={24} />} />
                    <NavIcon to="/documents" icon={<FileText size={24} />} />
                </div>
            </div>
        </div>
    );
};

const NavItem = ({ to, icon, label }: { to: string, icon: any, label: string }) => (
    <NavLink
        to={to}
        className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
    >
        {icon}
        <span>{label}</span>
    </NavLink>
);

const NavIcon = ({ to, icon }: { to: string, icon: any }) => (
    <NavLink
        to={to}
        className={({ isActive }) => `p-2 rounded-xl transition-all ${isActive ? 'text-primary-400 bg-primary-900/20' : 'text-slate-500 hover:text-white'}`}
    >
        {icon}
    </NavLink>
);

const QuickAction = ({ to, icon, label }: { to: string, icon: any, label: string }) => (
    <NavLink to={to} className="flex flex-col items-center gap-2">
        <div className="glass w-14 h-14 rounded-2xl flex items-center justify-center translate-y-0 active:translate-y-1 transition-transform">
            {icon}
        </div>
        <span className="text-[10px] font-medium">{label}</span>
    </NavLink>
);

const SkillBadge = ({ icon, name, level }: { icon: string, name: string, level: string }) => (
    <div className="flex-shrink-0 glass p-4 rounded-3xl border border-white/5 w-40 hover:border-primary-500/30 transition-colors">
        <div className="text-2xl mb-2">{icon}</div>
        <p className="font-bold text-xs tracking-tight">{name}</p>
        <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">{level}</p>
    </div>
);

export default Dashboard;
