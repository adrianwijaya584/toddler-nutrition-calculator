import Link from "next/link"

const Home= ()=> {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-pr">
      <p className="text-2xl font-bold">Web dalam pengembangan</p>

      <Link href="/psg">Halaman perhitungan gizi</Link>
      <Link href="/resep">Halaman daftar resep</Link>
    </div>
  )
}

export default Home