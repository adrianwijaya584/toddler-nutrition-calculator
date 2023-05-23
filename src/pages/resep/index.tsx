import Link from "next/link"
import {Button, Card} from "flowbite-react"
import { useMemo, useState } from "react"
import { useRouter } from "next/router"
import recipeJson from '@/data/resep.json'
import Image from "next/image"

const RecipeIndexPage= ()=> {
  const router= useRouter()
  const ages= ['semua', '6-8', '9-11', '12']
  const [filteredAge, setFilteredAge]= useState('semua')
  const recipes= useMemo(()=> {
    const {umur= ''}= router.query

    const getAge= (ages.includes(umur.toString())?umur:'semua').toString()

    setFilteredAge(getAge)

    if (getAge=='semua') {
      return recipeJson
    }

    return recipeJson.filter((recipe)=> recipe.Usia==getAge)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  function filterAge(age: string) {
    setFilteredAge(age)

    router.push({
      pathname: 'resep',
      query: {
        umur: age
      }
    })
  }

  return (
    <div className="container min-h-screen m-auto px-4 flex flex-col space-y-4 py-4">
      <div className="grid  grid-cols-2 gap-3 md:grid-cols-4">
        {
          ages.map((age, k)=> (
            <Button className={`${age==filteredAge?'':'bg-primary-1'}`} key={k} onClick={()=> filterAge(age)}>{age} {age=='12'&&'keatas'}</Button>
          ))
        }
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {
          recipes.map((recipe, k)=> (
            <Link href={`resep/${recipe.nama}`} key={k}>
              <Card>
                <Image src="https://www.seriouseats.com/thmb/e-nROXUuxOt0NIb39WL3FpTRkPc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2019__09__20190530-ramen-noodles-vicky-wasik-76-ad495b42ee784ad7bb7e2affa7d57d50.jpg" alt={`Gambar ${recipe.nama}`} width={800} height={200} className="w-full h-52 object-cover object-center"  />
                <h4 className="text-center font-bold">{recipe.nama}</h4>
                <p>umur : {recipe.Usia} {recipe.Usia=='12'&&'keatas'}</p>
                </Card>
              </Link>
          ))
        }
      </div>
    </div>
  )
}

export default RecipeIndexPage