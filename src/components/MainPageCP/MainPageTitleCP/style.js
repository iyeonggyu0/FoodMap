import styled from "styled-components";

export const MainPageTitleCPMainStyle = styled.main`
  width: 75vw;
  max-width: 1440px;
  margin: 6vh auto;
  padding: 4rem 6rem;
  border-radius: 1rem;
  flex-wrap: wrap;
  position: relative;
  display: flex;
  justify-content: center;
  

  & > div > p:nth-child(1) {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.2;
    text-align: center;
    line-height: 50px;
  }

  & > div > p:nth-child(2) {
    font-size: 1.3rem;
    font-weight: 300;
    color: var(--gray-5);
    text-align: center;
    line-height: 29px;
    margin: 1.3rem 0;
  }

  & > div > p > span.highlight {
    color: var(--brown-light);
  }
  
  & > div > div {
    gap: 1rem;
    font-size: 1rem;
  }

  & > div > div > span:nth-child(1) {
    width: 160px;
    transition: .3s;
  }
    
  
  & > div > div > span:nth-child(1):hover {
    background-color: var(--brown);
    cursor: pointer;
    transition: .3s;
  }
    
  & > div > div > span:nth-child(2) {
    width: 200px;
    transition: .3s;
  } 

  & > div > div > span:nth-child(2):hover {
    background-color: var(--gray-3);
    cursor: pointer;
    transition: .3s;
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
    
    & > div > p:nth-child(1) {
      font-size: 2.5rem;
    }

    & > div > p:nth-child(2) {
      font-size: 1.2rem;
    }
  }
`;
