import styled from "styled-components";

export interface ArrowIconProps {
  $isRight: boolean;
}

export const Content = styled.div`
  width: 327px;
  height: 41px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  align-self: center;
  gap: 5px;

  margin-top: 8px;

  border-radius: 16px;
  background: #ececec;
`;

export const ButtonDiv = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;

  border: none;
`;

export const ArrowIcon = styled.div<ArrowIconProps>`
  width: 15px;
  height: 15px;
  background-image: url("/icon/CaretLeft.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transform: ${(props) => (props.$isRight ? "rotateY(180deg)" : "none")};
`;

export const Divider = styled.div`
  width: 1px;
  height: 29px;

  background: #848080;
`;
