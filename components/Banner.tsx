import { useSelector } from 'react-redux'
interface State {
  theme?: string
}

const Banner = () => {
  const theme = useSelector((state: State) => state.theme)

  return (
    <div className="bg-[#740001]">
      <div className="mx-auto flex max-w-7xl h-[300px] md:h-[500px] items-center justify-between border-y border-black bg-[#740001] pt-28 pb-10 lg:pt-20 lg:pb-0 xl:border-hidden">
        <div className="space-y-5 px-10 lg:py-6">
          <h1 className="md:7xl ma-w-xl w-11/12 font-serif text-6xl sm:w-9/12">
            Potter Insight
          </h1>
          <h2 className="w-9/12 font-normal">
            Everything you need to know about Harry Potter and so much more!
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Banner
