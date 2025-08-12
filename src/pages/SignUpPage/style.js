import styled from "styled-components";

// =========================
// 메인 컨테이너 및 전체 레이아웃
// =========================
export const SignUpPageMainStyle = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 3rem 0 10rem;
  background-color: var(--main-page-bg);

  // =========================
  // section(폼 전체) 및 내부 구조
  // =========================
  & > section {
    width: 400px;
    margin: 0 auto;
    padding: 3rem 3rem;
    border: 1px solid var(--brown-light);
    border-radius: 1rem;
    background-color: var(--gray-0);
    gap: 3rem;
  }

  & > section > h2 {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
  }

  & > section > div:nth-child(2) {
    gap: 2rem;
  }

  & .error {
    font-size: 0.8rem;
    color: red;
  }

  & > section > div > div:last-child {
    width: 100%;
    height: 3.5rem;
    display: flex;
  }

  & > section > div > div:last-child > span {
    height: 100%;
    width: 100%;
  }
`;
