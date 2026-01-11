import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Globe, Sprout } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { language, setLanguage, t } = useTranslation();

    const isLanding = location.pathname === '/';

    // Simple breadcrumb logic
    const pathnames = location.pathname.split('/').filter((x) => x);
    const breadcrumbMap = {
        roles: 'Join',
        farmer: 'Farmer',
        business: 'Business',
        register: 'Onboarding',
        dashboard: 'Dashboard'
    };

    return (
        <header className="glass" style={{
            padding: '0.75rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            height: '70px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                {/* Back Button */}
                {!isLanding && (
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            background: 'rgba(0,0,0,0.05)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <ArrowLeft size={20} />
                    </button>
                )}

                {/* Brand / Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                    <div style={{
                        background: 'var(--primary)',
                        color: 'white',
                        borderRadius: '12px',
                        padding: '0.5rem',
                        display: 'flex'
                    }}>
                        <Sprout size={24} />
                    </div>
                    <span className="gradient-text" style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.03em' }}>
                        Agriance
                    </span>
                </Link>

                {/* Breadcrumbs */}
                {!isLanding && (
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        <span style={{ opacity: 0.5 }}>/</span>
                        {pathnames.map((name, index) => {
                            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                            const isLast = index === pathnames.length - 1;
                            const label = breadcrumbMap[name] || name.charAt(0).toUpperCase() + name.slice(1);

                            return (
                                <React.Fragment key={name}>
                                    {isLast ? (
                                        <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{label}</span>
                                    ) : (
                                        <Link to={routeTo} style={{ textDecoration: 'none', color: 'inherit' }}>{label}</Link>
                                    )}
                                    {!isLast && <span style={{ opacity: 0.5 }}>/</span>}
                                </React.Fragment>
                            );
                        })}
                    </nav>
                )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.03)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
                    {['en', 'hi', 'mr'].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            style={{
                                padding: '0.4rem 0.8rem',
                                borderRadius: '8px',
                                border: 'none',
                                background: language === lang ? 'white' : 'transparent',
                                boxShadow: language === lang ? 'var(--shadow-sm)' : 'none',
                                color: language === lang ? 'var(--primary)' : 'var(--text-muted)',
                                fontWeight: language === lang ? 700 : 500,
                                fontSize: '0.85rem',
                                cursor: 'pointer'
                            }}
                        >
                            {lang === 'en' ? 'EN' : lang === 'hi' ? 'हि' : 'म'}
                        </button>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Header;
