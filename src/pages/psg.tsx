import { Button, Select, Tabs, TextInput  } from 'flowbite-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import moment from 'moment';
import * as yup from 'yup';
import {MdOutlineEggAlt} from 'react-icons/md';
import {LuWheat} from 'react-icons/lu';
import {GiAlmond} from 'react-icons/gi';
import { toast } from 'react-toastify';
import {useSignal} from '@preact/signals-react';

import { FormLabel, InterpretationLabelBtn, NutritionBox, PerDayNutritionBox, validationDto } from '@/components/PsgPageComponents';
import bbPerPb from '@/data/bbperpb.json';
import bbPerU from '@/data/bbperu.json';
import pbPerU from '@/data/pbtbperu.json';
import DocumentData from '@/components/DocumentData';

const ResultChart= dynamic(()=> import('@/components/ResultChart'), {
  ssr: false
});

const PsgPage= ()=> {
  const firstInput= useRef<HTMLInputElement>(null);
  const bbPerUChart= useRef<HTMLDivElement>(null);
  const bbPerPbChart= useRef<HTMLDivElement>(null);  
  const pbPerUChart= useRef<HTMLDivElement>(null);
  const calculationResultSection= useRef<HTMLDivElement>(null);

  const [chartWidth, setChartWidth]= useState(1000);
  const [name, setName]= useState('');
  const [age, setAge]= useState(0);
  const [weight, setWeight]= useState(0);
  const [height, setHeight]= useState(0);
  const [gender, setGender]= useState('');
  const [isLoading, setIsLoading]= useState(false);
  const [errorMessage, setErrorMessage]= useState('');
  const [isDownloading, setIsDownloading]= useState(false);

  const chartData= useSignal({
    age: 0,
    weight: 0,
    height: 0,
  });

  const [apiResult, setApiResult]= useState<APIResult>();

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const formData= {
        name,
        age,
        weight,
        height,
        gender,
      }

      await validationDto.validate(formData, {
        abortEarly: false,
      });

      setIsLoading(true);

      const {data}= await axios.post<APIResult>('/api/psg', {
        weight,
        height,
        age
      });

      setIsLoading(false);
      setErrorMessage('');
      setApiResult(data);

      chartData.value= {
        age,
        weight,
        height,
      }

      setTimeout(()=> {
        calculationResultSection.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 0);
    } catch (error) {
      setIsLoading(false)
      
      if (error instanceof yup.ValidationError) {
        toast(error.errors[0], {
          type: 'error',
          autoClose: 1500
        })
      } else if (error instanceof axios.AxiosError) {
        if (error.code=='ERR_NETWORK') {
          setErrorMessage('Maaf Anda sedang tidak terhubung dengan internet.')
        } else {
          setErrorMessage('Maaf terjadi kesalahan di server.')
        }
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
        canvasWidth= 1500 - 250
      } else {
        canvasWidth= 1000
      }

      const imageBbPerU= await toPng(bbPerUChart.current as HTMLDivElement, {
        cacheBust: true,
        height: 600,
        width: canvasWidth
      })

      const imageBbPerPBb= await toPng(bbPerPbChart.current as HTMLDivElement, {
        cacheBust: true,
        height: 600,
        width: canvasWidth
      })

      const imagePbPerU= await toPng(pbPerUChart.current as HTMLDivElement, {
        cacheBust: true,
        height: 600,
        width: canvasWidth
      })

      const dateCreated= moment().format('DD-MM-YYYY_HH-mm-ss');
      
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
        imageBbPerPB={imageBbPerPBb}
        imagePbPerU={imagePbPerU}
      />).toBlob()
  
      saveAs(blob, `hasil-status-gizi-${name.replace(' ', '_')}-${dateCreated}.pdf`)

      setIsDownloading(false)
    }, 0)
  }

  useEffect(()=> {    
    const width= window.innerWidth

    if (width > 1500) {
      setChartWidth(1500 - 250)
    }

    firstInput.current?.focus()
  }, [])

  return (
    <div className='container mx-auto py-7 px-6 md:px-14 lg:px-24 xl:px-28'>
      <div className='mb-8 space-y-2'>
        <h1 className='font-bold text-2xl lg:text-3xl'>Kalkulator Perhitungan Gizi</h1>
        <h2
          className='text-paragraph'
        >Yuk moms ukur Gizi dan kebutuhan nutrisi balitamu sekarang <br className='hidden md:block'  /> menggunakan Perhitungan gizi berstandar kemenkes.</h2>
      </div>

      <form className='grid gap-x-5 gap-y-5 pb-9 grid-cols-1 md:grid-cols-2 md:gap-y-6' onSubmit={(e)=> submitForm(e)}>
        <div className='w-full'>
          <FormLabel label='Nama Balita' />
          <TextInput placeholder='Masukan nama balita.' 
          ref={firstInput}
          onChange={(e)=> setName(e.target.value)} />
        </div>

        <div className='w-full'>
          <FormLabel label='Umur Balita (dalam bulan)' />
          <TextInput type='number' placeholder='Masukan umur balita dalam bulan.'  max={60} min={0} value={age.toString()}
          onChange={(e)=> {
            setAge(e.target.value?parseInt(e.target.value, 10):0)
          }}
          />
        </div>

        <div className='w-full'>
          <FormLabel label='Berat Badan'  />
          <TextInput type='number' placeholder='Masukan berat badan dalam Kg.' inputMode='decimal' step={.1} min={0}
              onChange={(e)=> setWeight(+e.target.value)}
          />
        </div>

        <div className='w-full'>
          <FormLabel label='Tinggi Badan' />
          <TextInput type='number' placeholder='Masukan tinggi badan dalam Cm.' inputMode='decimal' step={.1} min={0}
              onChange={(e)=> setHeight(+e.target.value)}
          />
        </div>

        <div className='w-full'>
          <FormLabel label='Jenis Kelamin' />
          <Select placeholder='Masukan jenis kelamin balita.' 
              onChange={(e)=> setGender(e.target.value)}
          >
            <option value=''>Pilih Jenis Kelamin</option>
            <option value='male'>Laki-laki</option>
            <option value='female'>Perempuan</option>
          </Select>
        </div>

        <Button 
          type='submit' 
          className='w-full bg-primary-1 col-span-1 duration-500 md:col-span-2'
        >
          <div 
            ref={calculationResultSection}
          >
            Hitung
          </div>
        </Button>

      </form>

      {
        isLoading?
        <div
          className='text-center'
        >
          <p>Mengambil Data...</p>
        </div>
        :
        <div>
          {
            errorMessage&&
            <div className='text-center'>
              <h2 className='text-lg font-bold'>Maaf anda tidak terhubung dengan internet</h2>
            </div>
          }  
          
          {
            apiResult&&
            <div className="flex flex-col space-y-4">
              <h1 className='text-center text-2xl font-bold'>Hasil Perhitungan</h1>

              <Button disabled={isDownloading} onClick={()=> downloadPdf()} isProcessing={isDownloading} className='bg-primary-1 duration-500'>
                Download hasil perhitungan.
              </Button>

              <Tabs.Group
                style='underline'
                className='border border-gray-200 rounded-md'
              >
                <Tabs.Item 
                  title='Rangkuman'
                  tabIndex={0}
                >
                  <div className='space-y-8 px-5 pb-6 mx-auto xl:w-10/12'>

                    <div className='border-1 p-4 grid mx-auto gap-x-3 gap-y-2 lg:grid-cols-3'>
                      <h2>Balita anda memiliki : <span className='font-bold'>{apiResult.bb_u_informations.status} </span></h2>
                      <h2>Balita anda tergolong Gizi : <span className='font-bold'>{apiResult.bb_pb_informations.status} </span></h2>
                      <h2>Tinggi/Panjang Badan Balita anda : <span className='font-bold'>{apiResult.pb_tb_u_informations.status} </span></h2>
                    </div>

                    <h1 className='text-center font-bold text-lg lg:text-2xl'>Nutrisi Yang Di Butuhkan Per Hari</h1>

                    <div className='flex flex-col justify-center items-center space-y-12 lg:flex-row lg:justify-center lg:space-x-14 xl:space-x-20'>
                      <div className='border-8 border-[#32B6C1] rounded-full w-[150px] h-[150px] flex justify-center items-center flex-col space-y-2 lg:w-[180px] lg:h-[180px]'>
                        <h2 className='lg:text-lg'>Total Energi</h2>
                        <h3 className='font-bold text-3xl'>{apiResult.nutritionNeeds.energi}</h3>
                        <p>Energi</p>
                      </div>

                      <div className='flex flex-row items-center space-x-3 text-center md:space-x-6 xl:space-x-10'>
                        <NutritionBox
                          Icon={LuWheat}
                          result={apiResult.nutritionNeeds.karbo}
                          title='Karbohidrat'
                        />

                        <NutritionBox
                          Icon={MdOutlineEggAlt}
                          result={apiResult.nutritionNeeds.protein}
                          title='Protein'
                        />

                        <NutritionBox
                          Icon={GiAlmond}
                          result={apiResult.nutritionNeeds.lemak}
                          title='Lemak'
                        />
                      </div>
                    </div>

                    <h1 className='text-center pt-5 font-bold text-xl lg:text-2xl'>Konsumsi Gizi Seimbang yang disarankan</h1>

                    <div className='border border-b-0 w-full rounded-md'>
                      <PerDayNutritionBox
                        time='Pagi'
                        nutritionNeeds={{
                          energy: apiResult.nutritionNeedsPerServing.energi_pagi_siang,
                          carbo: apiResult.nutritionNeedsPerServing.karbo_pagi_siang,
                          fat: apiResult.nutritionNeedsPerServing.lemak_pagi_siang,
                          protein: apiResult.nutritionNeedsPerServing.protein_pagi_siang,
                        }}
                      />

                      <PerDayNutritionBox
                        time='Siang'
                        nutritionNeeds={{
                          energy: apiResult.nutritionNeedsPerServing.energi_pagi_siang,
                          carbo: apiResult.nutritionNeedsPerServing.karbo_pagi_siang,
                          fat: apiResult.nutritionNeedsPerServing.lemak_pagi_siang,
                          protein: apiResult.nutritionNeedsPerServing.protein_pagi_siang,
                        }}
                      />

                      <PerDayNutritionBox
                        time='Malam'
                        nutritionNeeds={{
                          energy: apiResult.nutritionNeedsPerServing.energi_malam,
                          carbo: apiResult.nutritionNeedsPerServing.karbo_malam,
                          fat: apiResult.nutritionNeedsPerServing.lemak_malam,
                          protein: apiResult.nutritionNeedsPerServing.protein_malam,
                        }}
                      />
                    </div>

                  </div>
                </Tabs.Item>

                <Tabs.Item
                  title='Berat Badan per Umur'
                  tabIndex={0}
                >
                  <div className='overflow-x-auto mb-5'>
                    <div className='flex xl:justify-center xl:items-center' ref={bbPerUChart}>
                      <ResultChart
                        xTitle='Umur (bulan)'
                        yTitle='Berat Badan (kg)'
                        chartData={bbPerU}
                        xSkipSize={2}
                        width={chartWidth}
                        resultPoints={{
                          x: chartData.value.age,
                          y: chartData.value.weight,
                        }}
                      />   
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <InterpretationLabelBtn
                      hex={apiResult.bb_u_informations.hex}
                      status={apiResult.bb_u_informations.status}
                    />
                    <p>Nilai BBU : {apiResult.bbu.toFixed(2)}</p>
                    <p className='text-paragraph lg:w-2/3'>{apiResult.bb_u_informations.articles}</p>
                  </div>
                </Tabs.Item>

                <Tabs.Item
                  title='Berat Badan per Panjang Badan'
                  tabIndex={0}
                >
                  <div className='overflow-x-auto mb-6'>
                    <div className='flex xl:justify-center xl:items-center' ref={bbPerPbChart}>
                      <ResultChart
                        xTitle='Panjang Badan (cm)'
                        yTitle='Berat Badan (kg)'
                        chartData={bbPerPb}
                        xSkipSize={5}
                        width={chartWidth}
                        resultPoints={{
                          x: chartData.value.height,
                          y: chartData.value.weight,
                        }}
                      />  
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <InterpretationLabelBtn
                      hex={apiResult.bb_pb_informations.hex}
                      status={apiResult.bb_pb_informations.status}
                    />
                    <p>Nilai BB/PB : {apiResult.bb_pb.toFixed(2)}</p>
                    <p className='text-paragraph lg:w-2/3'>{apiResult.bb_pb_informations.articles}</p>
                  </div>

                </Tabs.Item>

                <Tabs.Item
                  title='Panjang Badan per Umur'
                  tabIndex={0}
                >
                  <div className='overflow-x-auto mb-6'>
                    <div className='flex xl:justify-center xl:items-center' ref={pbPerUChart}>
                      <ResultChart
                        xTitle='Umur (bulan)'
                        yTitle='Panjang Badan (cm)'
                        chartData={pbPerU}
                        xSkipSize={2}
                        width={chartWidth}
                        resultPoints={{
                          x: chartData.value.age,
                          y: chartData.value.height,
                        }}
                      />  
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <InterpretationLabelBtn
                      hex={apiResult.pb_tb_u_informations.hex}
                      status={apiResult.pb_tb_u_informations.status}
                    />
                    <p>Nilai PB/U : {apiResult.pb_tb_u.toFixed(2)}</p>
                    <p className='text-paragraph lg:w-2/3'>{apiResult.pb_tb_u_informations.articles}</p>
                  </div>
                </Tabs.Item>
              </Tabs.Group>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default PsgPage
