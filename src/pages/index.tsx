import { useEffect } from 'react';
import { Button, Card } from "flowbite-react"
import Image from 'next/image'
import Link from 'next/link'
import DoctorImage from 'public/images/dokter-min.png'
import 'aos/dist/aos.css'

const Home= ()=> {
  async function initAos() {
    const Aos= await import('aos')
    Aos.init()
  }

  useEffect(()=> {
    initAos()
  }, [])

  return (
    <div className="flex flex-col space-y-[70px]">
      <div className="jumbotron w-full h-[calc(100vh-70px)] bg-[#EAF7FF]">
        <div className="container h-full mx-auto flex flex-row px-6 lg:space-x-8 lg:px-12 xl:px-24">
          <div className="flex flex-col justify-center items-center space-y-4 w-full lg:w-[45%] lg:items-start" data-aos="fade-right">
            <h1 className="font-bold text-2xl font-suisseNeue lg:text-3xl xl:text-5xl lg:leading-snug xl:leading-normal">Hai Moms yuk ukur <br className="hidden lg:block" /> Gizi balitamu.</h1>
            <h2 className="font-semibold text-lg leading-normal lg:text-xl xl:text-2xl">dan mulai terapkan <br className="hidden lg:block" /> nutrisi yang tepat!</h2>

            <div className="flex flex-row space-x-3">
              <Link href="/psg">
                <Button className="py-2 bg-[#2AA8FF]">
                  Hitung Status Gizi
                </Button>
              </Link>

              <Link href="/resep">
                <Button className="py-2">
                  Resep MPASI
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative hidden items-center lg:flex lg:w-[55%]" data-aos="fade-left">
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
              <Link href="/artikel/1">
                <Card className="h-full">
                  <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[350px] xl:h-[450px]">
                    <Image
                      src="https://i0.wp.com/post.healthline.com/wp-content/uploads/2023/01/eat-it-or-leave-it-healthlines-comprehensive-ingredient-dictionary-to-simplify-your-shopping-trip-thumb-732x549-1-732x549.jpg?w=1092"
                      alt="gambar artikel"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  <h3 className="line-clamp-2 font-bold text-xl leading-snug duration-500 hover:text-green-600">Yuk Mengenal Stunting, Penyebab Hingga Cara Mengatasinya</h3>
                  <p className="line-clamp-3 text-paragraph text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis harum illum natus accusantium deserunt? Accusantium, iusto, qui a temporibus reiciendis repudiandae debitis nam accusamus provident deserunt, ullam perferendis quis libero?</p>
                </Card>
              </Link>
            </div>

            <div className="aside flex flex-col space-y-4">
              {[...Array(3)].map((_, k)=> (
                <Link href="/artikel/1" key={k}>
                  <Card>
                    <div className="flex flex-col md:flex-row md:space-x-3">
                      <div className="relative w-full h-[250px] bg-red-300 md:h-[130px] md:w-[40%] xl:h-[150px]">
                        <Image
                          src="https://i0.wp.com/post.healthline.com/wp-content/uploads/2023/01/eat-it-or-leave-it-healthlines-comprehensive-ingredient-dictionary-to-simplify-your-shopping-trip-thumb-732x549-1-732x549.jpg?w=1092"
                          alt="gambar artikel"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="mt-5 md:mt-0 md:w-[60%]">
                        <h3 className="line-clamp-2 font-bold text-xl leading-snug duration-500 hover:text-green-600">Yuk Mengenal Stunting, Penyebab Hingga Cara Mengatasinya</h3>
                        <p className="line-clamp-3 mt-4 text-[#637381] text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis harum illum natus accusantium deserunt? Accusantium, iusto, qui a temporibus reiciendis repudiandae debitis nam accusamus provident deserunt, ullam perferendis quis libero?</p>  
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