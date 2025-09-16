import styled from "styled-components";

export const ReportPageMainStyle = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
  background: var(--main-page-bg);

  & .cards {
    border: 1px solid var(--brown-dark);
    border-radius: 8px;
    overflow: hidden;
    /* Tailwind CSS의 shadow-lg */
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1);
    background: var(--gray-0);
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

export const ButtonStyle = styled.div`
  display: flex;
  gap: 20px;
  & > span {
    flex: 1;
    padding: 1rem;
  }
  & > span:nth-child(1) {
  }
`;
