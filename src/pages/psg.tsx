import { Accordion, Button, Select, Tabs, TextInput  } from "flowbite-react"
import { FormEvent, useEffect, useRef, useState } from "react"
import dynamic from 'next/dynamic'
import axios from "axios"
import moment from "moment"
import * as yup from 'yup'
import bbPerPb from '@/data/bbperpb.json'
import bbPerU from '@/data/bbperu.json'
import pbPerU from '@/data/pbtbperu.json'
import DocumentData from '@/components/DocumentData'
const ResultChart= dynamic(()=> import("@/components/ResultChart"), {
  ssr: false
})

const FormLabel= ({label}: {label: string})=> <p className="mb-1 font-semibold text-sm">{label}</p>

const validationDto= yup.object({
  name: yup.string().required(),
  age: yup.number().required(),
  weight: yup.number().required(),
  height: yup.number().required(),
  gender: yup.string().oneOf(['male', 'female']).required(),
})

const PsgPage= ()=> {
  const firstInput= useRef<HTMLInputElement>(null)
  const bbPerUChart= useRef<HTMLDivElement>(null)
  const bbPerPbChart= useRef<HTMLDivElement>(null)
  const pbPerUChart= useRef<HTMLDivElement>(null)

  const [chartWidth, setChartWidth]= useState(1000)
  const [name, setName]= useState('aaa')
  const [age, setAge]= useState(60)
  const [weight, setWeight]= useState(21)
  const [height, setHeight]= useState(110)
  const [gender, setGender]= useState('male')
  const [isLoading, setIsLoading]= useState(false)
  const [isDownloading, setIsDownloading]= useState(false)
  const [apiResult, setApiResult]= useState<APIResult>()
  const [activeTab, setActiveTab]= useState(0)

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      const formData= {
        name,
        age,
        weight,
        height,
        gender,
      }

      await validationDto.validate(formData, {
        abortEarly: false
      })

      setIsLoading(true)

      const {data}= await axios.post<APIResult>("/api/psg", {
        weight,
        height,
        age
      })

      setIsLoading(false)

      setApiResult(data)
    } catch (error) {
      setIsLoading(false)
      
      if (error instanceof yup.ValidationError) {
        console.log(error.errors);
      } else {
        console.log(error);
      }

    }
  }

  async function downloadPdf() {
    if (!apiResult) {
      return
    }

    setIsDownloading(true)

    const {toPng}= (await import('html-to-image'))
    const {saveAs}= (await import('file-saver')).default
    const {pdf}= (await import('@react-pdf/renderer'))

    setTimeout(async ()=> {
      let canvasWidth= undefined

      if (window.innerWidth > 1500) {
        canvasWidth= 1500 - 150
      } else {
        canvasWidth= 1000
      }

      const imageBbPerU= await toPng(bbPerUChart.current as HTMLDivElement, {
        cacheBust: true,
        height: 600,
        width: canvasWidth
      })

      const imageBbPerPb= await toPng(bbPerPbChart.current as HTMLDivElement, {
        cacheBust: true,
        height: 600,
        width: canvasWidth
      })

      const imagePbPerUChart= await toPng(pbPerUChart.current as HTMLDivElement, {
        cacheBust: true,
        height: 600,
        width: canvasWidth
      })

      const dateCreated= moment().format("DD-MM-YYYY_HH-mm-ss");
      
      const blob= await pdf(<DocumentData
        biodata={{
          name,
          weight,
          height,
          age,
          gender
        }}  
        calculationResult={apiResult}
        imageBbPerU={imageBbPerU}
        imageBbPerP={imageBbPerPb}
        imagePbPerUChart={imagePbPerUChart}
      />).toBlob()
  
      saveAs(blob, `hasil-status-gizi-${name.replace(" ", "_")}-${dateCreated}.pdf`)

      setIsDownloading(false)
    }, 0)
  }

  useEffect(()=> {    
    const width= window.innerWidth

    if (width > 1500) {
      setChartWidth(1500 - 150)
    }

    firstInput.current?.focus()
  }, [])

  return (
    <div className="container mx-auto py-7 px-6 md:px-12">
      <div className="mb-3 space-y-4">
        <h1 className="font-bold text-2xl">Kalkulator Perhitungan Gizi</h1>
        <h2>Yuk moms ukur Gizi dan kebutuhan nutrisi balitamu sekarang <br className="hidden md:block"  /> menggunakan Perhitungan gizi berstandar kemenkes.</h2>
      </div>

      <form className="grid gap-x-5 gap-y-5 grid-cols-1 md:grid-cols-2 md:gap-y-6" onSubmit={(e)=> submitForm(e)}>
        <div className="w-full">
          <FormLabel label="Nama Balita" />
          <TextInput placeholder="Masukan nama balita." 
          ref={firstInput}
          onChange={(e)=> setName(e.target.value)} />
        </div>

        <div className="w-full">
          <FormLabel label="Umur Balita" />
          <TextInput type="number" placeholder="Masukan umur balita dalam bulan."  max={60} min={0} 
          onChange={(e)=> setAge(+e.target.value)}
          />
        </div>

        <div className="w-full">
          <FormLabel label="Berat Badan"  />
          <TextInput type="number" placeholder="Masukan berat badan dalam Kg." inputMode="decimal" step={.1}
              onChange={(e)=> setWeight(+e.target.value)}
          />
        </div>

        <div className="w-full">
          <FormLabel label="Tinggi Badan" />
          <TextInput type="number" placeholder="Masukan tinggi badan dalam Cm." inputMode="decimal" step={.1}
              onChange={(e)=> setHeight(+e.target.value)}
          />
        </div>

        <div className="w-full">
          <FormLabel label="Jenis Kelamin" />
          <Select placeholder="Masukan jenis kelamin balita." 
              onChange={(e)=> setGender(e.target.value)}
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="male">Laki-laki</option>
            <option value="female">Perempuan</option>
          </Select>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-primary-1 col-span-1 duration-500 md:col-span-2"
        >
          Hitung
        </Button>
      </form>

      {
        isLoading?
        <>
          <p>Loading...</p>
        </>
        :
        apiResult&&
        <div className="mt-6 flex flex-col space-y-3">
          <h1 className="text-center text-2xl font-bold">Hasil Perhitungan</h1>

          <div className="flex space-x-2">
            <Button color="primary">BB per U : {apiResult.bbu}</Button>
            <Button color="primary">BB per PB : {apiResult.bb_pb}</Button>
            <Button color="primary">PB per U : {apiResult.pb_tb_u}</Button>
          </div>

          <Button disabled={isDownloading} onClick={()=> downloadPdf()} isProcessing={isDownloading} className="bg-primary-1 duration-500">
            Download hasil perhitungan.
          </Button>

          <Tabs.Group
            style="underline"
            className="border border-gray-200 rounded-md"
          >
            <Tabs.Item
              title="Berat Badan per Umur"
            >
              <div className="overflow-x-auto">
                <div className="py-4 flex xl:justify-center xl:items-center" ref={bbPerUChart}>
                  <ResultChart
                    xTitle="Umur (bulan)"
                    yTitle="Berat Badan (kg)"
                    chartData={bbPerU}
                    width={chartWidth}
                  />   
                </div>
              </div>

              <h3>Interpretasi {apiResult.bb_u_informations.status}</h3>
              <p>{apiResult.bb_u_informations.articles}</p>
            </Tabs.Item>

            <Tabs.Item
              title="Berat Badan per Panjang Badan"
            >
               <div className="overflow-x-auto">
                <div className="py-4 flex xl:justify-center xl:items-center" ref={bbPerPbChart}>
                  <ResultChart
                    xTitle="Panjang Badan (cm)"
                    yTitle="Berat Badan (kg)"
                    chartData={bbPerPb}
                    xSkipSize={5}
                    width={chartWidth}
                  />  
                </div>
              </div>

              <h3>Interpretasi {apiResult.bb_pb_informations.status}</h3>
              <p>{apiResult.bb_pb_informations.articles}</p>
            </Tabs.Item>

            <Tabs.Item
              title="Panjang Badan per Umur"
            >
              <div className="overflow-x-auto">
                <div className="py-4 flex xl:justify-center xl:items-center" ref={pbPerUChart}>
                  <ResultChart
                    xTitle="Umur (bulan)"
                    yTitle="Panjang Badan (cm)"
                    chartData={pbPerU}
                    width={chartWidth}
                  />  
                </div>
              </div>

              <h3>Interpretasi {apiResult.pb_tb_u_informations.status}</h3>
              <p>{apiResult.pb_tb_u_informations.articles}</p>
            </Tabs.Item>
          </Tabs.Group>
        </div>
      }

    </div>
  )
}

export default PsgPage