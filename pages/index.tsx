import Head from 'next/head'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Character from '../components/Character'
import { Characters } from '../typings'
import { useSelector } from 'react-redux'
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
    <div className={`${theme === 'dark' && 'bg-black'}`}>
      <Head>
        <title>Potter Insight</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header minScroll={100} />
      <Banner />
      <div className={`mx-auto max-w-7xl ${theme === 'dark' && 'bg-black'}`}>
        <Character characters={characters} />
        <hr className="mx-auto mt-12 h-[0.5px] w-[95%] bg-[#757575]" />
        <Footer />
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const getCharacters = async () => {
    const res = await fetch('https://hp-api.herokuapp.com/api/characters', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res.json()
  }

  const characters = await getCharacters()

  return {
    props: {
      characters,
    },
  }
}
