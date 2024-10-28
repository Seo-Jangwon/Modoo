import { css, Theme } from '@emotion/react';

export const s_div_color = css`
  width: 200px;
  height: 200px;
  margin: 20px;
  border: none;
  border-radius: 30px;
`;

export const s_h2 = (theme: Theme) => css`
  font-size: 64px;
  color: ${theme.colors.white};
`;

export const s_button = css`
  margin: 30px;
  width: 200px;
  height: 200px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    transform: scale(1.1)
  }
`;