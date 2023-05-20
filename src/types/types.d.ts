interface ChartPoints {
  x: number
  y: number
}

interface ChartJsonData {
  "-3 SD": ChartPoints[]
  "-2 SD": ChartPoints[]
  "-1 SD": ChartPoints[]
  median: ChartPoints[]
  "+3 SD": ChartPoints[]
  "+2 SD": ChartPoints[]
  "+1 SD": ChartPoints[]
}

interface ResultType {
  hasil: ChartPoints[]
}

interface NutritionNeeds {
  energi: number
  protein: number
  lemak: number
  karbo: number
}

interface NutritionArticles {
  status: string
  symtomps: string[]
  articles: string[]
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