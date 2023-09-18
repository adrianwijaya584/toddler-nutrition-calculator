import { Line } from "react-chartjs-2"
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, CartesianTickOptions } from 'chart.js'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ResultChart= (props: ChartProps)=> {
  const datas: ChartJsonData & ResultType=  {
    ...props.chartData,
    hasil: [ 
      {
        x: 0,
        y: 0,
      },
      props.resultPoints,
      {
        x: props.chartData.median[props.chartData.median.length - 1].x,
        y: 0
      }
    ]
  }


  const xTicksOption: Partial<CartesianTickOptions>= !props.xSkipSize?{}:{
    autoSkip: false,
    callback(value, index) {
      const skip= props.xSkipSize?props.xSkipSize:1
      
      return +this.getLabelForValue(+value)%skip==0?this.getLabelForValue(+value): ''
    }
  }

  return (
    <div className="min-w-screen">
      <Line
        width={props.width}
        height="600"
        options={{
          responsive: false,
          animation: false,
          elements: {
            // point: {
            //   radius: 0
            // }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: props.xTitle
              },
              ticks: xTicksOption
            },
            y: {
              title: {
                display: true,
                text: props.yTitle
              },
            }
          },
          plugins: {
            filler: {
              propagate: false
            }
          }
        }}
        data={{
          labels: datas['median'].map(v=> v.x),
          datasets: [
            {
              label: '-3SD',
              data: datas['-3 SD'],
              borderColor: 'red',
              pointRadius: 0,
              // fill: true,
              // backgroundColor: 'rgba(0,0,0,.4)',
            },
            {
              label: '-2SD',
              data: datas['-2 SD'],
              borderColor: 'black',
              backgroundColor: 'rgb(228, 208, 57, .4)',
              fill: '-1',
              pointRadius: 0,
            },
            {
              label: '-1SD',
              data: datas['-1 SD'],
              borderColor: 'black',
              fill: '-1',
              pointRadius: 0,
              backgroundColor: 'rgb(97, 144, 64, .4)',
            },
            {
              label: 'Median',
              data: datas['median'],
              borderColor: 'black',
              borderDash: [10,5],
              fill: '-1',
              pointRadius: 0,
              backgroundColor: 'rgba(80, 146, 49, .4)',
            },
            {
              label: '+1SD',
              data: datas['+1 SD'],
              borderColor: 'black',
              fill: '-1',
              pointRadius: 0,
              backgroundColor: 'rgba(80, 146, 49, .4)',
            },
            {
              label: '+2SD',
              data: datas['+2 SD'],
              borderColor: 'black',
              fill: '-1',
              pointRadius: 0,
              backgroundColor: 'rgb(97, 144, 64, .8)',
            },
            {
              label: '+3SD',
              data: datas['+3 SD'],
              borderColor: 'red',
              fill: '-1',
              pointRadius: 0,
              backgroundColor: 'rgb(228, 208, 57, .4)',
            },
            {
              label: 'hasil',
              data: datas['hasil'],
              borderColor: 'orange',
              pointBackgroundColor: 'orange',
              // pointBorderWidth: 5,
              order: 1,
            },
          ],
        }}
      />
    </div>
  )
}

export default ResultChart