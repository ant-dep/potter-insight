import { Characters } from '../typings'

interface Props {
  character: Characters
}

const CharacterDetails = ({ character }: Props) => {
  console.log('CharacterDetails :', character)
  return (
    <>
      {character?.image !== '' && (
        <img
          className="w-full h-96 pt-1 object-contain"
          src={character?.image}
          alt={character?.name}
        />
      )}

      <article className="mx-auto px-5 flex flex-col justify-between min-w-[50%]">
        <h1 className="flex flex-col mb-3 text-3xl font-semibold">
          {character?.name}
          {character?.house !== '' && (
            <span className="mb-3 text-base font-extralight italic text-gray-500">
              from {character?.house}
            </span>
          )}
        </h1>

        <h2 className="mb-5 font-semibold">Desription :</h2>
        {character?.alternate_names.length > 0 && (
          <p className="text-sm font-extralight">
            Also called {character?.alternate_names?.join(', ')}
          </p>
        )}
        <p>
          {character?.gender === 'female' ? 'She' : 'He'}'s
          {character?.species !== '' &&
            ` a ${character?.species} ${character?.gender && character?.gender}
                  , `}
          {character?.dateOfBirth !== '' && `born ${character?.dateOfBirth}.`}
        </p>
        {character?.actor !== '' && (
          <p>
            {`Played by ${character?.actor}`}
            {character?.alternate_actors?.length > 0 ? (
              <p>also played by {character?.alternate_actors?.join(', ')}</p>
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
        <div className="mt-4">
          <h3 className="font-semibold mb-3">Also know specificities :</h3>
          <p>
            {character?.alive ? 'Currently ' : 'Used to '}
            {character?.wizard
              ? character?.alive
                ? 'a wizard, '
                : 'be a wizard, '
              : character?.alive
              ? 'not a wizard, '
              : 'not be a wizard, '}
            {character?.ancestry !== '' &&
              `from ${character?.ancestry} ancestry.`}
            <br />
            {character?.hogwartsStaff && 'Known as a staff member of Hogwarts.'}
            {character?.hogwartsStudent && 'Known as a student of Hogwarts.'}
          </p>
          <ul>
            {character?.eyeColour !== '' && (
              <li>{`Eye colour: ${character?.eyeColour}`}</li>
            )}
            {character?.hairColour !== '' && (
              <li>{`Hair colour: ${character?.hairColour}`}</li>
            )}
            {character?.wand?.wood !== '' ||
              character?.wand?.core !== '' ||
              (character?.wand[length] > 0 && (
                <li>
                  wand:
                  <ul>
                    {character?.wand?.wood !== '' && (
                      <li>`wood: ${character?.wand?.wood}`</li>
                    )}
                    {character?.wand?.core !== '' && (
                      <li>`core: ${character?.wand?.core}`</li>
                    )}
                    {character?.wand[length] > 0 && (
                      <li>`length: ${character?.wand[length]}`</li>
                    )}
                  </ul>
                </li>
              ))}
            {character?.patronus !== '' && (
              <li>{`Patronus: ${character?.patronus}`}</li>
            )}
          </ul>
        </div>
      </article>
    </>
  )
}

export default CharacterDetails
