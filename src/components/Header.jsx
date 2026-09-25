import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';

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

const HeaderTitle = styled.h1`
  font-size: clamp(2.2rem, 5vw, 3.1rem);
  font-weight: 800;
  margin: 0 0 12px;
  letter-spacing: -0.025em;
  line-height: 1.15;
  color: ${(props) => props.theme.color};
  text-align: center;
`;

function Header(props) {
  const { title } = props;
  const theme = useContext(ThemeContext);

  return (
    <HeaderWrap>
      <HeaderTitle theme={theme}>
        {title}
      </HeaderTitle>
    </HeaderWrap>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {};

export default Header;
