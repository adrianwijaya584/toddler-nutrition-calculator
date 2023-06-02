import ArticleLayout from "@/layouts/ArticleLayout"
import { Breadcrumb } from "flowbite-react"
import Link from "next/link"
import {FaHome} from 'react-icons/fa'

const ArticleDetailPage= ()=> {
  return (
    <div className="px-6 pt-4 lg:px-36">
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
          Apa itu stunting
        </Breadcrumb.Item>
      </Breadcrumb>

      <ArticleLayout
        baseUrl="/artikel"
        data={{
          title: 'lorem ipsum',
          headline: 'lorem ipsum is so good.'
        }}
        recomendations={[
          {
            title: 'a',
            headline: 'b',
          },
        ]}
      >
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum architecto voluptatibus natus dolor! Assumenda dolores minima, repellendus perspiciatis rem facilis ducimus ipsam excepturi temporibus omnis sapiente architecto qui. Cumque, quis.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum architecto voluptatibus natus dolor! Assumenda dolores minima, repellendus perspiciatis rem facilis ducimus ipsam excepturi temporibus omnis sapiente architecto qui. Cumque, quis.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum architecto voluptatibus natus dolor! Assumenda dolores minima, repellendus perspiciatis rem facilis ducimus ipsam excepturi temporibus omnis sapiente architecto qui. Cumque, quis.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum architecto voluptatibus natus dolor! Assumenda dolores minima, repellendus perspiciatis rem facilis ducimus ipsam excepturi temporibus omnis sapiente architecto qui. Cumque, quis.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum architecto voluptatibus natus dolor! Assumenda dolores minima, repellendus perspiciatis rem facilis ducimus ipsam excepturi temporibus omnis sapiente architecto qui. Cumque, quis.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum architecto voluptatibus natus dolor! Assumenda dolores minima, repellendus perspiciatis rem facilis ducimus ipsam excepturi temporibus omnis sapiente architecto qui. Cumque, quis.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum architecto voluptatibus natus dolor! Assumenda dolores minima, repellendus perspiciatis rem facilis ducimus ipsam excepturi temporibus omnis sapiente architecto qui. Cumque, quis.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum architecto voluptatibus natus dolor! Assumenda dolores minima, repellendus perspiciatis rem facilis ducimus ipsam excepturi temporibus omnis sapiente architecto qui. Cumque, quis.</p>
      </ArticleLayout>
    </div>
  )
}

export default ArticleDetailPage