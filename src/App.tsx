import { useEffect, useRef, useState } from 'react';

const WHATSAPP_NUMBER = '917282044597';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

interface Particle {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
}

export default function App() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate floating particles
    const generated: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      generated.push({
        id: i,
        size: Math.random() * 8 + 4,
        left: Math.random() * 100,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 5,
      });
    }
    setParticles(generated);

    // 3D Tilt Effect on mousemove for desktop
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth > 768 && cardRef.current) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
        cardRef.current.style.transform = `perspective(1000px) translateY(0) scale(1) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      }
    };

    const handleMouseLeave = () => {
      if (window.innerWidth > 768 && cardRef.current) {
        cardRef.current.style.transition = 'transform 0.5s ease';
        cardRef.current.style.transform =
          'perspective(1000px) translateY(0) scale(1) rotateY(0deg) rotateX(0deg)';
        setTimeout(() => {
          if (cardRef.current) {
            cardRef.current.style.transition = '';
          }
        }, 500);
      }
    };

    const handleMouseEnter = () => {
      if (window.innerWidth > 768 && cardRef.current) {
        cardRef.current.style.transition = '';
      }
    };

    // Track genuine SPA route changes (ignoring hash anchor clicks) without duplicate PageViews
    let lastPath = window.location.pathname;
    const handleRouteChange = () => {
      if (window.location.pathname !== lastPath) {
        lastPath = window.location.pathname;
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'PageView');
        }
      }
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const handleWhatsAppClick = () => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Contact', {
        content_name: 'WhatsApp Contact',
        content_category: 'Lead',
      });
    }
  };

  return (
    <>
      {/* Floating Background Particles */}
      <div className="particles" id="particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Animated Background Shapes */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>

      {/* Header */}
      <header>
        <a href="#" className="logo">
          <img
            src="/img.jpeg"
            alt="realreddy Logo"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://ui-avatars.com/api/?name=realreddy&background=25D366&color=fff&size=200';
            }}
          />
          <span className="logo-text">allbook</span>
        </a>
        <nav>
          <a href="#">
            <i className="fa-solid fa-bolt"></i> Features
          </a>
          <a href="#">
            <i className="fa-solid fa-shield-halved"></i> Privacy
          </a>
          <a href="#">
            <i className="fa-solid fa-circle-question"></i> Help Center
          </a>
          <a href="#">
            <i className="fa-solid fa-newspaper"></i> Blog
          </a>
          <a href="#">
            <i className="fa-solid fa-briefcase"></i> For Business
          </a>
          <a href="#" className="download-btn">
            <i className="fa-solid fa-download"></i> Download
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {/* Animated Card Wrapper */}
        <div className="content-card" id="tiltCard" ref={cardRef}>
          <div className="avatar-wrapper">
            <img
              src="/img.jpeg"
              alt="realreddy Logo"
              className="profile-avatar"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://ui-avatars.com/api/?name=realreddy&background=25D366&color=fff&size=200';
              }}
            />
            <div className="online-dot"></div>
          </div>

          <div className="contact-name-wrapper">
            <h1 className="contact-name">All Book</h1>
            {/* Verified Blue Tick SVG */}
            <svg
              aria-label="Verified"
              fill="#0095f6"
              viewBox="0 0 40 40"
              style={{ width: 32, height: 32, flexShrink: 0 }}
            >
              <path
                fillRule="evenodd"
                d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Call To Action Button -> connects to https://wa.me/917282044597 */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="open-app-btn"
            id="openAppBtn"
            onClick={handleWhatsAppClick}
          >
            <i className="fa-brands fa-whatsapp"></i> Message on WhatsApp
          </a>

          <div className="divider-text" id="dividerText">
            Don't have the app?
          </div>
          <a href="#" className="download-link" id="downloadLink">
            Download it now
          </a>
        </div>
      </main>

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-wa-btn"
        aria-label="Message on WhatsApp"
        title="Message on WhatsApp"
        onClick={handleWhatsAppClick}
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      {/* Footer */}
      <footer>
        <div className="footer-grid">
          <div className="footer-col">
            <h4>What we do</h4>
            <ul>
              <li>
                <a href="#">
                  <i className="fa-solid fa-chevron-right"></i> Features
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-chevron-right"></i> Blog
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-chevron-right"></i> Security
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-chevron-right"></i> For Business
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Who we are</h4>
            <ul>
              <li>
                <a href="#">
                  <i className="fa-solid fa-chevron-right"></i> About us
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-chevron-right"></i> Careers
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-chevron-right"></i> Brand Center
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-chevron-right"></i> Privacy
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Use realreddy</h4>
            <ul>
              <li>
                <a href="#">
                  <i className="fa-brands fa-android"></i> Android
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-brands fa-apple"></i> iPhone
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-desktop"></i> Mac/PC
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-globe"></i> realreddy Web
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Need help?</h4>
            <ul>
              <li>
                {/* Contact Us WhatsApp Link */}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                >
                  <i className="fa-solid fa-envelope"></i> Contact Us
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-circle-info"></i> Help Center
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-mobile-screen"></i> Apps
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-solid fa-shield"></i> Security Advisories
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>2026 © All book LLC</div>
          <div>
            <a href="#">Terms & Privacy Policy</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </footer>
    </>
  );
}
