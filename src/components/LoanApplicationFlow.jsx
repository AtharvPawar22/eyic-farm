import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, CreditCard, PieChart, FileCheck, ChevronRight, ArrowLeft } from 'lucide-react';
import { partnerBanks } from '../data/loans';

const LoanApplicationFlow = ({ onClose, onComplete }) => {
    const [step, setStep] = useState(1); // 1: Bank selection, 2: Details, 3: Documents, 4: Review
    const [selectedBank, setSelectedBank] = useState(null);
    const [amount, setAmount] = useState('');
    const [tenure, setTenure] = useState('12');

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '2rem'
        }}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="card"
                style={{ maxWidth: '700px', width: '100%', padding: '0', overflow: 'hidden' }}
            >
                {/* Header */}
                <div style={{ padding: '2rem 3rem', background: 'var(--primary)', color: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Landmark size={28} /> Apply for Agriculture Loan
                        </h2>
                        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                    </div>
                </div>

                {/* Stepper */}
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
                    {[1, 2, 3, 4].map(s => (
                        <div key={s} style={{
                            flex: 1,
                            padding: '1rem',
                            textAlign: 'center',
                            borderBottom: step === s ? '3px solid var(--primary)' : 'none',
                            color: step === s ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: step === s ? 700 : 400,
                            fontSize: '0.8rem'
                        }}>
                            STEP {s}
                        </div>
                    ))}
                </div>

                <div style={{ padding: '3rem' }}>
                    {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Select Preferred Bank</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {partnerBanks.map(bank => (
                                    <div
                                        key={bank.id}
                                        onClick={() => setSelectedBank(bank)}
                                        style={{
                                            padding: '1.5rem',
                                            border: `2px solid ${selectedBank?.id === bank.id ? 'var(--primary)' : 'var(--border)'}`,
                                            borderRadius: 'var(--radius-md)',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1.5rem',
                                            transition: 'all 0.2s',
                                            background: selectedBank?.id === bank.id ? 'rgba(45, 90, 39, 0.03)' : 'white'
                                        }}
                                    >
                                        <div style={{ fontSize: '2.5rem' }}>{bank.icon}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{bank.name}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Interest from {bank.minInterest} • Max {bank.maxTenure}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#B8860B' }}>★ {bank.rating}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                className="btn btn-primary"
                                style={{ width: '100%', marginTop: '2rem' }}
                                disabled={!selectedBank}
                                onClick={handleNext}
                            >
                                Continue <ChevronRight size={18} />
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Loan Details</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Requested Amount (₹)</label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="e.g. 150000"
                                        style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Repayment Tenure (Months)</label>
                                    <select
                                        value={tenure}
                                        onChange={(e) => setTenure(e.target.value)}
                                        style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}
                                    >
                                        <option value="6">6 Months</option>
                                        <option value="12">12 Months (Recommended)</option>
                                        <option value="24">24 Months</option>
                                        <option value="36">36 Months</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Purpose of Loan</label>
                                    <textarea
                                        rows="3"
                                        placeholder="Briefly describe what you will use the funds for..."
                                        style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'inherit' }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={handleBack}><ArrowLeft size={18} /> Back</button>
                                <button className="btn btn-primary" style={{ flex: 2 }} onClick={handleNext} disabled={!amount}>Next Step <ChevronRight size={18} /></button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <h3 style={{ marginBottom: '1rem' }}>Support Documents</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Platform data (KYC & Contracts) is automatically shared with the bank.</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ padding: '1.25rem', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                                    <div style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Upload Bank Statement (3 Months)</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PDF or Image format</div>
                                </div>
                                <div style={{ padding: '1.25rem', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                                    <div style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '0.25rem' }}>Upload Land Record (Optional)</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Helpful for larger loans</div>
                                </div>
                                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: 'var(--radius-sm)' }}>
                                    <FileCheck color="var(--success)" size={24} />
                                    <span style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: 600 }}>Platform KYC & Contracts Linked</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={handleBack}><ArrowLeft size={18} /> Back</button>
                                <button className="btn btn-primary" style={{ flex: 2 }} onClick={handleNext}>Review Application <ChevronRight size={18} /></button>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Application Review</h3>
                            <div className="card" style={{ padding: '1.5rem', background: '#f8fafc', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Beneficiary Bank</span>
                                    <span style={{ fontWeight: 600 }}>{selectedBank?.name}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Loan Amount</span>
                                    <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.1rem' }}>₹{parseInt(amount).toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Tenure</span>
                                    <span style={{ fontWeight: 600 }}>{tenure} Months</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #e2e8f0' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Estimated Interest</span>
                                    <span style={{ fontWeight: 600 }}>~{selectedBank?.minInterest} p.a.</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Est. Monthly EMI</span>
                                    <span style={{ fontWeight: 600 }}>₹{Math.round((parseInt(amount) * 1.08) / parseInt(tenure)).toLocaleString()} / mo</span>
                                </div>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                                By submitting, you authorize {selectedBank?.name} to access your platform profile, land records, and contract history for credit evaluation.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={handleBack}><ArrowLeft size={18} /> Back</button>
                                <button className="btn btn-primary" style={{ flex: 2, padding: '1rem' }} onClick={onComplete}>Submit Application</button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default LoanApplicationFlow;
