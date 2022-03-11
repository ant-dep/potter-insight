import { FaMoon } from 'react-icons/fa'
import { BiSun } from 'react-icons/bi'
import { useSelector, useDispatch } from 'react-redux'
import { loadTheme } from '../store'

interface State {
  theme?: string
}

const Footer = () => {
  const theme = useSelector((state: State) => state.theme)
  console.log(theme)
  const dispatch = useDispatch()

  const toggleTheme = () => {
    if (theme === 'light') {
      dispatch(loadTheme('dark'))
    } else {
      dispatch(loadTheme('light'))
    }
  }

  return (
    <>
      <div className="font-normal text-[#757575] sm:flex sm:justify-end">
        <ul className="grid grid-cols-2 justify-items-center gap-y-4 p-10 text-sm sm:flex sm:items-center sm:gap-x-4 ">
          <li className="cursor-pointer hover:underline">Help</li>
          <li className="cursor-pointer hover:underline">Status</li>
          <li className="cursor-pointer hover:underline">Writers</li>
          <li className="cursor-pointer hover:underline">Blog</li>
          <li className="cursor-pointer hover:underline">Careers</li>
          <li className="cursor-pointer hover:underline">Privacy</li>
          <li className="cursor-pointer hover:underline">Terms</li>
          <li className="cursor-pointer hover:underline">About</li>
          <li className="cursor-pointer hover:underline">Knowable</li>
          <li
            className="cursor-pointer hover:underline"
            onClick={() => {
              toggleTheme()
            }}
          >
            {theme === 'light' ? <FaMoon /> : <BiSun />}
          </li>
        </ul>
      </div>
    </>
  )
}

export default Footer
