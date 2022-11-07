import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { transparentize, darken } from "polished";
import { Type4, Type5 } from "./Typography";
import Loader from "./Loader";
import content from "./content";

const StyledSimpleCard = styled.div`
  position: relative;
  background-color: transparent;
  height: 192px;
  cursor: pointer;
  color: #001738;
  transition: height ${({ easeSpeed }) => easeSpeed}s
    ${({ easeFunction }) => easeFunction}, transform ${({ easeSpeed }) =>
  2 * easeSpeed}s
    ${({ easeFunction }) => easeFunction} 0.5s, opacity ${({ easeSpeed }) =>
  2 * easeSpeed}s
    ${({ easeFunction }) => easeFunction} 0.5s;
  text-align: center;
  opacity: 0;
  transform: translateY(8px);

  &.fade-in {
      transform: translateY(0);
      opacity: 1;
  }

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ cardColor }) => cardColor};
    box-sizing: border-box;
    border-radius: 12px;
    border: 1px solid ${({ borderColor }) => borderColor};
    /* box-shadow: 0 4px 6px -10px ${({ shadowColor }) =>
      transparentize(0.875, darken(0.125, shadowColor))},
      0 2px 12px -14px ${({ shadowColor }) =>
        transparentize(0.625, darken(0.125, shadowColor))}; */
    transition: all ${({ easeSpeed }) => easeSpeed}s
      ${({ easeFunction }) => easeFunction};
  }

  .card__content {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transition: transform ${({ easeSpeed }) => easeSpeed}s
      ${({ easeFunction }) => easeFunction};

    .card__title {
      margin: 0 auto;
      width: 104px;
    }

    p {
      transition: color ${({ easeSpeed }) => easeSpeed}s
        ${({ easeFunction }) => easeFunction};
    }

    &.loading {
      .card__logo-wrapper {
        animation: translate-y ${({ easeSpeed }) => 2 * easeSpeed}s
          ${({ easeFunction }) => easeFunction} forwards;
      }

      .card__logo {
        animation: loading-lg ${({ easeSpeed }) => 2 * easeSpeed}s
          ${({ easeFunction }) => easeFunction} forwards;
      }

      .card__title {
        animation: loading-sm-y ${({ easeSpeed }) => 2 * easeSpeed}s
          ${({ easeFunction }) => easeFunction} forwards;
      }
    }

    @keyframes translate-y {
      to {
        transform: translateY(24px);
      }
    }

    @keyframes loading-lg {
      to {
        opacity: 0;
      }
    }

    @keyframes loading-sm-y {
      to {
        transform: translateY(4px);
        opacity: 0;
      }
    }
  }

  path {
    transition: fill ${({ easeSpeed }) => easeSpeed}s
      ${({ easeFunction }) => easeFunction};
  }

  .card__logo-wrapper {
    position: relative;
    top: 0;
    margin: 24px auto 16px;
    width: 56px;
    height: 56px;
    display: block;

    .card__logo {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: transparent;
      transition: background-color ${({ easeSpeed }) => easeSpeed}s
        ${({ easeFunction }) => easeFunction};
    }

    svg {
      position: relative;
      width: 56px;
      height: 56px;
      margin: auto;
    }

    path {
      transition: fill ${({ easeSpeed }) => easeSpeed}s
        ${({ easeFunction }) => easeFunction};
      fill: ${({ iconColor }) => iconColor};
    }
  }

  .card__counter {
    position: absolute;
    transition: color ${({ easeSpeed }) => easeSpeed}s
        ${({ easeFunction }) => easeFunction};
    color: ${({ iconColor }) => iconColor};
    bottom: 12px;
    width: 100%;
    margin: 0;
    display: block;
  }

  button {
    background: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color ${({ easeSpeed }) => easeSpeed}s
      ${({ easeFunction }) => easeFunction};

    span {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: content-box;
      transition: transform ${({ easeSpeed }) => easeSpeed}s
        ${({ easeFunction }) => easeFunction};
    }

    svg {
      position: relative;
      width: 100%;
      height: 100%;
    }

    &:focus {
      outline: none;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    &:active span {
      transform: scale(0.75);
    }
  }

  .card__favorited {
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px;
    width: 32px;
    height: 32px;

    path {
      transition: fill ${({ easeSpeed }) => easeSpeed}s
        ${({ easeFunction }) => easeFunction};
    }
  }

  .card__options {
    position: absolute;
    bottom: 4px;
    right: 4px;
    padding: 8px;
    width: 32px;
    height: 32px;

    svg {
      transition: opacity ${({ easeSpeed }) => easeSpeed}s
        ${({ easeFunction }) => easeFunction};
    }

    path {
      transition: fill ${({ easeSpeed }) => easeSpeed}s
        ${({ easeFunction }) => easeFunction};
      fill: ${({ iconColor }) => iconColor};
    }
  }

  &:hover {
    &::before {
      transform: scale(1.05, 1.0375);
      border-color: ${({ iconColor }) => iconColor};
      /* box-shadow: 0 4px 6px -2px ${({ shadowColor }) =>
        transparentize(0.875, darken(0.125, shadowColor))},
        0 2px 12px 0
          ${({ shadowColor }) =>
            transparentize(0.625, darken(0.125, shadowColor))}; */
    }

    .avatar--zoom {
      transform: scale(1.25);
    }
  }

  /* card--wide */

  &.card--wide {
    height: 88px;
    grid-column: auto / span 2;
    padding: 16px;
    box-sizing: border-box;

    /* ::before {
      border-color: ${({ cardColor }) => cardColor};
    } */

    &:hover::before {
      border-color: ${({ borderColor }) => borderColor};
      box-shadow: none;
    }

    .card__content {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: nowrap;
      padding: 0;

      &.loading {
        .card__logo-wrapper {
          animation: translate-x ${({ easeSpeed }) => 2 * easeSpeed}s
            ${({ easeFunction }) => easeFunction} forwards;
        }

        .card__title {
          animation: loading-sm-x ${({ easeSpeed }) => 2 * easeSpeed}s
            ${({ easeFunction }) => easeFunction} forwards;
        }
      }

      @keyframes translate-x {
        to {
          transform: translateX(24px);
        }
      }

      @keyframes loading-sm-x {
        to {
          transform: translateX(4px);
          opacity: 0;
        }
      }
    }

    .card__logo-wrapper {
      margin: 0 10px 0 0;

      span div {
        background: ${({ textColor }) => textColor};
      }
    }

    .card__title {
      position: relative;
      width: calc(100% - 66px - 32px);
      height: 32px;
      text-align: left;
      margin: 0;
    }

    .card__counter {
      position: relative;
      bottom: 0;
      color: ${({ subtitle }) => subtitle};
    }
  }

  &:hover {
    &.card--wide::before {
      transform: scale(1.0225, 1.0625);
    }
  }

  &.add-pipe {
    &::before,
    &:hover::before {
      background: transparent;
      box-shadow: none;
    }

    &::before {
      border: none;
      border: 2px dashed transparent;
      transition: border-color ${({ easeSpeed }) => easeSpeed}s
        ${({ easeFunction }) => easeFunction};
    }

    &:hover::before {
      transform: none;
      border-color: ${({ borderColor }) => borderColor};
    }

    .card__content {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .card__logo-wrapper,
    .card__logo,
    .card__logo svg {
      width: 72px;
      height: 72px;
    }

    .card__logo-wrapper {
      margin: 0 0 10px 0;
    }

    .card__counter {
      position: relative;
      bottom: 0;
    }
  }
`;

