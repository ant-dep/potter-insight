import Head from 'next/head'
import { GetStaticProps } from 'next'
import { Characters } from '../typings'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Lottie from 'react-lottie'
import hermioneAnim from '../public/hermioneAnim.json'
import CharacterDetails from '../components/CharacterDetails'

interface Props {
  characters: [Characters]
}

interface State {
  theme: string
  characters: Array<Characters>
}

const Character = ({ characters }: Props) => {
  const theme = useSelector((state: State) => state.theme)
  const params = new URLSearchParams(window.location.search)
  const id = parseInt(params.get('id') || '0')
  const character = characters[id]

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

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Head>
        <title>Potter Insight - {character && character?.name}</title>
        <link rel="icon" href="/favicon-white.png" />
      </Head>
      <div className="flex-col justify-between ">
        <Header minScroll={0} />
        <main
          className={`flex justify-between items-center mx-auto mt-28 mb-10 ${
            theme === 'dark' && 'bg-black text-white'
          }`}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <Lottie options={defaultOptions} height={400} width={400} />
            </div>
          ) : (
            <CharacterDetails character={character} />
          )}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Character

// get props for post from params
export const getStaticProps: GetStaticProps = async () => {
  const getCharacters = async () => {
    const res = await fetch('https://hp-api.herokuapp.com/api/characters', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return await res.json()
  }
  const characters = await getCharacters()
  return {
    props: {
      characters,
    },
    revalidate: 60000,
  }
}
