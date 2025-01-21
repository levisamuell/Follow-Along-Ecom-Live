import LoginPage from "./component/auth/Login"
import SignupForm from "./component/auth/Signup";
import {Routes, Route} from "react-router-dom";
import PageLogin from './Pages/PageLogin';
import PageSignUp from './Pages/PageSignUp';
import HomePage from './Pages/HomePage';


function App(){
return (
<>
{/* <LoginPage /> */}
{/* <SignupForm /> */}
<Routes>
        <Route path = '/' element = {<HomePage />}></Route>
        <Route path = '/login' element={<PageLogin />}></Route>
        <Route path = '/signup' element={<PageSignUp />}></Route>
</Routes>
</>
);
}

export default App