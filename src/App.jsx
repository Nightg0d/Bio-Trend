import { startTransition, useEffect, useState, useRef } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleCheck,
  Droplets,
  Eye,
  Facebook,
  Globe2,
  Instagram,
  Leaf,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Play,
  Recycle,
  Send,
  Sun,
  Target,
  TreePine,
  X,
  Zap,
  Sparkles,
  Wrench,
  PackageCheck,
  BadgeCheck,
  Building2,
  BriefcaseBusiness,
  Flame,
  Users,
  Trash2,
  Factory,
  Settings,
  CircleGauge,
  Sprout,
  Users2,
  Database,
  History,
  Lock,
  LogOut,
  Save,
  Upload,
  Download,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import {
  contactDetails as defaultContactDetails,
  impacts as defaultImpacts,
  navItems,
  processSteps as defaultProcessSteps,
  projects as defaultProjects,
  solutions as defaultSolutions,
  stats as defaultStats,
  values as defaultValues,
} from './data';
import initialSiteData from '../data/site-content.json';
import './admin.css';

const API_BASE = typeof window !== 'undefined' ? `http://${window.location.hostname}:8787` : API_BASE + '';

// SVG Icon Map for Dynamic Rendering
const IconMap = {
  Leaf, Zap, PackageCheck, Users, Flame, Trash2, Factory, Recycle, Zap, 
  PackageCheck, Sparkles, Wrench, BadgeCheck, Droplets, Sprout, CircleGauge, 
  Settings, Building2, BriefcaseBusiness, Target, Eye
};

function renderIcon(iconName, size = 20, props = {}) {
  const IconComponent = IconMap[iconName] || Leaf;
  return <IconComponent size={size} {...props} />;
}

