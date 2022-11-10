import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import Container from "./Container";
import CardGrid from "../components/home/tarjetas/CardGrid";
import content from "./content";

const StyledPage = styled(animated.main)`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 16px 0 0 16px;
  background: #fff;
  height: 100%;
  width: calc(100% - 56px);
  overflow: hidden;
  /* safari overflow fix */
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);

  .page__scrollable-content {
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 24px;
    overflow: auto;

    @supports (overflow: overlay) {
      overflow: overlay;
    }
  }

  .page__body {
    position: relative;
    width: 100%;
    min-height: calc(100% - 80px);
  }

  .section__header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
`;

// const ease = BezierEasing(0.2, 0, 0.38, 0.9);

const Page = ({ openDrawer }) => {
  const openDrawerProps = useSpring({
    // config: { duration: 250, easing: ease },
    width: openDrawer ? "calc(100% - 382px)" : "calc(100% - 56px)"
  });

  const [hiddenHeader, setHiddenHeader] = useState(false);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;

    if ((scrollTop > 30 && !hiddenHeader) || (scrollTop < 30 && hiddenHeader)) {
      setHiddenHeader(!hiddenHeader);
    }
  };

  return (
    <StyledPage style={{ ...openDrawerProps }} className="page">
      <div
        className="page__scrollable-content"
        onScroll={(e) => handleScroll(e)}
      >
        <div className="page__body">
          <Container className="body__container">
            <section className="padding-h40">
              <CardGrid
                cards={[...content.cards1]}
                easeSpeed={0.15}
                easeFunction={content.ease}
                avatar={content.avatar}
              />
            </section>
          </Container>
        </div>
      </div>
    </StyledPage>
  );
};

export default Page;