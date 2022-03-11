import Link from 'next/link'
import { Characters } from '../typings'
import { useSelector } from 'react-redux'

interface Props {
  characters: [Characters]
}

interface State {
  theme: string
}

const Character = ({ characters }: Props) => {
  console.log('characters', characters)
  const theme = useSelector((state: State) => state.theme)

  return (
    <div className="grid grid-cols-1 gap-3 py-2 sm:grid-cols-2 md:gap-6 md:py-6 lg:grid-cols-3">
      {characters &&
        characters.map((character, index) => (
          <Link key={character.name} href={`/character/${index}`}>
            <div
              className={`group cursor-pointer overflow-hidden rounded-lg border ${
                theme === 'light' ? 'bg-white' : 'bg-black text-white'
              }`}
            >
              {character.image !== '' && (
                <img
                  className="h-96 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                  src={character.image}
                  alt={character.name}
                />
              )}
              <div className="flex justify-between p-5">
                <div>
                  <p className="text-lg font-bold">{character.name}</p>
                  {character.house !== '' && (
                    <p className="text-xs">{character.house}</p>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default Character
