import styled from "styled-components";

export const MyPageMainStyle = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  overflow: hidden;
  position: relative;

  .margin {
    margin: 1rem 0;
  }

  .menuBars {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 1.6rem;
    z-index: 999;
    padding: 1rem;
    background-color: var(--gray-0);
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }

  .menuXmark {
    top: 1rem;
    right: 1rem;
    z-index: 999;
  }

  /* menu */
  & > section.menu {
    background-color: var(--gray-0);
    position: absolute;
    left: ${(props) => (props.isPc ? "0" : props.onMenu ? "0" : "-460px")};
    z-index: 998;
    width: ${(props) => (props.isPc ? "min(20vw, 460px)" : "100vw")};
    height: 100vh;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    padding: 4rem 3rem;
    transition: all 0.3s ease-in-out;
    justify-content: ${(props) => (props.isPc ? "start" : "center")};
    align-items: ${(props) => (props.isPc ? "left" : "center")};
    font-size: ${(props) => (props.isPc ? "1rem" : "2rem")};

    & .image {
      width: ${(props) => (props.isPc ? "calc(min(20vw, 460px) - 6rem)" : "70vw")};
      height: ${(props) => (props.isPc ? "calc(min(20vw, 460px) - 6rem)" : "70vw")};
      color: var(--brown-dark);
      font-size: 7rem;
    }

    /* 이미지 */
    & .ftIcon {
      width: calc(min(20vw, 460px) - 6rem);
      height: calc(min(20vw, 460px) - 6rem);
      background: url("/img/foodTruck.png") no-repeat center center;
      background-size: contain;
    }

    & ul {
      line-height: ${(props) => (props.isPc ? "1.6rem" : "2.4rem")};
      margin-top: 2rem;
    }

    & ul li {
      cursor: pointer;
      width: 100%;
      text-align: ${(props) => (props.isPc ? "left" : "center")};
    }

    & ul li.homeButton {
      margin-top: 2rem;
      color: var(--brown-light);
    }

    & ul li.logoutButton {
      width: ${(props) => (props.isPc ? "50%" : "100%")};
      margin-top: 0.5rem;
      color: var(--red);
      font-weight: 600;
      transition: all 0.2s;

      &:hover {
        color: var(--red-dark);
        border-bottom: 2px solid var(--red-dark); /* 바닥선 추가 */
      }
    }
  }

  & > section.mainSection {
    width: 100vw;
    height: 100vh;
    padding-left: ${(props) => (props.isPc ? "min(20vw, 460px)" : "0")};
    border: 1px solid black;
    position: relative;
    z-index: 996;
  }
`;
