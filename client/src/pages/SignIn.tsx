import { ChangeEvent, MouseEventHandler, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { ResponseFail, ResponseSuccess } from "./SignUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";




const SignIn = () => {
  const {data, loading, error, fetchData} = useFetch<ResponseSuccess | ResponseFail>();
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value.trim()
    }))
  }


  const formHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if(!formData.email || !formData.password) setErrorAlert("All fields are required.");
    try{
      
    } catch (error) {
      setErrorAlert((error as Error).message);
    }
  }

  return (
    <div className="container min-h-screen mx-auto flex font-mono gap-10 w-fit">
      <img src="./src/assets/signup.svg" alt="singup" className="flex-1 max-w-xl lg:block hidden"/>
      <div className="box-border flex">
        <form action="" className="flex flex-col gap-4 w-full justify-center">
          <h1 className="font-bold text-slate-500 text-3xl my-2">Sign In</h1>
          <InputElement content="email" inputType="email" inputHandler={inputHandler}/>
          <InputElement content="password" inputType="password" inputHandler={inputHandler}/>
          <button className={`w-80 p-2 border-2 border-slate-500 rounded-md bg-slate-100 hover:bg-slate-500 hover:text-slate-100 transition-all duration-300 ${loading ? "bg-slate-500 text-slate-200" : ""}`} onClick={formHandler}>Sign In</button>
          <span>Haven't an account? 
            <Link to="/sign-up" className="text-sky-600 underline font-bold">{
              loading ? <><FontAwesomeIcon icon={faSpinner} className="animate-spin me-2"/> Processing</>
              : "Sign In"
            }</Link>
          </span>
        </form>
      </div>
    </div>
  )
} 

type InputElementType = {
  content: string;
  inputType: string;
  inputHandler: (event: ChangeEvent<HTMLInputElement>) => void
}

const InputElement = ({content, inputType, inputHandler}: InputElementType) => {
  return (
    <label htmlFor={content} className="flex flex-col gap-1 w-80">
      <span className="text-slate-600 font-bold">{
        // to make string first capitalized 
        // "hello" => ["hello"] => "Hello"
        // "confirm-password" => ["confirm", "password"] => "Confirm Password"
        content.split("-").map(item => item[0].toUpperCase() + item.slice(1)).join(" ")
      }</span>
      <input 
        onChange={inputHandler}
        type={inputType} 
        id={content} 
        placeholder={content} 
        required 
        className="py-2 px-3 border-2 border-slate-500 rounded-md bg-slate-100 w-full"/>
    </label>
  ) 
}

export default SignIn;