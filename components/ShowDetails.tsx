import { Characters } from '../typings'
interface Props {
  character: Characters
}

// Display conditionnaly the character details if specified
const ShowDetails = ({ character }: Props) => {
  console.log('CharacterDetails :', character)
  return (
    <main className="flex flex-grow justify-center items-center">
      <div className="flex flex-col w-full justify-between items-start sm:flex-row">
        {character?.image !== '' && (
          <img
            className="w-full h-96 my-3 object-contain"
            src={character?.image}
            alt={character?.name}
          />
        )}

        <article
          className={`mx-auto px-5 flex flex-col justify-center items-center ${
            character?.image !== '' && 'min-w-[50%]'
          }`}
        >
          <div className="flex flex-col justify-between items-start">
            <h1 className="flex flex-col mb-5 text-5xl font-semibold">
              {character?.name}
              {character?.house !== '' && (
                <span className="mb-3 text-base font-extralight italic text-gray-500">
                  from {character?.house}
                </span>
              )}
            </h1>
            <div className="my-5">
              <h2 className="mb-3 font-semibold">Desription :</h2>
              {character?.alternate_names.length > 0 && (
                <p>
                  Also called{' '}
                  <span className="font-light italic">
                    {character?.alternate_names?.join(', ')}
                  </span>
                </p>
              )}
              <p>
                {character?.gender === 'female' ? 'She' : 'He'}'s
                {character?.species !== '' &&
                  ` a ${character?.species} ${
                    character?.gender && character?.gender
                  }`}
                {character?.dateOfBirth !== '' &&
                  `, born ${character?.dateOfBirth}.`}
              </p>
              {character?.actor !== '' && (
                <p>
                  Played by{' '}
                  <span className="font-light italic">{character?.actor}</span>
                  {character?.alternate_actors?.length > 0 ? (
                    <p>
                      also played by {character?.alternate_actors?.join(', ')}
                    </p>
                  ) : (
                    '.'
                  )}
                </p>
              )}
              <p>
                Oh, by the way {character?.gender === 'female' ? 'she' : 'he'}
                's
                {character?.alive ? ' still alive' : ' currently dead'}
              </p>
            </div>
            <div className="mt-5">
              <h3 className="font-semibold mb-3">Also know specificities :</h3>
              <p>
                {character?.alive ? 'Currently ' : 'Used to '}
                {character?.wizard
                  ? character?.alive
                    ? 'a wizard '
                    : 'be a wizard '
                  : character?.alive
                  ? 'not a wizard, '
                  : 'not be a wizard, '}
                {character?.ancestry !== '' &&
                  `from ${character?.ancestry} ancestry.`}
                <br />
                {character?.hogwartsStaff &&
                  'Known as a staff member of Hogwarts.'}
                {character?.hogwartsStudent &&
                  'Known as a student of Hogwarts.'}
              </p>
              <ul>
                {character?.eyeColour !== '' && (
                  <li>{`Eye colour: ${character?.eyeColour}`}</li>
                )}
                {character?.hairColour !== '' && (
                  <li>{`Hair colour: ${character?.hairColour}`}</li>
                )}
                {(character?.wand?.wood !== '' ||
                  character?.wand?.core !== '' ||
                  character?.wand[length] > 0) && (
                  <li>
                    Wand:{' '}
                    {character?.wand?.wood !== '' &&
                      character?.wand?.wood + ' wood '}
                    {character?.wand?.core !== '' &&
                      character?.wand?.core + ' core '}
                    {character?.wand[length] > 0 &&
                      character?.wand[length] + ' long'}
                  </li>
                )}

                {character?.patronus !== '' && (
                  <li>{`Patronus: ${character?.patronus}`}</li>
                )}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}

export default ShowDetails
