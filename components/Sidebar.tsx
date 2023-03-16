import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
//import { useGoogleOneTapLogin } from '@react-oauth/google'
//import { useGoogleLogin, GoogleLogin } from '@react-oauth/google'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'

import SuggestedAccounts from './SuggestedAccounts'
import Discover from './Discover'
import Footer from './Footer'

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState<Boolean>(true)
  const { pathname } = useRouter()

  const activeLink =
    'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[color:var(--primary-color)] rounded'

  const normalLink =
    'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded'

  // const login = useGoogleLogin({
  //   onSuccess: credentialResponse => {
  //     console.log(credentialResponse)
  //   },
  //   onError: () => {
  //     console.log('Login Failed')
  //   },
  // })

  return (
    <div>
      <div className='block xl:hidden m-2 ml-7 mt-5 text-2xl' onClick={() => setShowSidebar(prev => !prev)}>
        {showSidebar ? <ImCancelCircle color='grey' /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 '>
          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
            <Link href='/'>
              <div className={pathname === '/' ? activeLink : normalLink}>
                <p className='text-2xl'>
                  <AiFillHome />
                </p>
                <span className='capitalize text-xl hidden xl:block'>For You</span>
              </div>
            </Link>
          </div>

          {/* {!userProfile && (
            <div className='px-2 py-4 hidden xl:block'>
              <p className='text-gray-400'>Log in to like and comment on videos</p>
              <div>
                <button
                  className='bg-white text-lg text-[color:var(--primary-color)} 
                            border-[1px] border-[color:var(--primary-color)] 
                            font-semibold px-6 py-3 rounded-md 
                            outline-none w-full mt-3 
                            hover:text-white hover:bg-[color:var(--primary-color)]'
                  onClick={() => login()}
                >
                  Log in
                </button>
              </div>
            </div>
          )} */}

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Sidebar
