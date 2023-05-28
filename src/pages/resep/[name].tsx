import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import recipeJson from "@/data/resep.json"
import Link from "next/link"
import { Button, Modal } from "flowbite-react"
import Image from "next/image"
import { rgbDataURL } from "@/helpers/config"
import { IconType } from "react-icons"
import {FaWhatsapp, FaFacebook, FaTwitter} from 'react-icons/fa'

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
  const [isLoading, setIsLoading]= useState(true)
  const [showModal, setShowModal]= useState(false)
  const [recipe, setRecipe]= useState<recipeType | undefined>(undefined)

  useEffect(()=> {
    const findRecipe= recipeJson.find((recipe)=> recipe.nama==(route.query.name ?? ''))
    setRecipe(findRecipe)

    setCurrentUrl(encodeURI(window.location.href))
    
  }, [route.query])

  useEffect(()=> {
    if (recipe!=undefined) {
      setIsLoading(false)
    }
  }, [recipe])

  return (
    <div className="w-full m-auto min-h-screen justify-center relative lg:w-4/5 xl:w-4/6">
    
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
              <div className="flex flex-col space-y-3 md:space-x-6 md:space-y-0 md:flex-row">
                <div className="flex flex-col top-[70px] left-0 h-fit pt-3  md:sticky md:pt-8">
                  <div className="flex flex-row space-x-3 md:flex-col md:space-y-4 md:space-x-0">
                    <SocialMediaBtn
                      title="bagikan ke Whatsapp"
                      className="bg-green-500"
                      href={`https://wa.me/?text=Cek resep untuk balita disini ${currentUrl}`}
                      Icon={FaWhatsapp}
                    />

                    <SocialMediaBtn
                      title="bagikan ke Facebook"
                      className="bg-blue-500"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                      Icon={FaFacebook}
                    />

                    <SocialMediaBtn
                      title="bagikan ke Twitter"
                      className="bg-blue-500"
                      href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=`}
                      Icon={FaTwitter}
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-4 pb-4 w-full">
                  <Image 
                    src={recipe.fotoResep} 
                    alt={`Gambar ${recipe.nama}`}
                    width={800}
                    height={200}
                    priority={true}
                    onClick={()=> setShowModal(true)}
                    placeholder="blur"
                    blurDataURL={rgbDataURL(237, 181, 6)}
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
                      <Image
                        src={recipe.fotoResep}
                        alt={`Gambar${recipe.nama}`}
                        placeholder="blur"
                        blurDataURL={rgbDataURL(237, 181, 6)}
                        width={1200}
                        height={600}
                      />

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

                  <h3 className="font-bold text-xl">Cara Memasak</h3>                
                  <ul className="list-decimal pl-8">
                    {recipe.tutorial.map((tutorial, k)=> (
                      <li key={k}>{tutorial}</li>
                    ))}
                  </ul>
                </div>
              </div>
          }
          </div>
      }
    </div>
  )
}

export default RecipeDetailPage