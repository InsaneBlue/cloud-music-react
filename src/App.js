import logo from './logo.svg';
import { GlobalStyle}  from './style'
import { HashRouter } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <HashRouter>
      <GlobalStyle></GlobalStyle>
      <img src={logo} className="App-logo" alt="logo" />
    </HashRouter>
  );
}

export default App;
