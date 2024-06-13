// StyledBackground.js
import styled from 'styled-components';
import VantaBackground from './VantaBackground';

const StyledDiv = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;

  &::after {
    content: "";
    position: fixed;
    inset: 0;
    background-color: #ffffff9a;
    z-index: 1;
  }
`;

const StyledBackground = () => (
  <StyledDiv>
    <VantaBackground />
  </StyledDiv>
);

export default StyledBackground;
