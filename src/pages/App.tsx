import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { RecoilRoot } from 'recoil';
import darkTheme from 'src/themes/dark';

import HomePage from './Home';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <>
      <CssBaseline enableColorScheme />
      <RecoilRoot>
        <HomePage />
      </RecoilRoot>
      </>
    </ThemeProvider>
  );
}

export default App;
