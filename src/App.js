import logo from './logo.svg';
import './App.css';
import SideBar from './Component/SideBar.js/SideBar';
import MainContent from './Component/MainContent/MainContent';
import { Store } from './Redux/Store';
import { Provider } from 'react-redux';
import RequireAuth from './Component/RequireAuth/RequireAuth';

function App() {
  return (
    <Provider store={Store}>
    <div style={{display:"flex"}}>
    <SideBar />
    <MainContent />
    </div> 
    </Provider>
  );
}

export default App;
