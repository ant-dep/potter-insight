import { useSelector, useDispatch } from 'react-redux'
import { loadTheme } from '../store'
import { FaMoon } from 'react-icons/fa'
import { BiSun } from 'react-icons/bi'
interface State {
  theme?: string
}

const Footer = () => {
  const theme = useSelector((state: State) => state.theme)
  const dispatch = useDispatch()

  // theme toggler from footer
  const toggleTheme = () => {
    if (theme === 'light') {
      dispatch(loadTheme('dark'))
    } else {
      dispatch(loadTheme('light'))
    }
  }

  return (
    <div className="font-normal text-[#757575] flex justify-center">
      <ul className="flex justify-between items-center p-10 text-sm w-[80%] flex-col sm:flex-row max-w-[1200px] mx-auto">
        <li className="cursor-pointer hover:underline p-2">Help</li>
        <li className="cursor-pointer hover:underline p-2">Status</li>
        <li className="cursor-pointer hover:underline p-2">Writers</li>
        <li className="cursor-pointer hover:underline p-2">Blog</li>
        <li className="cursor-pointer hover:underline p-2">Privacy</li>
        <li className="cursor-pointer hover:underline p-2">Terms</li>
        <li className="cursor-pointer hover:underline p-2">About</li>
        <li className="cursor-pointer hover:underline p-2">Knowable</li>
        <li
          className="cursor-pointer hover:underline p-2"
          onClick={() => {
            toggleTheme()
          }}
        >
          {theme === 'light' ? <FaMoon /> : <BiSun />}
        </li>
      </ul>
    </div>
  )
}

export default Footer
