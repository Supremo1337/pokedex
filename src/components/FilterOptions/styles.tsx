import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  /* background: red; */
  gap: 16px;
  overflow-x: scroll;
  height: 80px;
  padding-right: 1px;
  @media (min-width: 573px) {
    overflow-x: hidden;
  }
`;
