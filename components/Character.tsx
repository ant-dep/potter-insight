import Link from 'next/link'
import { Characters } from '../typings'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import Lottie from 'react-lottie'
import hermioneAnim from '../public/hermioneAnim.json'

interface Props {
  charactersToLoad: [Characters]
  selected: number
}

interface State {
  theme: string
  characters: Array<Characters>
}

const Character = ({ charactersToLoad }: Props) => {
  const [theme, setTheme] = useState('dark')
  const reduxTheme = useSelector((state: State) => state.theme)
  const [characters, setCharacters] = useState([] as Characters[])
  const charactersFromRedux = useSelector((state: State) => state.characters)
  const [page, setPage] = useState<number>(0)
  const elementsPerPage = 18
  const numberOfPagesVistited = page * elementsPerPage
  const totalPages = Math.ceil(characters.length / elementsPerPage)
  const changePage = ({ selected }: Props) => {
    setPage(selected)
  }

  const displayPage = characters
    .slice(numberOfPagesVistited, numberOfPagesVistited + elementsPerPage)
    .map((character) => {
      return (
        <Link key={character?.id} href={`/character/?id=${character?.id}`}>
          <div
            className={`flex group cursor-pointer overflow-hidden rounded-lg border transition-transform duration-200 ease-in-out hover:scale-[1.01] ${
              theme === 'light' ? 'bg-white' : 'bg-black text-white'
            }`}
          >
            {character.image !== '' && (
              <img
                className="h-60 object-contain"
                src={character.image}
                alt={character.name}
              />
            )}
            <div className="flex flex-col justify-center  w-full p-10">
              <p className="text-lg font-bold">{character.name}</p>
              {character.house !== '' && (
                <p className="text-xs">{character.house}</p>
              )}
            </div>
          </div>
        </Link>
      )
    })

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: hermioneAnim,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  useEffect(() => {
    if (charactersToLoad.length > 0) {
      setCharacters(charactersToLoad)
    } else {
      setCharacters(charactersFromRedux)
    }
  }, [charactersFromRedux, charactersToLoad])

  useEffect(() => {
    {
      reduxTheme && setTheme(reduxTheme)
    }
  }, [reduxTheme])

  return (
    <>
      <div className="grid grid-cols-1 gap-3 py-2 sm:grid-cols-2 md:gap-6 md:py-6 lg:grid-cols-3 px-1">
        {characters ? (
          displayPage
        ) : (
          <div className="flex justify-center items-center h-screen">
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        )}
      </div>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={totalPages}
        onPageChange={changePage}
        containerClassName={'navigationButtons'}
        previousLinkClassName={'previousButton'}
        nextLinkClassName={'nextButton'}
        disabledClassName={'navigationDisabled'}
        activeClassName={'navigationActive'}
      />
    </>
  )
}

export default Character
