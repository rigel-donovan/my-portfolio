import React, { useState, useEffect, useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const iconSize = 22;

const contactIconPropTypes = { color: PropTypes.string };
const contactIconDefaultProps = { color: '#4a90e2' };

function ContactIconInstagram({ color }) {
  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
ContactIconInstagram.propTypes = contactIconPropTypes;
ContactIconInstagram.defaultProps = contactIconDefaultProps;

function ContactIconWhatsApp({ color }) {
  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
ContactIconWhatsApp.propTypes = contactIconPropTypes;
ContactIconWhatsApp.defaultProps = contactIconDefaultProps;

function ContactIconLinkedIn({ color }) {
  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
ContactIconLinkedIn.propTypes = contactIconPropTypes;
ContactIconLinkedIn.defaultProps = contactIconDefaultProps;

function ContactIconEmail({ color }) {
  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}
ContactIconEmail.propTypes = contactIconPropTypes;
ContactIconEmail.defaultProps = contactIconDefaultProps;

function ContactIconPhone({ color }) {
  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}
ContactIconPhone.propTypes = contactIconPropTypes;
ContactIconPhone.defaultProps = contactIconDefaultProps;

const ContactIcons = {
  Instagram: ContactIconInstagram,
  WhatsApp: ContactIconWhatsApp,
  LinkedIn: ContactIconLinkedIn,
  Email: ContactIconEmail,
  Phone: ContactIconPhone,
};

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  nameSection: {
    marginBottom: 30,
  },
  nameHeading: {
    fontSize: '2.5em',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  titleText: {
    fontSize: '0.9em',
    color: '#666',
    marginBottom: 30,
  },
  descriptionText: {
    fontSize: '0.95em',
    lineHeight: 1.7,
    marginBottom: 20,
    textAlign: 'justify',
  },
  educationSection: {
    padding: 20,
    borderLeft: '4px solid',
    marginBottom: 20,
    borderRadius: 4,
  },
  educationTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: '1.1em',
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 15,
  },
  collageContainer: {
    position: 'relative',
    width: '560px',
    height: '360px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 0.45fr',
    gridTemplateAreas: '\'main main\' \'left right\'',
    gap: 12,
    justifyItems: 'stretch',
    alignItems: 'stretch',
  },
  collageItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
    padding: 4,
  },
  collageImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    transition: 'transform 0.35s ease, box-shadow 0.35s ease',
    cursor: 'pointer',
  },
  collageLayer1: {
    gridArea: 'main',
    transform: 'rotate(-1deg)',
    zIndex: 1,
  },
  collageLayer2: {
    gridArea: 'left',
    transform: 'rotate(2deg)',
    zIndex: 2,
    alignSelf: 'center',
  },
  collageLayer3: {
    gridArea: 'right',
    transform: 'rotate(-2deg)',
    zIndex: 3,
    alignSelf: 'center',
  },
  skillBadge: {
    padding: '8px 16px',
    borderRadius: 20,
    fontSize: '0.9em',
    fontWeight: 500,
    border: '1px solid',
  },
  contactSection: {
    marginTop: 30,
    padding: 20,
    borderRadius: 8,
  },
  contactItem: {
    marginBottom: 12,
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.95em',
  },
  contactIcon: {
    marginRight: 15,
    minWidth: 25,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: 20,
  },
  modalContent: {
    position: 'relative',
    maxWidth: '90vw',
    maxHeight: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImg: {
    maxWidth: '100%',
    maxHeight: '85vh',
    objectFit: 'contain',
    borderRadius: 8,
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
  },
  modalClose: {
    position: 'absolute',
    top: -40,
    right: 0,
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    color: '#fff',
    width: 36,
    height: 36,
    borderRadius: '50%',
    fontSize: '1.4em',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
    transition: 'background 0.2s',
  },
  modalNav: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    color: '#fff',
    width: 48,
    height: 48,
    borderRadius: '50%',
    fontSize: '1.5em',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
  },
};

function About(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const collageImages = (() => {
    if (data?.imageSources?.length >= 3) return data.imageSources;
    if (data?.imageSource) return [data.imageSource];
    return [];
  })();

  const openModal = (index) => {
    setModalIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const goPrev = () => {
    setModalIndex((i) => (i <= 0 ? collageImages.length - 1 : i - 1));
  };

  const goNext = () => {
    setModalIndex((i) => (i >= collageImages.length - 1 ? 0 : i + 1));
  };

  useEffect(() => {
    if (!modalOpen || collageImages.length === 0) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') setModalOpen(false);
      if (e.key === 'ArrowLeft') setModalIndex((i) => (i <= 0 ? collageImages.length - 1 : i - 1));
      if (e.key === 'ArrowRight') setModalIndex((i) => (i >= collageImages.length - 1 ? 0 : i + 1));
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [modalOpen, collageImages.length]);

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data ? (
            <>

              {/* Main Content */}
              <Row style={{ marginBottom: 40 }}>
                {/* Left Side - Text Content */}
                <Col lg={7}>
                  {/* Name and Intro */}
                  <div style={styles.nameSection}>
                    <h1 style={{ ...styles.nameHeading, color: theme.color }}>
                      Hello, I&apos;m
                      <br />
                      {data.name}
                    </h1>
                  </div>

                  {/* About Description */}
                  <p style={{ ...styles.descriptionText, color: theme.color }}>
                    {data.about}
                  </p>

                  {/* Education Section */}
                  {data.education && (
                    <div
                      style={{
                        ...styles.educationSection,
                        borderLeftColor: theme.accentColor,
                        backgroundColor: theme.highlightColor || 'transparent',
                      }}
                    >
                      <div style={styles.educationTitle}>
                        Education
                      </div>
                      <div style={{ color: theme.accentColor, fontWeight: 'bold', marginBottom: 5 }}>
                        {data.education.institution}
                      </div>
                      <p style={{ margin: 0, fontSize: '0.9em', color: theme.color }}>
                        {data.education.degree}
                        {' '}
                        |
                        {' '}
                        {data.education.year}
                      </p>
                      {data.education.gpa && (
                        <p style={{ margin: '5px 0 0 0', fontSize: '0.85em', color: theme.color }}>
                          Cumulative GPA:
                          {' '}
                          {data.education.gpa}
                        </p>
                      )}

                      {/* Education Documents Buttons */}
                      {data.education.documents && (
                        <div
                          style={{
                            marginTop: 15,
                            display: 'flex',
                            gap: 10,
                            flexWrap: 'wrap',
                          }}
                        >
                          {data.education.documents.diploma && (
                            <a
                              href={data.education.documents.diploma}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                padding: '8px 14px',
                                backgroundColor: theme.accentColor || '#4a90e2',
                                color: '#fff',
                                borderRadius: 4,
                                textDecoration: 'none',
                                fontSize: '0.9em',
                                fontWeight: 500,
                                transition: 'all 0.3s ease',
                                display: 'inline-block',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                              }}
                            >
                              📄 Ijazah
                            </a>
                          )}
                          {data.education.documents.transcript && (
                            <a
                              href={data.education.documents.transcript}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                padding: '8px 14px',
                                backgroundColor: theme.accentColor || '#4a90e2',
                                color: '#fff',
                                borderRadius: 4,
                                textDecoration: 'none',
                                fontSize: '0.9em',
                                fontWeight: 500,
                                transition: 'all 0.3s ease',
                                display: 'inline-block',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                              }}
                            >
                              📋 Transkrip Nilai
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Contact Info */}
                  {data.contact && (
                    <div
                      style={{
                        ...styles.contactSection,
                        backgroundColor: theme.highlightColor || 'transparent',
                      }}
                    >
                      {data.contact.instagram && (
                        <div style={{ ...styles.contactItem, color: theme.color }}>
                          <span style={{ ...styles.contactIcon }}>
                            <ContactIcons.Instagram color={theme.accentColor || '#4a90e2'} />
                          </span>
                          <a
                            href={data.contact.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: theme.accentColor, textDecoration: 'none' }}
                          >
                            Instagram
                          </a>
                        </div>
                      )}
                      {data.contact.whatsapp && (
                        <div style={{ ...styles.contactItem, color: theme.color }}>
                          <span style={{ ...styles.contactIcon }}>
                            <ContactIcons.WhatsApp color={theme.accentColor || '#4a90e2'} />
                          </span>
                          <a
                            href={data.contact.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: theme.accentColor, textDecoration: 'none' }}
                          >
                            WhatsApp
                          </a>
                        </div>
                      )}
                      {data.contact.linkedin && (
                        <div style={{ ...styles.contactItem, color: theme.color }}>
                          <span style={{ ...styles.contactIcon }}>
                            <ContactIcons.LinkedIn color={theme.accentColor || '#4a90e2'} />
                          </span>
                          <a
                            href={data.contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: theme.accentColor, textDecoration: 'none' }}
                          >
                            LinkedIn
                          </a>
                        </div>
                      )}
                      {data.contact.phone && (
                        <div style={{ ...styles.contactItem, color: theme.color }}>
                          <span style={{ ...styles.contactIcon }}>
                            <ContactIcons.Phone color={theme.accentColor || '#4a90e2'} />
                          </span>
                          <a
                            href={`tel:${data.contact.phone}`}
                            style={{ color: theme.accentColor, textDecoration: 'none' }}
                          >
                            Phone
                          </a>
                        </div>
                      )}
                      {data.contact.email && (
                        <div style={{ ...styles.contactItem, color: theme.color }}>
                          <span style={{ ...styles.contactIcon }}>
                            <ContactIcons.Email color={theme.accentColor || '#4a90e2'} />
                          </span>
                          <a
                            href={`mailto:${data.contact.email}`}
                            style={{ color: theme.accentColor, textDecoration: 'none' }}
                          >
                            Email
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </Col>

                {/* Right Side - Image and Skills (collage) */}
                <Col lg={5}>
                  {/* Collage Container */}
                  <div style={{ ...styles.introImageContainer, justifyContent: 'flex-end' }}>
                    <div
                      style={{
                        ...styles.collageContainer,
                        width: data?.imageStyle?.width || styles.collageContainer.width,
                        height: data?.imageStyle?.height || styles.collageContainer.height,
                      }}
                    >
                      {data.imageSources && data.imageSources.length >= 3 ? (
                        <>
                          <div
                            style={{
                              ...styles.collageItem,
                              ...styles.collageLayer1,
                              borderRadius: 14,
                            }}
                          >
                            <button
                              type="button"
                              style={{
                                border: 'none',
                                padding: 0,
                                margin: 0,
                                background: 'none',
                                cursor: 'pointer',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                              onClick={() => openModal(0)}
                              aria-label="View collage 1"
                            >
                              <img
                                src={data.imageSources[0]}
                                alt="collage-1"
                                style={{ ...styles.collageImg }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = 'scale(1.02)';
                                  e.currentTarget.style.boxShadow = '0 18px 48px rgba(0,0,0,0.25)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'scale(1)';
                                  e.currentTarget.style.boxShadow = 'none';
                                }}
                              />
                            </button>
                          </div>

                          <div
                            style={{
                              ...styles.collageItem,
                              ...styles.collageLayer2,
                              borderRadius: 10,
                            }}
                          >
                            <button
                              type="button"
                              style={{
                                border: 'none',
                                padding: 0,
                                margin: 0,
                                background: 'none',
                                cursor: 'pointer',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                              onClick={() => openModal(1)}
                              aria-label="View collage 2"
                            >
                              <img
                                src={data.imageSources[1]}
                                alt="collage-2"
                                style={{ ...styles.collageImg }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = 'scale(1.03)';
                                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.25)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'scale(1)';
                                  e.currentTarget.style.boxShadow = 'none';
                                }}
                              />
                            </button>
                          </div>

                          <div
                            style={{
                              ...styles.collageItem,
                              ...styles.collageLayer3,
                              borderRadius: 10,
                            }}
                          >
                            <button
                              type="button"
                              style={{
                                border: 'none',
                                padding: 0,
                                margin: 0,
                                background: 'none',
                                cursor: 'pointer',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                              onClick={() => openModal(2)}
                              aria-label="View collage 3"
                            >
                              <img
                                src={data.imageSources[2]}
                                alt="collage-3"
                                style={{ ...styles.collageImg }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = 'scale(1.03)';
                                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.25)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'scale(1)';
                                  e.currentTarget.style.boxShadow = 'none';
                                }}
                              />
                            </button>
                          </div>
                        </>
                      ) : (
                        <button
                          type="button"
                          style={{
                            border: 'none',
                            padding: 0,
                            margin: 0,
                            background: 'none',
                            cursor: 'pointer',
                            borderRadius: 12,
                          }}
                          onClick={() => openModal(0)}
                          aria-label="View profile"
                        >
                          <img
                            src={data?.imageSource}
                            alt="profile"
                            style={{
                              ...data?.imageStyle,
                              borderRadius: 12,
                              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                            }}
                          />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Skills Section */}
                  {data.skills && data.skills.length > 0 && (
                    <div style={{ marginTop: 30 }}>
                      <div style={styles.skillsContainer}>
                        {data.skills.map((skill) => (
                          <div
                            key={skill}
                            style={{
                              ...styles.skillBadge,
                              borderColor: theme.accentColor,
                              color: theme.accentColor,
                              backgroundColor: theme.highlightColor || 'transparent',
                            }}
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
            </>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>

      {/* Photo modal */}
      {modalOpen && collageImages.length > 0 && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          style={styles.modalOverlay}
        >
          <button
            type="button"
            aria-label="Close viewer"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              padding: 0,
              background: 'transparent',
              cursor: 'default',
            }}
            onClick={closeModal}
          />
          <div style={styles.modalContent}>
            <button
              type="button"
              style={{ ...styles.modalClose, right: 0 }}
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>
            <button
              type="button"
              style={{ ...styles.modalNav, left: 20 }}
              onClick={goPrev}
              aria-label="Previous photo"
            >
              ‹
            </button>
            <img
              src={collageImages[modalIndex]}
              alt={`${modalIndex + 1} of ${collageImages.length}`}
              style={styles.modalImg}
            />
            <button
              type="button"
              style={{ ...styles.modalNav, right: 20 }}
              onClick={goNext}
              aria-label="Next photo"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
