// App.tsx
import { ConfigProvider } from './context/ConfigContext';
import { useThemeColors } from './hooks/useThemeColors';
import { Title } from './components/Title';
import { FrontendSwitcher } from './components/FrontendSwitcher';
import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import './App.css';

function AppContent() {
  const theme = useThemeColors();

  return (
    <ThemeProvider theme={theme}>
      <div className="flex items-center justify-between">
        <Title />
        <FrontendSwitcher />
      </div>
      <Button variant="contained" endIcon={<SendIcon />}>
        Contained
      </Button>
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
