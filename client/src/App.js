import { CssBaseline, TheneProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { themeSettings } from "theme";

function App() {

  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="App">
      <BrowserRouter>
        <TheneProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Nevigate to="/dashboard" replace />}>
              </Route>
            </Route>
          </Routes>
        </TheneProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
