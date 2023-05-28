import Image from "next/image"

const ArticleDetailPage= ()=> {
  return (
    <div className="px-6 pt-4 lg:px-36">
      <div className="container mx-auto flex flex-col space-y-4">
        <h1 className="text-3xl leading-snug font-bold w-2/4">Yuk Mengenal Stunting, Penyebab Hingga Cara Pencegahannya</h1>

        <Image
          src="https://i0.wp.com/post.healthline.com/wp-content/uploads/2023/01/eat-it-or-leave-it-healthlines-comprehensive-ingredient-dictionary-to-simplify-your-shopping-trip-thumb-732x549-1-732x549.jpg?w=1092"
          alt="gambar artikel"
          priority={true}
          width={1500}
          height={600}
          className="w-full object-cover object-center md:h-[400px]"
        />

        <p className="text-base leading-snug">Istilah stunting mungkin masih terdengar asing di telinga sebagian orang. Padahal, masalah kesehatan satu ini cukup umum terjadi di Indonesia. Bahkan, stunting sendiri pernah menjadi masalah yang mendapat perhatian khusus dari Kementerian Kesehatan lewat kampanye bertajuk ‘Melawan Stunting’. Secara umum, pengertian stunting adalah salah satu penyakit kronis yang memengaruhi faktor pertumbuhan anak-anak. Lantas, penyakit seperti apa stunting itu dan apa penyebabnya? Cari tahu juga beberapa cara pencegahannya di artikel ini.</p>

        <h2 className="text-xl font-bold">Mengenal Stunting Lebih Dekat</h2>
        <p className="text-base leading-snug">Istilah stunting mungkin masih terdengar asing di telinga sebagian orang. Padahal, masalah kesehatan satu ini cukup umum terjadi di Indonesia. Bahkan, stunting sendiri pernah menjadi masalah yang mendapat perhatian khusus dari Kementerian Kesehatan lewat kampanye bertajuk ‘Melawan Stunting’. Secara umum, pengertian stunting adalah salah satu penyakit kronis yang memengaruhi faktor pertumbuhan anak-anak. Lantas, penyakit seperti apa stunting itu dan apa penyebabnya? Cari tahu juga beberapa cara pencegahannya di artikel ini.</p>

      </div>
    </div>
  )
}

export default ArticleDetailPage