import { Characters } from '../types/typings'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Header from '../components/Header'
import CharactersList from '../components/CharactersList'
import { GetServerSideProps } from 'next'
interface Props {
  characters: [Characters]
}
interface State {
  theme: string
  page: string
}

export default function Home({ characters }: Props) {
  const theme = useSelector((state: State) => state.theme)

  return (
    <div className={`min-h-screen ${theme === 'dark' && 'bg-black'}`}>
      <Head>
        <title>Potter Insight</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header minScroll={100} />
      <Banner />
      <div className="mx-auto max-w-7xl flex flex-col justify-between">
        <CharactersList characters={characters} selected={0} />
        <hr className="mx-auto mt-12 h-[0.5px] w-[95%] bg-[#757575]" />
        <Footer />
      </div>
    </div>
  )
}

// get characters from SSR
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://hp-api.herokuapp.com/api/characters', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()

  // add id to character from api dataset for futher reference
  const characters = data
  characters.map((character: Characters) => {
    character.id = characters.indexOf(character)
  })

  return {
    props: {
      characters,
    },
  }
}
