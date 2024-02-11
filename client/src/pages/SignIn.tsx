import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch';

const SignUp = () => {
  const [state, fetchData ] = useFetch()

  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const [alertBox, setAlertBox] = useState<string | null>(null)

  const navigate = useNavigate();
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    console.log("handleSubmit", alertBox)
    setAlertBox(null);
    e.preventDefault();
    console.log(emailRef.current.value, passwordRef.current.value)
    if (emailRef.current.value === "" || passwordRef.current.value === "") 
      return setAlertBox("All fields are required")

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    try{
      const data = await fetchData("/api/auth/signin","POST", formData); 
      if(data.success === false) 
        return setAlertBox(data.message);  
      return navigate("/")
    } catch (error: any) {
      setAlertBox(error.message);
    }
  }
  // useEffect(() => {
  //   console.warn("useEffect")
  //   console.log(state)
  // }, [state])

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
                placeholder='***********'
                id='password'
                ref={passwordRef}
              />
            </div>
            <Button gradientDuoTone={"purpleToPink"} type={'submit'} onClick={handleSubmit} disabled={state.loading}>
              { state.loading ? 
                <>
                  <Spinner  size={"sm"}/><span className='pl-3'>Loading ...</span>
                </>
                : "Sign In" }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account? </span>
            <Link to={"/sign-up"} className='text-blue-500'>Sign up</Link>
          </div>
          {alertBox && <Alert className='mt-5 ' color={"failure"}>{alertBox}</Alert>}
        </div>

      </div>
    </div>
  )
}

export default SignUp