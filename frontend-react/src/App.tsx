// App.tsx
import { ConfigProvider } from './context/ConfigContext';
import { useThemeColors } from './hooks/useThemeColors';
import { Title } from './components/Title';
import { FrontendSwitcher } from './components/FrontendSwitcher';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './App.css';

function AppContent() {
  useThemeColors();
  return (
    <>
      <div className="flex items-center justify-between">
        <Title />
        <FrontendSwitcher />
      </div>
    </>
  );
}

export default function App() {
  return (
    <ConfigProvider>
      <AppContent />
      <Button variant="contained" endIcon={<SendIcon />}>
        Contained
      </Button>
    </ConfigProvider>
  );
}
