import styled from "styled-components";

const Type = styled.p`
  padding: 0;
  margin: 0;
  -moz-osx-font-smoothing: grayscale !important;
  -webkit-font-smoothing: antialiased !important;
  /* also try: subpixel-antialiased, for non-retina */
  /* display: inline; */
  /* background-color: rgba(0, 0, 255, 0.25); */
`;

export const Type1 = styled(Type)`
  font: 20px/24px InterBold, sans-serif;
`;

export const Type2 = styled(Type)`
  font: 16px/24px InterMedium, sans-serif;
`;

export const Type3 = styled(Type)`
  font: 14px/24px InterMedium, sans-serif;
  /* font: 14px/24px InterRegular, sans-serif; */
`;

export const Type4 = styled(Type)`
  font: 13px/16px InterSemiBold, sans-serif;
`;

export const Type5 = styled(Type)`
  font: 12px/16px InterSemiBold, sans-serif;
`;
