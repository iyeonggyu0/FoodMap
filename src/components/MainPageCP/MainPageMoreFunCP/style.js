import styled from "styled-components";

export const MainPageMoreFunCPMainStyle = styled.section`
  width: 65vw;
  max-width: 1240px;
  margin: 6vh auto;
  padding: 4rem 6rem;
  background-color: var(--gray-0);
  border-radius: 1rem;
  box-shadow: 0px 0px 14.7px rgba(0, 0, 0, 0.05);
  flex-wrap: wrap;
  position: relative;

  & > div {
    height: 100%;

    flex: 0.3;
    text-align: center;

    gap: 1rem 0;
  }

  & > div > div {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    background-color: var(--brown-light);
    margin: 0 auto;
  }

  & > div > p:nth-child(2) {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: -5px;
  }

  & > div > p:nth-child(3) {
    font-size: 14px;
    color: var(--gray-5);
    line-height: 1.5;
  }

  & .icon {
    font-size: 1.8rem;
    color: var(--gray-0);
  }

  @media screen and (max-width: 768px) {
    width: 90vw;
    padding: 4rem 0;
    gap: 5rem 0;
    flex-direction: column;
    & > div {
      flex: 1;
      width: 100%;
      text-align: center;
    }
  }
`;
