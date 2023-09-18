interface ChartProps {
  xTitle: string
  yTitle: string
  chartData: ChartJsonData
  xSkipSize?: number
  width: number
  resultPoints: ChartPoints
}

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
