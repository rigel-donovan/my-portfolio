import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/home.css';

// SVG Icon Helper
function getSocialIcon(network) {
  switch (network.toLowerCase()) {
    case 'linkedin':
      return (
        <svg className="sujuds-social-icon-svg" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      );
    case 'github':
      return (
        <svg className="sujuds-social-icon-svg" viewBox="0 0 24 24">
          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className="sujuds-social-icon-svg" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg className="sujuds-social-icon-svg" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.59.21-1.09.15-1.19-.06-.1-.22-.16-.47-.28z" />
        </svg>
      );
    case 'email':
    default:
      return (
        <svg className="sujuds-social-icon-svg" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      );
  }
}

function Home() {
  const [data, setData] = useState(null);
  const [socialData, setSocialData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);

    fetch(endpoints.social, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setSocialData(res))
      .catch((err) => err);
  }, []);

  return data ? (
    <div
      className="sujuds-home-wrapper"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(10, 10, 10, 0.94) 0%, rgba(10, 10, 10, 0.72) 42%, rgba(10, 10, 10, 0.2) 75%, rgba(10, 10, 10, 0.9) 100%), url(${process.env.PUBLIC_URL}/images/home-hero-bg.jpg)`,
      }}
    >
      <div className="sujuds-hero-container">
        <div className="sujuds-hero-content">
          {/* Badge */}
          <div className="sujuds-hero-badge">
            <span className="sujuds-hero-badge-dot" />
            <span>Available for Opportunities</span>
          </div>

          {/* Big Bold Name (Sujud Style) */}
          <h1 className="sujuds-hero-name">
            Rigel
            {' '}
            <span>Donovan</span>
          </h1>

          {/* Subtitle with Typewriter */}
          <h4 className="sujuds-hero-headline">
            <span>I’m a</span>
            <span className="sujuds-typewriter-text">
              <Typewriter
                options={{
                  loop: true,
                  autoStart: true,
                  strings: data?.roles || [
                    'Credit & Risk Analyst',
                    'Software Engineer',
                    'Information Systems Graduate',
                    'Full Stack Developer',
                  ],
                }}
              />
            </span>
          </h4>

          {/* Bio text if available */}
          {data.bio && (
            <p className="sujuds-hero-bio">
              {data.bio}
            </p>
          )}

          {/* Call to Actions */}
          <div className="sujuds-btn-group">
            <Link to="/projects" className="sujuds-btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>Explore Portfolio</span>
            </Link>

            {data.resumeUrl && (
              <a
                href={data.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sujuds-btn-secondary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <span>Resume / CV</span>
              </a>
            )}

            <Link to="/about" className="sujuds-btn-tertiary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>About Me</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Vertical Social Icons on Right Edge (Sujud Style) */}
      <div className="sujuds-social-fixed">
        <div className="sujuds-social-line" />
        {socialData?.social?.map((s) => (
          <a
            key={s.network}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="sujuds-social-icon-btn"
            aria-label={s.network}
          >
            {getSocialIcon(s.network)}
          </a>
        ))}
        <div className="sujuds-social-line bottom" />
      </div>
    </div>
  ) : <FallbackSpinner />;
}

export default Home;
