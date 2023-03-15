import React from 'react'
import { MdOutlineVideocamOff } from 'react-icons/md'

interface IProps {
  text: string
}

const NoResults = ({ text }: IProps) => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <p className='text-8xl'>
        <MdOutlineVideocamOff color='grey' />
      </p>
      <p className='text-xl text-center px-2'>{text}</p>
    </div>
  )
}

export default NoResults
