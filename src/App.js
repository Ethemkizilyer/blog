
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { store } from './app/store';
import Navba from './components/Navba';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Login from './pages/Login';
import New from './pages/New';
import Register from './pages/Register';

function App() {
  return (
    <>
    <Provider store={store}>
    <Navba/>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/new' element={<New/>} />
      <Route path='/detail' element={<Detail/>} />

     </Routes>
     </Provider>
    </>
  );
}

export default App;
