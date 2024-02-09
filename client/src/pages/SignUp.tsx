import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { ChangeEvent, MouseEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim() })
  }
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.username ||!formData.email ||!formData.password) {
      setError("Please fill in all fields")
      setLoading(false);
    }
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if(data.success === false) {
        setLoading(false);
        return setError(data.message)
      }
      console.log(data)
      setLoading(false);
      if(res.ok) 
        navigate("/sign-in")
    } catch (error) {
      setError((error as Error).message)
      setLoading(false);
    }
  }

  console.log(formData)
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
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value='Your email'/>
              <TextInput 
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value='Your password'/>
              <TextInput 
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
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
          {error && <Alert className='mt-5 ' color={"failure"}>{error}</Alert>}
        </div>

      </div>
      
    </div>
  )
}

export default SignIn

// 6QA