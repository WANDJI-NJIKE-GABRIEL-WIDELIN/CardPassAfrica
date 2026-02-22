import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ShieldCheck, CheckCircle2, Globe } from 'lucide-react';

const Documents: React.FC = () => {
    const [isTransferring, setIsTransferring] = React.useState(false);
    const [selectedUni, setSelectedUni] = React.useState('');

    const universities = [
        { id: 'U-ABI', name: 'Univ. Félix Houphouët-Boigny', country: 'Ivory Coast' },
        { id: 'U-LEG', name: 'University of Ghana', country: 'Ghana' },
        { id: 'U-DAK', name: 'Université Cheikh Anta Diop', country: 'Senegal' }
    ];

    const handleTransfer = () => {
        setIsTransferring(true);
        // Simulate progress
        setTimeout(() => setIsTransferring(false), 5000);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 p-6 sm:p-8">
            <h2 className="text-3xl font-bold mb-8">Academic Portfolio</h2>

            <div className="space-y-8">
                <section>
                    <div className="flex justify-between items-center mb-4 px-1">
                        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-[2px]">Verifiable Credentials</h3>
                        <span className="text-[10px] font-bold text-primary-400">2 Documents Secured</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DocCard
                            title="Bachelor of Computer Science"
                            university="University of Yaoundé I"
                            year="2023"
                            status="Verified"
                        />
                        <DocCard
                            title="Cybersecurity Specialization"
                            university="African Institute of Sciences"
                            year="2024"
                            status="Pending"
                        />
                    </div>
                </section>

                <section className="glass rounded-3xl p-8 border border-white/10 bg-gradient-to-br from-primary-500/10 to-indigo-500/10 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-primary-600/20 glass rounded-2xl flex items-center justify-center border border-primary-500/30">
                                <Globe className="text-primary-400" size={28} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold">Panafrican Mobility Hub</h4>
                                <p className="text-[10px] text-primary-400 font-bold uppercase tracking-widest">W3C Credential Exchange Ready</p>
                            </div>
                        </div>

                        {!isTransferring ? (
                            <div className="space-y-6">
                                <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                                    Ready to study abroad? Securely transfer your academic credits to partner universities across the continent.
                                </p>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase">Target University</label>
                                    <select
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-primary-500/50"
                                        value={selectedUni}
                                        onChange={(e) => setSelectedUni(e.target.value)}
                                    >
                                        <option value="">Select a partner...</option>
                                        {universities.map(uni => (
                                            <option key={uni.id} value={uni.id}>{uni.name} ({uni.country})</option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    disabled={!selectedUni}
                                    onClick={handleTransfer}
                                    className="btn-primary w-full py-4 font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <Globe size={18} />
                                    Initiate Secure Credit Transfer
                                </button>
                            </div>
                        ) : (
                            <div className="py-8 text-center space-y-4">
                                <div className="relative w-20 h-20 mx-auto">
                                    <div className="absolute inset-0 border-4 border-primary-500/20 rounded-full" />
                                    <div className="absolute inset-0 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <ShieldCheck className="text-primary-400 animate-pulse" />
                                    </div>
                                </div>
                                <h5 className="font-bold text-lg">Encrypting Credentials...</h5>
                                <p className="text-xs text-slate-500">Establishing secure handshake with {universities.find(u => u.id === selectedUni)?.name}</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

const DocCard = ({ title, university, year, status }: any) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="glass-card flex flex-col gap-6"
    >
        <div className="flex items-start justify-between">
            <div className="w-12 h-12 glass rounded-xl flex items-center justify-center">
                <FileText className="text-primary-400" />
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${status === 'Verified' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                {status === 'Verified' ? <CheckCircle2 size={12} /> : <ShieldCheck size={12} />}
                {status}
            </div>
        </div>

        <div>
            <h4 className="font-bold text-lg mb-1">{title}</h4>
            <p className="text-sm text-slate-400">{university}</p>
            <p className="text-xs text-slate-500 mt-2">Issued: {year}</p>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-between">
            <button className="text-xs font-bold text-primary-400 hover:underline flex items-center gap-1">
                View Transcript
            </button>
            <button className="p-2 glass rounded-lg hover:bg-white/20 transition-colors">
                <Download size={16} />
            </button>
        </div>
    </motion.div>
);

export default Documents;
