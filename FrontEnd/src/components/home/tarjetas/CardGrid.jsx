import React from "react";
import styled from "styled-components";
import Card from "./Card";

const StyledCardGrid = styled.div`
  position: relative;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(136px, 1fr));
  margin: 16px 0;
`;

const CardGrid = ({
  wide = false,
  cards,
  easeSpeed,
  easeFunction,
  avatar,
  ...props
}) => {
  const gridClasses = wide ? "grid grid--wide" : "grid";

  return (
    <StyledCardGrid className={gridClasses} {...props}>
      {cards.map((card, index) => (
        <Card
          key={index}
          wide={wide}
          {...card}
          easeSpeed={easeSpeed}
          easeFunction={easeFunction}
        />
      ))}
    </StyledCardGrid>
  );
};

export default CardGrid;
