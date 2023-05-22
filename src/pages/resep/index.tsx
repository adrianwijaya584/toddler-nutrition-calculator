import Link from "next/link"
import {Button, Card} from "flowbite-react"
import { useMemo, useState } from "react"
import { useRouter } from "next/router"
import recipeJson from '@/data/resep.json'

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
      <div className="flex flex-row space-x-3">
        {
          ages.map((age, k)=> (
            <Button className={`${age==filteredAge?'':'bg-primary-1'}`} key={k} onClick={()=> filterAge(age)}>{age} {age=='12'&&'keatas'}</Button>
          ))
        }
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {
          recipes.map((v, k)=> (
            <Link href={`resep/${v.nama}`} key={k}>
              <Card>
                <h4 className="text-center font-bold">{v.nama}</h4>
                <p>umur : {v.Usia} {v.Usia=='12'&&'keatas'}</p>
                </Card>
              </Link>
          ))
        }
      </div>
    </div>
  )
}

export default RecipeIndexPage