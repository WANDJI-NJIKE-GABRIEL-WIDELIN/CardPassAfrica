import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowDownLeft, Coffee, Bus, BookOpen } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const WalletPage: React.FC = () => {
    const [currency, setCurrency] = React.useState<'XAF' | 'NGN' | 'GHS'>('XAF');

    // Mock conversion rates
    const rates = {
        XAF: 1,
        NGN: 2.1,
        GHS: 0.02
    };

    const convert = (amount: number) => {
        return (amount * rates[currency]).toLocaleString(undefined, { maximumFractionDigits: 0 });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col md:flex-row">
            <div className="flex-1 flex flex-col overflow-y-auto pb-20 md:pb-0">
                <header className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <NavLink to="/dashboard" className="glass p-2 rounded-full md:hidden">
                            <ArrowDownLeft className="rotate-45" size={20} />
                        </NavLink>
                        <h2 className="text-2xl font-bold">Student Wallet</h2>
                    </div>

                    {/* Multi-Currency Selector */}
                    <div className="flex glass p-1 rounded-xl border-white/5">
                        {(['XAF', 'NGN', 'GHS'] as const).map(curr => (
                            <button
                                key={curr}
                                onClick={() => setCurrency(curr)}
                                className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${currency === curr ? 'bg-primary-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                {curr}
                            </button>
                        ))}
                    </div>
                </header>

                <main className="p-6 space-y-8">
                    {/* Balance Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass rounded-3xl p-8 bg-gradient-to-br from-indigo-500/20 to-primary-500/20 border border-white/10 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Wallet size={80} />
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 mb-2">
                            <span className="text-xs font-semibold uppercase tracking-[2px]">Total Available</span>
                        </div>
                        <div className="text-5xl font-bold flex items-baseline gap-2">
                            {convert(25000)} <span className="text-lg opacity-40 font-medium">{currency}</span>
                        </div>
                        <div className="flex gap-3 mt-8">
                            <button className="btn-primary flex-1 py-3 text-sm flex items-center justify-center gap-2">
                                <ArrowDownLeft size={18} className="rotate-180" />
                                Add Funds
                            </button>
                            <button className="glass rounded-xl flex-1 text-sm font-bold border-white/10 hover:bg-white/5 transition-colors">
                                Pay Merchant
                            </button>
                        </div>
                    </motion.div>

                    {/* Transactions */}
                    <section>
                        <div className="flex justify-between items-center mb-4 px-1">
                            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-[2px]">Recent Transfers</h3>
                            <span className="text-[10px] font-bold text-primary-400 cursor-pointer hover:underline">View All</span>
                        </div>
                        <div className="space-y-3">
                            <Transaction icon={<Coffee className="text-amber-400" />} label="Cafeteria Yaoundé I" date="Today, 12:45" amount={-1200} currency={currency} rate={rates[currency]} />
                            <Transaction icon={<Bus className="text-primary-400" />} label="Transport Abidjan Hub" date="Yesterday, 08:30" amount={-500} currency={currency} rate={rates[currency]} />
                            <Transaction icon={<BookOpen className="text-indigo-400" />} label="Digital Library Access" date="Feb 15, 14:20" amount={-250} currency={currency} rate={rates[currency]} />
                            <Transaction icon={<ArrowDownLeft className="text-green-400" />} label="Erasmus+ Africa Grant" amount={15000} date="Feb 10" currency={currency} rate={rates[currency]} />
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

const Transaction = ({ icon, label, date, amount, currency, rate }: any) => {
    const displayAmount = (amount * rate).toLocaleString(undefined, { maximumFractionDigits: 0 });
    return (
        <div className="glass-card flex items-center justify-between !p-4 group hover:border-white/20 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center group-hover:bg-primary-500/10 transition-colors">
                    {icon}
                </div>
                <div>
                    <p className="font-bold text-sm tracking-tight">{label}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{date}</p>
                </div>
            </div>
            <div className="text-right">
                <p className={`text-sm font-bold ${amount > 0 ? 'text-green-500' : 'text-slate-200'}`}>
                    {amount > 0 ? '+' : ''} {displayAmount}
                </p>
                <p className="text-[9px] opacity-40 font-bold uppercase">{currency}</p>
            </div>
        </div>
    );
};

export default WalletPage;
