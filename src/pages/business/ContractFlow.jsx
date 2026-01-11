import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, CreditCard, ChevronRight, Check } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

const ContractFlow = ({ farmer, onComplete }) => {
    const [step, setStep] = useState('review'); // review, sign, pay, done
    const { t } = useTranslation();

    return (
        <div className="glass" style={{
            padding: '3rem',
            borderRadius: 'var(--radius-lg)',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto'
        }}>
            {step === 'review' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <FileText size={32} color="var(--primary)" />
                        <h2>Digital Agriculture Contract</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div className="card" style={{ padding: '1.5rem', background: '#f8fafc' }}>
                            <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>BUSINESS (First Party)</h4>
                            <p style={{ fontWeight: 600 }}>AgriCorp Ltd.</p>
                            <p style={{ fontSize: '0.9rem' }}>GST: 27AABCU9603R1Z</p>
                        </div>
                        <div className="card" style={{ padding: '1.5rem', background: '#f8fafc' }}>
                            <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>FARMER (Second Party)</h4>
                            <p style={{ fontWeight: 600 }}>{farmer.name}</p>
                            <p style={{ fontSize: '0.9rem' }}>ID: {farmer.id}00-XXXX-XXXX</p>
                        </div>
                    </div>

                    <div className="card" style={{ marginBottom: '2rem' }}>
                        <h3>Contract Terms</h3>
                        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
                                <span>Crop Selection</span>
                                <span style={{ fontWeight: 600 }}>Premium Organic Wheat</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
                                <span>Required Quantity</span>
                                <span style={{ fontWeight: 600 }}>50 Quintals</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
                                <span>Agreed Price / Quintal</span>
                                <span style={{ fontWeight: 600 }}>₹4,200</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Advance Funding (25%)</span>
                                <span style={{ fontWeight: 600, color: 'var(--primary)' }}>₹52,500</span>
                            </div>
                        </div>
                    </div>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                        * This contract is legally binding and governed by the Agricultural Contract Act. Both parties agree to the quality standards and risk-sharing clauses defined in the platform's terms of service.
                    </p>

                    <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setStep('sign')}>
                        Confirm Terms & Proceed to E-Sign <ChevronRight size={18} />
                    </button>
                </motion.div>
            )}

            {step === 'sign' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
                    <Shield size={64} color="var(--primary)" style={{ marginBottom: '2rem' }} />
                    <h2>Aadhaar E-Sign Verification</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
                        We will send an OTP to your Aadhaar-linked mobile number for secure digital signature.
                    </p>
                    <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <input key={i} type="text" maxLength="1" style={{
                                    width: '45px',
                                    height: '55px',
                                    textAlign: 'center',
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    border: '2px solid var(--border)',
                                    borderRadius: '12px'
                                }} />
                            ))}
                        </div>
                    </div>
                    <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setStep('pay')}>
                        Verify & Sign Contract
                    </button>
                </motion.div>
            )}

            {step === 'pay' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <CreditCard size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                        <h2>Payment for Advance Funding</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Ensuring the farmer has resources to begin cultivation.</p>
                    </div>

                    <div className="card" style={{ background: '#f8fafc', padding: '2rem', marginBottom: '2.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span>Advance to Farmer</span>
                            <span>₹52,500</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                            <span>Platform Fee (2%)</span>
                            <span>₹1,050</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '1.25rem', fontWeight: 700 }}>
                            <span>Total Payable</span>
                            <span style={{ color: 'var(--primary)' }}>₹53,550</span>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                        <button className="btn btn-secondary">UPI / PhonePe</button>
                        <button className="btn btn-secondary">Bank Transfer</button>
                    </div>

                    <button className="btn btn-primary" style={{ width: '100%', padding: '1.25rem' }} onClick={() => setStep('done')}>
                        Authorize Payment
                    </button>
                </motion.div>
            )}

            {step === 'done' && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        background: 'var(--success)',
                        color: 'white',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem'
                    }}>
                        <Check size={48} strokeWidth={3} />
                    </div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Contract Finalized!</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
                        The contract #FC-2025-092 is now active. Ramesh Patil has been notified to begin cultivation.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-secondary" style={{ flex: 1 }}>Download PDF</button>
                        <button className="btn btn-primary" style={{ flex: 1 }} onClick={onComplete}>Back to Dashboard</button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default ContractFlow;
