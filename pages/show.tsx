import Head from 'next/head'
import { Characters } from '../typings'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Lottie from 'react-lottie'
import hermioneAnim from '../public/hermioneAnim.json'
import ShowDetails from '../components/ShowDetails'

interface Props {
  characters: [Characters]
}
interface State {
  theme: string
  characters: Array<Characters>
}

const Show = ({ characters }: Props) => {
  const [theme, setTheme] = useState('dark')
  const reduxTheme = useSelector((state: State) => state.theme)
  const params = new URLSearchParams(window.location.search)
  const id = parseInt(params.get('id') || '0') // id from params
  const character = characters[id] // keep only the one selected from api dataset

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
  }, [characters])

  // theme listener
  useEffect(() => {
    {
      reduxTheme && setTheme(reduxTheme)
    }
  }, [reduxTheme])

  return (
    <>
      <Head>
        <title>Potter Insight - {character && character?.name}</title>
        <link rel="icon" href="/favicon-white.png" />
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
        <hr className="mx-auto mt-12 h-[0.5px] w-[95%] bg-[#757575]" />
        <Footer />
      </div>
    </>
  )
}

export default Show

// get props for characters from SSR
export const getServerSideProps = async () => {
  const res = await fetch('https://hp-api.herokuapp.com/api/characters', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const characters = await res.json()

  return {
    props: {
      characters,
    },
  }
}
