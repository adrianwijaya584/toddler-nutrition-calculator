interface NutritionBoxData {
  Icon: IconType
  result: number
  title: string
}

interface PerDayNutritionBoxData {
  time: 'Pagi' | 'Siang' | 'Malam'
  nutritionNeeds: {
    energy: number
    fat: number
    carbo: number
    protein: number
  }
}

interface InterpretationLabelBtnData {
  hex: string,
  status: string
}