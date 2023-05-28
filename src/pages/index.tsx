import { Button, Card } from "flowbite-react"
import Image from "next/image"
import Link from "next/link"
import DoctorImage from 'public/images/dokter-min.png'

const Home= ()=> {
  return (
    <div className="flex flex-col space-y-[70px]">
      <div className="jumbotron w-full h-[calc(100vh-70px)] bg-[#EAF7FF]">
        <div className="container h-full mx-auto flex flex-row px-6 lg:px-24">
          <div className="w-[55%] flex flex-col justify-center space-y-4" data-aos="fade-right">
            <h1 className="font-bold text-xl font-suisseNeue lg:text-5xl lg:leading-snug">Hai Moms yuk ukur <br className="hidden lg:block" /> Gizi balitamu.</h1>
            <h2 className="font-semibold text-2xl leading-normal">dan mulai terapkan <br className="hidden lg:block" /> nutrisi yang tepat!</h2>

            <div className="flex flex-row space-x-3">
              <Link href="/psg">
                <Button className="py-2">
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

          <div className="flex-grow flex items-end" data-aos="fade-left">
            <Image
              src={DoctorImage}
              alt="Gambar dokter"
              width="1000"
              height="500"
              priority={true}
              quality={100}
              className="object-bottom"
            />
          </div>
        </div>
      </div>

      <article className="px-6 lg:px-24">
        <div className="" data-aos="fade-up">
          <div className="text-center">
            <h4 className="text-[#3056D3] font-bold text-base">Rekomendasi Artikel</h4>
            <h1 className="font-bold text-3xl mt-1 mb-4 md:text-4xl">Apakah moms tahu?</h1>
            <p className="mx-auto text-[#637381] text-sm md:w-3/4 md:text-base xl:w-1/2"> Menurut data survei status gizi indonesia pada tahun 2022 terdapat 4 permasalahan gizi balita di indonesia. Daripada bingung, yuk cari tahu tentang permasalahan gizi pada balita.</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-12">
            <div className="main">
              <Link href="/artikel/1">
                <Card className="h-full">
                  <Image
                    src="https://i0.wp.com/post.healthline.com/wp-content/uploads/2023/01/eat-it-or-leave-it-healthlines-comprehensive-ingredient-dictionary-to-simplify-your-shopping-trip-thumb-732x549-1-732x549.jpg?w=1092"
                    alt="gambar artikel"
                    priority={true}
                    width={700}
                    height={600}
                    className="w-full object-cover object-center md:h-[400px]"
                  />

                  <h3 className="line-clamp-2 font-bold text-xl leading-snug duration-500 hover:text-green-600">Yuk Mengenal Stunting, Penyebab Hingga Cara Mengatasinya</h3>
                  <p className="line-clamp-2 text-[#637381] text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis harum illum natus accusantium deserunt? Accusantium, iusto, qui a temporibus reiciendis repudiandae debitis nam accusamus provident deserunt, ullam perferendis quis libero?</p>
                </Card>
              </Link>
            </div>

            <div className="aside flex flex-col space-y-4">
              {[...Array(3)].map((_, k)=> (
                <Link href="/artikel/1" key={k}>
                  <Card>
                    <div className="flex flex-col md:flex-row md:space-x-3">
                      <Image
                        src="https://i0.wp.com/post.healthline.com/wp-content/uploads/2023/01/eat-it-or-leave-it-healthlines-comprehensive-ingredient-dictionary-to-simplify-your-shopping-trip-thumb-732x549-1-732x549.jpg?w=1092"
                        alt="gambar artikel"
                        width={500}
                        height={400}
                        priority={true}
                        className="object-cover object-center md:h-[100px]"
                      />

                      <div>
                        <h3 className="line-clamp-2 font-bold text-xl leading-snug duration-500 hover:text-green-600">Yuk Mengenal Stunting, Penyebab Hingga Cara Mengatasinya</h3>
                        <p className="line-clamp-2 mt-2 text-[#637381] text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis harum illum natus accusantium deserunt? Accusantium, iusto, qui a temporibus reiciendis repudiandae debitis nam accusamus provident deserunt, ullam perferendis quis libero?</p>  
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