import React, { useState } from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Wallet, FileCheck, Tractor, TrendingUp, Landmark, ShieldCheck } from 'lucide-react';
import LoanApplicationFlow from '../../components/LoanApplicationFlow';

const FarmerDashboard = () => {
    const { t } = useTranslation();
    const [showLoanFlow, setShowLoanFlow] = useState(false);

    const stats = [
        { label: 'Active Contracts', value: '2', icon: <FileCheck color="var(--primary)" /> },
        { label: 'Pending Offers', value: '5', icon: <Bell color="#B8860B" /> },
        { label: 'Total Earnings', value: '₹1.5L', icon: <Wallet color="var(--success)" /> },
        { label: 'Upcoming Harvest', value: '15 Days', icon: <Tractor color="#4A8B3F" /> }
    ];

    const contracts = [
        { id: 1, business: 'AgriCorp Ltd.', crop: 'Organic Wheat', quantity: '50 Quintals', status: 'In Progress', progress: 65, advance: '₹50,000' },
        { id: 2, business: 'GreenSeeds Inc.', crop: 'Soybean', quantity: '100 Quintals', status: 'Verification', progress: 15, advance: 'Pending' }
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#fcfdfa' }}>
            {/* Header section removed - using global Header */}

            <main style={{ padding: '3rem 4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1>Welcome back, Ramesh</h1>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.1)',
                            color: 'var(--success)', borderRadius: 'var(--radius-full)',
                            fontSize: '0.85rem', fontWeight: 700
                        }}>
                            <ShieldCheck size={16} /> KYC Verified
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="card"
                            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}
                        >
                            <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.03)', borderRadius: '12px' }}>{stat.icon}</div>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{stat.label}</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{stat.value}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                    {/* Active Contracts */}
                    <section>
                        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FileCheck size={24} color="var(--primary)" /> Active Contracts
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {contracts.map(contract => (
                                <div key={contract.id} className="card" style={{ padding: '2rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.25rem' }}>{contract.business}</h3>
                                            <p style={{ color: 'var(--text-muted)' }}>{contract.crop} • {contract.quantity}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{
                                                padding: '0.4rem 1rem',
                                                borderRadius: 'var(--radius-full)',
                                                background: contract.status === 'In Progress' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(212, 175, 55, 0.1)',
                                                color: contract.status === 'In Progress' ? 'var(--success)' : '#B8860B',
                                                fontSize: '0.8rem',
                                                fontWeight: 700
                                            }}>
                                                {contract.status}
                                            </span>
                                            <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Advance: {contract.advance}</div>
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                        <span>Growth Progress</span>
                                        <span style={{ fontWeight: 600 }}>{contract.progress}%</span>
                                    </div>
                                    <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${contract.progress}%` }}
                                            style={{ height: '100%', background: 'var(--primary)' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Sidebar */}
                    <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {/* Financing Section */}
                        <section>
                            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Landmark size={24} color="var(--primary)" /> Financing & Loans
                            </h2>
                            <div className="card" style={{ padding: '1.5rem', border: '1px solid var(--primary)', background: 'rgba(45, 90, 39, 0.02)' }}>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Est. Loan Eligibility</div>
                                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>₹2,50,000</div>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                                    Based on your active contracts and verified land records.
                                </p>
                                <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShowLoanFlow(true)}>
                                    Apply for Fast Loan
                                </button>
                            </div>
                        </section>

                        {/* Market Insights */}
                        <section>
                            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Market Insights
                            </h2>
                            <div className="card" style={{ background: 'var(--primary)', color: 'white', padding: '2rem' }}>
                                <TrendingUp style={{ marginBottom: '1rem' }} />
                                <h3 style={{ marginBottom: '0.5rem' }}>Wheat Demand is Up!</h3>
                                <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '1.5rem' }}>
                                    Businesses are looking for Premium Organic Wheat in your region. Contracts offering 15% better prices.
                                </p>
                                <button className="btn" style={{ background: 'white', color: 'var(--primary)', width: '100%' }}>View Offers</button>
                            </div>
                        </section>
                    </aside>
                </div>
            </main>

            <AnimatePresence>
                {showLoanFlow && (
                    <LoanApplicationFlow
                        onClose={() => setShowLoanFlow(false)}
                        onComplete={() => setShowLoanFlow(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default FarmerDashboard;
