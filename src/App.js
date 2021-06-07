import { GlobalStyle } from "./style";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "./routes/index.js";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle></GlobalStyle>

      {renderRoutes(routes)}
    </BrowserRouter>
  );
}

export default App;
