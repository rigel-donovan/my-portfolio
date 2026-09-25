import React, { useEffect, useState, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled, { ThemeContext, keyframes } from 'styled-components';
import endpoints from '../constants/endpoints';
import ThemeToggler from './ThemeToggler';

/* ───────── Helpers ───────── */
const isDark = (theme) => theme.bsPrimaryVariant === 'dark';

/* ───────── SVG Icons (line-style, matching reference) ───────── */
const icons = {
  home: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  ),
  about: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0113 0" />
    </svg>
  ),
  achievements: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
    </svg>
  ),
  education: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10L12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
      <path d="M22 10v6" />
    </svg>
  ),
  projects: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  ),
  more: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
      <circle cx="5" cy="12" r="1.5" />
    </svg>
  ),
  work: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      <line x1="2" y1="13" x2="22" y2="13" />
    </svg>
  ),
  organization: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  resume: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
};

/* Map section titles to icon keys */
const iconMap = {
  Home: 'home',
  About: 'about',
  'Skills & Certifications': 'achievements',
  'Achievements & Certifications': 'achievements',
  Education: 'education',
  Projects: 'projects',
  'Work Experience': 'work',
  'Organizational Experience': 'organization',
  Resume: 'resume',
};

/* ───────── Animations ───────── */
const slideUp = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

/* ───────── Styled Components ───────── */
const BottomNavWrapper = styled.nav`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    bottom: 12px;
    left: 12px;
    right: 12px;
    z-index: 1050;
    height: 64px;
    background: ${(props) => (isDark(props.theme) ? 'rgba(22, 22, 30, 0.92)' : 'rgba(255, 255, 255, 0.95)')};
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid ${(props) => (isDark(props.theme) ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)')};
    border-radius: 20px;
    padding: 0 4px;
    justify-content: space-around;
    align-items: center;
    box-shadow: ${(props) => (isDark(props.theme)
    ? '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.03) inset'
    : '0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255,255,255,0.8) inset')};
  }
`;

const NavItemLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 6px 0;
  position: relative;
  min-width: 56px;
  height: 56px;
  -webkit-tap-highlight-color: transparent;
  color: ${(props) => (isDark(props.theme) ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.35)')};
  transition: color 0.3s ease;

  &:hover,
  &:focus {
    text-decoration: none;
    color: ${(props) => (isDark(props.theme) ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)')};
  }

  &.active-nav {
    color: ${(props) => props.theme.accentColor};
  }

  &.active-nav .icon-circle {
    transform: scale(1);
    opacity: 1;
  }

  &.active-nav .nav-icon-wrap {
    transform: translateY(-2px);
  }

  &.active-nav .nav-label-text {
    opacity: 1;
    transform: translateY(0);
    color: ${(props) => props.theme.accentColor};
  }
`;

const MoreBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 6px 0;
  position: relative;
  min-width: 56px;
  height: 56px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  color: ${(props) => (isDark(props.theme) ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.35)')};
  transition: color 0.25s ease;

  &:hover {
    color: ${(props) => (isDark(props.theme) ? 'rgba(255, 255, 255, 0.55)' : 'rgba(0, 0, 0, 0.55)')};
  }

  &:active .nav-icon-wrap {
    transform: scale(0.92);
  }
`;

const IconWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 32px;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const IconCircle = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: ${(props) => {
    const c = props.theme.accentColor;
    return isDark(props.theme) ? `${c}25` : `${c}18`;
  }};
  transform: scale(0);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const LabelText = styled.span`
  font-size: 10px;
  font-weight: 600;
  margin-top: 2px;
  letter-spacing: 0.01em;
  opacity: 0;
  transform: translateY(4px);
  transition: all 0.25s ease;
  white-space: nowrap;
`;

/* ───────── "More" Overlay ───────── */
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1060;
  background: rgba(0, 0, 0, 0.45);
  animation: ${fadeIn} 0.2s ease;
  backdrop-filter: blur(2px);
`;

const MoreSheet = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1070;
  background: ${(props) => (isDark(props.theme) ? 'rgba(22, 22, 30, 0.98)' : 'rgba(255, 255, 255, 0.98)')};
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: 24px 24px 0 0;
  padding: 8px 16px calc(env(safe-area-inset-bottom, 12px) + 20px);
  animation: ${slideUp} 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 -12px 48px rgba(0, 0, 0, 0.25);
`;

const SheetHandle = styled.div`
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background: ${(props) => (isDark(props.theme) ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)')};
  margin: 4px auto 20px;
`;

const SheetItemBase = `
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.2s ease;
`;

const SheetNavLink = styled(NavLink)`
  ${SheetItemBase}
  color: ${(props) => props.theme.color};

  &:hover {
    background: ${(props) => (isDark(props.theme) ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)')};
    text-decoration: none;
    color: ${(props) => props.theme.color};
  }

  &.active-nav {
    background: ${(props) => (isDark(props.theme) ? `${props.theme.accentColor}15` : `${props.theme.accentColor}12`)};
    color: ${(props) => props.theme.accentColor};
  }

  &.active-nav .sheet-icon-box {
    background: ${(props) => (isDark(props.theme) ? `${props.theme.accentColor}30` : `${props.theme.accentColor}22`)};
    color: ${(props) => props.theme.accentColor};
  }
`;

const SheetExtLink = styled.a`
  ${SheetItemBase}
  color: ${(props) => props.theme.color};

  &:hover {
    background: ${(props) => (isDark(props.theme) ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)')};
    text-decoration: none;
    color: ${(props) => props.theme.color};
  }
`;

const SheetIconBox = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: ${(props) => (isDark(props.theme) ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)')};
  color: ${(props) => (isDark(props.theme) ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)')};
  transition: all 0.2s ease;
  flex-shrink: 0;
`;

const SheetLabel = styled.span`
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.01em;
`;

const ThemeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  margin-top: 8px;
  border-top: 1px solid ${(props) => (isDark(props.theme) ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)')};
`;

const ThemeLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => (isDark(props.theme) ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.4)')};
`;

/* ───────── Render helpers ───────── */
function getIcon(title) {
  const key = iconMap[title];
  return icons[key] || icons.home;
}

function getShortLabel(title) {
  if (title === 'Achievements & Certifications') return 'Awards';
  if (title.length > 9) return title.split(' ')[0];
  return title;
}

function renderSheetItem(section, theme, onClose) {
  if (section.type === 'link') {
    return (
      <SheetExtLink
        key={section.title}
        href={section.href}
        target="_blank"
        rel="noopener noreferrer"
        theme={theme}
      >
        <SheetIconBox className="sheet-icon-box" theme={theme}>{getIcon(section.title)}</SheetIconBox>
        <SheetLabel>{section.title}</SheetLabel>
      </SheetExtLink>
    );
  }
  return (
    <SheetNavLink
      key={section.title}
      to={section.href}
      activeClassName="active-nav"
      theme={theme}
      onClick={onClose}
    >
      <SheetIconBox className="sheet-icon-box" theme={theme}>{getIcon(section.title)}</SheetIconBox>
      <SheetLabel>{section.title}</SheetLabel>
    </SheetNavLink>
  );
}

/* ───────── Component ───────── */
function BottomNav() {
  const theme = useContext(ThemeContext);
  const location = useLocation();
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(endpoints.navbar, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  useEffect(() => {
    setShowMore(false);
  }, [location.pathname]);

  if (!data) return null;

  const primaryItems = data.sections.filter((s) => s.bottomNav);
  const moreItems = data.sections.filter((s) => !s.bottomNav);
  const closeMore = () => setShowMore(false);

  return (
    <>
      <BottomNavWrapper theme={theme} id="bottom-nav">
        {primaryItems.map((section) => (
          <NavItemLink
            key={section.title}
            to={section.href}
            exact={section.href === '/'}
            activeClassName="active-nav"
            theme={theme}
          >
            <IconWrap className="nav-icon-wrap">
              <IconCircle className="icon-circle" theme={theme} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                {getIcon(section.title)}
              </div>
            </IconWrap>
            <LabelText className="nav-label-text">
              {getShortLabel(section.title)}
            </LabelText>
          </NavItemLink>
        ))}

        <MoreBtn
          onClick={() => setShowMore(true)}
          aria-label="More menu"
          theme={theme}
          type="button"
        >
          <IconWrap className="nav-icon-wrap">
            <div style={{ position: 'relative', zIndex: 1 }}>
              {icons.more}
            </div>
          </IconWrap>
          <LabelText className="nav-label-text" style={{ opacity: 0 }}>
            More
          </LabelText>
        </MoreBtn>
      </BottomNavWrapper>

      {showMore && (
        <>
          <Backdrop onClick={closeMore} />
          <MoreSheet theme={theme}>
            <SheetHandle theme={theme} />
            {moreItems.map((section) => renderSheetItem(section, theme, closeMore))}
            <ThemeRow theme={theme}>
              <ThemeLabel theme={theme}>Theme</ThemeLabel>
              <ThemeToggler onClick={() => { }} />
            </ThemeRow>
          </MoreSheet>
        </>
      )}
    </>
  );
}

export default BottomNav;
