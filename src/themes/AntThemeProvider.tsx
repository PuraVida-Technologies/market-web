import { ConfigProvider, ThemeConfig } from 'antd';
import { PropsWithChildren } from 'react';

export const colorsPallet = {
  primary: {
    DEFAULT: '#3653FE',
    light: '#C3CCFF',
    lighter: '#F4F8FD',
  },
  gray: {
    text: '#939AA4',
    light: '#E6EBEF',
  },
  red: { DEFAULT: '#DF477E' },
  green: { DEFAULT: '#059E30' },
};

const themeConfig: ThemeConfig = {
  token: {
    fontFamily: 'var(--font-dm-sans)',
    colorPrimary: colorsPallet.primary.DEFAULT,
    colorError: colorsPallet.red.DEFAULT,
    colorSuccess: colorsPallet.green.DEFAULT,
  },
};

const AntThemeProvider = ({ children }: PropsWithChildren) => {
  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
};

export default AntThemeProvider;
