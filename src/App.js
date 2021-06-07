import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { GlobalStyle } from "./style";
import routes from "./routes/index";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />

      {renderRoutes(routes)}
    </BrowserRouter>
  );
}

export default App;
