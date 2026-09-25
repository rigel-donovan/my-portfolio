import { Navbar, Nav, Container } from 'react-bootstrap';
import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import ThemeToggler from './ThemeToggler';

const isDark = (theme) => theme.bsPrimaryVariant === 'dark';

const DesktopNavWrapper = styled.div`
  @media (max-width: 768px) {
    display: none !important;
  }
`;

const StyledNavbar = styled(Navbar)`
  background: ${(props) => (isDark(props.theme)
    ? 'rgba(11, 13, 19, 0.85)'
    : 'rgba(255, 255, 255, 0.9)')} !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid ${(props) => (isDark(props.theme)
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.07)')};
  box-shadow: ${(props) => (isDark(props.theme)
    ? '0 4px 20px rgba(0, 0, 0, 0.3)'
    : '0 4px 16px rgba(0, 0, 0, 0.05)')};
  padding: 10px 0;
  transition: all 0.3s ease;
  z-index: 1040;
`;

const BrandLink = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none !important;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    opacity: 0.95;
  }
`;

const BrandAvatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${(props) => props.theme.accentColor};
  box-shadow: 0 0 10px ${(props) => `${props.theme.accentColor}40`};
  transition: box-shadow 0.25s ease;

  ${BrandLink}:hover & {
    box-shadow: 0 0 14px ${(props) => `${props.theme.accentColor}70`};
  }
`;

const BrandName = styled.span`
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: ${(props) => (isDark(props.theme) ? '#f8fafc' : '#0f172a')};
  display: inline-flex;
  align-items: center;

  .accent-part {
    color: ${(props) => props.theme.accentColor};
    margin-left: 5px;
  }
`;

const NavLinksContainer = styled(Nav)`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 4px;

  @media (max-width: 1100px) {
    gap: 2px;
  }
`;

const InternalNavLink = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap !important;
  text-decoration: none !important;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  padding: 7px 13px;
  border-radius: 8px;
  color: ${(props) => (isDark(props.theme)
    ? 'rgba(241, 245, 249, 0.72)'
    : 'rgba(30, 41, 59, 0.75)')};
  background: transparent;
  border: 1px solid transparent;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    text-decoration: none !important;
    color: ${(props) => (isDark(props.theme) ? '#ffffff' : '#0f172a')};
    background: ${(props) => (isDark(props.theme)
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.05)')};
    transform: translateY(-1px);
  }

  &.navbar__link--active {
    color: ${(props) => (isDark(props.theme) ? '#ffffff' : '#1d4ed8')};
    background: ${(props) => (isDark(props.theme)
    ? `${props.theme.accentColor}25`
    : `${props.theme.accentColor}18`)};
    border-color: ${(props) => (isDark(props.theme)
    ? `${props.theme.accentColor}45`
    : `${props.theme.accentColor}35`)};
    font-weight: 600;
  }

  @media (max-width: 1100px) {
    padding: 6px 10px;
    font-size: 0.84rem;
  }
`;

const ExternalNavLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  white-space: nowrap !important;
  text-decoration: none !important;
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  padding: 6px 14px;
  margin-left: 6px;
  border-radius: 8px;
  border: 1px solid ${(props) => `${props.theme.accentColor}60`};
  background: ${(props) => (isDark(props.theme)
    ? `${props.theme.accentColor}18`
    : `${props.theme.accentColor}12`)};
  color: ${(props) => (isDark(props.theme) ? '#93c5fd' : '#1d4ed8')};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    text-decoration: none !important;
    background: ${(props) => props.theme.accentColor};
    color: #ffffff;
    border-color: ${(props) => props.theme.accentColor};
    box-shadow: 0 4px 14px ${(props) => `${props.theme.accentColor}40`};
    transform: translateY(-1px);
  }

  @media (max-width: 1100px) {
    padding: 5px 10px;
    font-size: 0.82rem;
    margin-left: 3px;
  }
`;

const ThemeTogglerBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;
  padding-left: 12px;
  border-left: 1px solid ${(props) => (isDark(props.theme)
    ? 'rgba(255, 255, 255, 0.12)'
    : 'rgba(0, 0, 0, 0.1)')};

  @media (max-width: 1100px) {
    margin-left: 6px;
    padding-left: 6px;
  }
`;

const NavBar = () => {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.navbar, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <DesktopNavWrapper>
      <StyledNavbar
        fixed="top"
        className="navbar-custom"
        theme={theme}
      >
        <Container fluid="xl" className="d-flex align-items-center justify-content-between">
          <BrandLink to="/" theme={theme}>
            {data?.logo?.source && (
              <BrandAvatar
                src={data.logo.source}
                alt="Rigel Donovan"
                theme={theme}
              />
            )}
            <BrandName theme={theme}>
              Rigel
              <span className="accent-part">Donovan</span>
            </BrandName>
          </BrandLink>

          <NavLinksContainer>
            {data
              && data.sections?.map((section, index) => (section?.type === 'link' ? (
                <ExternalNavLink
                  key={section.title}
                  href={section.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  theme={theme}
                >
                  {section.title}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ opacity: 0.85 }}
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </ExternalNavLink>
              ) : (
                <InternalNavLink
                  key={section.title}
                  exact={index === 0}
                  activeClassName="navbar__link--active"
                  className="navbar__link"
                  to={section.href}
                  theme={theme}
                >
                  {section.title}
                </InternalNavLink>
              )))}

            <ThemeTogglerBox theme={theme}>
              <ThemeToggler />
            </ThemeTogglerBox>
          </NavLinksContainer>
        </Container>
      </StyledNavbar>
    </DesktopNavWrapper>
  );
};

const NavBarWithRouter = withRouter(NavBar);
export default NavBarWithRouter;
