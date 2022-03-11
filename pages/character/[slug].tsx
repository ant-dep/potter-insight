import Head from 'next/head'
import { GetStaticProps } from 'next'
import Header from '../../components/Header'
import { Characters } from '../../typings'
import { Toaster } from 'react-hot-toast'
import Footer from '../../components/Footer'
import { useSelector } from 'react-redux'

interface Props {
  character: Characters
}

interface State {
  theme: string
}

const Character = ({ character }: Props) => {
  const theme = useSelector((state: State) => state.theme)

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Head>
        <title>{character.name}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header minScroll={0} />
      <main className={`${theme === 'dark' && 'bg-black text-white'}`}>
        {character.image !== '' && (
          <img
            className="h-38 mt-20 w-full object-cover"
            src={character?.image}
            alt={character?.name}
          />
        )}

        <article className="mx-auto max-w-3xl p-5">
          <h1 className="mt-10 mb-3 text-3xl">{character?.name}</h1>
          {character?.house !== '' && (
            <h2 className="mb-3 text-xl font-light text-gray-500">
              from {character?.house}
            </h2>
          )}

          <div className="flex items-center space-x-2">
            <h3>Desription :</h3>
            {character?.alternate_names.length > 0 && (
              <p className="text-sm font-extralight">
                Also called {character?.alternate_names?.join(', ')}
              </p>
            )}
            <p>
              {character.gender === 'female' ? 'She' : 'He'}'s
              {character.species !== '' && `${character.species}, `}
              {character.gender && `${character.gender}, `}
              {character.dateOfBirth !== '' &&
                `born ${character.dateOfBirth}, `}
            </p>
            {character.actor !== '' && <p>{`Played by ${character.actor}`}</p>}
            {character.alternate_actors.length > 0 ? (
              <p>also played by {character.alternate_actors.join(', ')}</p>
            ) : (
              '.'
            )}
            <p>
              Oh, by the way {character.gender === 'female' ? 'She' : 'He'}'s
              {character.alive ? ' still alive' : ' currently dead'}
            </p>
          </div>
          <div>
            <h4>Also know specificities :</h4>
            <p>
              {character.alive ? 'Currently ' : 'Used to '}
              {character.wizard
                ? character.alive
                  ? 'is a wizard, '
                  : 'be a wizard, '
                : character.alive
                ? 'not a wizard, '
                : 'not be a wizard, '}
              {character.ancestry !== '' &&
                `from ${character.ancestry} ancestry.`}{' '}
              {character.hogwartsStaff &&
                'Known as a staff member of Hogwarts.'}
              {character.hogwartsStudent && 'Known as a student of Hogwarts.'}
            </p>
            <ul>
              <li></li>
              {character.eyeColour !== '' && (
                <li>{`Eye colour: ${character.eyeColour}`}</li>
              )}
              {character.hairColour !== '' && (
                <li>{`Hair colour: ${character.hairColour}`}</li>
              )}
              {character.wand?.wood !== '' ||
                character.wand?.core !== '' ||
                (character.wand[length] > 0 && (
                  <li>
                    wand:
                    <ul>
                      {character.wand?.wood !== '' && (
                        <li>`wood: ${character.wand?.wood}`</li>
                      )}
                      {character.wand?.core !== '' && (
                        <li>`core: ${character.wand?.core}`</li>
                      )}
                      {character.wand[length] > 0 && (
                        <li>`length: ${character.wand[length]}`</li>
                      )}
                    </ul>
                  </li>
                ))}
              {character.patronus !== '' && (
                <li>{`Patronus: ${character.patronus}`}</li>
              )}
              {character.eyeColour !== '' && (
                <li>{`eye colour: ${character.eyeColour}`}</li>
              )}
            </ul>
          </div>
        </article>

        <Footer />
      </main>
    </>
  )
}

export default Character

// fetch data with current slugghy
export const getStaticPaths = async () => {
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

  const paths = characters.map((character: Characters) => ({
    params: {
      slug: character.name,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

// get props for post from params
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const character = await fetch(
    `https://hp-api.herokuapp.com/api/characters/${params}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  if (!character) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      character,
    },
    revalidate: 60,
  }
}
