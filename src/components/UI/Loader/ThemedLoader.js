import styled, { keyframes, css } from "styled-components";

const rotateAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
  `;

const dashAnimation = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
  `;

const wrapperStyle = css`
  position: relative;
  margin: 0 auto;
  width: 32px;
  height: 32px;
`;

const svgStyle = css`
  animation: ${rotateAnimation} 2s linear infinite;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
`;

const circleStyle = css`
  animation: ${dashAnimation} 1.5s ease-in-out infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  stroke-width: 3;
  fill: none;
  stroke-miterlimit: 10;
  cx: 50;
  cy: 50;
  r: 20;
  stroke: ${props => props.theme.colors.blue.haptik};
`;

const ThemedLoaderWrapper = styled.div`
  ${wrapperStyle}
`;
const ThemedSvg = styled.svg`
  ${svgStyle}
`;
const ThemedCircle = styled.circle`
  ${circleStyle}
`;
ThemedSvg.defaultProps = {
  viewBox: "25 25 50 50",
};

/* 
Note: Interpolating a keyframe declaration into an untagged string is not longer supported in v4
as keyframes are now injected on-demand.
 */

export { ThemedLoaderWrapper, ThemedSvg, ThemedCircle };
