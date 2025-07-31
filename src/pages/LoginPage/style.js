import styled from "styled-components";

export const LoginPageMainStyle = styled.main`
  width: 100%;
  min-height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--main-page-bg);

  & > section {
    margin-bottom: 2rem;
    width: 400px;
    height: 400px;
    padding: 4rem 3.5rem;
    border-radius: 1rem;
    border: 1px solid var(--brown-light);
    background-color: var(--gray-0);
    gap: 2rem;
  }

  & > section > h2 {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
  }

  & > section > div:last-child {
    width: 100%;
    height: 3.5rem;
  }

  & > section > div:last-child > span {
    height: 100%;
    display: flex;
    border-radius: 0.5rem;
  }
`;
