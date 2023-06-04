import DocumentData from '@/components/DocumentData';
import { PDFViewer } from '@react-pdf/renderer'
import { useEffect, useState } from 'react';

const PdfPage= ()=> {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (process.env.NODE_ENV=='development') {
    return (
      <div>  
        {
          isClient&&(
            <>
              <PDFViewer width="100%" height="1000">
                <DocumentData
                  biodata={{
                    name: 'AAaaaa',
                    age: 30,
                    gender: 'male',
                    height: 110,
                    weight: 20
                  }}
                  calculationResult={{
                    bb_pb: 1,
                    bbu: 1,
                    pb_tb_u: 1,
                    bb_pb_informations: {
                      status: 'ideal',
                      articles: ['aaa'],
                    },
                    bb_u_informations: {
                      status: 'ideal',
                      articles: ['aaa'],
                    },
                    pb_tb_u_informations: {
                      status: 'ideal',
                      articles: ['aaa'],
                    },
                    nutritionNeeds: {
                      energi: 1800,
                      karbo: 400,
                      lemak: 50,
                      protein: 50,
                    },
                    nutritionNeedsPerServing: {
                      energi_pagi_siang: 600,
                      karbo_pagi_siang: 600,
                      lemak_pagi_siang: 20,
                      protein_pagi_siang: 20,
                      energi_malam: 500,
                      karbo_malam: 200,
                      lemak_malam: 300,
                      protein_malam: 100
                    }
                  }}
                  imageBbPerP="https://www.svgrepo.com/show/327408/logo-vercel.svg"
                  imageBbPerU="https://www.svgrepo.com/show/327408/logo-vercel.svg"
                  imagePbPerUChart="https://www.svgrepo.com/show/327408/logo-vercel.svg"
                />
              </PDFViewer>
            </>
          )
        }
      </div>
  
    )
  }

  return <></>

}

export default PdfPage