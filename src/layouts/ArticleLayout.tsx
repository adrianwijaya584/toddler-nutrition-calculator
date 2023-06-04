import Link from "next/link"
import { PropsWithChildren } from "react"
import {FaArrowRight} from 'react-icons/fa'

interface ArticleLayoutData {
  baseUrl: string
  data: {
    title: string
    headline: string
    imageUrl?: string
  }
  recomendations: RecomendationArticles[]
}

const ArticleLayout= (props: PropsWithChildren<ArticleLayoutData>)=> {
  const {data}= props

  return (
    <div className="container mx-auto">
      <div className="title space-y-5">
        <h1 className="font-bold text-2xl md:text-4xl">{data.title}</h1>
        <p className="leading-relaxed text-paragraph font-semibold md:w-[60%]">{data.headline}</p>
      </div>

      <div className="flex flex-col space-y-12 mt-8 lg:space-y-0 lg:flex-row lg:space-x-10">
        <div className="space-y-6 lg:w-[60%] ">
          <div className="h-[300px] w-full bg-gray-400 rounded-md"></div>
          {props.children}
        </div>

        <div className="space-y-7 right-0 h-fit lg:sticky lg:top-[80px] lg:md:w-[40%] ">
          {
            props.recomendations.map((recomendation, k)=> (
              <div 
                key={k}
                className="space-y-2 border border-gray-200 py-4 px-6 rounded-md"
              >
                <h2 className="font-bold text-xl line-clamp-2">{recomendation.title}</h2>
                <p className="line-clamp-2 text-paragraph leading-loose md:pr-5 ">{recomendation.headline}</p>
                <Link 
                  href={`${props.baseUrl}/${recomendation.title}`}
                  className="flex items-center text-paragraph gap-x-2"
                >
                  Baca Lebih Banyak <FaArrowRight/>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ArticleLayout
