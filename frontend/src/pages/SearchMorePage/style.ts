import { css, Theme } from '@emotion/react';

export const s_container = (theme: Theme) => css`
  display: grid;
  color: ${theme.colors.white};
  width: 100%;
  padding: 0 10%;
  place-items: center;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  @media (min-width: 768px) {
    grid-template-columns: 40% 40%;
  }
  justify-content: center;
  align-items: center;
  row-gap: 20px;
  column-gap: 10%;
`;

export const s_titleContainer = (theme: Theme) => css`
  color: ${theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 10px;
  }
  @media (min-width: 768px) {
    margin-bottom: 30px;
    font-size: 32px;
  }
`;
