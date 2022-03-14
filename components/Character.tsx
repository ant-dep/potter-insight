import Link from 'next/link'
import { Characters } from '../typings'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import Lottie from 'react-lottie'
import hermioneAnim from '../public/hermioneAnim.json'
interface Props {
  characters: [Characters]
  selected: number
}
interface State {
  theme: string
  characters: Array<Characters>
}

const Character = ({ characters }: Props) => {
  const [theme, setTheme] = useState('dark')
  const reduxTheme = useSelector((state: State) => state.theme)

  // pagination setup
  const [page, setPage] = useState<number>(0)
  const elementsPerPage = 18
  const numberOfPagesVistited = page * elementsPerPage
  const totalPages = Math.ceil(characters.length / elementsPerPage)

  const changePage = ({ selected }: Props) => {
    setPage(selected)
  }

  // function to display characters from slice of array
  const displayPage = characters
    .slice(numberOfPagesVistited, numberOfPagesVistited + elementsPerPage)
    .map((character) => {
      return (
        <Link key={character?.id} href={`/show/?id=${character?.id}`}>
          <div
            className={`flex group cursor-pointer overflow-hidden rounded-lg border transition-transform duration-200 ease-in-out hover:scale-[1.01] ${
              theme === 'light' ? 'bg-white' : 'bg-black text-white'
            }`}
          >
            {character.image !== '' && (
              <img
                className="object-cover max-w-[150px]"
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

  // Loader animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: hermioneAnim,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  useEffect(() => {
    {
      reduxTheme && setTheme(reduxTheme)
    }
  }, [reduxTheme])

  return (
    <>
      <div className="grid grid-cols-1 gap-3 py-2 pb-10 sm:grid-cols-2 md:gap-6 md:py-10 lg:grid-cols-3 px-3">
        {characters ? (
          displayPage
        ) : (
          <div className="flex justify-center items-center h-screen">
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        )}
      </div>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        pageCount={totalPages}
        onPageChange={changePage}
        containerClassName={'navigationButtons'}
        previousLinkClassName={'previousButton'}
        nextLinkClassName={'nextButton'}
        disabledClassName={'navigationDisabled'}
        activeClassName={'navigationActive'}
        marginPagesDisplayed={
          document.documentElement.clientWidth > 425 ? 2 : 0
        } /* hide page numbers on smaller device */
        pageRangeDisplayed={document.documentElement.clientWidth > 425 ? 2 : 0}
      />
    </>
  )
}

export default Character
