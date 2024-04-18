import { faBars, faMagnifyingGlass, faMoon } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";
import { Link, useLocation } from "react-router-dom"

const Header = () => {
  const path = useLocation().pathname;
  const [toggle, setToggle] = useState<boolean>(false);
  
  return (
    <nav className="relative w-full font-mono border-b-2 bg-slate-500 p-3 flex gap-5 items-center justify-evenly select-none">
      <Link to={"/"} className="self-center whitespace-nowrap text-md sm:text-xl font-semibold dark:text-white">
        Towa Chan
      </Link>
      <form action="">
        <div className="bg-white p-2 rounded-sm hidden md:block">
          <input type="text" placeholder="Search ..." className="bg-transparent outline-none active:"/>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-slate-500" />
        </div>
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white md:hidden p-2 rounded-xl border-2 border-white cursor-pointer" />
      </form>

      <FontAwesomeIcon icon={faMoon} className="w-5 h-5 text-white p-2 rounded-xl border-2 border-white cursor-pointer"/>

      <div className="gap-4 text-slate-200 font-bold hidden md:flex">
          <MenuList pathTo="/" path="Home" active={path === "/" || path === ""}/>
          <MenuList pathTo="/about" path="About" active={path === "/about"}/>
          <MenuList pathTo="/projects" path="Projects" active={path === "/projects"}/>
      </div>

      <button className="font-semibold border-2 border-white  px-2 py-1 text-white rounded-md transition-all hover:bg-slate-300 hover:text-slate-700 duration-500">Sign In</button>

      <FontAwesomeIcon icon={faBars} className="text-2xl text-slate-100 cursor-pointer md:hidden" onClick={() => setToggle(prev => !prev)}/>
      { toggle === true && 
        <div className="absolute top-full bg-slate-300 w-full flex flex-col md:hidden text-slate-600 border-y-2 border-slate-400">
          <MenuHamburgerList pathTo="/" path="Home" active={path === "/" || path === ""}/>
          <MenuHamburgerList pathTo="/about" path="About" active={path === "/about"}/>
          <MenuHamburgerList pathTo="/projects" path="Projects" active={path === "/projects"}/>
        </div>
      }
      
    </nav>
  )
}
type MenuListType = {
  pathTo: string
  path: string 
  active: boolean
}

const MenuList = ({pathTo, path, active}: MenuListType) => <Link to={pathTo} className={active ? "active-menu" : ""}>{path}</Link>

const MenuHamburgerList = ({pathTo, path, active}: MenuListType) => <Link to={pathTo} className={`font-bold p-2 ps-5 transition-all duration-300 hover:bg-slate-400 ${active ? "active-hamburger-menu" : ""}`}>{path}</Link>

export default Header
