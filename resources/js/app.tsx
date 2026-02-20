import '../css/app.css';
import './bootstrap';
import '@fontsource/poppins/400.css'; // regular
import '@fontsource/poppins/500.css'; // medium
import '@fontsource/poppins/600.css'; // semi-bold
import '@fontsource/poppins/700.css'; // bold

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme'; // import your custom theme

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx'),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* optional: normalize CSS for MUI */}
        <App {...props} />
      </ThemeProvider>
    );
  },
  progress: {
    color: '#4B5563',
  },
});
