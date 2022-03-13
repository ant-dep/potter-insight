import { Characters } from '../typings'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadCharacters } from '../store'
import Head from 'next/head'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Character from '../components/Character'

interface Props {
  characters: [Characters]
}

interface State {
  theme: string
  page: string
}

export default function Home({ characters }: Props) {
  const [theme, setTheme] = useState('dark')
  const reduxTheme = useSelector((state: State) => state.theme)
  const dispatch = useDispatch()

  // add id to character from api dataset and dispatch to redux
  useEffect(() => {
    let updatedCharacters = characters
    updatedCharacters.map((character) => {
      character.id = characters.indexOf(character)
    })
    console.log(updatedCharacters)
    dispatch(loadCharacters(updatedCharacters))
  }, [characters])

  useEffect(() => {
    {
      reduxTheme && setTheme(reduxTheme)
    }
  }, [reduxTheme])

  return (
    <div className={`${theme === 'dark' && 'bg-black'}`}>
      <Head>
        <title>Potter Insight</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header minScroll={100} />
      <Banner />
      <div className="mx-auto max-w-7xl">
        <Character charactersToLoad={characters} selected={0} />
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
