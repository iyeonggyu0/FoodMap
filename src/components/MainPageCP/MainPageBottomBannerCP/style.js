import styled from "styled-components";

export const MainPageBottomBannerCPMainStyle = styled.section`
  height: 264px;
  width: 100%;
  background-color: var(--brown-light);
  color: var(--gray-0);

  & > div {
    width: 340px;
    height: 150px;
    /* border: 1px solid black; */
    text-align: center;
  }

  & > div > div {
    justify-content: center;
    gap: 0 1rem;
  }

  & > div > h2 {
    font-size: 1.5rem;
    font-weight: 700;
  }

  & > div > p {
    font-size: 1rem;
  }
`;
