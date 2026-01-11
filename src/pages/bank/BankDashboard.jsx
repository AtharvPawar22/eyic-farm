import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, Landmark, User, FileText,
    BarChart3, CheckCircle, XCircle, ChevronRight,
    AlertCircle, TrendingUp, Calendar, Clock
} from 'lucide-react';
import { sampleLoans, LOAN_STATUS } from '../../data/loans';
import RiskAssessment from '../../components/RiskAssessment';

const BankDashboard = () => {
    const [activeTab, setActiveTab] = useState('applications'); // applications, portfolio, analytics
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const stats = [
        { label: 'Pending Applications', value: '12', icon: <Clock color="#F59E0B" />, trend: '+3 today' },
        { label: 'Active Loans', value: '₹42.5L', icon: <Landmark color="var(--primary)" />, trend: '15 Active' },
        { label: 'Avg Risk Score', value: '82/100', icon: <TrendingUp color="var(--success)" />, trend: 'Healthy' },
        { label: 'Repayments Rate', value: '98.4%', icon: <CheckCircle color="var(--primary)" />, trend: 'Above avg' }
    ];

    const filteredApplications = sampleLoans.filter(loan =>
        loan.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
            <main style={{ padding: '3rem 4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Banker's Terminal</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Evaluating agriculture risk using verified platform contracts and profiles.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', background: 'white', padding: '0.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                        {['applications', 'portfolio', 'analytics'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: 'var(--radius-sm)',
                                    border: 'none',
                                    background: activeTab === tab ? 'var(--primary)' : 'transparent',
                                    color: activeTab === tab ? 'white' : 'var(--text-muted)',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stats Overview */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                    {stats.map((stat, i) => (
                        <div key={i} className="card" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.03)', borderRadius: '8px' }}>{stat.icon}</div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 700 }}>{stat.trend}</span>
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{stat.label}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{stat.value}</div>
                        </div>
                    ))}
                </div>

                {activeTab === 'applications' && (
                    <div style={{ display: 'grid', gridTemplateColumns: selectedApplication ? '1fr 450px' : '1fr', gap: '2rem' }}>
                        {/* List Section */}
                        <section>
                            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', gap: '1.5rem' }}>
                                    <div style={{ position: 'relative', flex: 1 }}>
                                        <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                                        <input
                                            type="text"
                                            placeholder="Search application ID or applicant name..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}
                                        />
                                    </div>
                                    <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Filter size={18} /> Filters
                                    </button>
                                </div>

                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead style={{ background: '#f8fafc', textAlignment: 'left' }}>
                                        <tr>
                                            <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.85rem', color: 'var(--text-muted)' }}>APPLICANT</th>
                                            <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.85rem', color: 'var(--text-muted)' }}>AMOUNT</th>
                                            <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.85rem', color: 'var(--text-muted)' }}>RISK SCORE</th>
                                            <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.85rem', color: 'var(--text-muted)' }}>STATUS</th>
                                            <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.85rem', color: 'var(--text-muted)' }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredApplications.map(loan => (
                                            <tr
                                                key={loan.id}
                                                onClick={() => setSelectedApplication(loan)}
                                                style={{
                                                    borderTop: '1px solid #f1f5f9',
                                                    cursor: 'pointer',
                                                    background: selectedApplication?.id === loan.id ? 'rgba(45, 90, 39, 0.03)' : 'transparent'
                                                }}
                                            >
                                                <td style={{ padding: '1.25rem 1.5rem' }}>
                                                    <div style={{ fontWeight: 600 }}>{loan.applicantName}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {loan.id} • {loan.applicantType}</div>
                                                </td>
                                                <td style={{ padding: '1.25rem 1.5rem' }}>
                                                    <div style={{ fontWeight: 700 }}>₹{loan.amount.toLocaleString()}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{loan.purpose.substring(0, 20)}...</div>
                                                </td>
                                                <td style={{ padding: '1.25rem 1.5rem' }}>
                                                    <div style={{
                                                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                                        color: loan.riskScore >= 80 ? 'var(--success)' : loan.riskScore >= 60 ? '#F59E0B' : '#EF4444',
                                                        fontWeight: 800, fontSize: '1.1rem'
                                                    }}>
                                                        {loan.riskScore}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1.25rem 1.5rem' }}>
                                                    <span style={{
                                                        padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600,
                                                        background: loan.status === LOAN_STATUS.APPROVED ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                                        color: loan.status === LOAN_STATUS.APPROVED ? 'var(--success)' : '#F59E0B'
                                                    }}>
                                                        {loan.status.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                                    <ChevronRight size={18} color="var(--text-muted)" />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Analysis Sidebar */}
                        <AnimatePresence>
                            {selectedApplication && (
                                <motion.aside
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: 20, opacity: 0 }}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        <RiskAssessment score={selectedApplication.riskScore} breakdown={selectedApplication.riskBreakdown} />

                                        <div className="card" style={{ padding: '1.5rem' }}>
                                            <h4 style={{ marginBottom: '1rem' }}>Application Details</h4>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span style={{ color: 'var(--text-muted)' }}>Applied Date</span>
                                                    <span>{selectedApplication.appliedDate}</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span style={{ color: 'var(--text-muted)' }}>Purpose</span>
                                                    <span style={{ fontWeight: 600 }}>{selectedApplication.purpose}</span>
                                                </div>
                                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                                    <button className="btn btn-secondary" style={{ flex: 1, color: '#EF4444' }}>
                                                        <XCircle size={18} /> Reject
                                                    </button>
                                                    <button className="btn btn-primary" style={{ flex: 2 }}>
                                                        <CheckCircle size={18} /> Approve Loan
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card" style={{ padding: '1.5rem', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: 700 }}>
                                                <AlertCircle size={18} /> Platform Insight
                                            </div>
                                            <p style={{ fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                                                {selectedApplication.applicantName} has successfully completed 4 contracts this year with a 100% fulfill rate. Their current active contracts provide 3x collateral value for this loan.
                                            </p>
                                        </div>
                                    </div>
                                </motion.aside>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {activeTab !== 'applications' && (
                    <div className="card" style={{ padding: '5rem', textAlign: 'center' }}>
                        <BarChart3 size={64} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                        <h2>Advanced Analytics Dashboard</h2>
                        <p style={{ color: 'var(--text-muted)' }}>This module is currently processing institutional data records.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default BankDashboard;
