import styled from "styled-components";

export const MainPageFeatureCPMainStyle = styled.section`
  width: 100%;
  height: auto;
  padding: 3rem 0;
  background-color: var(--gray-0);
  display: flex;
  justify-content: center;
  align-items: center;
  

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    gap: 3rem 0;
  }

  & > div > div { /* card section container */
    height: auto;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  & > div > div > div { /* card container */
    border-radius: 8px;
    border: 1px solid var(--gray-2);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem; 
    gap: 1rem;
  }

  & > div > div > div p:nth-child(2) {
    font-size: 1.5rem;
    font-weight: 550;
    color: var(--brown);
  }

  & > div > div > div p:nth-child(3) {
    font-size: 1rem;
    font-weight: 400;
    color: var(--gray-4);
  }


  & > div > p {
    font-size: 2rem;
    font-weight: 600;
  }

  & .icon {
    width: 3rem;
    height: 3rem;
    font-size: 3rem;
    color: var(--brown-light);
  }

  @media screen and (max-width: 768px) {
    gap: 5rem 0;
    flex-direction: column;
    & > div {
      flex: 1;
      width: 100%;
      text-align: center;
    }
  }
`;
