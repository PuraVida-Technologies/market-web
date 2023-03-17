import { ConfigProvider, ThemeConfig } from 'antd';
import { PropsWithChildren } from 'react';

const themeConfig: ThemeConfig = {
  token: { fontFamily: 'var(--font-dm-sans)' },
};

const AntThemeProvider = ({ children }: PropsWithChildren) => {
  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
};

export default AntThemeProvider;
