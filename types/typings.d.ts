/* exporting interfaces to access them everywhere
 * instead of defining them in each file
 */

export interface Characters {
  id: number
  name: string
  alternate_names?: Array
  species?: string
  gender?: string
  house?: string
  dateOfBirth?: string
  yearOfBirth?: number | undefined
  wizard?: boolean
  ancestry?: string
  eyeColour?: string
  hairColour?: string
  wand?: any
  wood?: string
  core?: string
  length?: number | undefined
  patronus?: string
  hogwartsStudent?: boolean
  hogwartsStaff?: boolean
  actor?: string
  alternate_actors?: Array
  alive?: boolean
  image?: string
}

declare module 'react-reveal' {
  export const Zoom: React.FC
}
