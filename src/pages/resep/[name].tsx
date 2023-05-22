import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import recipeJson from "@/data/resep.json"
import Link from "next/link"
import { Button } from "flowbite-react"

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
    <div className="container px-4 min-h-screen">
      {
        isLoading?
          <div>
            <p>Mengambil data resep...</p>
          </div>:

          <div>
          {
            !recipe?
              <div>
                <p>Maaf resep tidak ditemukan</p>
                <Link href="/resep">
                  <Button>Kembali ke halaman resep</Button>
                </Link>
              </div>:
              <div>
                <p>{recipe.nama}</p>
                <p>Porsi {recipe.Porsi}</p>
                <p>Umur {recipe.Usia} {recipe.Usia=='12'&&'keatas'}</p>
                <p>Waktu Memasak {recipe["Waktu memasak"]}</p>
                <p>{recipe.KandunganPerPorsi.join(' ')}</p>
                <p>{recipe.funFacts}</p>
                <p>{recipe.bahan}</p>
                {
                  recipe.bumbu_halus&&
                  <p>{recipe.bumbu_halus}</p>
                }
                <p>{recipe.tutorial}</p>
              </div>
          }
          </div>
      }
    </div>
  )
}

export default RecipeDetailPage