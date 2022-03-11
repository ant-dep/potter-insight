import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
interface State {
  theme?: string
}
interface Scroll {
  minScroll: number
}

// terneray : minScroll == à refers to slug page. show refers to scrolling event

const Header = ({ minScroll }: Scroll) => {
  const [show, handleShow] = useState(false)
  const theme = useSelector((state: State) => state.theme)

  // background color change on scroll
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
      className={`fixed left-0 top-0 flex w-full border-b border-black ${
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
        className={`mx-auto flex w-full max-w-7xl justify-between p-5 ${
          theme === 'dark' && (minScroll == 0 || show) && 'text-white'
        }`}
      >
        <div className="flex items-center space-x-5">
          <Link href="/">
            <img
              className="w-44 cursor-pointer object-contain"
              src={`${
                theme === 'light'
                  ? '/logo.png'
                  : minScroll == 0 || show
                  ? '/logo-white.png'
                  : '/logo.png'
              }`}
              alt=""
            />
          </Link>
          <div className="hidden cursor-pointer items-center space-x-5 md:inline-flex">
            <h3 className="transition duration-100 active:scale-90">About</h3>
            <h3 className="transition duration-100 active:scale-90">Contact</h3>
            <h3 className="transition duration-100 active:scale-90">Follow</h3>
          </div>
        </div>

        <div className="hidden cursor-pointer items-center space-x-5 sm:flex">
          <h3 className="transition duration-100 active:scale-90">Sign In</h3>
          <h3
            className={`rounded-full px-5 py-2 text-sm text-white transition duration-300 active:scale-90 ${
              show ? 'bg-green-600' : 'bg-black'
            } ${minScroll == 0 && !show && 'border-white border'}`}
          >
            Get Started
          </h3>
        </div>
      </nav>
    </header>
  )
}

export default Header
