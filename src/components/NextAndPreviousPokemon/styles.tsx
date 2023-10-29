import styled from "styled-components";

export interface ArrowIconProps {
  $icon: string;
}

export const Content = styled.div`
  height: 41px;
  display: flex;
  align-items: center;
  gap: 5px;

  border-radius: 16px;
  background: #ececec;
`;

export const ArrowIcon = styled.div<ArrowIconProps>`
  width: 15px;
  height: 15px;
  background-image: ${(props) => `url("/icon/${props.$icon}.svg")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
