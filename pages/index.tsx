import Head from 'next/head'
import React from 'react'
import axios from 'axios'
//import Image from 'next/image'
//import { Inter } from 'next/font/google'
import { BASE_URL } from '../utils'
import { Video } from '../types'
import VideoCard from '../components/VideoCard'
import NoResults from '../components/NoResults'
//const inter = Inter({ subsets: ['latin'] })

interface IProps {
  videos: Video[]
}

const Home = ({ videos }: IProps) => {
  return (
    <>
      <Head>
        <title>TikTop</title>
        <meta name='description' content='TikTop app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex flex-col gap-10 videos h-full'>
        {videos.length ? (
          videos?.map((video: Video) => <VideoCard post={video} isShowingOnHome key={video._id} />)
        ) : (
          <NoResults text={`No Videos`} />
        )}
      </div>
    </>
  )
}

export default Home

export const getServerSideProps = async ({ query: { topic } }: { query: { topic: string } }) => {
  let response = await axios.get(`${BASE_URL}/api/post`)

  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`)
  }

  return {
    props: { videos: response.data },
  }
}
