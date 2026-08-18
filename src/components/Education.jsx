/* eslint-disable */
import React, {
  useEffect,
  useState,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/education.css';

function EducationCard({ item, index, theme, isVisible }) {
  const [hovered, setHovered] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`edu-timeline-item ${isVisible ? 'edu-animate-in' : ''} ${isLeft ? 'edu-left' : 'edu-right'}`}
      style={{ animationDelay: `${index * 0.18}s` }}
    >
      {/* Connector dot */}
      <div className="edu-dot" style={{ backgroundColor: theme.accentColor }} />

      <div
        className="edu-card"
        style={{
          backgroundColor: theme.chronoTheme?.cardBgColor || (theme.background === '#fff' ? '#ffffff' : '#1B1B1B'),
          borderColor: hovered ? theme.accentColor : 'transparent',
          boxShadow: hovered
            ? `0 20px 60px rgba(61, 132, 198, 0.25), 0 0 0 2px ${theme.accentColor}`
            : '0 8px 32px rgba(0,0,0,0.18)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Accent bar */}
        <div
          className="edu-card-accent"
          style={{
            background: `linear-gradient(135deg, ${theme.accentColor}, #7eb8f0)`,
          }}
        />

        {/* Icon + period */}
        <div className="edu-card-top">
          {item.icon && (
            <div className="edu-icon-wrap" style={{ borderColor: theme.accentColor }}>
              <img src={item.icon.src} alt={item.icon.alt || item.cardTitle} className="edu-icon" />
            </div>
          )}
          <span className="edu-period" style={{ color: theme.accentColor }}>
            <svg className="edu-period-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {item.title}
          </span>
        </div>

        {/* Title & subtitle */}
        <h3 className="edu-card-title" style={{ color: theme.chronoTheme?.cardForeColor || theme.color }}>
          {item.cardTitle}
        </h3>
        <p className="edu-card-subtitle" style={{ color: theme.accentColor }}>
          {item.cardSubtitle}
        </p>

        {/* Divider */}
        <div className="edu-divider" style={{ backgroundColor: `${theme.accentColor}40` }} />

        {/* Detail text */}
        {item.cardDetailedText && (
          <div className="edu-detail-row">
            <span className="edu-detail-icon">🎓</span>
            <span className="edu-detail-text" style={{ color: theme.chronoTheme?.cardForeColor || theme.color }}>
              {item.cardDetailedText}
            </span>
          </div>
        )}

        {/* Certificate link */}
        {item.certificateLink && (
          <a
            href={item.certificateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="edu-cert-btn"
            style={{
              background: hovered
                ? `linear-gradient(135deg, ${theme.accentColor}, #7eb8f0)`
                : 'transparent',
              borderColor: theme.accentColor,
              color: hovered ? '#fff' : theme.accentColor,
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="edu-btn-icon">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            View Certificate
          </a>
        )}
      </div>
    </div>
  );
}

function Education(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetch(endpoints.education, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        if (mounted) {
          setData(res);
          // Stagger visibility
          res.education.forEach((_, i) => {
            setTimeout(() => {
              if (mounted) setVisibleItems((prev) => [...prev, i]);
            }, i * 200);
          });
        }
      })
      .catch((err) => err);
    return () => { mounted = false; };
  }, []);

  return (
    <div className="edu-page">
      {/* Section header */}
      <div className="edu-header-wrap">
        <div className="edu-header-badge" style={{ color: theme.accentColor, borderColor: `${theme.accentColor}40` }}>
          Academic Journey
        </div>
        <h1 className="edu-header" style={{ color: theme.color }}>{header}</h1>
        <p className="edu-header-sub" style={{ color: `${theme.color}80` }}>
          My educational background and qualifications
        </p>
      </div>

      {data ? (
        <Container>
          <div className="edu-timeline">
            {/* Center line */}
            <div className="edu-timeline-line" style={{ background: `linear-gradient(to bottom, ${theme.accentColor}00, ${theme.accentColor}, ${theme.accentColor}00)` }} />

            {data.education.map((item, index) => (
              <EducationCard
                key={`${item.cardTitle}-${item.title}`}
                item={item}
                index={index}
                theme={theme}
                isVisible={visibleItems.includes(index)}
              />
            ))}
          </div>
        </Container>
      ) : (
        <FallbackSpinner />
      )}
    </div>
  );
}

EducationCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    cardTitle: PropTypes.string,
    cardSubtitle: PropTypes.string,
    cardDetailedText: PropTypes.string,
    certificateLink: PropTypes.string,
    icon: PropTypes.shape({ src: PropTypes.string, alt: PropTypes.string }),
  }).isRequired,
  index: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;
