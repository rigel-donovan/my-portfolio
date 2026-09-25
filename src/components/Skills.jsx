import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import Header from './Header';
import '../css/skills.css';

const styles = {
  certificateCard: {
    padding: 0,
    borderRadius: 12,
    marginBottom: 20,
    transition: 'all 0.3s ease',
    border: '2px solid',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    minHeight: 0,
  },
  cardHover: {
    transform: 'translateY(-10px)',
    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.2)',
    borderColor: '#fff',
  },
  cardImage: {
    width: '100%',
    height: 280,
    objectFit: 'cover',
    borderRadius: 0,
    marginTop: 0,
    boxShadow: 'none',
    transition: 'transform 0.3s ease',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    padding: 20,
    cursor: 'pointer',
  },
  modalContent: {
    position: 'relative',
    maxWidth: '90%',
    maxHeight: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalImage: {
    maxWidth: '100%',
    maxHeight: '85vh',
    objectFit: 'contain',
    borderRadius: 8,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    top: -40,
    right: 0,
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '2em',
    cursor: 'pointer',
    padding: '5px 15px',
    transition: 'transform 0.2s ease',
  },
  modalTitle: {
    color: '#fff',
    marginTop: 15,
    fontSize: '1.2em',
    textAlign: 'center',
    maxWidth: '100%',
  },
  scholarshipCard: {
    marginTop: 40,
    padding: 20,
    borderRadius: 12,
    border: '2px solid',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    boxShadow: '0 8px 18px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  scholarshipBar: {
    width: 12,
    height: '100%',
    borderRadius: 8,
  },
  scholarshipContent: {
    flex: 1,
  },
  scholarshipTitle: {
    fontSize: '1.05em',
    fontWeight: 700,
    marginBottom: 6,
  },
  scholarshipDesc: {
    margin: 0,
    lineHeight: 1.6,
  },
  scholarshipIcon: {
    fontSize: '2.6em',
    marginLeft: 8,
  },
};

function Skills(props) {
  const { header } = props;
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    fetch(endpoints.skills, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const handleCertificateClick = (cert) => {
    setSelectedCertificate(cert);
  };

  const handleCloseModal = () => {
    setSelectedCertificate(null);
  };

  return (
    <>
      <Header title={header || 'Skills & Certifications'} />
      {data ? (
        <div className="section-content-container">
          <Container>

            {/* Certificates Grid */}
            <div className="certificates-grid">
              {data.certificates?.map((cert, index) => (
                <div key={cert.title}>
                  <div
                    className="certificate-card"
                    style={{
                      ...styles.certificateCard,
                      borderColor: theme.accentColor || '#4a90e2',
                      backgroundColor: theme.highlightColor || 'transparent',
                      ...(hoveredCard === index && styles.cardHover),
                    }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => handleCertificateClick(cert)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCertificateClick(cert);
                    }}
                    tabIndex={0}
                    role="button"
                    aria-pressed="false"
                  >
                    {/* Certificate Image Only */}
                    {cert.certificateImage && (
                    <div style={{ position: 'relative', overflow: 'hidden', flex: 1 }}>
                      <img
                        className="certificate-image"
                        src={cert.certificateImage}
                        alt={cert.title}
                        style={styles.cardImage}
                      />
                    </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32 }}>
              <div
                style={{
                  ...styles.scholarshipCard,
                  borderColor: theme.accentColor || '#4a90e2',
                }}
              >
                <div
                  style={{
                    ...styles.scholarshipBar,
                    backgroundColor: theme.accentColor || '#4a90e2',
                  }}
                />
                <div style={styles.scholarshipContent}>
                  <div style={{ ...styles.scholarshipTitle, color: theme.color }}>
                    Recipient of the Kaltim Tuntas Scholarship 2023–2025
                  </div>
                  <p style={{ ...styles.scholarshipDesc, color: theme.color }}>
                    A scholarship awarded by the East Kalimantan Provincial Government
                    for outstanding students, supporting the completion of studies without
                    financial burden.
                  </p>
                </div>
                <div style={styles.scholarshipIcon} aria-hidden="true">🎓</div>
              </div>
            </div>
          </Container>
        </div>
      ) : <FallbackSpinner />}

      {/* Modal Popup */}
      {selectedCertificate && (
        <div
          style={styles.modalOverlay}
          onClick={handleCloseModal}
          onKeyDown={(e) => {
            if (e.key === 'Escape') handleCloseModal();
          }}
          role="presentation"
        >
          <div
            style={styles.modalContent}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              style={styles.closeButton}
              onClick={handleCloseModal}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
              aria-label="Close"
            >
              ✕
            </button>
            <img
              src={selectedCertificate.certificateImage}
              alt={selectedCertificate.title}
              style={styles.modalImage}
            />
            <div style={styles.modalTitle}>
              {selectedCertificate.title}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

Skills.propTypes = {
  header: PropTypes.string,
};

Skills.defaultProps = {
  header: 'Skills & Certifications',
};

export default Skills;
