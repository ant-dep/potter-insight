import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
interface State {
  theme?: string
}
interface Scroll {
  minScroll: number
}

// terneray : minScroll == 0 refers to character page. show refers to scrolling event
const Header = ({ minScroll }: Scroll) => {
  const [show, handleShow] = useState(false)
  const theme = useSelector((state: State) => state.theme)

  // background color change on scroll on main page
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > minScroll) {
        handleShow(true)
      } else handleShow(false) // if not 100px down
    })
    return () => {
      window.removeEventListener('scroll', () => {})
    }
  }, [])

  return (
    <header
      className={`fixed left-0 top-0 z-50 flex w-full border-b border-black ${
        minScroll === 0
          ? // slug page
            theme === 'light'
            ? 'bg-white'
            : 'bg-black'
          : // home page
          theme === 'dark'
          ? show && 'bg-black'
          : show && 'bg-white'
      }`}
    >
      <nav
        className={`mx-auto flex w-full max-w-7xl justify-between p-3 ${
          theme === 'dark' && (minScroll == 0 || show) && 'text-white'
        }`}
      >
        <div className="flex items-center space-0">
          <Link href="/">
            <img
              className="w-44 h-10 cursor-pointer object-contain"
              src={`${
                theme === 'light'
                  ? '/logo.png'
                  : minScroll == 0 || show
                  ? '/logo-white.png'
                  : '/logo.png'
              }`}
              alt="logo"
            />
          </Link>
          <div className="hidden cursor-pointer items-center space-x-10 md:inline-flex">
            <h3 className="transition duration-100 active:scale-90 cursor-pointer">
              About
            </h3>
            <h3 className="transition duration-100 active:scale-90 cursor-pointer">
              Contact
            </h3>
            <h3 className="transition duration-100 active:scale-90 cursor-pointer">
              Follow
            </h3>
          </div>
        </div>

        <div className="hidden cursor-pointer items-center space-x-10 sm:flex">
          <h3 className="transition duration-100 active:scale-90 cursor-pointer">
            Sign In
          </h3>
          <h3
            className={`rounded-full px-5 py-2 text-sm text-white transition duration-300 active:scale-90 cursor-pointer ${
              show || minScroll == 0 ? 'bg-[#D3A625]' : 'bg-black'
            }`}
          >
            Get Started
          </h3>
        </div>
      </nav>
    </header>
  )
}

export default Header
