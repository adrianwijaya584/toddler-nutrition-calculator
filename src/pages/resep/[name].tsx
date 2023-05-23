import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import recipeJson from "@/data/resep.json"
import Link from "next/link"
import { Button } from "flowbite-react"
import Image from "next/image"

const RecipeDetailPage= ()=> {
  type recipeType= typeof recipeJson[0]
  const route= useRouter()
  const [isLoading, setIsLoading]= useState(true)
  const [recipe, setRecipe]= useState<recipeType | undefined>(undefined)

  useEffect(()=> {
    const findRecipe= recipeJson.find((recipe)=> recipe.nama==(route.query.name ?? ''))
    setRecipe(findRecipe)

    setIsLoading(false)
  }, [route.query])

  return (
    <div className="w-full m-auto min-h-screen flex flex-row justify-center lg:w-4/5 xl:w-3/5">
      {
        isLoading?
          <div>
            <p>Mengambil data resep...</p>
          </div>:

          <div className="w-full px-4">
          {
            !recipe?
              <div>
                <p>Maaf resep tidak ditemukan</p>
                <Link href="/resep">
                  <Button>Kembali ke halaman resep</Button>
                </Link>
              </div>:
              <div>
                <Image src="https://www.seriouseats.com/thmb/e-nROXUuxOt0NIb39WL3FpTRkPc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2019__09__20190530-ramen-noodles-vicky-wasik-76-ad495b42ee784ad7bb7e2affa7d57d50.jpg" alt={`Gambar ${recipe.nama}`} width={800} height={200} className="w-full h-[350px] object-cover object-center rounded-md"  />

                <h1 className="font-bold text-2xl">{recipe.nama}</h1>
                <p>Porsi {recipe.Porsi}</p>
                <p>Umur {recipe.Usia} {recipe.Usia=='12'&&'keatas'}</p>
                <p>Waktu Memasak {recipe["Waktu memasak"]}</p>

                <h3 className="font-bold">Kandungan per Porsi</h3>
                <ol className="list-decimal pl-8">
                  {recipe.KandunganPerPorsi.map((kandungan, k)=> (
                    <li key={k}>{kandungan}</li>
                  ))}
                </ol>

                <h3 className="font-bold">Fakta Menarik</h3>
                <p>{recipe.funFacts}</p>
                <h3 className="font-bold text-xl">Bahan</h3>
                <ul className="list-decimal pl-10">
                  {recipe.bahan.map((bahan, k)=> (
                    <li key={k}>{bahan}</li>
                  ))}
                </ul>

                {
                  recipe.bumbu_halus&&
                  <>
                    <h3 className="font-bold">Bumbu Halus</h3>
                    <ol>
                      {recipe.bumbu_halus.map((bumbu, k)=> (
                        <li className="" key={k}>{bumbu}</li>
                      ))}
                    </ol>
                  </>
                }

                <h3 className="font-bold">Cara Memasak</h3>                
                <ul className="list-decimal pl-8">
                  {recipe.tutorial.map((tutorial, k)=> (
                    <li key={k}>{tutorial}</li>
                  ))}
                </ul>
              </div>
          }
          </div>
      }
    </div>
  )
}

export default RecipeDetailPage