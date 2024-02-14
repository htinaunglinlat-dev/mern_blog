import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Projects from "./pages/Projects"
import Header from "./components/Header"
import FooterCom from "./components/FooterCom"
import Test from "./pages/Test"

const RouteTag = () => {
   return (
   <BrowserRouter>
   <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/projects" element={<Projects />}/>
        <Route path="/test" element={<Test />}/>
      </Routes>
      <FooterCom />
    </BrowserRouter>    
   )
}

export default RouteTag