// Router Link component
function AppLink({ to, onNavigate, className, children, ...props }) {
  const handleClick = (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    if (typeof onNavigate === 'function') {
      onNavigate(to);
    }
  };
  return (
    <a href={to} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

function Brand({ footer = false, onNavigate }) {
  return (
    <AppLink className={`brand ${footer ? 'brand--footer' : ''}`} to="/" onNavigate={onNavigate} aria-label="Bio Trend Energy home">
      <img src="/assets/bio-trend-logo.png" alt="Bio Trend Energy" />
    </AppLink>
  );
}

// Header Component for main website
function Header({ darkMode, onThemeToggle, onVideoOpen, onNavigate, currentPath }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <div className="nav-brand-wrap">
          <Brand onNavigate={onNavigate} />
        </div>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <AppLink
              className={currentPath === item.href ? 'active' : ''}
              to={item.href}
              onNavigate={onNavigate}
              key={item.href}
            >
              {item.label}
            </AppLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="icon-button" type="button" onClick={onThemeToggle} aria-label="Toggle color theme">
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="text-button nav-film-button" type="button" onClick={onVideoOpen}>
            <Play size={14} fill="currentColor" />
            Our Story
          </button>
          <AppLink className="button button--small" to="/contact" onNavigate={onNavigate}>
            Start a Project
            <ArrowRight size={15} />
          </AppLink>
          <button
            className="menu-button"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <nav id="mobile-navigation" className={`mobile-nav ${menuOpen ? 'open' : ''}`} aria-label="Mobile navigation">
        {navItems.map((item, index) => (
          <AppLink
            to={item.href}
            onNavigate={(to) => { onNavigate(to); closeMenu(); }}
            key={item.href}
          >
            <span>0{index + 1}</span>
            {item.label}
            <ArrowUpRight size={18} />
          </AppLink>
        ))}
        <button type="button" onClick={() => { onVideoOpen(); closeMenu(); }}>
          <Play size={17} fill="currentColor" />
          Watch Our Story
        </button>
      </nav>
    </header>
  );
}

function SectionIntro({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`section-intro section-intro--${align}`} data-reveal>
      <div className="eyebrow"><Leaf size={13} />{eyebrow}</div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Hero({ heroData, onVideoOpen, onNavigate }) {
  return (
    <section id="home" className="hero-section">
      <div className="hero-grid page-shell">
        <div className="hero-copy" data-reveal>
          <div className="eyebrow">{heroData.eyebrow}</div>
          <h1>
            {heroData.title.split('Sustainable Tomorrow')[0]}
            <span>Sustainable Tomorrow</span>
          </h1>
          <p>{heroData.description}</p>
          <div className="hero-actions">
            <AppLink className="button" to="/solutions" onNavigate={onNavigate}>
              {heroData.buttonPrimary} <ArrowRight size={17} />
            </AppLink>
            <AppLink className="button button--outline" to="/contact" onNavigate={onNavigate}>{heroData.buttonSecondary}</AppLink>
          </div>
          <div className="hero-proof">
            <div className="proof-avatars" aria-hidden="true">
              <span>BT</span><span>CE</span><span>RE</span>
            </div>
            <p><strong>50+ successful projects</strong><br />delivered across India</p>
          </div>
        </div>

        <div className="hero-visual" data-reveal>
          <div className="dot-field" aria-hidden="true" />
          <div className="hero-image-frame">
            <img src={heroData.image} alt="Modern bioenergy facility in green fields" fetchpriority="high" />
          </div>
          <button className="play-card" type="button" onClick={onVideoOpen} aria-label="Play Bio Trend Energy film">
            <span><Play size={18} fill="currentColor" /></span>
            <span><strong>Watch our story</strong><small>03:20 min</small></span>
          </button>
          <span className="floating-leaf floating-leaf--one"><Leaf /></span>
          <span className="floating-leaf floating-leaf--two"><Leaf /></span>
        </div>
      </div>

      <div className="stats-card page-shell" data-reveal>
        {defaultStats.map(({ value, label, icon: Icon }) => (
          <div className="stat" key={label}>
            <span className="stat-icon"><Icon size={21} /></span>
            <span><strong>{value}</strong><small>{label}</small></span>
          </div>
        ))}
      </div>
    </section>
  );
}

function About({ aboutData }) {
  return (
    <section id="about" className="section about-section">
      <div className="section-glow section-glow--right" />
      <div className="page-shell">
        <SectionIntro
          eyebrow={aboutData.eyebrow}
          title={aboutData.title}
          description={aboutData.description}
        />

        <div className="about-grid">
          <div className="about-story" data-reveal>
            <p>{aboutData.story}</p>
            <ul className="check-list">
              {aboutData.bullets.map((bullet, idx) => (
                <li key={idx}><CircleCheck /> {bullet}</li>
              ))}
            </ul>
            <div className="value-row">
              {defaultValues.map(({ title, icon: Icon }) => (
                <div key={title}><Icon /><span>{title}</span></div>
              ))}
            </div>
          </div>

          <div className="about-image-wrap" data-reveal>
            <img src={aboutData.image} alt="Fresh green leaf with morning dew" loading="lazy" decoding="async" />
            <div className="image-note">
              <strong>{aboutData.noteYears}</strong>
              <span>{aboutData.noteText}</span>
            </div>
          </div>
        </div>

        <div className="mission-card" data-reveal>
          <div>
            <span className="mission-icon"><Target /></span>
            <span><strong>{aboutData.missionTitle}</strong><small>{aboutData.missionText}</small></span>
          </div>
          <div>
            <span className="mission-icon"><Eye /></span>
            <span><strong>{aboutData.visionTitle}</strong><small>{aboutData.visionText}</small></span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Solutions({ solutionsData, onNavigate }) {
  return (
    <section id="solutions" className="section solutions-section">
      <div className="page-shell">
        <div className="section-title-row">
          <SectionIntro
            eyebrow={solutionsData.eyebrow}
            title={solutionsData.title}
            description={solutionsData.description}
          />
          <AppLink className="inline-link desktop-only" to="/contact" onNavigate={onNavigate}>Discuss your project <ArrowUpRight /></AppLink>
        </div>

        <div className="solutions-grid">
          {solutionsData.items.map((item, index) => (
            <article className="solution-card" key={item.title} data-reveal style={{ '--delay': `${index * 60}ms` }}>
              <span className="solution-number">0{index + 1}</span>
              <span className="solution-icon">{renderIcon(item.icon)}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <AppLink to="/contact" onNavigate={onNavigate}>Learn more <ArrowRight /></AppLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process({ processData }) {
  return (
    <section id="process" className="section process-section">
      <div className="page-shell">
        <SectionIntro
          eyebrow={processData.eyebrow}
          title={processData.title}
          description={processData.description}
        />

        <div className="process-grid">
          <div className="process-list" data-reveal>
            {processData.steps.map((step, index) => (
              <article className="process-step" key={step.title}>
                <div className="step-marker">
                  <span>{renderIcon(step.icon)}</span>
                  {index < processData.steps.length - 1 && <i />}
                </div>
                <div className="step-number">0{index + 1}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="process-visual" data-reveal>
            <img src={processData.image} alt="Biomass plant with agricultural feedstock" loading="lazy" decoding="async" />
            <div className="process-badge">
              <Recycle />
              <span><strong>{processData.badgeTitle}</strong><small>{processData.badgeText}</small></span>
            </div>
            <span className="process-leaf"><Leaf /></span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects({ projectsData, onNavigate }) {
  const [filter, setFilter] = useState('All');
  const visibleProjects = filter === 'All' ? projectsData.items : projectsData.items.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section projects-section">
      <div className="page-shell">
        <div className="section-title-row">
          <SectionIntro
            eyebrow={projectsData.eyebrow}
            title={projectsData.title}
            description={projectsData.description}
          />
          <div className="project-summary desktop-only" data-reveal>
            <strong>{projectsData.summaryValue}</strong><span>{projectsData.summaryText}</span>
          </div>
        </div>

        <div className="filter-row" data-reveal role="group" aria-label="Filter projects">
          {['All', 'Biomass Power', 'Biogas', 'Waste to Energy'].map((item) => (
            <button
              type="button"
              className={filter === item ? 'active' : ''}
              key={item}
              onClick={() => startTransition(() => setFilter(item))}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {visibleProjects.map((project, index) => (
            <article className="project-card" key={project.title} data-reveal style={{ '--delay': `${index * 50}ms` }}>
              <div className="project-image">
                <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                <span>{project.category}</span>
                <AppLink to="/contact" onNavigate={onNavigate} aria-label={`Enquire about ${project.title}`}><ArrowUpRight /></AppLink>
              </div>
              <div className="project-meta">
                <div><h3>{project.title}</h3><p><MapPin />{project.location}</p></div>
                <small>{project.capacity}</small>
              </div>
            </article>
          ))}
        </div>

        <div className="center-action" data-reveal>
          <AppLink className="button" to="/contact" onNavigate={onNavigate}>Plan a Project <ArrowRight /></AppLink>
        </div>
      </div>
    </section>
  );
}

function Impact({ impactData }) {
  return (
    <section id="impact" className="section impact-section">
      <div className="page-shell">
        <SectionIntro
          eyebrow={impactData.eyebrow}
          title={impactData.title}
          description={impactData.description}
        />

        <div className="impact-grid">
          <div className="impact-list" data-reveal>
            {impactData.items.map(({ label, value, detail, icon }) => (
              <article key={label}>
                <span>{renderIcon(icon)}</span>
                <div><small>{label}</small><strong>{value}</strong><p>{detail}</p></div>
              </article>
            ))}
          </div>

          <div className="impact-visual" data-reveal>
            <img src={impactData.image} alt="Wind turbines in a green mountain landscape" loading="lazy" decoding="async" />
            <div className="sdg-card">
              <div>
                <span className="sdg-mark"><Globe2 /></span>
                <div><strong>{impactData.sdgTitle}</strong><p>{impactData.sdgText}</p></div>
              </div>
              <div className="sdg-row">
                <span className="sdg sdg--seven"><b>7</b><small>Affordable & clean energy</small><Sun /></span>
                <span className="sdg sdg--thirteen"><b>13</b><small>Climate action</small><Globe2 /></span>
                <span className="sdg sdg--fifteen"><b>15</b><small>Life on land</small><TreePine /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ footerData }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      service: formData.get('service'),
      message: formData.get('message'),
    };

    try {
      await fetch(API_BASE + '/api/forms/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setSubmitted(true);
      event.target.reset();
    } catch (err) {
      window.alert('Failed to submit contact enquiry. Make sure the backend is active.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactDetails = [
    { label: 'Phone', value: footerData.phone, href: `tel:${footerData.phone.replace(/\s+/g, '')}`, icon: Building2 },
    { label: 'Email', value: footerData.email, href: `mailto:${footerData.email}`, icon: BriefcaseBusiness },
    { label: 'Office', value: footerData.office, href: '#contact', icon: Flame },
  ];

  return (
    <section id="contact" className="section contact-section">
      <div className="page-shell">
        <SectionIntro
          eyebrow="Contact us"
          title="Let's Build a Greener Future Together"
          description="Tell us what you are working on. Our specialists will help shape the right solution for your resources and goals."
        />

        <div className="contact-grid">
          <div className="contact-panel" data-reveal>
            <div className="contact-photo"><img src="/assets/leaf-dew.jpg" alt="Green leaf detail" loading="lazy" decoding="async" /></div>
            <div className="contact-copy">
              <h3>Start with a conversation.</h3>
              <p>Whether you have a defined project or an early idea, we are ready to listen.</p>
              <div className="contact-details">
                {contactDetails.map(({ label, value, href, icon: Icon }) => (
                  <a href={href} key={label}>
                    <span><Icon /></span>
                    <span><small>{label}</small><strong>{value}</strong></span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} data-reveal>
            <div className="form-row">
              <label>
                Your name
                <input type="text" name="name" placeholder="Full name" required />
              </label>
              <label>
                Work email
                <input type="email" name="email" placeholder="name@company.com" required />
              </label>
            </div>
            <div className="form-row">
              <label>
                Phone number
                <input type="tel" name="phone" placeholder="+91 00000 00000" />
              </label>
              <label>
                Interested in
                <select name="service" defaultValue="">
                  <option value="" disabled>Select a solution</option>
                  {defaultSolutions.map((solution) => <option key={solution.title}>{solution.title}</option>)}
                </select>
              </label>
            </div>
            <label>
              Tell us about your project
              <textarea name="message" rows="5" placeholder="A few details about the opportunity, location and timeline..." required />
            </label>
            <div className="form-footer">
              <button className="button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Enquiry"} <Send size={16} />
              </button>
              <p>We usually respond within one business day.</p>
            </div>
            {submitted && (
              <div className="form-success" role="status"><Check /> Thank you. Your enquiry has been recorded.</div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function ClosingCta({ onNavigate }) {
  return (
    <section className="closing-cta" data-reveal>
      <img src="/assets/seedling-cta.jpg" alt="Hands holding a young green plant" loading="lazy" decoding="async" />
      <div className="page-shell">
        <div className="cta-copy">
          <span className="cta-icon"><Leaf /></span>
          <div>
            <h2>Ready to Make<br />a Positive Impact?</h2>
            <p>Partner with Bio Trend Energy for sustainable and innovative bioenergy solutions.</p>
            <AppLink className="button" to="/contact" onNavigate={onNavigate}>Start a Project <ArrowRight /></AppLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ footerData, onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-main page-shell">
        <div className="footer-brand">
          <Brand footer onNavigate={onNavigate} />
          <p>{footerData.description}</p>
          <div className="social-row">
            <a href="#home" aria-label="LinkedIn"><Linkedin /></a>
            <a href="#home" aria-label="Instagram"><Instagram /></a>
            <a href="#home" aria-label="Facebook"><Facebook /></a>
          </div>
        </div>
        <div className="footer-column">
          <h3>{footerData.quickLinksTitle}</h3>
          <AppLink to="/" onNavigate={onNavigate}>Home</AppLink>
          <AppLink to="/about" onNavigate={onNavigate}>About us</AppLink>
          <AppLink to="/projects" onNavigate={onNavigate}>Projects</AppLink>
          <AppLink to="/impact" onNavigate={onNavigate}>Impact</AppLink>
        </div>
        <div className="footer-column">
          <h3>{footerData.solutionsTitle}</h3>
          <AppLink to="/solutions" onNavigate={onNavigate}>Biomass Power</AppLink>
          <AppLink to="/solutions" onNavigate={onNavigate}>Waste to Energy</AppLink>
          <AppLink to="/solutions" onNavigate={onNavigate}>Biogas</AppLink>
          <AppLink to="/solutions" onNavigate={onNavigate}>Consulting</AppLink>
        </div>
        <div className="footer-column">
          <h3>{footerData.resourcesTitle}</h3>
          <AppLink to="/projects" onNavigate={onNavigate}>Case Studies</AppLink>
          <AppLink to="/process" onNavigate={onNavigate}>Our Process</AppLink>
          <AppLink to="/contact" onNavigate={onNavigate}>FAQs</AppLink>
          <AppLink to="/contact" onNavigate={onNavigate}>Careers</AppLink>
        </div>
        <div className="footer-column footer-contact">
          <h3>{footerData.contactTitle}</h3>
          <a href={`tel:${footerData.phone}`}><Phone />{footerData.phone}</a>
          <a href={`mailto:${footerData.email}`}><Mail />{footerData.email}</a>
          <AppLink to="/contact" onNavigate={onNavigate}><MapPin />{footerData.office}</AppLink>
        </div>
      </div>
      <div className="footer-bottom page-shell">
        <p>{footerData.copyright}</p>
        <div>
          {footerData.policies.map((p, idx) => (
            <AppLink key={idx} to={p.href.startsWith('#') ? '/' : p.href} onNavigate={onNavigate}>{p.label}</AppLink>
          ))}
          <AppLink to="/admin" onNavigate={onNavigate} style={{ marginLeft: '18px', fontWeight: '700', color: 'var(--color-accent)' }}>Admin Panel</AppLink>
        </div>
      </div>
    </footer>
  );
}

function VideoModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('modal-open');
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="video-modal" role="dialog" aria-modal="true" aria-label="Bio Trend Energy film" onMouseDown={onClose}>
      <div className="video-dialog" onMouseDown={(event) => event.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label="Close video"><X /></button>
        <video controls autoPlay playsInline>
          <source src="/assets/bio-trend-film.mp4" type="video/mp4" />
          Your browser does not support this video format.
        </video>
      </div>
    </div>
  );
}

function NotFound({ onNavigate }) {
  return (
    <section className="not-found-page">
      <div className="page-shell" data-reveal>
        <div className="eyebrow"><Leaf size={13} /> Page not found</div>
        <h1>That page does not exist.</h1>
        <p>The address may have changed. Return to the Bio Trend Energy homepage.</p>
        <AppLink className="button" to="/" onNavigate={onNavigate}>Back to Home <ArrowRight size={16} /></AppLink>
      </div>
    </section>
  );
}

// --- ADMIN SYSTEM COMPONENTS ---

// ==========================================
// S-CLASS REACT ADMIN DASHBOARD COMPONENTS
// ==========================================

function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(API_BASE + '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Invalid credentials');
      }

      const data = await response.json();
      sessionStorage.setItem('dashboard_token', data.token);
      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="s-auth-container">
      <div className="s-auth-card">
        <div className="s-auth-brand">
          <span className="s-brand-badge">Admin Access</span>
          <h2>Bio Trend Admin</h2>
          <p>Sign in to configure brand content, typography, colors, media, team roles, and form submissions from one integrated visual dashboard.</p>
        </div>
        <form onSubmit={handleSubmit} className="s-auth-form">
          <div className="s-field">
            <label htmlFor="auth-user">Username</label>
            <input
              id="auth-user"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div className="s-field">
            <label htmlFor="auth-pass">Password</label>
            <input
              id="auth-pass"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          {error && <div className="s-auth-error">{error}</div>}
          <button type="submit" disabled={isLoading} className="s-btn s-btn-primary s-btn-block">
            {isLoading ? 'Signing In...' : 'Access Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}

function AdminDashboard({ user, onLogout, siteData, setSiteData }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [settingsData, setSettingsData] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [submissionsData, setSubmissionsData] = useState(null);
  const [statusText, setStatusText] = useState('Backend Online');
  const [statusOnline, setStatusOnline] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Content Tree selections
  const [contentSelection, setContentSelection] = useState({ group: 'site', file: 'site-identity.jsx' });
  const [expandedFolders, setExpandedFolders] = useState({ public: true, components: true, footer: true });

  // Theme selections
  const [themeMode, setThemeMode] = useState('light');
  const [selectedFont, setSelectedFont] = useState('Poppins');

  // Media Library state
  const [mediaList, setMediaList] = useState([
    '/assets/hero-bioenergy.jpg',
    '/assets/leaf-dew.jpg',
    '/assets/leaf-glow.jpg',
    '/assets/leaf-dew.jpg'
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [mediaInputUrl, setMediaInputUrl] = useState('');

  // Team management state
  const [newStaff, setNewStaff] = useState({ displayName: '', username: '', password: '' });
  const [staffError, setStaffError] = useState('');

  const token = sessionStorage.getItem('dashboard_token');

  const flashStatus = (text, ok = true) => {
    setStatusText(text);
    setStatusOnline(ok);
    setTimeout(() => {
      setStatusText('Backend Online');
      setStatusOnline(true);
    }, 3000);
  };

  const apiFetch = async (path, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...(options.headers || {})
    };
    const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
    if (response.status === 401) {
      onLogout();
      return null;
    }
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || 'Request failed');
    }
    return response.json();
  };

  const loadSettings = async () => {
    try {
      const data = await apiFetch('/api/settings');
      if (data) {
        setSettingsData(data);
        if (data.design) {
          setSelectedFont(data.design.fontFamily || 'Poppins');
        }
      }
    } catch (e) {
      flashStatus('Failed to load settings', false);
    }
  };

  const loadAnalytics = async () => {
    try {
      const data = await apiFetch('/api/analytics');
      if (data) setAnalyticsData(data);
    } catch (e) {
      flashStatus('Failed to load analytics', false);
    }
  };

  const loadSubmissions = async () => {
    try {
      const data = await apiFetch('/api/forms/submissions');
      if (data) setSubmissionsData(data);
    } catch (e) {
      flashStatus('Failed to load submissions', false);
    }
  };

  useEffect(() => {
    loadSettings();
    loadAnalytics();
    loadSubmissions();
  }, []);

  const handleSaveContent = async () => {
    setIsSaving(true);
    try {
      await apiFetch('/api/content', {
        method: 'PUT',
        body: JSON.stringify(siteData)
      });
      flashStatus('Content saved successfully');
      loadAnalytics();
    } catch (e) {
      flashStatus('Failed to save content', false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetContent = async () => {
    if (!window.confirm('Reset content to defaults?')) return;
    try {
      const defaults = await apiFetch('/api/content/defaults');
      setSiteData({ ...siteData, ...defaults });
      flashStatus('Content reset to defaults');
    } catch (e) {
      flashStatus('Failed to reset content', false);
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      await apiFetch('/api/settings', {
        method: 'PUT',
        body: JSON.stringify(settingsData)
      });
      flashStatus('Theme settings saved');
      
      // Update preview framework
      const previewFrame = document.getElementById('sitePreviewFrame');
      if (previewFrame) {
        previewFrame.contentWindow?.location.reload();
      }
    } catch (e) {
      flashStatus('Failed to save theme settings', false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetSettings = async () => {
    if (!window.confirm('Reset theme settings to defaults?')) return;
    try {
      const defaults = await apiFetch('/api/settings/defaults');
      setSettingsData(defaults);
      flashStatus('Theme settings reset');
    } catch (e) {
      flashStatus('Failed to reset settings', false);
    }
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    setStaffError('');
    try {
      await apiFetch('/api/team/users', {
        method: 'POST',
        body: JSON.stringify(newStaff)
      });
      setNewStaff({ displayName: '', username: '', password: '' });
      flashStatus('Staff member added');
      loadAnalytics();
    } catch (err) {
      setStaffError(err.message || 'Failed to add staff');
    }
  };

  const handleToggleUser = async (userId, active) => {
    try {
      await apiFetch(`/api/team/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({ active: !active })
      });
      flashStatus('User status updated');
      loadAnalytics();
    } catch (err) {
      flashStatus('Failed to update user', false);
    }
  };

  const handleUploadMedia = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const res = await apiFetch('/api/media/upload', {
          method: 'POST',
          body: JSON.stringify({
            fileName: file.name,
            mimeType: file.type,
            data: reader.result
          })
        });
        setMediaList([res.path, ...mediaList]);
        flashStatus('Media uploaded successfully');
      } catch (err) {
        flashStatus('Upload failed', false);
      }
    };
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadMedia(e.dataTransfer.files[0]);
    }
  };

  // Switch Settings presetted swatches
  const handleApplyPreset = (presetName) => {
    if (!settingsData) return;
    const presets = {
      emerald: {
        light: { pageBackground: '#f7faf6', surface: '#ffffff', text: '#58655F', heading: '#122018', primary: '#154E33', secondary: '#2D8A4E', mist: '#eef7f2' },
        dark: { pageBackground: '#09150f', surface: '#102119', text: '#A9B9AD', heading: '#EFF8EF', primary: '#2D8A4E', secondary: '#42C673', mist: '#102c1d' }
      },
      ocean: {
        light: { pageBackground: '#f0f7f7', surface: '#ffffff', text: '#475858', heading: '#0f2525', primary: '#144d4d', secondary: '#228080', mist: '#e4f1f1' },
        dark: { pageBackground: '#071212', surface: '#0e1d1d', text: '#a0b3b3', heading: '#e8f2f2', primary: '#228080', secondary: '#33b3b3', mist: '#0c2626' }
      },
      ochre: {
        light: { pageBackground: '#faf7f2', surface: '#ffffff', text: '#615849', heading: '#241c0f', primary: '#5c4826', secondary: '#8a6c39', mist: '#f6f0e4' },
        dark: { pageBackground: '#15110a', surface: '#211c12', text: '#b8a994', heading: '#f8f3eb', primary: '#8a6c39', secondary: '#c6a25b', mist: '#2b2210' }
      },
      charcoal: {
        light: { pageBackground: '#f8fafc', surface: '#ffffff', text: '#475569', heading: '#0f172a', primary: '#334155', secondary: '#475569', mist: '#f1f5f9' },
        dark: { pageBackground: '#090d16', surface: '#111827', text: '#94a3b8', heading: '#f8fafc', primary: '#3b82f6', secondary: '#60a5fa', mist: '#1f2937' }
      }
    };
    const nextSettings = { ...settingsData };
    nextSettings.design.palettes = presets[presetName];
    setSettingsData(nextSettings);
    flashStatus(`Preset ${presetName} applied!`);
  };

  const getActiveContentValue = (key) => {
    if (contentSelection.group === 'site') return siteData.site?.[key];
    if (contentSelection.group === 'hero') return siteData.hero?.[key];
    if (contentSelection.group === 'about') return siteData.about?.[key];
    if (contentSelection.group === 'solutions') return siteData.solutions?.[key];
    if (contentSelection.group === 'process') return siteData.process?.[key];
    if (contentSelection.group === 'projects') return siteData.projects?.[key];
    if (contentSelection.group === 'impact') return siteData.impact?.[key];
    if (contentSelection.group === 'footer') return siteData.footer?.[key];
    return null;
  };

  const updateActiveContentValue = (key, val) => {
    const nextData = { ...siteData };
    if (contentSelection.group === 'site') nextData.site[key] = val;
    else if (contentSelection.group === 'hero') nextData.hero[key] = val;
    else if (contentSelection.group === 'about') nextData.about[key] = val;
    else if (contentSelection.group === 'solutions') nextData.solutions[key] = val;
    else if (contentSelection.group === 'process') nextData.process[key] = val;
    else if (contentSelection.group === 'projects') nextData.projects[key] = val;
    else if (contentSelection.group === 'impact') nextData.impact[key] = val;
    else if (contentSelection.group === 'footer') nextData.footer[key] = val;
    setSiteData(nextData);
  };

  return (
    <div className="s-dashboard-shell">
      {/* SIDEBAR PANELS */}
      <aside className="s-sidebar">
        <div className="s-sidebar-brand">
          <span className="s-brand-badge">S-Class Portal</span>
          <h1>Bio Trend</h1>
          <p>Full content customizer & staff portal.</p>
        </div>

        <div className="s-sidebar-user">
          <div className="s-user-chip">
            <strong>{user.displayName}</strong>
            <span>{user.role === 'admin' ? 'Admin Profile' : 'Staff Editor'} | {user.username}</span>
          </div>
          <button onClick={onLogout} className="s-btn s-btn-ghost s-btn-sm">Sign Out</button>
        </div>

        <nav className="s-sidebar-nav">
          <button className={`s-nav-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <CircleGauge size={18} /> Overview
          </button>
          <button className={`s-nav-tab ${activeTab === 'content' ? 'active' : ''}`} onClick={() => setActiveTab('content')}>
            <Building2 size={18} /> Site Editor
          </button>
          <button className={`s-nav-tab ${activeTab === 'theme' ? 'active' : ''}`} onClick={() => setActiveTab('theme')}>
            <Flame size={18} /> Theme Tokens
          </button>
          <button className={`s-nav-tab ${activeTab === 'media' ? 'active' : ''}`} onClick={() => setActiveTab('media')}>
            <Database size={18} /> Media & Forms
          </button>
          {user.role === 'admin' && (
            <>
              <button className={`s-nav-tab ${activeTab === 'team' ? 'active' : ''}`} onClick={() => setActiveTab('team')}>
                <Users size={18} /> Team Controls
              </button>
              <button className={`s-nav-tab ${activeTab === 'submissions' ? 'active' : ''}`} onClick={() => setActiveTab('submissions')}>
                <History size={18} /> Submissions
              </button>
            </>
          )}
        </nav>

        <div className="s-sidebar-footer">
          <div className="s-status-row">
            <span className={`s-status-dot ${statusOnline ? 'online' : ''}`} />
            <span>{statusText}</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="s-main">
        <header className="s-topbar">
          <h2>{activeTab.toUpperCase()}</h2>
          <div className="s-topbar-actions">
            <span className="s-badge">{user.role.toUpperCase()} SESSION</span>
          </div>
        </header>

        <div className="s-panel-container">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && analyticsData && (
            <div className="s-panel">
              <div className="s-metrics-grid">
                <div className="s-metric-card">
                  <span>VIEWS</span>
                  <h3>{analyticsData.metrics?.dashboardViews || 0}</h3>
                </div>
                <div className="s-metric-card">
                  <span>CONTENT SAVES</span>
                  <h3>{analyticsData.metrics?.contentSaves || 0}</h3>
                </div>
                <div className="s-metric-card">
                  <span>THEME SAVES</span>
                  <h3>{analyticsData.metrics?.settingsSaves || 0}</h3>
                </div>
                <div className="s-metric-card">
                  <span>LEADS RECEIVED</span>
                  <h3>{analyticsData.metrics?.formSubmissions || 0}</h3>
                </div>
              </div>

              <div className="s-two-col">
                <div className="s-card">
                  <div className="s-card-head">
                    <h3>Recent Change History</h3>
                  </div>
                  <div className="s-activity-list">
                    {(analyticsData.changeHistory || []).slice(0, 10).map((act) => (
                      <div className="s-activity-item" key={act.id}>
                        <div className="s-activity-dot" />
                        <div className="s-activity-body">
                          <strong>{act.actor?.displayName}</strong> {act.label}
                          <small>{new Date(act.createdAt).toLocaleString()}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="s-card">
                  <div className="s-card-head">
                    <h3>Content Footprint</h3>
                  </div>
                  <div className="s-footprint-grid">
                    <div className="s-footprint-item">
                      <span>Navigation Links</span>
                      <strong>{analyticsData.metrics?.navigationLinks || 0}</strong>
                    </div>
                    <div className="s-footprint-item">
                      <span>Projects Count</span>
                      <strong>{analyticsData.metrics?.projectCards || 0}</strong>
                    </div>
                    <div className="s-footprint-item">
                      <span>Hero Slides</span>
                      <strong>{analyticsData.metrics?.heroMessages || 0}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VISUAL SITE EDITOR (3-COLUMN WORKSPACE) */}
          {activeTab === 'content' && (
            <div className="s-three-column-workspace">
              {/* COLUMN 1: DIRECTORY EXPLORER */}
              <aside className="s-directory-explorer">
                <h4>Workspace File Tree</h4>
                <div className="s-tree-node">
                  <button className="s-folder" onClick={() => setExpandedFolders({ ...expandedFolders, public: !expandedFolders.public })}>
                    {expandedFolders.public ? '▼' : '▶'} public /
                  </button>
                  {expandedFolders.public && (
                    <div className="s-sub-tree">
                      <button
                        className={`s-file ${contentSelection.file === 'site-identity.jsx' ? 'active' : ''}`}
                        onClick={() => setContentSelection({ group: 'site', file: 'site-identity.jsx' })}
                      >
                        📄 site-identity.json
                      </button>
                    </div>
                  )}
                </div>

                <div className="s-tree-node">
                  <button className="s-folder" onClick={() => setExpandedFolders({ ...expandedFolders, components: !expandedFolders.components })}>
                    {expandedFolders.components ? '▼' : '▶'} src / components /
                  </button>
                  {expandedFolders.components && (
                    <div className="s-sub-tree">
                      <button
                        className={`s-file ${contentSelection.file === 'hero-section.jsx' ? 'active' : ''}`}
                        onClick={() => setContentSelection({ group: 'hero', file: 'hero-section.jsx' })}
                      >
                        📄 hero-section.jsx
                      </button>
                      <button
                        className={`s-file ${contentSelection.file === 'about-story.jsx' ? 'active' : ''}`}
                        onClick={() => setContentSelection({ group: 'about', file: 'about-story.jsx' })}
                      >
                        📄 about-story.jsx
                      </button>
                      <button
                        className={`s-file ${contentSelection.file === 'solutions-list.jsx' ? 'active' : ''}`}
                        onClick={() => setContentSelection({ group: 'solutions', file: 'solutions-list.jsx' })}
                      >
                        📄 solutions-list.jsx
                      </button>
                      <button
                        className={`s-file ${contentSelection.file === 'process-workflow.jsx' ? 'active' : ''}`}
                        onClick={() => setContentSelection({ group: 'process', file: 'process-workflow.jsx' })}
                      >
                        📄 process-workflow.jsx
                      </button>
                      <button
                        className={`s-file ${contentSelection.file === 'project-cards.jsx' ? 'active' : ''}`}
                        onClick={() => setContentSelection({ group: 'projects', file: 'project-cards.jsx' })}
                      >
                        📄 project-cards.jsx
                      </button>
                      <button
                        className={`s-file ${contentSelection.file === 'impact-metrics.jsx' ? 'active' : ''}`}
                        onClick={() => setContentSelection({ group: 'impact', file: 'impact-metrics.jsx' })}
                      >
                        📄 impact-metrics.jsx
                      </button>
                    </div>
                  )}
                </div>

                <div className="s-tree-node">
                  <button className="s-folder" onClick={() => setExpandedFolders({ ...expandedFolders, footer: !expandedFolders.footer })}>
                    {expandedFolders.footer ? '▼' : '▶'} src / footer /
                  </button>
                  {expandedFolders.footer && (
                    <div className="s-sub-tree">
                      <button
                        className={`s-file ${contentSelection.file === 'footer-details.jsx' ? 'active' : ''}`}
                        onClick={() => setContentSelection({ group: 'footer', file: 'footer-details.jsx' })}
                      >
                        📄 footer-details.jsx
                      </button>
                    </div>
                  )}
                </div>
              </aside>

              {/* COLUMN 2: FIELD EDITOR */}
              <div className="s-field-editor">
                <div className="s-editor-header">
                  <h4>Editing: {contentSelection.file}</h4>
                  <div className="s-editor-actions">
                    <button onClick={handleResetContent} className="s-btn s-btn-ghost s-btn-sm">Reset</button>
                    <button onClick={handleSaveContent} disabled={isSaving} className="s-btn s-btn-primary s-btn-sm">
                      {isSaving ? 'Saving...' : 'Save File'}
                    </button>
                  </div>
                </div>

                <div className="s-form-scroll">
                  {contentSelection.group === 'site' && (
                    <div className="s-form-stack">
                      <div className="s-field">
                        <label>Brand Name</label>
                        <input
                          type="text"
                          value={getActiveContentValue('name') || ''}
                          onChange={(e) => updateActiveContentValue('name', e.target.value)}
                        />
                      </div>
                      <div className="s-field">
                        <label>Legal Company Name</label>
                        <input
                          type="text"
                          value={getActiveContentValue('legalName') || ''}
                          onChange={(e) => updateActiveContentValue('legalName', e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {contentSelection.group === 'hero' && (
                    <div className="s-form-stack">
                      <div className="s-field">
                        <label>Hero Eyebrow kicker</label>
                        <input
                          type="text"
                          value={getActiveContentValue('eyebrow') || ''}
                          onChange={(e) => updateActiveContentValue('eyebrow', e.target.value)}
                        />
                      </div>
                      <div className="s-field">
                        <label>Headline Text</label>
                        <input
                          type="text"
                          value={getActiveContentValue('title') || ''}
                          onChange={(e) => updateActiveContentValue('title', e.target.value)}
                        />
                      </div>
                      <div className="s-field">
                        <label>Hero Description Copy</label>
                        <textarea
                          rows={4}
                          value={getActiveContentValue('description') || ''}
                          onChange={(e) => updateActiveContentValue('description', e.target.value)}
                        />
                      </div>
                      <div className="s-field">
                        <label>Primary Action Label</label>
                        <input
                          type="text"
                          value={getActiveContentValue('buttonPrimary') || ''}
                          onChange={(e) => updateActiveContentValue('buttonPrimary', e.target.value)}
                        />
                      </div>
                      <div className="s-field">
                        <label>Secondary Action Label</label>
                        <input
                          type="text"
                          value={getActiveContentValue('buttonSecondary') || ''}
                          onChange={(e) => updateActiveContentValue('buttonSecondary', e.target.value)}
                        />
                      </div>
                      <div className="s-field">
                        <label>Hero Video Asset URL</label>
                        <input
                          type="text"
                          value={getActiveContentValue('videoLink') || ''}
                          onChange={(e) => updateActiveContentValue('videoLink', e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {contentSelection.group === 'about' && (
                    <div className="s-form-stack">
                      <div className="s-field">
                        <label>Section Eyebrow</label>
                        <input
                          type="text"
                          value={getActiveContentValue('eyebrow') || ''}
                          onChange={(e) => updateActiveContentValue('eyebrow', e.target.value)}
                        />
                      </div>
                      <div className="s-field">
                        <label>Section Title</label>
                        <input
                          type="text"
                          value={getActiveContentValue('title') || ''}
                          onChange={(e) => updateActiveContentValue('title', e.target.value)}
                        />
                      </div>
                      <div className="s-field">
                        <label>About Paragraph</label>
                        <textarea
                          rows={4}
                          value={getActiveContentValue('description') || ''}
                          onChange={(e) => updateActiveContentValue('description', e.target.value)}
                        />
                      </div>
                      <div className="s-field">
                        <label>Story Details</label>
                        <textarea
                          rows={4}
                          value={getActiveContentValue('story') || ''}
                          onChange={(e) => updateActiveContentValue('story', e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {contentSelection.group === 'solutions' && (
                    <div className="s-form-stack">
                      <div className="s-field">
                        <label>Section Title</label>
                        <input
                          type="text"
                          value={getActiveContentValue('title') || ''}
                          onChange={(e) => updateActiveContentValue('title', e.target.value)}
                        />
                      </div>
                      <div className="s-field">
                        <label>Section Description</label>
                        <textarea
                          rows={4}
                          value={getActiveContentValue('description') || ''}
                          onChange={(e) => updateActiveContentValue('description', e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {contentSelection.group === 'process' && (
                    <div className="s-form-stack">
                      <div className="s-field">
                        <label>Workflow Description</label>
                        <textarea
                          rows={4}
                          value={getActiveContentValue('description') || ''}
                          onChange={(e) => updateActiveContentValue('description', e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {contentSelection.group === 'projects' && (
                    <div className="s-form-stack">
                      <div className="s-field">
                        <label>Section Heading</label>
                        <input
                          type="text"
                          value={getActiveContentValue('title') || ''}
                          onChange={(e) => updateActiveContentValue('title', e.target.value)}
                        />
                      </div>
                      <div className="s-field">
                        <label>Summary Badge Text</label>
                        <input
                          type="text"
                          value={getActiveContentValue('summaryText') || ''}
                          onChange={(e) => updateActiveContentValue('summaryText', e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {contentSelection.group === 'impact' && (
                    <div className="s-form-stack">
                      <div className="s-field">
                        <label>Section Title</label>
                        <input
                          type="text"
                          value={getActiveContentValue('title') || ''}
                          onChange={(e) => updateActiveContentValue('title', e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {contentSelection.group === 'footer' && (
                    <div className="s-form-stack">
                      <div className="s-field">
                        <label>Contact Phone</label>
                        <input
                          type="text"
                          value={getActiveContentValue('phone') || ''}
                          onChange={(e) => updateActiveContentValue('phone', e.target.value)}
                        />
                      </div>
                      <div className="s-field">
                        <label>Contact Email</label>
                        <input
                          type="text"
                          value={getActiveContentValue('email') || ''}
                          onChange={(e) => updateActiveContentValue('email', e.target.value)}
                        />
                      </div>
                      <div className="s-field">
                        <label>Office Address</label>
                        <input
                          type="text"
                          value={getActiveContentValue('office') || ''}
                          onChange={(e) => updateActiveContentValue('office', e.target.value)}
                        />
                      </div>
                      <div className="s-field">
                        <label>Copyright notice</label>
                        <input
                          type="text"
                          value={getActiveContentValue('copyright') || ''}
                          onChange={(e) => updateActiveContentValue('copyright', e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* COLUMN 3: LIVE VIEWPORT */}
              <div className="s-live-viewport">
                <h4>Live Visual Viewport</h4>
                <iframe
                  id="sitePreviewFrame"
                  src={`${window.location.origin}/?preview=true`}
                  className="s-preview-iframe"
                  title="Landing site live preview"
                />
              </div>
            </div>
          )}

          {/* TAB 3: THEME TOKENS */}
          {activeTab === 'theme' && settingsData && (
            <div className="s-panel">
              <div className="s-two-col">
                <div className="s-card">
                  <div className="s-card-head">
                    <h3>Predefined Swatch Presets</h3>
                  </div>
                  <div className="s-presets-swatch-list">
                    <button onClick={() => handleApplyPreset('emerald')} className="s-swatch-btn emerald">
                      <strong>Emerald Forest</strong>
                      <span>Organic Green</span>
                    </button>
                    <button onClick={() => handleApplyPreset('ocean')} className="s-swatch-btn ocean">
                      <strong>Ocean Recycling</strong>
                      <span>Teal Clean-tech</span>
                    </button>
                    <button onClick={() => handleApplyPreset('ochre')} className="s-swatch-btn ochre">
                      <strong>Earthy Ochre</strong>
                      <span>Warm Soil/Clay</span>
                    </button>
                    <button onClick={() => handleApplyPreset('charcoal')} className="s-swatch-btn charcoal">
                      <strong>Charcoal Eco</strong>
                      <span>Minimalist Slate</span>
                    </button>
                  </div>
                </div>

                <div className="s-card">
                  <div className="s-card-head">
                    <h3>Font Family</h3>
                  </div>
                  <div className="s-field">
                    <label>Select Font Family</label>
                    <select
                      value={selectedFont}
                      onChange={(e) => {
                        setSelectedFont(e.target.value);
                        const nextSettings = { ...settingsData };
                        nextSettings.design.fontFamily = e.target.value;
                        setSettingsData(nextSettings);
                      }}
                      className="s-select"
                    >
                      <option value="Outfit">Outfit</option>
                      <option value="Poppins">Poppins</option>
                      <option value="Inter">Inter</option>
                      <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                      <option value="Sora">Sora</option>
                      <option value="Space Grotesk">Space Grotesk</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="s-card" style={{ marginTop: '24px' }}>
                <div className="s-card-head">
                  <h3>Color Palette Customizer</h3>
                  <div className="s-tab-row">
                    <button className={`s-tab ${themeMode === 'light' ? 'active' : ''}`} onClick={() => setThemeMode('light')}>Light Palette</button>
                    <button className={`s-tab ${themeMode === 'dark' ? 'active' : ''}`} onClick={() => setThemeMode('dark')}>Dark Palette</button>
                  </div>
                </div>

                <div className="s-palette-grid">
                  {Object.keys(settingsData.design?.palettes?.[themeMode] || {}).map((key) => (
                    <div className="s-palette-field" key={key}>
                      <span className="s-palette-label">{key}</span>
                      <div className="s-color-picker-wrap">
                        <input
                          type="color"
                          value={settingsData.design.palettes[themeMode][key]}
                          onChange={(e) => {
                            const nextSettings = { ...settingsData };
                            nextSettings.design.palettes[themeMode][key] = e.target.value;
                            setSettingsData(nextSettings);
                          }}
                        />
                        <input
                          type="text"
                          value={settingsData.design.palettes[themeMode][key]}
                          onChange={(e) => {
                            const nextSettings = { ...settingsData };
                            nextSettings.design.palettes[themeMode][key] = e.target.value;
                            setSettingsData(nextSettings);
                          }}
                          className="s-color-input"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="s-card-foot" style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                  <button onClick={handleResetSettings} className="s-btn s-btn-ghost">Reset Theme</button>
                  <button onClick={handleSaveSettings} disabled={isSaving} className="s-btn s-btn-primary">
                    {isSaving ? 'Saving...' : 'Apply Theme Changes'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MEDIA & FORMS */}
          {activeTab === 'media' && (
            <div className="s-panel">
              <div className="s-two-col">
                {/* Drag and Drop Uploader */}
                <div className="s-card">
                  <div className="s-card-head">
                    <h3>Upload Asset File</h3>
                  </div>
                  <div
                    className={`s-drag-zone ${isDragging ? 'dragging' : ''}`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                  >
                    <span>Drag & Drop file here or click browse</span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleUploadMedia(e.target.files[0]);
                        }
                      }}
                      className="s-file-input-hidden"
                    />
                  </div>

                  <div className="s-media-paste-url" style={{ marginTop: '16px' }}>
                    <div className="s-field">
                      <label>Asset URL</label>
                      <input
                        type="text"
                        value={mediaInputUrl}
                        onChange={(e) => setMediaInputUrl(e.target.value)}
                        placeholder="Paste image or video URL link"
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (mediaInputUrl) {
                          setMediaList([mediaInputUrl, ...mediaList]);
                          setMediaInputUrl('');
                          flashStatus('Asset link added');
                        }
                      }}
                      className="s-btn s-btn-ghost s-btn-sm"
                      style={{ marginTop: '8px' }}
                    >
                      Add Url Link
                    </button>
                  </div>
                </div>

                {/* Media list */}
                <div className="s-card">
                  <div className="s-card-head">
                    <h3>Media Library Files</h3>
                  </div>
                  <div className="s-media-grid">
                    {mediaList.map((url, idx) => (
                      <div className="s-media-card" key={idx}>
                        <div className="s-media-preview">
                          {url.endsWith('.mp4') || url.endsWith('.mov') ? (
                            <video src={url} muted autoPlay loop playsInline />
                          ) : (
                            <img src={url} alt="Uploaded asset card" />
                          )}
                        </div>
                        <div className="s-media-meta">
                          <small>{url.split('/').pop() || 'external-asset'}</small>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(url);
                              flashStatus('Copied asset path to clipboard');
                            }}
                            className="s-btn s-btn-ghost s-btn-sm"
                          >
                            Copy Path
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: TEAM CONTROLS */}
          {activeTab === 'team' && analyticsData && (
            <div className="s-panel">
              <div className="s-two-col">
                <div className="s-card">
                  <div className="s-card-head">
                    <h3>Create Staff Account</h3>
                  </div>
                  <form onSubmit={handleAddStaff} className="s-form-stack">
                    <div className="s-field">
                      <label>Staff Display Name</label>
                      <input
                        type="text"
                        required
                        value={newStaff.displayName}
                        onChange={(e) => setNewStaff({ ...newStaff, displayName: e.target.value })}
                        placeholder="e.g. Ritik Kumar"
                      />
                    </div>
                    <div className="s-field">
                      <label>Username</label>
                      <input
                        type="text"
                        required
                        value={newStaff.username}
                        onChange={(e) => setNewStaff({ ...newStaff, username: e.target.value })}
                        placeholder="e.g. ritik.k"
                      />
                    </div>
                    <div className="s-field">
                      <label>Password</label>
                      <input
                        type="password"
                        required
                        minLength={8}
                        value={newStaff.password}
                        onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                        placeholder="At least 8 characters"
                      />
                    </div>
                    {staffError && <div className="s-error-msg">{staffError}</div>}
                    <button type="submit" className="s-btn s-btn-primary">Create Account</button>
                  </form>
                </div>

                <div className="s-card">
                  <div className="s-card-head">
                    <h3>Team Accounts Management</h3>
                  </div>
                  <div className="s-users-list">
                    {(analyticsData.teamUsage || []).map((member) => (
                      <div className="s-user-item" key={member.user.id}>
                        <div className="s-user-meta">
                          <strong>{member.user.displayName}</strong>
                          <span>{member.user.username} ({member.user.role})</span>
                          <small>Last login: {member.user.lastLoginAt ? new Date(member.user.lastLoginAt).toLocaleString() : 'Never'}</small>
                        </div>
                        <div className="s-user-actions">
                          <button
                            onClick={() => handleToggleUser(member.user.id, member.user.active)}
                            className={`s-btn s-btn-sm ${member.user.active ? 's-btn-ghost' : 's-btn-primary'}`}
                            disabled={member.user.id === user.id}
                          >
                            {member.user.active ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SUBMISSIONS LEADS */}
          {activeTab === 'submissions' && submissionsData && (
            <div className="s-panel">
              <div className="s-card">
                <div className="s-card-head">
                  <h3>Received Contact Leads</h3>
                </div>
                <div className="s-table-wrap">
                  <table className="s-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Interest</th>
                        <th>Message</th>
                        <th>Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(submissionsData.contact || []).map((sub) => (
                        <tr key={sub.id}>
                          <td>{sub.payload?.name || '-'}</td>
                          <td>{sub.payload?.email || '-'}</td>
                          <td>{sub.payload?.phone || '-'}</td>
                          <td>{sub.payload?.service || '-'}</td>
                          <td>{sub.payload?.message || '-'}</td>
                          <td>{new Date(sub.createdAt).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="s-card" style={{ marginTop: '24px' }}>
                <div className="s-card-head">
                  <h3>Project Inquiries</h3>
                </div>
                <div className="s-table-wrap">
                  <table className="s-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Org</th>
                        <th>Message</th>
                        <th>Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(submissionsData.project || []).map((sub) => (
                        <tr key={sub.id}>
                          <td>{sub.payload?.name || '-'}</td>
                          <td>{sub.payload?.email || '-'}</td>
                          <td>{sub.payload?.org || '-'}</td>
                          <td>{sub.payload?.message || '-'}</td>
                          <td>{new Date(sub.createdAt).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


// Dynamically map and sanitize S-class database values to match website sections with safe fallbacks
function mapContentStructure(data) {
  if (!data) return null;
  return {
    ...data,
    // Hero mapping
    hero: {
      eyebrow: data.hero?.eyebrow || 'Biomass fuel systems for cleaner Industry',
      title: data.hero?.title || (data.hero?.messages ? data.hero.messages[0] : 'Innovative Bioenergy Solutions for a Sustainable Tomorrow'),
      description: data.hero?.description || data.hero?.copy || 'Bio Trend Energy converts agricultural and industrial waste streams into dependable renewable fuel.',
      buttonPrimary: data.hero?.buttonPrimary || data.hero?.primaryAction?.label || 'Explore Solutions',
      buttonSecondary: data.hero?.buttonSecondary || data.hero?.secondaryAction?.label || 'See Workflow',
      image: data.hero?.image || '/assets/hero-bioenergy.jpg',
      videoLink: data.hero?.videoSource || '/assets/bte-video-17-02-2026.mp4'
    },
    // About mapping
    about: data.about || {
      eyebrow: 'About us',
      title: 'Driving the Transition Towards a Cleaner, Greener Future',
      description: 'Bio Trend Energy is at the forefront of clean-energy innovation. We design, build and operate advanced bioenergy systems that convert biomass waste into renewable energy.',
      story: 'Our approach combines engineering excellence with local insight. Every project is developed around resource efficiency, measurable impact and long-term operational reliability.',
      bullets: ['Innovative, tailored solutions', 'Proven conversion technology', 'Environmental responsibility', 'Customer-centric delivery'],
      image: '/assets/leaf-dew.jpg',
      noteYears: '8 years',
      noteText: 'of purposeful growth',
      missionTitle: 'Our Mission',
      missionText: 'Deliver sustainable bioenergy solutions that empower communities, protect the environment and drive economic growth.',
      visionTitle: 'Our Vision',
      visionText: 'A world where waste is a resource and clean energy is accessible to all.'
    },
    // Solutions mapping
    solutions: {
      eyebrow: data.pages?.solutions?.eyebrow || 'What we do',
      title: data.pages?.solutions?.title || 'Our Solutions',
      description: data.pages?.solutions?.description || 'End-to-end bioenergy solutions built around your resources, requirements and long-term goals.',
      items: (data.pages?.solutions?.items || data.solutions?.items || defaultSolutions || []).map(s => ({
        title: s.title,
        description: s.description,
        icon: s.icon?.name || s.icon || 'Leaf'
      }))
    },
    // Process mapping
    process: {
      eyebrow: data.pages?.process?.eyebrow || 'How it works',
      title: data.pages?.process?.title || 'Our Process',
      description: data.pages?.process?.description || 'A proven process that converts waste into clean energy, built for consistent performance from source to supply.',
      badgeTitle: data.pages?.process?.badgeTitle || 'Zero waste mindset',
      badgeText: data.pages?.process?.badgeText || 'Maximum value from every resource',
      image: data.pages?.process?.image || '/assets/biomass-process.jpg',
      steps: (data.pages?.process?.steps || data.process?.steps || defaultProcessSteps || []).map(s => ({
        title: s.title,
        description: s.description,
        icon: s.icon?.name || s.icon || 'Recycle'
      }))
    },
    // Projects mapping
    projects: {
      eyebrow: data.pages?.projects?.eyebrow || 'Our work',
      title: data.pages?.projects?.title || 'Projects That Perform',
      description: data.pages?.projects?.description || 'Delivering successful bioenergy projects that create lasting environmental and economic value.',
      summaryValue: data.pages?.projects?.summaryValue || '50+',
      summaryText: data.pages?.projects?.summaryText || 'projects delivered across India',
      items: (data.pages?.projects?.items || data.projects?.items || defaultProjects || []).map(p => ({
        title: p.title,
        location: p.location,
        capacity: p.capacity,
        category: p.category,
        image: p.image
      }))
    },
    // Impact mapping
    impact: {
      eyebrow: data.pages?.impact?.eyebrow || 'Measurable change',
      title: data.pages?.impact?.title || 'Our Impact',
      description: data.pages?.impact?.description || 'Creating a positive impact on the environment, economy and society with every project we deliver.',
      image: data.pages?.impact?.image || '/assets/wind-impact.jpg',
      sdgTitle: data.pages?.impact?.sdgTitle || 'Sustainable Development Goals',
      sdgText: data.pages?.impact?.sdgText || 'Contributing to a cleaner environment and resilient communities.',
      items: (data.pages?.impact?.items || data.impact?.items || defaultImpacts || []).map(i => ({
        label: i.label,
        value: i.value,
        detail: i.detail,
        icon: i.icon?.name || i.icon || 'Leaf'
      }))
    },
    // Footer mapping
    footer: {
      description: data.footer?.description || 'Transforming biomass waste into clean energy for a healthier planet and a more resilient future.',
      quickLinksTitle: data.footer?.quickLinksTitle || 'Quick Links',
      solutionsTitle: data.footer?.solutionsTitle || 'Our Solutions',
      resourcesTitle: data.footer?.resourcesTitle || 'Resources',
      contactTitle: data.footer?.contactTitle || 'Contact Info',
      phone: data.footer?.phone || '+91 98765 43210',
      email: data.footer?.email || 'info@biotrendenergy.com',
      office: data.footer?.office || 'Gurugram, Haryana, India',
      copyright: data.footer?.copyright || 'Copyright 2026 Bio Trend Energy. All rights reserved.',
      policies: data.footer?.policies || [
        { label: 'Privacy Policy', href: '#home' },
        { label: 'Terms of Use', href: '#home' }
      ]
    }
  };
}

// --- MAIN APP ENTRY ---
export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname.replace(/\/+$/, '') || '/');
  const [siteData, setSiteData] = useState(() => mapContentStructure(initialSiteData));
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = sessionStorage.getItem('admin_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [darkMode, setDarkMode] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  // Fetch customizable site content from Node server API
  const fetchContent = async () => {
    try {
      const response = await fetch(API_BASE + '/api/content');
      if (response.ok) {
        const data = await response.json();
        const mappedData = mapContentStructure(data);
        setSiteData(mappedData);
        if (data.theme) {
          setDarkMode(data.theme.darkMode);
        }
      } else {
        throw new Error();
      }
    } catch (err) {
      console.warn("Connection to Node backend content API failed. Falling back to default static files.");
      // Fallback content data generated from local data.js
      const fallbackContent = {
        theme: {
          darkMode: false,
          fontFamily: 'Poppins',
          colors: {
            primary: '#154E33',
            accent: '#2D8A4E',
            bgPage: '#F7FAF6',
            bgSurface: '#FFFFFF',
            textBody: '#58655F',
            textHeading: '#122018',
            border: '#E2EDE4',
            accentBg: '#EEF7F2',
            accentText: '#1C7430'
          }
        },
        hero: {
          eyebrow: 'Clean energy. Green future.',
          title: 'Innovative Bioenergy Solutions for a Sustainable Tomorrow',
          description: 'We transform biomass waste into clean energy and valuable resources, creating a positive impact on people and the planet.',
          buttonPrimary: 'Our Solutions',
          buttonSecondary: 'Get in Touch',
          proofText: '50+ successful projects delivered across India',
          image: '/assets/hero-bioenergy.jpg',
          videoLink: '/assets/bio-trend-film.mp4'
        },
        about: {
          eyebrow: 'About us',
          title: 'Driving the Transition Towards a Cleaner, Greener Future',
          description: 'Bio Trend Energy is at the forefront of clean-energy innovation. We design, build and operate advanced bioenergy systems that convert biomass waste into renewable energy and sustainable by-products.',
          story: 'Our approach combines engineering excellence with local insight. Every project is developed around resource efficiency, measurable impact and long-term operational reliability.',
          bullets: ['Innovative, tailored solutions', 'Proven conversion technology', 'Environmental responsibility', 'Customer-centric delivery'],
          image: '/assets/leaf-dew.jpg',
          noteYears: '8 years',
          noteText: 'of purposeful growth',
          missionTitle: 'Our Mission',
          missionText: 'Deliver sustainable bioenergy solutions that empower communities, protect the environment and drive economic growth.',
          visionTitle: 'Our Vision',
          visionText: 'A world where waste is a resource and clean energy is accessible to all.'
        },
        solutions: {
          eyebrow: 'What we do',
          title: 'Our Solutions',
          description: 'End-to-end bioenergy solutions built around your resources, requirements and long-term goals.',
          items: defaultSolutions.map(s => ({
            title: s.title,
            description: s.description,
            icon: s.icon.name || 'Leaf'
          }))
        },
        process: {
          eyebrow: 'How it works',
          title: 'Our Process',
          description: 'A proven process that converts waste into clean energy, built for consistent performance from source to supply.',
          badgeTitle: 'Zero waste mindset',
          badgeText: 'Maximum value from every resource',
          image: '/assets/biomass-process.jpg',
          steps: defaultProcessSteps.map(s => ({
            title: s.title,
            description: s.description,
            icon: s.icon.name || 'Recycle'
          }))
        },
        projects: {
          eyebrow: 'Our work',
          title: 'Projects That Perform',
          description: 'Delivering successful bioenergy projects that create lasting environmental and economic value.',
          summaryValue: '50+',
          summaryText: 'projects delivered across India',
          items: defaultProjects.map(p => ({
            title: p.title,
            location: p.location,
            capacity: p.capacity,
            category: p.category,
            image: p.image
          }))
        },
        impact: {
          eyebrow: 'Measurable change',
          title: 'Our Impact',
          description: 'Creating a positive impact on the environment, economy and society with every project we deliver.',
          image: '/assets/wind-impact.jpg',
          sdgTitle: 'Sustainable Development Goals',
          sdgText: 'Contributing to a cleaner environment and resilient communities.',
          items: defaultImpacts.map(i => ({
            label: i.label,
            value: i.value,
            detail: i.detail,
            icon: i.icon.name || 'Leaf'
          }))
        },
        footer: {
          description: 'Transforming biomass waste into clean energy for a healthier planet and a more resilient future.',
          quickLinksTitle: 'Quick Links',
          solutionsTitle: 'Our Solutions',
          resourcesTitle: 'Resources',
          contactTitle: 'Contact Info',
          phone: '+91 98765 43210',
          email: 'info@biotrendenergy.com',
          office: 'Gurugram, Haryana, India',
          copyright: 'Copyright 2026 Bio Trend Energy. All rights reserved.',
          policies: [
            { label: 'Privacy Policy', href: '#home' },
            { label: 'Terms of Use', href: '#home' }
          ]
        }
      };
      setSiteData(fallbackContent);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  // Sync sessionStorage for persistent admin login across reloads
  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem('admin_user', JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem('admin_user');
    }
  }, [currentUser]);

  // Apply custom CSS Theme variables from dashboard settings
  useEffect(() => {
    const design = siteData?.settings?.design || siteData?.theme;
    if (!design) return;

    const { palettes, colors, fontFamily, typography } = design;
    const root = document.documentElement;

    if (fontFamily) {
      root.style.setProperty('--font-sans', `"${fontFamily}", "Poppins", sans-serif`);
      document.body.style.fontFamily = `"${fontFamily}", "Poppins", sans-serif`;
    }

    root.dataset.theme = darkMode ? 'dark' : 'light';

    const mode = darkMode ? 'dark' : 'light';
    const palette = (palettes && palettes[mode]) ? palettes[mode] : null;
    const fallbackColor = (colors && colors[mode]) ? colors[mode] : null;

    if (palette || fallbackColor) {
      const pageBg = palette?.pageBackground || fallbackColor?.bgPage || (darkMode ? '#09150f' : '#fbfcfa');
      const surface = palette?.surface || fallbackColor?.bgSurface || (darkMode ? '#102119' : '#ffffff');
      const ink = palette?.heading || fallbackColor?.textHeading || (darkMode ? '#eff8ef' : '#0b1d13');
      const inkSoft = palette?.text || fallbackColor?.textBody || (darkMode ? '#a9b9ad' : '#546158');
      
      const primary = palette?.primary || fallbackColor?.primary || (darkMode ? '#39934d' : '#0b5130');
      const secondary = palette?.secondary || fallbackColor?.accent || (darkMode ? '#49a95c' : '#267b3f');
      const mist = palette?.mist || fallbackColor?.mist || (darkMode ? '#102c1d' : '#f3f8f1');
      const line = palette?.mist || fallbackColor?.border || (darkMode ? '#263a2d' : '#e5ebe4');

      root.style.setProperty('--canvas', pageBg);
      root.style.setProperty('--paper', surface);
      root.style.setProperty('--ink', ink);
      root.style.setProperty('--ink-soft', inkSoft);
      root.style.setProperty('--line', line);
      
      root.style.setProperty('--green-950', primary);
      root.style.setProperty('--green-900', primary);
      root.style.setProperty('--green-800', primary);
      root.style.setProperty('--green-700', secondary);
      root.style.setProperty('--green-600', secondary);
      root.style.setProperty('--green-200', mist);
      root.style.setProperty('--green-100', mist);
      root.style.setProperty('--green-50', pageBg);
    }

    const typo = typography || {};
    const styleEl = document.getElementById('dynamic-typography-overrides') || document.createElement('style');
    styleEl.id = 'dynamic-typography-overrides';

    styleEl.innerHTML = `
      .hero-section h1 { font-size: calc(clamp(38px, 6vw, 68px) * ${typo.heroTitleScale || 1}) !important; }
      h2 { font-size: calc(clamp(35px, 4vw, 54px) * ${typo.sectionTitleScale || 1}) !important; }
      .solution-card h3, .project-card h3 { font-size: calc(20px * ${typo.cardTitleScale || 1}) !important; }
      p { font-size: calc(16px * ${typo.bodyScale || 1}) !important; }
      .eyebrow { font-size: calc(11px * ${typo.eyebrowScale || 1}) !important; }
      .nav-links a { font-size: calc(14px * ${typo.navScale || 1}) !important; }
      .btn-pill, button { font-size: calc(14px * ${typo.buttonScale || 1}) !important; }
    `;
    if (!styleEl.parentNode) document.head.appendChild(styleEl);
  }, [siteData, darkMode]);

  // Client path handler
  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname.replace(/\/+$/, '') || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const pageTitles = {
      '/': 'Bio Trend Energy | Turning Waste Into Clean Energy',
      '/about': 'About Us | Bio Trend Energy',
      '/solutions': 'Solutions | Bio Trend Energy',
      '/process': 'Our Process | Bio Trend Energy',
      '/impact': 'Our Impact | Bio Trend Energy',
      '/projects': 'Projects | Bio Trend Energy',
      '/contact': 'Contact | Bio Trend Energy',
    };
    document.title = pageTitles[pathname] || 'Page Not Found | Bio Trend Energy';
    window.scrollTo(0, 0);
  }, [pathname]);

  const navigateTo = (to) => {
    const nextPath = (to || '/').replace(/\/+$/, '') || '/';
    if (nextPath !== pathname) {
      window.history.pushState({}, '', nextPath);
      setPathname(nextPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!siteData) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontFamily: 'sans-serif' }}>Connecting to Server...</div>;
  }

  // Route decision maker
  if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
    if (!currentUser) {
      return <AdminLogin onLoginSuccess={setCurrentUser} />;
    }
    return (
      <AdminDashboard
        user={currentUser}
        onLogout={() => {
          sessionStorage.removeItem('dashboard_token');
          setCurrentUser(null);
        }}
        siteData={siteData}
        setSiteData={setSiteData}
      />
    );
  }

  let publicPage;
  switch (pathname) {
    case '/':
      publicPage = <Hero heroData={siteData.hero} onVideoOpen={() => setVideoOpen(true)} onNavigate={navigateTo} />;
      break;
    case '/about':
      publicPage = <About aboutData={siteData.about} />;
      break;
    case '/solutions':
      publicPage = <Solutions solutionsData={siteData.solutions} onNavigate={navigateTo} />;
      break;
    case '/process':
      publicPage = <Process processData={siteData.process} />;
      break;
    case '/projects':
      publicPage = <Projects projectsData={siteData.projects} onNavigate={navigateTo} />;
      break;
    case '/impact':
      publicPage = <Impact impactData={siteData.impact} />;
      break;
    case '/contact':
      publicPage = <Contact footerData={siteData.footer} />;
      break;
    default:
      publicPage = <NotFound onNavigate={navigateTo} />;
  }

  return (
    <>
      <Header
        darkMode={darkMode}
        onThemeToggle={() => setDarkMode((mode) => !mode)}
        onVideoOpen={() => setVideoOpen(true)}
        onNavigate={navigateTo}
        currentPath={pathname}
      />
      <main className="route-main" key={pathname}>
        {publicPage}
        {pathname !== '/contact' && <ClosingCta onNavigate={navigateTo} />}
      </main>
      <Footer footerData={siteData.footer} onNavigate={navigateTo} />
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  );
}
