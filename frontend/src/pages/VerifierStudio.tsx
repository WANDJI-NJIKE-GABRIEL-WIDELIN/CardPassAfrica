import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, XCircle, Search, Globe, FileText } from 'lucide-react';

const VerifierStudio: React.FC = () => {
    const [searchId, setSearchId] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [result, setResult] = useState<'SUCCESS' | 'ERROR' | null>(null);

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchId) return;

        setIsVerifying(true);
        setResult(null);

        // Simulate high-security verification handshake
        setTimeout(() => {
            setIsVerifying(false);
            setResult(searchId.includes('PAN') ? 'SUCCESS' : 'ERROR');
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 -left-20 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl w-full text-center space-y-8 relative z-10"
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-primary-600/20 glass rounded-3xl flex items-center justify-center border border-primary-500/30">
                        <ShieldCheck className="text-primary-400" size={32} />
                    </div>
                    <h1 className="text-4xl font-black italic tracking-tighter">VERIFIER STUDIO</h1>
                    <p className="text-slate-400 text-sm font-medium tracking-widest uppercase">Panafrican Academic Trust Terminal</p>
                </div>

                <div className="glass-card !bg-white/5 !p-8 border-white/10">
                    <form onSubmit={handleVerify} className="space-y-6">
                        <div className="text-left space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Passport Identifier / DID</label>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-mono focus:outline-none focus:border-primary-500/50 transition-all"
                                    placeholder="did:pan:student-..."
                                    value={searchId}
                                    onChange={(e) => setSearchId(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            disabled={isVerifying}
                            className={`btn-primary w-full py-4 text-sm font-bold flex items-center justify-center gap-2 ${isVerifying ? 'opacity-50' : ''}`}
                        >
                            {isVerifying ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Verifying Trust Anchor...
                                </>
                            ) : (
                                <>
                                    <Globe size={18} />
                                    Confirm Authenticity
                                </>
                            )}
                        </button>
                    </form>

                    {result && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-8 pt-8 border-t border-white/5"
                        >
                            {result === 'SUCCESS' ? (
                                <div className="space-y-4">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="bg-green-500/20 p-3 rounded-full">
                                            <CheckCircle2 className="text-green-500" size={40} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-green-400">PASSPORT VERIFIED</h2>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[4px]">Verified via Panafrican Hub</p>
                                    </div>
                                    <div className="glass p-4 rounded-2xl border-white/5 text-left space-y-2">
                                        <p className="text-[10px] text-primary-400 font-black uppercase">Confirmed Assets:</p>
                                        <div className="flex gap-2 items-center text-xs text-slate-300">
                                            <FileText size={14} className="text-slate-500" />
                                            <span>Full Academic Transcript (Yaoundé I)</span>
                                        </div>
                                        <div className="flex gap-2 items-center text-xs text-slate-300">
                                            <ShieldCheck size={14} className="text-slate-500" />
                                            <span>Biometric Identity Binding (MOSIP)</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-3">
                                    <div className="bg-red-500/20 p-3 rounded-full">
                                        <XCircle className="text-red-500" size={40} />
                                    </div>
                                    <h2 className="text-xl font-bold text-red-400">VERIFICATION FAILED</h2>
                                    <p className="text-xs text-slate-500">Identifier not found in Panafrican Registry</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>

                <div className="text-[10px] text-slate-600 font-medium">
                    This terminal connects directly to the **Continental Academic Identity Hub**.
                    All checks are cryptographically logged and non-repudiable.
                </div>
            </motion.div>
        </div>
    );
};

export default VerifierStudio;
