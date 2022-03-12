import Link from 'next/link'
import { Characters } from '../typings'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'

interface Props {
  characters: [Characters]
  selected: number
}

interface State {
  theme: string
}

const Character = ({ characters }: Props) => {
  const theme = useSelector((state: State) => state.theme)
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
        <Link key={character.id} href={`/character/?id=${character.id}`}>
          <div
            className={`flex group cursor-pointer overflow-hidden rounded-lg border ${
              theme === 'light' ? 'bg-white' : 'bg-black text-white'
            }`}
          >
            {character.image !== '' && (
              <img
                className="h-60 object-contain transition-transform duration-200 ease-in-out group-hover:scale-105"
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

  return (
    <>
      <div className="grid grid-cols-1 gap-3 py-2 sm:grid-cols-2 md:gap-6 md:py-6 lg:grid-cols-3">
        {characters && displayPage}
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
