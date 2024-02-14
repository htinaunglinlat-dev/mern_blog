import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { MouseEvent, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux/reduxHooks';
import useFetch from '../hooks/useFetch';

const SignIn = () => {
  const navigate = useNavigate();
  const fetchData = useFetch();

  const { loading } = useAppSelector(state => state.user)
  const [alertBox, setAlertBox] = useState<string | null>(null)

  const usernameRef = useRef<HTMLInputElement>(null!);
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);

  const handleSubmit = async(event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAlertBox(null);

    const username = usernameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if(!username ||!email ||!password) {
      setAlertBox("All fields are required")
      return
    }

    const formData = { username, email, password }
    try {
      const data = await fetchData("/api/auth/signup", "POST", formData);
      if(data.success === false) {
        setAlertBox(data.message);  
        return
      }
      if(typeof data === "string") {
        setAlertBox(data);
        return
      }
      navigate("/");
    } catch(error: any) {
      setAlertBox(error.message);
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">

        {/* left */}
        <div className="flex-1">
          <Link to={"/"} className="font-bold dark:text-white text-4xl">
            <span className="text-white px-2 py-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-indigo-600 rounded">Sahand's</span>
            Blog
          </Link>
          <p className='text-sm mt-5'>This is a demo project. You can sign up with your email and password or with Google.</p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className='flex flex-col gap-4'>
            <div className="">
              <Label value='Your username'/>
              <TextInput 
                type='text'
                placeholder='Username'
                id='username'
                ref={usernameRef}
              />
            </div>
            <div className="">
              <Label value='Your email'/>
              <TextInput 
                type='email'
                placeholder='name@company.com'
                id='email'
                ref={emailRef}
              />
            </div>
            <div className="">
              <Label value='Your password'/>
              <TextInput 
                type='password'
                placeholder='Password'
                id='password'
                ref={passwordRef}
              />
            </div>
            <Button gradientDuoTone={"purpleToPink"} type={'submit'} onClick={handleSubmit} disabled={loading}>
              { loading ? 
                <>
                  <Spinner  size={"sm"}/><span className='pl-3'>Loading ...</span>
                </>
                : "Sign Up" }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account? </span>
            <Link to={"/sign-in"} className='text-blue-500'>Sign in</Link>
          </div>
          {alertBox && <Alert className='mt-5 ' color={"failure"}>{}</Alert>}
        </div>

      </div>
      
    </div>
  )
}

export default SignIn

// 6QA