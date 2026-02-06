import React, { useState } from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building2, FileText, Banknote, ArrowLeft, ArrowRight } from 'lucide-react';
import FileUpload from '../../components/FileUpload';

const BusinessOnboarding = () => {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [regFile, setRegFile] = useState(null);
    const navigate = useNavigate();

    const handleNext = () => step < 3 ? setStep(step + 1) : navigate('/business/dashboard');

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card"
                    style={{ padding: '3rem' }}
                >
                    {step === 1 && (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ padding: '1rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '12px', color: '#D4AF37' }}>
                                    <Building2 />
                                </div>
                                <h2>Register Your Business</h2>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <input type="text" placeholder="Company Name" className="card" style={{ padding: '1rem', width: '100%' }} />
                                <input type="text" placeholder="GST Number" className="card" style={{ padding: '1rem', width: '100%' }} />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ padding: '1rem', background: 'rgba(45, 90, 39, 0.1)', borderRadius: '12px', color: 'var(--primary)' }}>
                                    <FileText />
                                </div>
                                <h2>Legal Documentation</h2>
                            </div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Upload your business registration documents for verification.</p>
                            <FileUpload
                                label="Registration Certificate (GST/PAN)"
                                value={regFile}
                                onFileSelect={setRegFile}
                                accept=".pdf,.doc,.docx,.jpg,.png"
                            />
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ padding: '1rem', background: 'rgba(45, 90, 39, 0.1)', borderRadius: '12px', color: 'var(--primary)' }}>
                                    <Banknote />
                                </div>
                                <h2>Financial Details</h2>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <input type="text" placeholder="Bank Name" className="card" style={{ padding: '1rem', width: '100%' }} />
                                <input type="text" placeholder="Account Number" className="card" style={{ padding: '1rem', width: '100%' }} />
                                <input type="text" placeholder="IFSC Code" className="card" style={{ padding: '1rem', width: '100%' }} />
                            </div>
                        </div>
                    )}

                    <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between' }}>
                        <button onClick={() => setStep(s => s - 1)} disabled={step === 1} className="btn btn-secondary">
                            <ArrowLeft size={18} /> Back
                        </button>
                        <button onClick={handleNext} className="btn btn-primary">
                            {step === 3 ? 'Complete Setup' : 'Next Step'} <ArrowRight size={18} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BusinessOnboarding;
