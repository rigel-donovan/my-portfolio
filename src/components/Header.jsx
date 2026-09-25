import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';

const isDark = (theme) => theme.bsPrimaryVariant === 'dark';

const defaultMeta = {
  About: {
    badge: 'About Me',
    subtitle: 'A glimpse into my background, passions, and journey in technology',
  },
  'Skills & Certifications': {
    badge: 'Expertise & Credentials',
    subtitle: 'Technologies, tools, and verified certifications I have acquired',
  },
  Skills: {
    badge: 'Expertise & Credentials',
    subtitle: 'Technologies, tools, and verified certifications I have acquired',
  },
  Education: {
    badge: 'Academic Journey',
    subtitle: 'My educational background, qualifications, and academic milestones',
  },
  'Work Experience': {
    badge: 'Career History',
    subtitle: 'Professional work experience, internships, and key achievements',
  },
  Experience: {
    badge: 'Career History',
    subtitle: 'Professional work experience, internships, and key achievements',
  },
  'Organizational Experience': {
    badge: 'Leadership & Community',
    subtitle: 'Student organizations, committee leadership, and community roles',
  },
  Organization: {
    badge: 'Leadership & Community',
    subtitle: 'Student organizations, committee leadership, and community roles',
  },
  Projects: {
    badge: 'Portfolio Showcase',
    subtitle: 'Explore my featured web applications, mobile apps, and software projects',
  },
};

const HeaderWrap = styled.div`
  text-align: center;
  margin-top: 32px;
  margin-bottom: 38px;
  padding: 0 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-top: 20px;
    margin-bottom: 26px;
    padding: 0 16px;
  }
`;

const HeaderBadge = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  border: 1.5px solid ${(props) => `${props.theme.accentColor}55`};
  border-radius: 99px;
  padding: 5px 18px;
  margin-bottom: 14px;
  background: ${(props) => (isDark(props.theme)
    ? `${props.theme.accentColor}18`
    : `${props.theme.accentColor}10`)};
  color: ${(props) => props.theme.accentColor};
  box-shadow: 0 2px 10px ${(props) => (isDark(props.theme)
    ? 'rgba(0, 0, 0, 0.25)'
    : `${props.theme.accentColor}20`)};
`;

const HeaderTitle = styled.h1`
  font-size: clamp(2.2rem, 5vw, 3.1rem);
  font-weight: 800;
  margin: 0 0 12px;
  letter-spacing: -0.025em;
  line-height: 1.15;
  color: ${(props) => props.theme.color};
  text-align: center;
`;

const HeaderSubtitle = styled.p`
  font-size: 1.05rem;
  font-weight: 400;
  margin: 0 auto;
  max-width: 620px;
  line-height: 1.6;
  color: ${(props) => (isDark(props.theme)
    ? 'rgba(255, 255, 255, 0.65)'
    : 'rgba(30, 41, 59, 0.7)')};
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding: 0 8px;
  }
`;

function Header(props) {
  const { title, badge, subtitle } = props;
  const theme = useContext(ThemeContext);

  const meta = defaultMeta[title] || {};
  const displayBadge = badge || meta.badge;
  const displaySubtitle = subtitle || meta.subtitle;

  return (
    <HeaderWrap>
      {displayBadge && (
        <HeaderBadge theme={theme}>
          {displayBadge}
        </HeaderBadge>
      )}
      <HeaderTitle theme={theme}>
        {title}
      </HeaderTitle>
      {displaySubtitle && (
        <HeaderSubtitle theme={theme}>
          {displaySubtitle}
        </HeaderSubtitle>
      )}
    </HeaderWrap>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  badge: PropTypes.string,
  subtitle: PropTypes.string,
};

Header.defaultProps = {
  badge: null,
  subtitle: null,
};

export default Header;
