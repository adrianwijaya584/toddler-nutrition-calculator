import { Accordion, Button, Select, TextInput  } from "flowbite-react"
import { FormEvent, useEffect, useRef, useState } from "react"
import dynamic from 'next/dynamic'
import axios from "axios"
import moment from "moment"
import * as yup from 'yup'

import bbPerPb from '@/data/bbperpb.json'
import bbPerU from '@/data/bbperu.json'
import pbPerU from '@/data/pbtbperu.json'

import DocumentData from '@/components/DocumentData'
import Link from "next/link"
const ResultChart= dynamic(()=> import("@/components/ResultChart"), {
  ssr: false
})

const FormDiv= ({children}: {children: JSX.Element[]})=> 
  <div className="flex flex-col space-y-2 md:space-y-0 md:space-x-3 md:flex-row">
    {children}
  </div>

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
  const [formData, setFormData]= useState({
    name: "aaa",
    age: 60,
    weight: 21,
    height: 110,
    gender: "male"
  })
  const [isLoading, setIsLoading]= useState(false)
  const [isDownloading, setIsDownloading]= useState(false)
  const [apiResult, setApiResult]= useState<APIResult>()

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      await validationDto.validate(formData, {
        abortEarly: false
      })

      setIsLoading(true)

      const {data}= await axios.post<APIResult>("/api/psg", {
        weight: formData.weight,
        height: formData.height,
        age: formData.age
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
    if (!bbPerUChart.current || !apiResult) {
      return
    }

    setIsDownloading(true)

    const accordionHeading1= document.querySelector('#accordion-collapse-heading-1') as HTMLElement
    const accordionBody1= document.querySelector('#accordion-collapse-body-1') as HTMLElement
    const accordionHeading2= document.querySelector('#accordion-collapse-heading-2') as HTMLElement
    const accordionBody2= document.querySelector('#accordion-collapse-body-2') as HTMLElement
    const accordionHeading3= document.querySelector('#accordion-collapse-heading-3') as HTMLElement
    const accordionBody3= document.querySelector('#accordion-collapse-body-3') as HTMLElement
    const accordionHeadingElements: HTMLElement[]= []

    if (accordionBody1.hidden) {
      accordionHeading1.click()
      accordionHeadingElements.push(accordionHeading1)
    }

    if (accordionBody2.hidden) {
      accordionHeading2.click()
      accordionHeadingElements.push(accordionHeading2)
    }

    if (accordionBody3.hidden) {
      accordionHeading3.click()
      accordionHeadingElements.push(accordionHeading3)
    }

    const {toPng}= (await import('html-to-image'))
    const {saveAs}= (await import('file-saver')).default
    const {pdf}= (await import('@react-pdf/renderer'))

    setTimeout(async ()=> {
      let canvasWidth= undefined

      if (window.innerWidth <= 1000) {
        canvasWidth= 1000
      }

      const imageBbPerU= await toPng(bbPerUChart.current as HTMLDivElement, {
        cacheBust: true,
        width: canvasWidth
      })
      const imageBbPerPb= await toPng(bbPerPbChart.current as HTMLDivElement, {
        cacheBust: true,
        width: canvasWidth
      })
      const imagePbPerUChart= await toPng(pbPerUChart.current as HTMLDivElement, {
        cacheBust: true,
        width: canvasWidth
      })
  
      const dateCreated= moment().format("DD-MM-YYYY_HH-mm-ss");
      
      const blob= await pdf(<DocumentData
        biodata={formData}  
        calculationResult={apiResult}
        imageBbPerU={imageBbPerU}
        imageBbPerP={imageBbPerPb}
        imagePbPerUChart={imagePbPerUChart}
      />).toBlob()
  
      saveAs(blob, `hasil-status-gizi-${formData.name.replace(" ", "_")}-${dateCreated}.pdf`)
  
      accordionHeadingElements.forEach((accordionHeading)=> {
        accordionHeading.click()
      })
  
      setIsDownloading(false)
    }, 0)
  }

  useEffect(()=> {    
    const width= window.innerWidth

    if (width > 1300) {
      setChartWidth(width - 150)
    }

    firstInput.current?.focus()
  }, [])

  return (
    <div className="p-4">
      <form className="space-y-4" onSubmit={(e)=> submitForm(e)}>
        <FormDiv>
          <div className="w-full md:w-2/4">
            <FormLabel label="Nama Balita" />
            <TextInput placeholder="Masukan nama balita." 
            ref={firstInput}
            onChange={(e)=> setFormData(v=> {
              return {
                ...v,
                name: e.target.value
              }
            })} />
          </div>

          <div className="w-full md:w-2/4">
            <FormLabel label="Umur Balita" />
            <TextInput type="number" placeholder="Masukan umur balita dalam bulan."  max={60} min={0} 
            onChange={(e)=> setFormData(v=> {
              return {
                ...v,
                age: +e.target.value
              }})}
            />
          </div>
        </FormDiv>

        <FormDiv>
          <div className="w-full md:w-1/3">
            <FormLabel label="Berat Badan"  />
            <TextInput type="number" placeholder="Masukan berat badan dalam Kg." inputMode="decimal" step={.1}
               onChange={(e)=> setFormData(v=> {
                return {
                  ...v,
                  weight: +e.target.value
                }})}
            />
          </div>

          <div className="w-full md:w-1/3">
            <FormLabel label="Tinggi Badan" />
            <TextInput type="number" placeholder="Masukan tinggi badan dalam Cm." inputMode="decimal" step={.1}
               onChange={(e)=> setFormData(v=> {
                return {
                  ...v,
                  height: +e.target.value
                }})}
            />
          </div>

          <div className="w-full md:w-1/3">
            <FormLabel label="Jenis Kelamin" />
            <Select placeholder="Masukan jenis kelamin balita." 
               onChange={(e)=> setFormData(v=> {
                return {
                  ...v,
                  gender: e.target.value
                }})}
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
            </Select>
          </div>
        </FormDiv>

        <Button type="submit" className="w-full bg-primary-1 duration-500">Hitung</Button>
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

          <Accordion alwaysOpen collapseAll>
            <Accordion.Panel>
              <Accordion.Title id="accordion-collapse-heading-1">Chart BB per U</Accordion.Title>

              <Accordion.Content id="accordion-collapse-body-1" className="overflow-x-auto">
                <div className="py-4" ref={bbPerUChart}>
                  <ResultChart
                    xTitle="Umur (bulan)"
                    yTitle="Berat Badan (kg)"
                    chartData={bbPerU}
                    width={chartWidth}
                  />  
                </div>
              </Accordion.Content>
            </Accordion.Panel>

            <Accordion.Panel>
              <Accordion.Title>
                Artikel Berat Badan per Umur
              </Accordion.Title>

              <Accordion.Content>
                <p>berdasarkan berat badan per umur anak anda <span className="font-bold">{apiResult.bb_u_informations.status}</span></p>
                <p>{apiResult.bb_u_informations.symtomps}</p>
                <p>{apiResult.bb_u_informations.articles}</p>
              </Accordion.Content>
            </Accordion.Panel>
            
            <Accordion.Panel>
              <Accordion.Title id="accordion-collapse-heading-2">Chart BB per PB</Accordion.Title>

              <Accordion.Content id="accordion-collapse-body-2">
                <div className="overflow-x-auto py-4" ref={bbPerPbChart}>
                  <ResultChart
                    xTitle="Berat Badan (kg)"
                    yTitle="Panjang Badan (cm)"
                    chartData={bbPerPb}
                    xSkipSize={5}
                    width={chartWidth}
                  />  
                </div>
              </Accordion.Content>
            </Accordion.Panel>

            <Accordion.Panel>
              <Accordion.Title>
                Artikel Berat Badan per Panjang Badan
              </Accordion.Title>

              <Accordion.Content>
                <p>berdasarkan berat badan per panjang badan anak anda <span className="font-bold">{apiResult.bb_pb_informations.status}</span></p>
                <p>{apiResult.bb_pb_informations.symtomps}</p>
                <p>{apiResult.bb_pb_informations.articles}</p>
              </Accordion.Content>
            </Accordion.Panel>

            <Accordion.Panel>
              <Accordion.Title id="accordion-collapse-heading-3">Chart PB per U</Accordion.Title>

              <Accordion.Content id="accordion-collapse-body-3">
                 <div className="overflow-x-auto py-4" ref={pbPerUChart}>
                  <ResultChart
                    xTitle="Umur (bulan)"
                    yTitle="Panjang Badan (cm)"
                    chartData={pbPerU}
                    width={chartWidth}
                  />  
                </div>
              </Accordion.Content>
            </Accordion.Panel>

            <Accordion.Panel>
              <Accordion.Title>Artikel Panjang Badan per Umur</Accordion.Title>

              <Accordion.Content>
                <p>berdasarkan panjang badan per umur anak anda <span className="font-bold">{apiResult.pb_tb_u_informations.status}</span></p>
                <p>{apiResult.pb_tb_u_informations.symtomps}</p>
                <p>{apiResult.pb_tb_u_informations.articles}</p>
              </Accordion.Content>
            </Accordion.Panel>

            <Accordion.Panel>
              <Accordion.Title>
                Karbohidrat, Protein, dan Lemak
              </Accordion.Title>

              <Accordion.Content>
                <p>Energi : {apiResult.nutritionNeeds.energi}</p>
                <p>Karbohidrat : {apiResult.nutritionNeeds.karbo}</p>
                <p>Protein : {apiResult.nutritionNeeds.protein}</p>
                <p>Lemak : {apiResult.nutritionNeeds.lemak}</p>

                <p>Energi Pagi & siang : {apiResult.nutritionNeedsPerServing.energi_pagi_siang}</p>

                <p>Energi Malam : {apiResult.nutritionNeedsPerServing.energi_malam}</p>
                
                <Link href="/resep" className="underline">
                  Cek resep sehat untuk anak anda disini
                </Link>
              </Accordion.Content>
            </Accordion.Panel>

          </Accordion>
        </div>
      }

    </div>
  )
}

export default PsgPage