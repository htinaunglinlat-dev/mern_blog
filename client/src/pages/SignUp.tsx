import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch.js";

export type ResponseSuccess = {
  success: true;
  data: object;
}

export type ResponseFail = {
  success: false;
  statusCode: number;
  message: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null!);
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const confirmPasswordRef= useRef<HTMLInputElement>(null!);

  const { loading , data, error, fetchData } = useFetch<ResponseSuccess | ResponseFail>();
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  useEffect(() => {
    usernameRef.current.value = "user";
    emailRef.current.value = "user@gmail.com";
    passwordRef.current.value = "hello1303";
    confirmPasswordRef.current.value = "hello1303"
  }, [])
  const formHandler: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    setErrorAlert(null); 

    // Reset error borders
    removeErrorInput([usernameRef.current, emailRef.current, passwordRef.current, confirmPasswordRef.current]);
    // console.log(inputLists.map(list => list.className))

    const username = usernameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirmPassword = confirmPasswordRef.current.value.trim();
    // console.log(username, email, password, typeof confirmPassword);
    if(!username || !email || !password || !confirmPassword) {
      let requiredInputLists = [];
      if(!username) requiredInputLists.push(usernameRef.current);
      if(!email) requiredInputLists.push(emailRef.current);
      if(!password) requiredInputLists.push(passwordRef.current);
      if(!confirmPassword) requiredInputLists.push(confirmPasswordRef.current);

      addErrorInput(requiredInputLists);
      return setErrorAlert("All fields are required.")
    }
    else if (password !== confirmPassword) {
      addErrorInput([passwordRef.current, confirmPasswordRef.current])
      return setErrorAlert("ConfirmPassword must be the same with Password.")
    }

    const url = "api/auth/signup";
    const userData = JSON.stringify({username, email, password});
    const requestMethod = {"Content-Type" : "application/json"}    

    try{
      fetchData(url, {
        method: "POST", 
        headers: requestMethod, 
        body: userData
      })
      if(error) setErrorAlert(error);
      else if(data?.success === true) {
        // console.log(data);
        navigate("/")
      }
      else if(data?.success === false) {
        setErrorAlert(data.message);
      }
    } catch (error) {
      console.log(error);
      setErrorAlert((error as Error).message)
    }
    
  }

  const removeErrorInput = ([...args]: HTMLInputElement[]) => {
    args.forEach(arg => arg.classList.remove("border-red-600"))
  }

  const addErrorInput = ([...args]: HTMLInputElement[]) => {
    args.forEach(arg => arg.classList.add("border-red-600"))
  }

  return (
    <div className="container min-h-screen mx-auto flex font-mono gap-10 w-fit">
      <img src="./src/assets/signup.svg" alt="singup" className="flex-1 max-w-xl lg:block hidden"/>
      <div className="box-border flex">
        <form action="" className="flex flex-col gap-4 w-full justify-center">
          <h1 className="font-bold text-slate-500 text-3xl my-2">Sign Up</h1>
          <InputElement content="username" inputType="text" inputRef={usernameRef} placeholder={"username"}/>
          <InputElement content="email" inputType="email" inputRef={emailRef} placeholder={"example@gmail.com"}/>
          <InputElement content="password" inputType="password" inputRef={passwordRef} placeholder="**********"/>
          <InputElement content="confirm-password" inputType="password" inputRef={confirmPasswordRef} placeholder="**********"/>

          { errorAlert && <span className="text-red-400 font-semibold max-w-80">{errorAlert}</span>}

          <button className={`w-80 p-2 border-2 border-slate-500 rounded-md bg-slate-100 hover:bg-slate-500 hover:text-slate-100 transition-all duration-300 ${loading ? "bg-slate-500 text-slate-200" : ""}`} onClick={e => formHandler(e)} disabled={loading}>{
            loading ? <><FontAwesomeIcon icon={faSpinner} className="animate-spin me-2"/> Processing</>
            : "Sign Up"
          }</button>
          <span>Have an account? 
            <Link to="/sign-in" className="text-sky-600 underline font-bold"> Sign in</Link>
          </span>
        </form>
      </div>
    </div>
  )
} 

type InputElementType = {
  content: string;
  inputType: string;
  inputRef: React.RefObject<HTMLInputElement>
  placeholder: string
}

const InputElement: React.FC<InputElementType> = ({content, inputType, inputRef, placeholder}) => {
  return (
    <label htmlFor={content} className="flex flex-col gap-1 w-80">
      <span className="text-slate-600 font-bold">{
        // to make string first capitalized 
        // "hello" => ["hello"] => "Hello"
        // "confirm-password" => ["confirm", "password"] => "Confirm Password"
        content.split("-").map(item => item[0].toUpperCase() + item.slice(1)).join(" ")
      }</span>
      <input type={inputType} id={content} ref={inputRef} className="py-2 px-3 border-2 border-slate-500 rounded-md bg-slate-100 w-full" required={true} placeholder={placeholder} />
    </label>
  ) 
}

export default SignUp