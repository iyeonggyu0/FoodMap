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
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    background: var(--brown-dark);
  }

  @media screen and (max-width: 768px) {
    padding: 1.5rem 0;
  }
`;

export const ReportPageMenuStyle = styled.div`
  width: 100%;
  & > h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
    margin-top: 1rem;
  }
  & > h2 + div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  & .col > div {
    width: 49%;
  }

  @media screen and (max-width: 768px) {
    & .col > div {
      width: 100% !important;
      margin-bottom: 1.6rem;
    }

    & > h2 + div {
      flex-direction: column;
      align-items: flex-start;
    }

    & .menu-list > p + div {
      height: 200px !important;
    }
  }

  & .col > div > p {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1.2rem;
  }

  & span.essential {
    color: orange;
    padding-left: 0.2rem;
  }

  & .menu-add > div > * {
    margin-bottom: 1rem;
  }

  & .menu-list > p + div {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 430px;
    overflow-y: auto;
    border: 1px solid var(--gray-4);
    border-radius: 0.5rem;
    background-color: var(--gray-0);
  }

  /* 메뉴 아이템 */
  & .menu-item {
    padding: 1rem 2rem;
    border-bottom: 1px solid var(--gray-2);
  }

  & .menu-item > div > p {
    gap: 0.6rem;
  }

  & .menu-item .icon > * {
    cursor: pointer;
    font-size: 1.2rem;
    color: var(--gray-4);
    transition: all 0.2s ease-in-out;
  }

  & .menu-item .icon > *:hover {
    color: var(--brown-light);
  }

  & .menu-item .menu-item-info {
    font-size: 0.9rem;
    color: var(--gray-4);
    margin-top: 0.5rem;
  }
`;
