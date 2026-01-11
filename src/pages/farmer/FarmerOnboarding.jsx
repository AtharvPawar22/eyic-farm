import React, { useState } from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, MapPin, ClipboardList, ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react';

const steps = [
    { id: 'kyc', title: 'KYC Verification', icon: <ShieldCheck /> },
    { id: 'personal', title: 'Personal Details', icon: <CheckCircle2 /> },
    { id: 'land', title: 'Land Details', icon: <MapPin /> },
    { id: 'history', title: 'Crop History', icon: <ClipboardList /> }
];

const FarmerOnboarding = () => {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate();

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Finalize registration
            navigate('/farmer/dashboard');
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        } else {
            navigate('/roles');
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>

                {/* Progress Stepper */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '3rem',
                    position: 'relative',
                    padding: '0 1rem'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        left: '40px',
                        right: '40px',
                        height: '2px',
                        background: '#e2e8f0',
                        zIndex: 0
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        left: '40px',
                        width: `${(currentStep / (steps.length - 1)) * 90}%`,
                        height: '2px',
                        background: 'var(--primary)',
                        zIndex: 0,
                        transition: 'width 0.4s ease'
                    }} />

                    {steps.map((step, index) => (
                        <div key={step.id} style={{ zIndex: 1, textAlign: 'center' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: index <= currentStep ? 'var(--primary)' : 'white',
                                color: index <= currentStep ? 'white' : '#64748b',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: index <= currentStep ? 'none' : '2px solid #e2e8f0',
                                margin: '0 auto 0.5rem',
                                transition: 'all 0.3s'
                            }}>
                                {index < currentStep ? <CheckCircle2 size={20} /> : step.icon}
                            </div>
                            <span style={{
                                fontSize: '0.75rem',
                                fontWeight: index <= currentStep ? '600' : '400',
                                color: index <= currentStep ? 'var(--text-main)' : '#94a3b8'
                            }}>
                                {step.title}
                            </span>
                        </div>
                    ))}
                </div>

                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="card"
                    style={{ padding: '3rem' }}
                >
                    {currentStep === 0 && (
                        <div>
                            <h2 style={{ marginBottom: '1.5rem' }}>Verify Your Identity</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                                Please provide your Aadhaar or PAN details to get verified.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div className="input-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Document Type</label>
                                    <select className="btn btn-secondary" style={{ width: '100%', textAlign: 'left', padding: '1rem' }}>
                                        <option>Aadhaar Card</option>
                                        <option>PAN Card</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Document Number</label>
                                    <input type="text" placeholder="XXXX-XXXX-XXXX" style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: 'var(--radius-sm)',
                                        border: '1px solid var(--border)'
                                    }} />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div>
                            <h2 style={{ marginBottom: '1.5rem' }}>Personal Information</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="input-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
                                    <input type="text" style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }} />
                                </div>
                                <div className="input-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Phone Number</label>
                                    <input type="tel" style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }} />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div>
                            <h2 style={{ marginBottom: '1.5rem' }}>Land Details</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div className="input-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Land Size (in Acres)</label>
                                    <input type="number" style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }} />
                                </div>
                                <div className="input-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Location (Tehsil / District)</label>
                                    <input type="text" style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }} />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div>
                            <h2 style={{ marginBottom: '1.5rem' }}>Crop History</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>What crops do you usually grow? This helps businesses find you.</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                                {['Wheat', 'Rice', 'Soybean', 'Cotton', 'Sugarcane', 'Others'].map(crop => (
                                    <div key={crop} style={{
                                        padding: '1rem',
                                        border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius-sm)',
                                        textAlign: 'center',
                                        cursor: 'pointer'
                                    }}>
                                        {crop}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{
                        marginTop: '3rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingTop: '2rem',
                        borderTop: '1px solid var(--border)'
                    }}>
                        <button onClick={handleBack} className="btn btn-secondary">
                            <ArrowLeft size={18} /> {t('common.back')}
                        </button>
                        <button onClick={handleNext} className="btn btn-primary">
                            {currentStep === steps.length - 1 ? t('common.submit') : t('common.next')} <ArrowRight size={18} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default FarmerOnboarding;
