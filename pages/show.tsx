import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useSelector } from 'react-redux'
import { Characters } from '../types/typings'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Lottie from 'react-lottie'
import hermioneAnim from '../public/hermioneAnim.json'
import ShowDetails from '../components/ShowDetails'

interface Props {
  character: Characters
}
interface State {
  theme: string
}

const Show = ({ character }: Props) => {
  const theme = useSelector((state: State) => state.theme)
  // Loader animation
  const [isLoading, setIsLoading] = useState(true)
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: hermioneAnim,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  useEffect(() => {
    setIsLoading(false)
  }, [character])

  return (
    <>
      <Head>
        <title>Potter Insight - {character && character?.name}</title>
        <link rel="icon" href="/favicon-white.ico" />
      </Head>
      <div
        className={`flex flex-col justify-between mx-auto min-h-screen ${
          theme === 'dark' && 'bg-black text-white'
        }`}
      >
        <Header minScroll={0} />
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        ) : (
          <ShowDetails character={character} />
        )}
        <hr className="mx-auto mt-12 h-[0.5px] w-[95%] bg-[#757575] max-w-7xl" />
        <Footer />
      </div>
    </>
  )
}

export default Show

// get props for characters from SSR
export const getServerSideProps: GetServerSideProps = async ({
  query,
}: any) => {
  const res = await fetch('https://hp-api.herokuapp.com/api/characters', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const id = parseInt(query.id)

  const characters = await res.json()
  const character = characters[id]

  return {
    props: {
      character,
    },
  }
}
