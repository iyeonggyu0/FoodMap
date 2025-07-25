import styled from "styled-components";
// import { theme } from "../../../style/theme";

export const MainLayOutHeaderStyled = styled.header`
  height: 70px;
  border-bottom: 1px solid var(--gray-3);

  & > div {
    width: 75vw;
    height: 100%;
    max-width: 1440px;
    margin: 0 auto;
    align-items: center;
    flex-wrap: wrap;
  }

  & .title-box {
    font-size: 1.6rem;
    font-weight: 700;
  }

  & nav {
    width: 100%;
    max-width: 400px;
    display: flex;
    align-items: center;
  }

  & nav ul {
    font-size: 0.95rem;
    width: 100%;
    max-width: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & nav ul li {
    cursor: pointer;
  }

  /* PC */
  @media screen and (min-width: 1024px) {
    & nav ul li {
      padding: 1rem 0.6rem;
    }
  }

  /* 핸드폰 */
  @media screen and (max-width: 768px) {
    height: unset;
    border-bottom: 1px solid var(--gray-2);

    & > div {
      width: 100%;
    }

    & nav {
      width: 100%;
      max-width: 100%;
      justify-content: space-around;
      border-top: 1px solid var(--gray-3);
    }

    & .title-box {
      margin: 0 auto;
      height: 60px;
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      font-weight: 700;
    }

    & nav ul {
      padding: 0.7rem 2rem;
      font-size: 0.9rem;
    }
  }
`;
