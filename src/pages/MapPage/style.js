import styled from "styled-components";

export const MapPageMainStyle = styled.main`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;

  & > #map {
    width: 100vw;
    height: 100vh;
  }

  & > #map > div:nth-child(3) > div:nth-child(1) {
    top: 1rem !important;
    left: calc(100vw - 8rem) !important;
  }

  & > #map > div:nth-child(3) > div:nth-child(2) {
    top: 4rem !important;
    left: calc(100vw - 3.2rem) !important;
  }
`;
