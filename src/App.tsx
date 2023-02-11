import React from 'react';
import logo from './logo.svg';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import  Login  from './components/Login';
import CompanyPage from './components/CompanyPage';
import EmployeePage from './components/EmployeePage';

export interface IApplicationProps{};
const App:React.FunctionComponent<IApplicationProps> = (props)=>{
  return(
    <BrowserRouter>
    <Routes>
      <Route path ='/login' element={<Login/>}/>
      <Route path ='/CompanyPage' element={<CompanyPage/>}/>
      <Route path ='/EmployeePage' element={<EmployeePage/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App;
