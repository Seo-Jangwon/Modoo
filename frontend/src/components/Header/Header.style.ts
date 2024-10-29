import { css, Theme } from '@emotion/react';

export const s_container = css`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 80px;
  overflow: hidden;
  /* background: #121212; */
`;

export const s_logo = (theme: Theme) => css`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.white};
  font-size: large;
  font-weight: bold;
`;
