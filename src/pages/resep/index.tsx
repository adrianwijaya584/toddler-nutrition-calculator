import Link from "next/link"
import {Button, Card} from "flowbite-react"
import { useMemo, useState } from "react"
import { useRouter } from "next/router"
import recipeJson from '@/data/resep.json'
import Image from "next/image"
import { rgbDataURL } from "@/helpers/rgbDataURL"

const RecipeIndexPage= ()=> {
  const router= useRouter()
  const ages= ['Semua', '6-8', '9-11', '12']
  const [filteredAge, setFilteredAge]= useState('semua')
  const recipes= useMemo(()=> {
    const {umur= ''}= router.query

    const getAge= (ages.includes(umur.toString())?umur:'semua').toString().toLowerCase()


    if (getAge=='semua') {
      return recipeJson
    }

    setFilteredAge(getAge)

    return recipeJson.filter((recipe)=> recipe.Usia==getAge)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  function filterAge(age: string) {
    setFilteredAge(age.toLocaleLowerCase())

    router.push({
      pathname: 'resep',
      query: {
        umur: age
      }
    })
  }

  return (
    <div className="container min-h-screen m-auto px-4 flex flex-col space-y-8 py-4 lg:px-12 xl:px-24">
       <div className="text-center">
        <h1 className="text-[#3056D3] font-bold text-base">Refrensi Resep MPASI</h1>
        <h2 className="font-bold text-2xl mt-1 mb-3 md:text-3xl">Moms and Dad penasaran? </h2>
        <p className="mx-auto text-[#637381] text-sm md:w-3/4 md:text-base xl:w-1/2"> menu MPASI apa sih yang cocok diberikan kepada kecil supaya ga bosan? Yuk simak resep MPASI berikut ini</p>
      </div>

      <div className="grid  grid-cols-2 gap-3 md:grid-cols-4">
        {
          ages.map((age, k)=> (
            <Button 
              className={`${age.toLowerCase()==filteredAge?'bg-primary-2':'bg-primary-1'} duration-500 hover:bg-primary-2`} 
              key={k} 
              onClick={()=> filterAge(age)}
            >
                {age} {age!='Semua'?'bulan':'usia'} {age=='12'&&'ke atas'}
            </Button>
          ))
        }
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {
          recipes.map((recipe, k)=> (
            <Link href={`resep/${recipe.nama}`} key={k}>
              <Card>
                <Image
                  src={recipe.fotoResep}
                  alt={`Gambar ${recipe.nama}`}
                  width="500"
                  height="300"
                  priority={true}
                  placeholder="blur"
                  blurDataURL={rgbDataURL(237, 181, 6)}
                  className="h-52 object-cover object-center"  
                />
                <h4 className="text-center font-bold">{recipe.nama}</h4>
                <p>umur : {recipe.Usia} {recipe.Usia!='Semua'?'bulan':'usia'} {recipe.Usia=='12'&&'ke atas'}</p>
                <div className="line-clamp-2">{
                  recipe.bahan.map((bahan, k)=> (
                    <span key={k}>{bahan} <span className="inline-block px-xs text-gray-400">•</span> </span>
                  ))
                }</div>
                </Card>
              </Link>
          ))
        }
      </div>
    </div>
  )
}

export default RecipeIndexPage