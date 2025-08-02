import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const PcCpMainStyled = styled.section`
  width: 0vw;
  height: 100vh;
  position: absolute;
  z-index: 999;

  & > div.gps {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: var(--gray-0);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    color: var(--brown-dark);
    transition: all 0.15s ease-in-out;
    cursor: pointer;

    position: absolute;
    bottom: 1rem;
    left: calc(100vw - 45px - 1rem);
  }

  & > div.gps:hover {
    background-color: var(--brown-light);
    color: var(--gray-0);
  }
`;

const PcCP = ({ currentLocationButton }) => {
  return (
    <PcCpMainStyled>
      {/* GPS */}
      <div className="gps flexCenter" onClick={currentLocationButton}>
        <FontAwesomeIcon icon={faLocationCrosshairs} />
      </div>
    </PcCpMainStyled>
  );
};
export default PcCP;
