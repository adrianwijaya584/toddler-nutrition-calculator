import ArticleLayout from "@/layouts/ArticleLayout"
import { Breadcrumb } from "flowbite-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import {FaHome} from 'react-icons/fa'
import ArticleJson from '@/data/artikel.json'
import { ArticleComponent } from "@/components/ArticleComponents"

type ArticleType= typeof ArticleJson[0]

const ArticleDetailPage= ()=> {
  const route= useRouter()
  const [article, setArticle]= useState<ArticleType>()
  const [articleRecommendations, setArticleRecommendations]= useState<RecomendationArticles[]>([])

  useEffect(()=> {
    const name= route.query.name

    const findArticle= ArticleJson.find((article)=> article.title==name)

    setArticle(findArticle)

    setArticleRecommendations(ArticleJson.filter((article)=> article.title != name))
    
  }, [route.query])

  return (
    <div className="px-6 pt-4 lg:px-24 xl:px-36">
      <Breadcrumb
        className="mb-6"
      >
        <Breadcrumb.Item>
          <Link href="/"
            className="text-black flex items-center gap-x-2"
          >
            <FaHome/> Artikel
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {article?.title ?? ''}
        </Breadcrumb.Item>
      </Breadcrumb>
      
      {
        !article?
        <div>
          <p>Artikel tidak ditemukan.</p>
        </div>:
        <ArticleLayout
          baseUrl="/artikel"
          data={{
            title: article.title,
            headline: article.headline,
            imageUrl: article.imageUrl,
          }}
          recomendations={articleRecommendations}
        >
          {
            article.contents.map((content, k)=> (
              <ArticleComponent
                key={k}
                type={content.type}
                content={content.content}
              />
            ))
          }
        </ArticleLayout>
      }

    </div>
  )
}

export default ArticleDetailPage