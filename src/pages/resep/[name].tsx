import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import recipeJson from "@/data/resep.json"
import Link from "next/link"
import { Breadcrumb, Button } from "flowbite-react"
import { IconType } from "react-icons"
import {FaUtensils} from 'react-icons/fa'
import ArticleLayout from "@/layouts/ArticleLayout"

interface SocialMediaBtnType {
  Icon: IconType
  href: string
  title: string
  className: string
}

const SocialMediaBtn= ({Icon, href, title, className}: SocialMediaBtnType)=> {
  return (
    <a target="_blank" rel="noreferrer" href={href} title={title} className={`${className} w-[45px] h-[45px] flex justify-center items-center text-white rounded-full`}>        
      <Icon className="text-2xl"/>
    </a>
  )
}

const RecipeDetailPage= ()=> {
  type recipeType= typeof recipeJson[0]
  const route= useRouter()
  const [currentUrl, setCurrentUrl]= useState('') 
  const [nutritionFacts, setNutritionFacts]= useState<string[][]>([]) 
  const [isLoading, setIsLoading]= useState(true)
  const [recommendedRecipe, setRecommendedRecipe]= useState<RecomendationArticles[]>([])
  const [recipe, setRecipe]= useState<recipeType | undefined>(undefined)

  useEffect(()=> {
    const findRecipe= recipeJson.find((recipe)=> recipe.nama==(route.query.name ?? ''))
    setRecipe(findRecipe)

    setCurrentUrl(encodeURI(window.location.href))
    
  }, [route.query])

  useEffect(()=> {
    setIsLoading(false)

    if (recipe) {      
      setNutritionFacts(recipe.KandunganPerPorsi.map((kandungan)=> {
        const nutritions= kandungan.split(' ')
        const nutrition= nutritions.pop() ?? ''

        return [nutritions.join(' '), nutrition]
      }))

      const recommendation: RecomendationArticles[]= recipeJson.filter((recipeData)=> recipeData.Usia==recipe.Usia && recipeData.nama!=route.query.name).map(
        (recipe)=> ({
          title: recipe.nama,
          headline: recipe.funFacts
        })
      )

      setRecommendedRecipe(recommendation)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe])

  return (
    <div className="px-6 pt-4 lg:px-24 xl:px-36">
    
      {
        isLoading?
          <div>
            <p>Mengambil data resep...</p>
          </div>:

          <div className="w-full">
          {
            !recipe?
              <div>
                <p>Maaf resep tidak ditemukan</p>
                <Link href="/resep">
                  <Button>Kembali ke halaman resep</Button>
                </Link>
              </div>:
              <div className="">
                <Breadcrumb
                  className="mb-6"
                >
                  <Breadcrumb.Item>
                    <Link href="/resep"
                      className="text-black flex items-center gap-x-2"
                    >
                      <FaUtensils/> Resep MPASI
                    </Link>
                  </Breadcrumb.Item>

                  <Breadcrumb.Item>
                    <Link href={`/resep?umur=${recipe.Usia}`}
                      className="text-black flex items-center gap-x-2"
                    >
                      {recipe.Usia} {recipe.Usia!='Semua'?'bulan':'usia'} {recipe.Usia=='12'&&'ke atas'}
                    </Link>
                  </Breadcrumb.Item>

                  <Breadcrumb.Item>
                    {recipe.nama}
                  </Breadcrumb.Item>
                </Breadcrumb>

                <ArticleLayout
                  baseUrl="/resep"
                  data={{
                    title: recipe.nama,
                    headline: recipe.funFacts
                  }}
                  recomendations={recommendedRecipe}
                >
                  <div className="bg-gray-500 rounded-md p-5 grid grid-cols-2  lg:grid-cols-3">
                      <div className="">
                        <h2 className="font-bold">Waktu Memasak :</h2>
                        <p>{recipe["Waktu memasak"]}</p>
                      </div>

                      <div className="">
                        <h2 className="font-bold">Porsi :</h2>
                        <p>{recipe.Porsi}</p>
                      </div>

                      <div className="">
                        <h2 className="font-bold">Usia :</h2>
                        <p>{recipe.Usia} {recipe.Usia!='Semua'?'bulan':'usia'} {recipe.Usia=='12'&&'ke atas'}</p>
                      </div>

                  </div>

                  <h1
                    className="font-bold text-3xl"
                  >
                    Bahan
                  </h1>
                  <ul
                    className="list-disc pl-5 space-y-2"
                  >
                    {
                      recipe.bahan.map((bahan, k)=> (
                        <li
                          key={k}
                        >
                          {bahan}
                        </li>
                      ))
                    }
                  </ul>

                  {
                    recipe.bumbu_halus&&
                    <>
                      <h1
                        className="font-bold text-3xl"
                      >
                        Bumbu Halus
                      </h1>
                      <ul
                        className="list-disc pl-5 space-y-2"
                      >
                        {
                          recipe.bumbu_halus.map((bumbu, k)=> (
                            <li
                              key={k}
                            >
                              {bumbu}
                            </li>
                          ))
                        }
                      </ul>
                    </>
                  }

                  <h1
                    className="font-bold text-3xl"
                  >
                    Cara Memasak
                  </h1>

                  {
                    recipe.tutorial.map((tutorial, k)=>(
                      <div key={k}>
                        <h3 className="font-bold mb-1">Langkah {k+1}</h3>
                        <p className="pr-14 lg:pr-2">{tutorial}</p>
                      </div>
                    ))
                  }

                  <hr className="border-1 border-gray-300" />

                  <h1
                    className="font-bold text-3xl"
                  >
                    Nutrition Facts <span className="text-sm font-normal">(per sajian)</span>
                  </h1>

                  <div className="grid grid-cols-3 gap-5 md:grid-cols-4 md:gap-7">
                    {
                      nutritionFacts.map((nutritions, k)=> (
                        <div key={k}>
                          <h3 className="font-bold mb-1">{nutritions[0]}</h3>
                          <p>{nutritions[1]}</p>
                        </div>
                      ))
                    }
                  </div>
                </ArticleLayout>
              </div>
          }
        </div>
      }
    </div>
  )
}

export default RecipeDetailPage