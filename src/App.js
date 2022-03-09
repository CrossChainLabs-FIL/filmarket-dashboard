import Router from './routes';
import ThemeProvider from './theme';
import ScrollToTop from './components/ScrollToTop';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
        <ScrollToTop />
        <Router />
        <Footer />
    </ThemeProvider>
  );
}

