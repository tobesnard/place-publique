// App.tsx
import { ConfigProvider } from './context/ConfigContext';
import { useThemeColors } from './hooks/useThemeColors';
import { Title } from './components/Title';
import { FrontendSwitcher } from './components/FrontendSwitcher';
import { Palette } from './components/Palette';

import { ThemeProvider } from '@mui/material/styles';
import './App.css';

function AppContent() {
  const theme = useThemeColors();

  return (
    <ThemeProvider theme={theme}>
      <div className="flex items-center justify-between">
        <Title />
        <FrontendSwitcher />
      </div>
      <br />
      <Palette />
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <ConfigProvider>
      <AppContent />
    </ConfigProvider>
  );
}
