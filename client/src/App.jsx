import './App.css'
import './index.css'
import Loginpage from './components/Loginpage'
import { BrowserRouter, Route, Routes, Outlet, Link } from 'react-router-dom'
import OtpInput from './components/OtpInput'
import OtpBack from './components/OtpBack'
import SellForm from './components/SellForm'
import MainPage from './components/MainPage'
import Listing from './components/Listing'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Loginpage signup={true}/>}> </Route>
        <Route path='/signin' element={<Loginpage signup={false}/>}> </Route>
        <Route path='/otpValidation' element={<OtpBack> <OtpInput size={4}/> </OtpBack>}></Route>
        <Route path='/seller' element={<SellForm />}></Route>
        <Route path='/' element={<MainPage/>}></Route>
        <Route path='/listing' element={<Listing />}> </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
