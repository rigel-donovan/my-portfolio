import React, { useState, useEffect, useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import Header from './Header';
import endpoints from '../constants/endpoints';
import ProjectCard from './projects/ProjectCard';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  containerStyle: {
    marginBottom: 25,
  },
  filterContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 35,
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
};

const filterCategories = ['All', 'Laravel & PHP', 'Mobile (Flutter/Android)', 'Machine Learning (AI & Python)'];

const Projects = (props) => {
  const { header } = props;
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetch(endpoints.projects, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const handleProjectImageClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const filteredProjects = data?.projects?.filter((project) => {
    if (activeFilter === 'All') return true;
    const tags = project.tags || [];
    if (activeFilter === 'Laravel & PHP') {
      return tags.some((t) => ['Laravel', 'PHP', 'Codeigniter'].includes(t));
    }
    if (activeFilter === 'Mobile (Flutter/Android)') {
      return tags.some((t) => ['Flutter', 'Android', 'Kotlin'].includes(t));
    }
    if (activeFilter === 'AI & Python') {
      return tags.some((t) => ['Python', 'Streamlit', 'AI', 'Machine Learning', 'Chatbot'].includes(t));
    }
    return true;
  });

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          <Container style={styles.containerStyle}>
            {/* Filter Tabs */}
            <div style={styles.filterContainer}>
              {filterCategories.map((cat) => {
                const isActive = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveFilter(cat)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: 20,
                      fontSize: '0.9em',
                      fontWeight: isActive ? 700 : 500,
                      backgroundColor: isActive ? (theme.accentColor || '#3D84C6') : 'transparent',
                      color: isActive ? '#fff' : theme.color,
                      border: `1.5px solid ${theme.accentColor || '#3D84C6'}`,
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: isActive ? '0 4px 12px rgba(61, 132, 198, 0.35)' : 'none',
                    }}
                  >
                    {cat}
                    {cat === 'All' && data.projects ? ` (${data.projects.length})` : ''}
                  </button>
                );
              })}
            </div>

            {/* Projects Grid */}
            <Row xs={1} sm={1} md={2} lg={3} className="g-4">
              {filteredProjects?.map((project) => (
                <div key={project.title}>
                  <ProjectCard
                    project={project}
                    onImageClick={handleProjectImageClick}
                  />
                </div>
              ))}
            </Row>
          </Container>
        </div>
      ) : <FallbackSpinner />}

      {/* Modal Popup */}
      {selectedProject && (
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
              src={selectedProject.image}
              alt={selectedProject.title}
              style={styles.modalImage}
            />
            <div style={styles.modalTitle}>
              {selectedProject.title}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;
