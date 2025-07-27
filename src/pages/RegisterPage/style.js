import styled from "styled-components";

export const RegisterPageMainStyle = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 3rem 0;
  background-color: var(--main-page-bg);

  & > section {
    width: 60vw;
    max-width: 1440px;
    margin: 0 auto;
    padding: 3rem 3rem;
    background-color: var(--gray-0);
    border-radius: 1rem;
    border: 1px solid var(--gray-4);
  }

  /* 텍스트 박스 */
  & > section > div {
    margin-bottom: 2rem;
  }

  & > section > div > h1 {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  & > section h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  /* 에러 */
  & span.error {
    color: red;
    font-size: 0.8rem;
    visibility: hidden;
  }

  /* 인풋 col */
  & > section > div:nth-child(2) > .col {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin: 0.7rem 0;
  }

  & > section > div:nth-child(2) > .col > div {
    width: 49%;
  }

  & > section > div:nth-child(2) > .col > div > span {
    font-size: 0.8rem;
  }

  & > section > div:nth-child(2) > .col-full {
    width: 100%;
    margin: 1rem 0;
  }

  @media screen and (max-width: 768px) {
    & > section {
      width: 90vw;
      padding: 3rem 2rem;
    }

    & > section > div > h1 {
      font-size: 1.9rem;
    }
    & > section > div > h1 + p {
      font-size: 0.9rem;
    }

    /* 인풋 col */
    & > section > div:nth-child(2) > .col {
      display: block;
    }

    & > section > div:nth-child(2) > .col > div {
      width: 100% !important;
      margin-bottom: 1.6rem;
    }
  }
`;
