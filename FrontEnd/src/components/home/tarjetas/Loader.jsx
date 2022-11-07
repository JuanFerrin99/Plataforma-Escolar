import React from "react";
import styled from "styled-components";
import content from "./content";

const StyledLoader = styled.span`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin: -12px;
  animation: fade-in 0.3s 0.15s ${({ ease }) => ease} forwards,
    spin 0.75s steps(8, end) infinite;
  opacity: 0;

  @keyframes fade-in {
    to {
      opacity: 1;
    }
  }

  div {
    position: absolute;
    top: 48px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    /* border-radius: 2px; */
    background: ${({ color }) => color};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
    transition: background 0.15s ${({ ease }) => ease};
  }
  div:nth-child(1) {
    left: 10px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  div:nth-child(2) {
    left: 10px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(3) {
    left: 34px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(4) {
    left: 58px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;

const Loader = ({ color, size, className }) => {
  return (
    <StyledLoader
      className={className}
      color={color}
      size={size}
      ease={content.ease}
    >
      {/* <div class="lds-ellipsis"> */}
      <div />
      <div />
      <div />
      <div />
      {/* </div> */}
    </StyledLoader>
  );
};

export default Loader;
