import { FC, memo } from "react";
import { ButtonWrapper, Container, Button } from "./ButtonGroups.styles";
import { capitalizeFirstLetter } from "../../helpers";
import { CanvasSize, Size } from "../../types";

interface ButtonProps {
  changeSize: (p: CanvasSize) => void;
  currentSize: CanvasSize;
}

const Buttons: FC<ButtonProps> = ({ changeSize, currentSize }) => {
  return (
    <Container>
      <ButtonWrapper>
        <Button
          onClick={() => changeSize(Size.Small)}
          isActive={Size.Small === currentSize}
        >
          {capitalizeFirstLetter(Size.Small)}
        </Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button
          onClick={() => changeSize(Size.Medium)}
          isActive={Size.Medium === currentSize}
        >
          {capitalizeFirstLetter(Size.Medium)}
        </Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button
          onClick={() => changeSize(Size.Large)}
          isActive={Size.Large === currentSize}
        >
          {capitalizeFirstLetter(Size.Large)}
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

export const ButtonsGroup = memo(Buttons);
