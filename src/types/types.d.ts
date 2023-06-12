interface NutritionNeeds {
  energi: number
  protein: number
  lemak: number
  karbo: number
}

interface NutritionArticles {
  status: string
  articles: string[]
  hex: string
}

interface APIResult {
  bb_pb: number
  bbu: number
  pb_tb_u: number
  bb_u_informations: NutritionArticles
  bb_pb_informations: NutritionArticles
  pb_tb_u_informations: NutritionArticles
  nutritionNeeds: NutritionNeeds
  nutritionNeedsPerServing: {
    energi_pagi_siang: number,
    protein_pagi_siang: number,
    lemak_pagi_siang: number,
    karbo_pagi_siang: number,
    energi_malam: number,
    protein_malam: number,
    lemak_malam: number,
    karbo_malam: number1
  }
}

interface PdfData {
  biodata: {
    name: string
    age: number
    weight: number
    height: number
    gender: string
  }
  calculationResult: APIResult
  imageBbPerU: string
  imageBbPerPB: string
  imagePbPerU: string
}