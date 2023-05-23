import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import recipeJson from "@/data/resep.json"
import Link from "next/link"
import { Button, Modal } from "flowbite-react"
import Image from "next/image"

const RecipeDetailPage= ()=> {
  type recipeType= typeof recipeJson[0]
  const route= useRouter()
  const [isLoading, setIsLoading]= useState(true)
  const [showModal, setShowModal]= useState(false)
  const [recipe, setRecipe]= useState<recipeType | undefined>(undefined)

  useEffect(()=> {
    const findRecipe= recipeJson.find((recipe)=> recipe.nama==(route.query.name ?? ''))
    setRecipe(findRecipe)

    setIsLoading(false)
  }, [route.query])

  return (
    <div className="w-full m-auto min-h-screen justify-center lg:w-4/5 xl:w-3/5">
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
              <div className="flex flex-col space-y-3">
                <Image 
                  src={recipe.fotoResep} 
                  alt={`Gambar ${recipe.nama}`}
                  width={800}
                  height={200}
                  onClick={()=> setShowModal(true)}
                  className="w-full h-[420px] object-cover object-center rounded-md mb-6 cursor-pointer"  />

                <Modal
                  show={showModal}
                  dismissible={true}
                  onClose={()=> setShowModal(false)}
                  size="3xl"
                  className="h-screen"
                >
                  <Modal.Header/>
                  
                  <Modal.Body>
                    <Image src={recipe.fotoResep} alt={`Gambar ${recipe.nama}`} width={1200} height={200} />

                  </Modal.Body>
                </Modal>

                <h1 className="font-bold text-3xl ">{recipe.nama}</h1>
                <p>{recipe.Porsi}</p>
                <p>Umur {recipe.Usia} {recipe.Usia=='12'&&'keatas'}</p>
                <p>Waktu Memasak {recipe["Waktu memasak"]}</p>

                <h3 className="font-bold text-xl">Kandungan per Porsi</h3>
                <ol className="list-decimal pl-8">
                  {recipe.KandunganPerPorsi.map((kandungan, k)=> (
                    <li key={k}>{kandungan}</li>
                  ))}
                </ol>

                <h3 className="font-bold text-xl">Fakta Menarik</h3>
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