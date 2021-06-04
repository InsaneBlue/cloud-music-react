import { GlobalStyle}  from './style'
import { HashRouter } from 'react-router-dom'
import {renderRoutes} from 'react-router-config'
import routes from "./routes/index.js";
import './App.css';

function App() {
  return (
    <HashRouter>
      <GlobalStyle></GlobalStyle>

      { renderRoutes(routes) }

    </HashRouter>
  );
}

export default App;
