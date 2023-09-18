import { Button } from "flowbite-react"
import Link from "next/link"

const NotFoundPage= ()=> {
  return (
    <div className="flex flex-col justify-center items-center space-y-3 h-screen">
      <h1 className="font-bold text-lg">Sepertinya anda tersesat</h1>
      <Link href="/">
        <Button>Kembali ke halaman utama</Button>
      </Link>
    </div>
  )
}

export default NotFoundPage;