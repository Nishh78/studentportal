// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import { ToastifyProvider } from './hooks/useToastify';
import { LoaderProvider } from './hooks/useLoader';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <LoaderProvider>
        <ToastifyProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ToastifyProvider>
      </LoaderProvider>
    </ThemeProvider>
  );
}
