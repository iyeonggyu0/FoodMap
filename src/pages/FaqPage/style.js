import styled from "styled-components";

export const FaqPageMainStyle = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 2rem;
  gap: 2rem;
  background-color: var(--main-page-bg);

  & > section:nth-child(1) {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    background: none;
    box-shadow: none;
  }

  & > section > h1 {
    font-size: 2.2rem;
    font-weight: 600;
  }

  & > section > p {
    color: var(--gray-5);
  }
`;

export const QNASection = styled.section`
  width: 100%;
  height: fit-content;
  max-width: 1440px;
  padding: 1rem;
  background-color: var(--gray-0);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  & > p {
    font-size: 1rem;
    color: var(--gray-5);
  }

  h2 {
    padding: 1rem;
    font-size: 2rem;
    font-weight: 600;
    color: var(--brown);
  }

  .icon {
    width: 2rem;
    height: 2rem;
    color: var(--brown);
    padding-left: 0.5rem;
  }

  .titleWrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const ContactSection = styled.section`
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 0 auto;  

  & > section {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    flex: 1;
    min-width: 300px;
    background-color: var(--gray-0);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  & > section:nth-child(1) > div > div {
    display: flex;
    justify-content: flex-start;
    gap: 0.3rem;
  }
  
  .icon {
    width: 2rem;
    height: 2rem;
    color: var(--brown);
    padding-right: 0.5rem;
  }

  & > section > div > div > h2 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--brown);
  }

  & > section > div > p {
    margin: 1rem 0;
    font-size: 1rem;
    color: var(--gray-6);
  }
  
  & > section > form textarea{
    font-size: 1rem;
    padding: 1rem;
  }

  & > section > form select {
    font-size: 1rem;
    padding: 1rem;
  }

  & > section > span {
    padding: 1rem;
    transition: .3s ease;
  }

  & > section > span:hover {
    background-color: var(--brown);
    transition: .3s ease;
  }


  /* 고객 지원 센터 */
  & > section > div > h2 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--brown);
  }
  
  & > section:nth-child(2) > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  & > section:nth-child(2) > div:nth-child(1) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }

  & > section:nth-child(2) > div > div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  & > section:nth-child(2) > div > div > h3 {
    font-size: 1.3rem;
    font-weight: 500;
  }

  & > section:nth-child(2) > div > div > p {
    color: var(--gray-6);
    font-weight: 400;
  }

  & > section:nth-child(2) > div > div > p:nth-child(3) {
    color: var(--gray-4);
  }


  /* 자주 이용하는 기능 섹션 */
  & > section > section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  & > section > section > h2 {
    font-size: 1.3rem;
    font-weight: 500;
    padding-top: 1rem;
    border-top: 1px solid var(--gray-3);
  }

  & > section > section > span {
    border: 1px solid var(--gray-3);
    justify-content: left;
    transition: 0.3s ease;
  }

  & > section > section > span:hover {
    background: var(--gray-1);
    transition: 0.3s ease; 
  }
`;