const StyledCard = styled(StyledSimpleCard)`
  ${({ fixedIcons }) =>
    fixedIcons
      ? `
  .card__content {
    padding: 0 0 32px;
    margin: 0 12px 40px;
    width: 100%;
    height: calc(100% - 48px);
  }
  `
      : `
  .card__content {
    padding: 0 0 32px;
    margin: 0;
    width: 100%;
    height: 100%;
  }
  `}

  &:hover {
    color: #fff;

    &::before {
      background-color: ${({ iconColor }) => iconColor};
    }

    path {
      fill: #fff;
    }

    .card__logo-wrapper span div {
      background: #fff;
    }

    .card__logo path {
      fill: #fff;
    }

    .card__counter {
      color: ${transparentize(0.5, "#fff")};
    }

    .card__favorited path {
      fill: ${({ star }) => (star ? "#fff" : "rgba(0, 0, 0, 0.125)")};
    }

    .card__options svg {
      opacity: 0.5;
    }

    .card__options path {
      fill: #fff;
    }

    .card__options:hover svg {
      opacity: 1;
    }
  }
`;

const Card = ({
  wide = false,
  title,
  logo,
  counter,
  favorited = false,
  cardColor = "#f1f5fb",
  borderColor = "#f1f5fb",
  iconColor = "#b8bbc2",
  shadowColor = iconColor,
  easeSpeed = 0.5,
  easeFunction = "linear",
  simpleCard,
  addPipe = false,
  children
}) => {
  const cardClasses = wide
    ? "card card--wide"
    : addPipe
    ? "card add-pipe"
    : "card";
  const pluralFormat = counter === 1 ? "card" : "cards";
  const [star, toggleStar] = useState(favorited);
  const [loading, setToLoading] = useState(false);

  const handleStar = e => {
    e.stopPropagation();
    toggleStar(!star);
  };

  const handleOptions = e => {
    e.stopPropagation();
  };

  const [cardVisibility, updateCardVisibility] = useState(false);

  useEffect(() => {
    updateCardVisibility(true);
  }, []);

  if (children) {
    return (
      <StyledSimpleCard
        className={`${cardClasses}${cardVisibility ? " fade-in" : ""}`}
        cardColor={cardColor}
        borderColor={borderColor}
        iconColor={iconColor}
        shadowColor={shadowColor}
        easeSpeed={easeSpeed}
        easeFunction={easeFunction}
      >
        <div className={`card__content${loading ? " loading" : ""}`}>
          {children}
        </div>
      </StyledSimpleCard>
    );
  }

  if (simpleCard) {
    return (
      <StyledSimpleCard
        className={`${cardClasses}${cardVisibility ? " fade-in" : ""}`}
        cardColor={cardColor}
        borderColor={borderColor}
        iconColor={iconColor}
        shadowColor={shadowColor}
        easeSpeed={easeSpeed}
        easeFunction={easeFunction}
      >
        <div className={`card__content${loading ? " loading" : ""}`}>
          <div className="card__logo-wrapper">
            <span className="card__logo">{logo}</span>
            {loading && (
              <Loader className="card__loader" size="56px" color={iconColor} />
            )}
          </div>
          <Type4
            className="card__title"
            style={{ width: "104px", margin: "0 auto" }}
          >
            {title}
          </Type4>
        </div>
      </StyledSimpleCard>
    );
  }

  if (wide) {
    return (
      <StyledSimpleCard
        className={`${cardClasses}${cardVisibility ? " fade-in" : ""}`}
        cardColor={content.colors.gray["100"]}
        borderColor={content.colors.gray["200"]}
        iconColor={iconColor}
        shadowColor={content.colors.gray["300"]}
        textColor={content.colors.default.headline}
        star={star}
        easeSpeed={easeSpeed}
        easeFunction={easeFunction}
        subtitle={content.colors.default.subtitle}
        onClick={() => setToLoading(true)}
      >
        <div className={`card__content${loading ? " loading" : ""}`}>
          <div className="card__logo-wrapper">
            <span className="card__logo">{logo}</span>
            {loading && (
              <Loader className="card__loader" size="56px" color={iconColor} />
            )}
          </div>
          <div className="card__title">
            <Type4>{title}</Type4>
            {counter && (
              <Type5 className="card__counter">
                {counter} {pluralFormat}
              </Type5>
            )}
          </div>
        </div>
      </StyledSimpleCard>
    );
  }

  return (
    <StyledCard
      className={`${cardClasses}${cardVisibility ? " fade-in" : ""}`}
      cardColor={cardColor}
      borderColor={borderColor}
      iconColor={iconColor}
      shadowColor={shadowColor}
      star={star}
      easeSpeed={easeSpeed}
      easeFunction={easeFunction}
      onClick={() => setToLoading(true)}
    >
      <div className={`card__content${loading ? " loading" : ""}`}>
        <button className="card__favorited" onClick={handleStar}>
          <span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {star ? (
                <path
                  d="M15.9512 6.12002C15.8332 5.75802 15.5202 5.49402 15.1432 5.43902L11.3472 4.88702C11.0222 4.84002 10.7402 4.63502 10.5942 4.34002L8.89722 0.900023C8.53022 0.157023 7.47022 0.157023 7.10322 0.900023L5.40622 4.34002C5.26022 4.63502 4.97822 4.84002 4.65322 4.88702L0.856217 5.43902C0.479217 5.49402 0.167217 5.75802 0.0492171 6.12002C-0.0687829 6.48202 0.0292171 6.87902 0.302217 7.14502L3.04922 9.82302C3.28522 10.053 3.39222 10.384 3.33722 10.708L2.68922 14.489C2.62522 14.864 2.77922 15.243 3.08722 15.467C3.39622 15.693 3.80422 15.721 4.14022 15.543L7.53622 13.758C7.82722 13.605 8.17522 13.605 8.46722 13.758L11.8622 15.543C12.0082 15.62 12.1692 15.658 12.3282 15.658C12.5352 15.658 12.7412 15.594 12.9162 15.467C13.2242 15.243 13.3782 14.864 13.3132 14.489L12.6652 10.708C12.6092 10.384 12.7172 10.053 12.9532 9.82302L15.7012 7.14502C15.9712 6.87902 16.0682 6.48202 15.9512 6.12002Z"
                  fill="#FFAB00"
                />
              ) : (
                <path
                  d="M15.9512 6.12002C15.8332 5.75802 15.5202 5.49402 15.1432 5.43902L11.3472 4.88702C11.0222 4.84002 10.7402 4.63502 10.5942 4.34002L8.89722 0.900023C8.53022 0.157023 7.47022 0.157023 7.10322 0.900023L5.40622 4.34002C5.26022 4.63502 4.97822 4.84002 4.65322 4.88702L0.856217 5.43902C0.479217 5.49402 0.167217 5.75802 0.0492171 6.12002C-0.0687829 6.48202 0.0292171 6.87902 0.302217 7.14502L3.04922 9.82302C3.28522 10.053 3.39222 10.384 3.33722 10.708L2.68922 14.489C2.62522 14.864 2.77922 15.243 3.08722 15.467C3.39622 15.693 3.80422 15.721 4.14022 15.543L7.53622 13.758C7.82722 13.605 8.17522 13.605 8.46722 13.758L11.8622 15.543C12.0082 15.62 12.1692 15.658 12.3282 15.658C12.5352 15.658 12.7412 15.594 12.9162 15.467C13.2242 15.243 13.3782 14.864 13.3132 14.489L12.6652 10.708C12.6092 10.384 12.7172 10.053 12.9532 9.82302L15.7012 7.14502C15.9712 6.87902 16.0682 6.48202 15.9512 6.12002Z"
                  fill="rgba(0, 0, 0, 0.125)"
                />
              )}
            </svg>
          </span>
        </button>
        {counter && (
          <Type5 className="card__counter">
            {counter} {pluralFormat}
          </Type5>
        )}
        {counter && !wide && (
          <button className="card__options" onClick={handleOptions}>
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 9.5C7.172 9.5 6.5 8.828 6.5 8C6.5 7.172 7.172 6.5 8 6.5C8.828 6.5 9.5 7.172 9.5 8C9.5 8.828 8.828 9.5 8 9.5Z"
                  fill="#FBA5CB"
                />
                <path
                  d="M8 14C7.172 14 6.5 13.328 6.5 12.5C6.5 11.672 7.172 11 8 11C8.828 11 9.5 11.672 9.5 12.5C9.5 13.328 8.828 14 8 14Z"
                  fill="#FBA5CB"
                />
                <path
                  d="M8 5C7.172 5 6.5 4.328 6.5 3.5C6.5 2.672 7.172 2 8 2C8.828 2 9.5 2.672 9.5 3.5C9.5 4.328 8.828 5 8 5Z"
                  fill="#FBA5CB"
                />
              </svg>
            </span>
          </button>
        )}
        <div className="card__logo-wrapper">
          <span className="card__logo">{logo}</span>

          {loading && (
            <Loader className="card__loader" size="56px" color={iconColor} />
          )}
        </div>
        <Type4
          className="card__title"
          style={{ width: "104px", margin: "0 auto" }}
        >
          {title}
        </Type4>
      </div>
    </StyledCard>
  );
};

export default Card;
