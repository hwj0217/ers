
import { Routes, Route } from 'react-router-dom'
import Main from './Main';
import Join from './User/Join';
import Login from './User/Login';
import FindPassword from './User/FindPassword';
import CounterContainer from './containers/CounterContainer';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/findpassword" element={<FindPassword />}></Route>
        <Route path="/countercontainer" element={<CounterContainer />}></Route>
      </Routes>
    </div>
  );
}

export default App;