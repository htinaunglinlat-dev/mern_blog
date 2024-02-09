import { Footer } from 'flowbite-react'
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter, BsTwitterX } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const FooterCom = () => {
   return (
      <Footer container className='border border-t-8 border-teal-500'>
         <div className="w-full max-w-5xl mx-auto">
            <div className="grid w-full justify-between sm:flex md:grid-cols-1">

               <div className="my-10">
                  <Link to={"/"} className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                     <span className="px-2 py-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-indigo-600 rounded">Sahand's</span>
                     Blog
                  </Link>
               </div>
               <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">

                  <div>
                     <Footer.Title title='About' />
                     <Footer.LinkGroup col>
                        <Footer.Link 
                           href='https://www.100jsprojects.com' 
                           target='_blank'
                           rel='noopener noreferrer'
                        >100 JS project</Footer.Link>
                        <Footer.Link 
                           href='/about'
                           target='_blank'
                           rel='noopener noreferrer'
                        >Sahand's Blog</Footer.Link>
                     </Footer.LinkGroup>
                  </div>
                  <div>
                     <Footer.Title title='Follow Us' />
                     <Footer.LinkGroup col>
                        <Footer.Link 
                           href='https://www.github.com' 
                           target='_blank'
                           rel='noopener noreferrer'
                        >Github</Footer.Link>
                        <Footer.Link 
                           href='#'
                        >Discord</Footer.Link>
                     </Footer.LinkGroup>
                  </div>
                  <div>
                     <Footer.Title title='Legal' />
                     <Footer.LinkGroup col>
                        <Footer.Link 
                           href='#' 
                        >Privacy Policy</Footer.Link>
                        <Footer.Link 
                           href='#'
                        >Terms &amp; Conditions</Footer.Link>
                     </Footer.LinkGroup>
                  </div>

               </div>
            </div>
            <Footer.Divider />
            <div className="w-full flex flex-col sm:items-center sm:flex-row sm:justify-between sm:items-center">
               <Footer.Copyright by="Sahand's Blog" href='#' year={new Date().getFullYear()} />
               <div className="flex gap-6 mt-4 sm:mt-0 sm:justify-center">
                  <Footer.Icon href="#" icon={BsFacebook}/>
                  <Footer.Icon href="#" icon={BsInstagram}/>
                  <Footer.Icon href="#" icon={BsTwitter}/>
                  <Footer.Icon href="https://www.github.com" icon={BsGithub}/>
                  <Footer.Icon href="#" icon={BsDribbble}/>
               </div>
            </div>
         </div>
      </Footer>
   )
}

export default FooterCom