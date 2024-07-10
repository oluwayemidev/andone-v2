// StyledBackground.js
import styled from "styled-components";
import VantaBackground from "./VantaBackground";
import blurbg from "../images/blurbg.png";

const StyledDiv = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;

  &::after {
    content: "";
    position: fixed;
    inset: 0;
    // background-color: #ffffff9a;
    z-index: 1;
  }
`;

const GradientBg = styled.div`
  position: fixed;
  inset: 0;
  background: #0b145d;
  background: -webkit-linear-gradient(
    0deg,
    #0b145d 0%,
    #87ceeb 40%,
    #ffffff 100%
  );
  background: linear-gradient(0deg, #0b145d 0%, #87ceeb 40%, #ffffff 100%);
`;

const BluredBg = styled.div`
  position: fixed;
  inset: 0;
  background-image: ${blurbg};
`;

const StyledBackground = () => (
  <StyledDiv>
    {/* <VantaBackground /> */}
    {/* <GradientBg /> */}
    <div
      style={{
        backgroundImage: `url(${blurbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: "fixed",
        inset: 0,
        filter: 'blur(10px) brightness(150%) opacity(50%)',
      }}
    />
    {/* <BluredBg /> */}
  </StyledDiv>
);

export default StyledBackground;
