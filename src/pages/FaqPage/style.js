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
`;

export const Section = styled.section`
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
  padding: 1rem;
  background-color: var(--gray-0);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    text-align: center;
  }

  & > p {
    font-size: 1rem;
    color: var(--gray-5);
  }
`;

