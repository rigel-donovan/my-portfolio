import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

function Home() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return data ? (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '30px 20px',
      }}
    >
      <div
        style={{
          width: 130,
          height: 130,
          borderRadius: '50%',
          overflow: 'hidden',
          border: `3px solid ${theme.accentColor || '#3D84C6'}`,
          boxShadow: `0 10px 30px ${theme.accentColor ? `${theme.accentColor}40` : 'rgba(61, 132, 198, 0.3)'}`,
          marginBottom: 20,
        }}
      >
        <img
          src="images/about/pas-foto.jpg"
          alt={data.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <p
        style={{
          fontSize: '1.1em',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: theme.accentColor || '#3D84C6',
          fontWeight: 600,
          marginBottom: 6,
        }}
      >
        Hello, I&apos;m
      </p>

      <h1
        style={{
          fontSize: 'clamp(2.2em, 5vw, 3.8em)',
          fontWeight: 800,
          color: theme.color,
          marginBottom: 10,
          letterSpacing: '-0.02em',
        }}
      >
        {data.name}
      </h1>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          fontSize: 'clamp(1.15em, 2.5vw, 1.7em)',
          fontWeight: 600,
          color: theme.color,
          marginBottom: 16,
        }}
      >
        <span>I&apos;m a&nbsp;</span>
        <span style={{ color: theme.accentColor || '#3D84C6' }}>
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: data?.roles,
            }}
          />
        </span>
      </div>

      {data.bio && (
        <p
          style={{
            maxWidth: 620,
            fontSize: '1em',
            lineHeight: 1.7,
            opacity: 0.85,
            color: theme.color,
            marginBottom: 28,
          }}
        >
          {data.bio}
        </p>
      )}

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 24,
        }}
      >
        <Link
          to="/projects"
          style={{
            padding: '10px 22px',
            backgroundColor: theme.accentColor || '#3D84C6',
            color: '#fff',
            borderRadius: 8,
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.95em',
            boxShadow: '0 4px 14px rgba(61, 132, 198, 0.4)',
            transition: 'all 0.25s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(61, 132, 198, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(61, 132, 198, 0.4)';
          }}
        >
          <span aria-hidden="true">💻</span>
          <span>View Projects</span>
        </Link>

        {data.resumeUrl && (
          <a
            href={data.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 22px',
              backgroundColor: 'transparent',
              color: theme.color,
              border: `2px solid ${theme.accentColor || '#3D84C6'}`,
              borderRadius: 8,
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95em',
              transition: 'all 0.25s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.accentColor || '#3D84C6';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = theme.color;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span aria-hidden="true">📄</span>
            <span>Resume / CV</span>
          </a>
        )}

        <Link
          to="/about"
          style={{
            padding: '10px 22px',
            backgroundColor: theme.bsPrimaryVariant === 'dark' ? '#222' : '#f0f0f0',
            color: theme.color,
            borderRadius: 8,
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.95em',
            transition: 'all 0.25s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span aria-hidden="true">👤</span>
          <span>About Me</span>
        </Link>
      </div>

      <Social />
    </div>
  ) : <FallbackSpinner />;
}

export default Home;
