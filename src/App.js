
import { Routes, Route, Navigate } from 'react-router-dom'
import Main from './Main';
import Join from './User/Join';
import Login from './User/Login';
import FindPassword from './User/FindPassword';
import { useSelector } from 'react-redux';
import UserInfo from './User/UserInfo';

function App() {
  const isLogin = useSelector(state => state.loggedIn);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/login" element={!isLogin ? <Login /> : <Navigate to="/" />}></Route>
        <Route path="/findpassword" element={<FindPassword />}></Route>
        <Route path="/userinfo" element={<UserInfo />}></Route>
      </Routes>
    </div>
  );
}

export default App;