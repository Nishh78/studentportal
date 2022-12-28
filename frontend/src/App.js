// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import { ToastifyProvider } from './hooks/useToastify';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ToastifyProvider>
      <ScrollToTop />
      <StyledChart />
      <Router />
      </ToastifyProvider>
    </ThemeProvider>
  );
}
