import React, { KeyboardEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch, BiX } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import { GoogleLogin, googleLogout } from '@react-oauth/google'

import Logo from '../utils/tiktop-logo.png'
import { IUser } from '@/types'
import { createOrGetUser } from '@/utils'
import useAuthStore from '@/store/authStore'

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>()
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()
  const { userProfile, addUser, removeUser } = useAuthStore()

  useEffect(() => {
    setUser(userProfile)
  }, [userProfile])

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (searchValue) {
      router.push(`/search/${searchValue}`)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (searchValue) {
        router.push(`/search/${searchValue}`)
      }
    }
  }

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href='/'>
        <div className='w-[100px] md:w-[129px] md:h-[30px] h-[38px]'>
          <Image className='cursor-pointer' src={Logo} alt='logo' />
        </div>
      </Link>
      <div className='relative hidden md:block'>
        <form onSubmit={handleSearch} className='absolute md:static top-10 -left-20 bg-white'>
          <input
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className='bg-primary p-3 pl-6 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0'
            placeholder='Search accounts and videos'
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue('')}
              className='absolute md:right-14 right-16 top-4 text-xl text-gray-400 hover:text-[color:black]'
            >
              <BiX />
            </button>
          )}
          <button
            onClick={handleSearch}
            disabled={!searchValue}
            className='absolute md:right-5 right-6 top-4 pl-4 text-2xl text-gray-400 hover:text-[color:var(--primary-color)]'
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {user ? (
          <div className='flex gap-5 md:gap-10 items-center'>
            <Link href='/upload'>
              <button className='border-2 p-1 md:p-2 text-md font-semibold flex items-center gap-2 rounded-full hover:text-[color:var(--primary-color)] hover:border-dashed hover:border-red-300'>
                <IoMdAdd className='text-xl' /> <span className='hidden md:block'>Upload </span>
              </button>
            </Link>
            {user.image && (
              <Link href={`/profile/${user._id}`}>
                <div>
                  <Image className='rounded-full cursor-pointer' src={user.image} alt='user' width={40} height={40} />
                </div>
              </Link>
            )}
            <button
              type='button'
              className='p-2 rounded-full cursor-pointer outline-none'
              onClick={() => {
                googleLogout()
                removeUser()
              }}
            >
              <AiOutlineLogout color='red' fontSize={24} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            // theme='outline'
            // text='signin'
            // type='standard'
            // shape='circle'
            onSuccess={credentialResponse => createOrGetUser(credentialResponse, addUser)}
            onError={() => console.log('Login Failed')}
          />
        )}
      </div>
    </div>
  )
}

export default Navbar
