import styled from "styled-components";

export const MainPageMethodCPMainStyle = styled.section`
  /* 전체 푸터 */
  width: 100%;
  margin: 6vh 0;

  & > div:nth-child(1) {
    text-align: center;
    margin-bottom: 2rem;
  }
  & > div:nth-child(1) > h2 {
    font-size: 2rem;
    font-weight: 700;
  }

  & > div:nth-child(1) > p {
    font-size: 1.1rem;
    color: var(--gray-6);
    padding: 1rem 0rem;
  }

  & > div:nth-child(2) {
    width: 75vw;
    max-width: 1440px;
    margin: 0 auto;

    position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  @media screen and (max-width: 768px) {
    width: 90vw;
    margin: 6vh auto;

    & > div:nth-child(2) {
      width: 100%;
      gap: 2rem;
    }
  }
`;

export const MainPageMethodCPStyle = styled.section`
  padding: 3rem;
  width: 48%;
  border-radius: 1rem;
  background-color: var(--gray-0);
  box-shadow: 0px 0px 14.7px rgba(0, 0, 0, 0.05);

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 3rem 2.5rem;
  }

  & > div:first-child {
    width: 100%;
    text-align: center;
  }

  & > div:first-child > h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(${({ color }) => `${color}` || "--brown-light"});
  }

  & > div:first-child > p {
    color: var(--gray-5);
  }

  /* List */
  & > div:nth-child(2) {
    gap: 2rem 0;
    margin: 3rem 0 5rem;
  }

  & > div:nth-child(2) > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0 1.6rem;
  }

  & > div:nth-child(2) > div > div:first-child {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: var(${({ color }) => `${color}` || "--brown-light"});
    color: var(--gray-0);
    font-weight: 700;
    padding-bottom: 0.1rem;
  }

  & > div:nth-child(2) > div > div:nth-child(2) {
    width: calc(100% - 2.5rem - 1.6rem);
  }

  & > div:nth-child(2) > div > div:nth-child(2) > p:nth-child(1) {
    font-size: 1.2rem;
    padding-bottom: 0.5rem;
    font-weight: 700;
  }

  & > div:nth-child(2) > div > div:nth-child(2) > p:nth-child(2) {
    color: var(--gray-5);
    font-size: 1rem;
  }

  & .icon {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    background-color: var(${({ color }) => `${color}` || "--brown-light"});
    margin: 0 auto 1rem;
    font-size: 1.8rem;
    color: var(--gray-0);
  }

  & > div:nth-child(3) {
    width: 100%;
    gap: 0.5rem;
    background-color: var(${({ color }) => `${color}` || "--brown-light"});
    padding: 1rem;
    border-radius: 0.5rem;
    color: var(--gray-0);
  }
`;
