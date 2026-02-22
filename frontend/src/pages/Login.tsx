import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Scan, ShieldCheck, Globe } from 'lucide-react';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [isScanning, setIsScanning] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

    const handleBiometricAuth = () => {
        setIsScanning(true);
        // Simulate biometric processing
        setTimeout(() => {
            setIsScanning(false);
            setIsVerified(true);
            setTimeout(() => {
                onLogin();
                navigate('/dashboard');
            }, 1500);
        }, 3000);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[120px] -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md text-center"
            >
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-900/40">
                        <Globe className="text-white w-8 h-8" />
                    </div>
                </div>

                <h1 className="text-4xl font-black italic tracking-tighter mb-2">PANAFRICAN HUB</h1>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[4px] mb-12">Continental Academic Identity Infrastructure</p>

                <div className="glass-card mb-8">
                    <AnimatePresence mode="wait">
                        {!isScanning && !isVerified ? (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="py-8"
                            >
                                <button
                                    onClick={handleBiometricAuth}
                                    className="w-24 h-24 rounded-full border-2 border-primary-500/30 flex items-center justify-center mx-auto mb-6 relative group"
                                >
                                    <div className="absolute inset-0 rounded-full bg-primary-500/10 group-hover:bg-primary-500/20 transition-all scale-110" />
                                    <Fingerprint className="text-primary-500 w-12 h-12" />
                                </button>
                                <p className="text-lg font-medium">Verify Identity</p>
                                <p className="text-sm text-slate-500">Use your registered biometric profile</p>
                            </motion.div>
                        ) : isScanning ? (
                            <motion.div
                                key="scanning"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="py-8 flex flex-col items-center"
                            >
                                <div className="relative w-32 h-32 mb-6">
                                    <motion.div
                                        animate={{ y: [0, 100, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-x-0 h-1 bg-primary-500 shadow-[0_0_15px_rgba(14,165,233,0.8)] z-10"
                                    />
                                    <Scan className="w-full h-full text-slate-700" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Fingerprint className="text-primary-400 w-16 h-16 opacity-50" />
                                    </div>
                                </div>
                                <p className="text-lg font-medium animate-pulse text-primary-400">Scanning Biometrics...</p>
                                <p className="text-sm text-slate-500">Cross-referencing with MOSIP Registry</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="verified"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="py-8"
                            >
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <ShieldCheck className="text-green-500 w-12 h-12" />
                                </div>
                                <p className="text-xl font-bold text-green-500">Identity Verified</p>
                                <p className="text-sm text-slate-500">Welcome back, Student</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-12 text-slate-500 text-xs flex items-center justify-center gap-4">
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500" /> Secure Node
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500" /> Offline Sync
                    </span>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
