type IconType= import('react-icons').IconType

interface ArticleLayoutData {
  baseUrl: string
  data: {
    title: string
    headline: string
    imageUrl?: string
  }
  recomendations: RecomendationArticles[]
}

interface AtricleDataInterface {
  type: string
  content: string | string[]
}

interface RecomendationArticles {
  title: string
  headline: string
}

interface SocialMediaBtnType {
  title: string
  Icon: IconType
  className: string
  onClick: ()=> void
}