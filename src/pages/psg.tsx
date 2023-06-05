import { Button, Select, Tabs, TextInput  } from "flowbite-react"
import { FormEvent, useEffect, useRef, useState } from "react"
import dynamic from 'next/dynamic'
import axios from "axios"
import moment from "moment"
import * as yup from 'yup'
import {MdOutlineEggAlt} from 'react-icons/md'
import {LuWheat} from 'react-icons/lu'
import {GiAlmond} from 'react-icons/gi'

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
    <div className="container mx-auto py-7 px-6 md:px-14 lg:px-28">
      <div className="mb-8 space-y-2">
        <h1 className="font-bold text-2xl lg:text-3xl">Kalkulator Perhitungan Gizi</h1>
        <h2
          className="text-paragraph"
        >Yuk moms ukur Gizi dan kebutuhan nutrisi balitamu sekarang <br className="hidden md:block"  /> menggunakan Perhitungan gizi berstandar kemenkes.</h2>
      </div>

      <form className="grid gap-x-5 gap-y-5 mb-14 grid-cols-1 md:grid-cols-2 md:gap-y-6" onSubmit={(e)=> submitForm(e)}>
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
        <div
          className="text-center"
        >
          <p>Mengambil Data...</p>
        </div>
        :
        apiResult&&
        <div className="flex flex-col space-y-3">
          <h1 className="text-center text-2xl font-bold">Hasil Perhitungan</h1>

          <Button disabled={isDownloading} onClick={()=> downloadPdf()} isProcessing={isDownloading} className="bg-primary-1 duration-500">
            Download hasil perhitungan.
          </Button>

          <Tabs.Group
            style="underline"
            className="border border-gray-200 rounded-md"
          >
            <Tabs.Item title="Rangkuman">
              <div className="space-y-8 px-5 mx-auto lg:w-10/12">

                <div className="border-1 p-4 grid mx-auto gap-x-3 lg:grid-cols-3">
                  <h2>Balita anda memiliki : <span className="font-bold">{apiResult.bb_u_informations.status} ({apiResult.bbu.toFixed(2)})</span></h2>
                  <h2>Balita anda tergolong Gizi : <span className="font-bold">{apiResult.bb_pb_informations.status} ({apiResult.bb_pb.toFixed(2)})</span></h2>
                  <h2>Tinggi/Panjang Badan Balita anda : <span className="font-bold">{apiResult.pb_tb_u_informations.status} ({apiResult.pb_tb_u.toFixed(2)})</span></h2>
                </div>

                <h1 className="text-center font-bold text-2xl">Nutrisi Yang Di Butuhkan Per Hari</h1>

                <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-center lg:space-x-20">
                  <div className="border-8 rounded-full w-[150px] h-[150px] flex justify-center items-center flex-col space-y-2 lg:w-[180px] lg:h-[180px]">
                    <h2 className="lg:text-lg">Total Energi</h2>
                    <h3 className="font-bold text-3xl">{apiResult.nutritionNeeds.energi}</h3>
                    <p>Energi</p>
                  </div>

                  <div className="flex flex-row items-center space-x-3 text-center lg:space-x-10">
                    <div className="bg-gray-300 w-28 h-28 rounded-md flex flex-col justify-end pb-5 relative ">
                      <MdOutlineEggAlt
                        className="text-6xl absolute -top-7 left-1/2 transform -translate-x-1/2"
                      />
                      <h4 className="font-bold text-lg">{apiResult.nutritionNeeds.karbo}</h4>
                      <p>Karbohidrat</p>
                    </div>

                    <div className="bg-gray-300 w-28 h-28 rounded-md flex flex-col justify-end pb-5 relative">
                      <LuWheat
                        className="text-6xl absolute -top-7 left-1/2 transform -translate-x-1/2"
                      />
                      <h4 className="font-bold text-lg">{apiResult.nutritionNeeds.protein}</h4>
                      <p>Protein</p>
                    </div>

                    <div className="bg-gray-300 w-28 h-28 rounded-md flex flex-col justify-end pb-5 relative">
                      <GiAlmond
                        className="text-6xl absolute -top-7 left-1/2 transform -translate-x-1/2"
                      />
                      <h4 className="font-bold text-lg">{apiResult.nutritionNeeds.lemak}</h4>
                      <p>Lemak</p>
                    </div>
                  </div>
                </div>

                <h1 className="text-center font-bold text-2xl">Konsumsi Gizi Seimbang yang disarankan</h1>

                <table className="border w-full rounded-md">
                  <tr className="border rounded-md">
                    <td className="p-6">
                      <h2 className="font-bold text-xl">Makan Pagi</h2>

                      <div className="grid grid-cols-2 lg:grid-cols-4">
                        <div className="">
                          <h3 className="font-bold">445 kkal</h3>
                          <p>Energi</p>
                        </div>

                        <div className="">
                          <h3 className="font-bold">34g</h3>
                          <p>Lemak</p>
                        </div>

                        <div className="">
                          <h3 className="font-bold">445g</h3>
                          <p>Karbohidrat</p>
                        </div>

                        <div className="">
                          <h3 className="font-bold">445g</h3>
                          <p>Protein</p>
                        </div>

                      </div>
                    </td>
                  </tr>

                  <tr className="border rounded-md">
                    <td className="p-6">
                      <h2 className="font-bold text-xl">Makan Siang</h2>

                          <div className="grid grid-cols-2 lg:grid-cols-4">
                        <div className="">
                          <h3 className="font-bold">445 kkal</h3>
                          <p>Energi</p>
                        </div>

                        <div className="">
                          <h3 className="font-bold">34g</h3>
                          <p>Lemak</p>
                        </div>

                        <div className="">
                          <h3 className="font-bold">445g</h3>
                          <p>Karbohidrat</p>
                        </div>

                        <div className="">
                          <h3 className="font-bold">445g</h3>
                          <p>Protein</p>
                        </div>

                      </div>
                    </td>
                  </tr>

                  <tr className="border rounded-md">
                    <td className="p-6">
                      <h2 className="font-bold text-xl">Makan Malam</h2>

                          <div className="grid grid-cols-2 lg:grid-cols-4">
                        <div className="">
                          <h3 className="font-bold">445 kkal</h3>
                          <p>Energi</p>
                        </div>

                        <div className="">
                          <h3 className="font-bold">34g</h3>
                          <p>Lemak</p>
                        </div>

                        <div className="">
                          <h3 className="font-bold">445g</h3>
                          <p>Karbohidrat</p>
                        </div>

                        <div className="">
                          <h3 className="font-bold">445g</h3>
                          <p>Protein</p>
                        </div>

                      </div>
                    </td>
                  </tr>
                </table>

              </div>
            </Tabs.Item>

            <Tabs.Item
              title="Berat Badan per Umur"
            >
              <div className="overflow-x-auto mb-5">
                <div className="py-4 flex xl:justify-center xl:items-center" ref={bbPerUChart}>
                  <ResultChart
                    xTitle="Umur (bulan)"
                    yTitle="Berat Badan (kg)"
                    chartData={bbPerU}
                    xSkipSize={2}
                    width={chartWidth}
                  />   
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-row items-center">
                  <h3 className="text-xl font-bold">Interpretasi</h3>
                  <span className="ml-3 font-bold text-sm px-5 py-2 rounded-md text-white" style={{background: apiResult.bb_u_informations.hex}}>{apiResult.bb_u_informations.status}</span>
                </div>
                <p>Nilai BBU : {apiResult.bbu.toFixed(2)}</p>
                <p>{apiResult.bb_u_informations.articles}</p>
              </div>
            </Tabs.Item>

            <Tabs.Item
              title="Berat Badan per Panjang Badan"
            >
               <div className="overflow-x-auto mb-6">
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

              <div className="flex flex-row items-center">
                <h3 className="text-xl font-bold">Interpretasi</h3>
                <span className="ml-3 font-bold text-sm px-5 py-2 rounded-md text-white" style={{background: apiResult.bb_pb_informations.hex}}>{apiResult.bb_pb_informations.status}</span>
              </div>
              <p>Nilai BB/PB : {apiResult.bb_pb.toFixed(2)}</p>
              <p>{apiResult.bb_pb_informations.articles}</p>
            </Tabs.Item>

            <Tabs.Item
              title="Panjang Badan per Umur"
            >
              <div className="overflow-x-auto mb-6">
                <div className="py-4 flex xl:justify-center xl:items-center" ref={pbPerUChart}>
                  <ResultChart
                    xTitle="Umur (bulan)"
                    yTitle="Panjang Badan (cm)"
                    chartData={pbPerU}
                    xSkipSize={2}
                    width={chartWidth}
                  />  
                </div>
              </div>

              <div className="flex flex-row items-center">
                <h3 className="text-xl font-bold">Interpretasi</h3>
                <span className="ml-3 font-bold text-sm px-5 py-2 rounded-md text-white" style={{background: apiResult.pb_tb_u_informations.hex}}>{apiResult.pb_tb_u_informations.status}</span>
              </div>
              <p>Nilai PB/U : {apiResult.pb_tb_u.toFixed(2)}</p>
              <p>{apiResult.pb_tb_u_informations.articles}</p>
            </Tabs.Item>
          </Tabs.Group>
        </div>
      }

    </div>
  )
}

export default PsgPage