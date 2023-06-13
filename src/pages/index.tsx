import { useEffect, useState } from 'react';
import { Card } from "flowbite-react"
import Image from 'next/image'
import Link from 'next/link'
import Aos from 'aos'
import DoctorImage from 'public/images/dokter-min.png'
import ArticleJson from '@/data/artikel.json'

import TncLogo from '~/icons/tnc_logo.png'
import 'aos/dist/aos.css'

type ArticleType= typeof ArticleJson[0]

const Home= ()=> {
  const [articles, setArticles]= useState<ArticleType[]>([])

  useEffect(()=> {
    Aos.init()

    setArticles(ArticleJson.slice(1))
  }, [])

  return (
    <div className="flex flex-col space-y-[70px]">
      <div className="jumbotron w-full h-[calc(100vh-70px)] bg-[#EAF7FF]">
        <div className="container h-full mx-auto flex flex-row px-6 lg:space-x-8 lg:px-12 xl:px-24">
          <div className="flex flex-col justify-center items-center space-y-5 w-full lg:w-[50%] lg:items-start" data-aos="fade-right">
            <Image
              className="block lg:hidden"
              src={TncLogo}
              width={150}
              height={150}
              alt="Logo TNC"
            />
            <h1 
              className="font-bold text-2xl leading-normal font-suisseNeue text-center md:text-3xl lg:text-left lg:text-4xl xl:text-5xl lg:leading-snug xl:leading-normal"
            >
              Hai Moms yuk ukur <br className="hidden xl:block" /> Gizi balitamu.
            </h1>
            <h2 className="font-semibold text-lg leading-normal text-center lg:text-left lg:text-xl xl:text-2xl">dan mulai terapkan <br className="hidden xl:block" /> nutrisi yang tepat!</h2>

            <div className="flex flex-row space-x-3">
              <Link href="/psg">
                <button className="text-white text-sm bg-primary-1 font-semibold rounded-md h-12 px-4  duration-500 hover:bg-blue-700 md:text-base">
                  Hitung Status Gizi
                </button>
              </Link>

              <Link href="/resep">
                <button className="text-white text-sm bg-primary-2 font-semibold rounded-md h-12 px-4 duration-500 hover:bg-blue-700 md:text-base">
                  Resep MPASI  
                </button>
              </Link>
            </div>
          </div>

          <div className="relative hidden items-center lg:flex lg:w-[50%]" data-aos="fade-left">
            <Image
              src={DoctorImage}
              alt="Gambar dokter"
              priority={true}
              fill
              sizes="(max-width: 500px) 0vw, (max-width: 800px) 30vw, (max-width: 1200px) 40vw, 50vw"
              className="relative h-auto"
            />
          </div>
        </div>
      </div>

      <article className="container mx-auto px-6 lg:px-12 xl:px-24">
        <div className="" data-aos="fade-up">
          <div className="text-center">
            <h1 className="text-[#3056D3] font-bold text-base">Rekomendasi Artikel</h1>
            <h2 className="font-bold text-3xl mt-1 mb-4 md:text-4xl">Apakah moms tahu?</h2>
            <p className="mx-auto text-[#637381] text-sm md:w-3/4 md:text-base xl:w-1/2"> Menurut data survei status gizi indonesia pada tahun 2022 terdapat 4 permasalahan gizi balita di indonesia. Daripada bingung, yuk cari tahu tentang permasalahan gizi pada balita.</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-12">
            <div className="main">
              <Link href={`/artikel/${ArticleJson[0].title}`}>
                <Card className="h-full">
                  <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[350px] xl:h-[450px]">
                    <Image
                      src={ArticleJson[0].imageUrl}
                      alt="gambar artikel"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 40vw, (max-width: 1200px) 50vw, 60vw"
                    />
                  </div>

                  <h3 className="line-clamp-2 font-bold text-xl leading-snug duration-500 hover:text-primary-2">{ArticleJson[0].title}</h3>
                  <p className="line-clamp-3 text-paragraph text-sm">{ArticleJson[0].headline}</p>
                </Card>
              </Link>
            </div>

            <div className="aside flex flex-col space-y-4">
              {articles.map((article, k)=> (
                <Link href={`/artikel/${article.title}`} key={k}>
                  <Card>
                    <div className="flex flex-col md:flex-row md:space-x-3">
                      <div className="relative w-full h-[250px] bg-red-300 md:h-[130px] md:w-[40%] xl:h-[150px]">
                        <Image
                          src={article.imageUrl}
                          alt="gambar artikel"
                          sizes="(max-width: 768px) 40vw, (max-width: 1200px) 50vw, 60vw"
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="mt-5 md:mt-0 md:w-[60%]">
                        <h3 className="line-clamp-2 font-bold text-xl leading-snug duration-500 hover:text-primary-2">{article.title}</h3>
                        <p className="line-clamp-3 mt-4 text-[#637381] text-sm">{article.headline}</p>  
                      </div>
                    </div>  
                  </Card>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </article>

    </div>
  )
}

export default Home