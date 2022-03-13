import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadTheme } from '../store'
import { FaMoon } from 'react-icons/fa'
import { BiSun } from 'react-icons/bi'

interface State {
  theme?: string
}

const Footer = () => {
  const [theme, setTheme] = useState('dark')
  const reduxTheme = useSelector((state: State) => state.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    {
      reduxTheme && setTheme(reduxTheme)
    }
    console.log('reduxTheme :', reduxTheme, 'theme: ', theme)
  }, [reduxTheme])

  const toggleTheme = () => {
    if (theme === 'light') {
      dispatch(loadTheme('dark'))
    } else {
      dispatch(loadTheme('light'))
    }
  }

  return (
    <>
      <div className="font-normal text-[#757575] flex justify-center">
        <ul className="flex justify-between p-10 text-sm w-[80%]">
          <li className="cursor-pointer hover:underline">Help</li>
          <li className="cursor-pointer hover:underline">Status</li>
          <li className="cursor-pointer hover:underline">Writers</li>
          <li className="cursor-pointer hover:underline">Blog</li>
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
