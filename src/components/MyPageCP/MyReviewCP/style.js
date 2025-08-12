import styled from "styled-components";

export const MyReviewCPMainStyle = styled.section`
  width: 100%;
  height: 100%;
  padding: ${(props) => (props.isPc ? "4rem 8rem" : "6rem 2rem")};
  overflow-y: scroll;
  z-index: 996;

  & > h2 {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }
`;
