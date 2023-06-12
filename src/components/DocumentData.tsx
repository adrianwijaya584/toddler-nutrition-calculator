/* eslint-disable jsx-a11y/alt-text */
import {  Page, Document, Text, Image, View, Font } from "@react-pdf/renderer"
import { createTw } from "react-pdf-tailwind";
import moment from 'moment'

Font.register({
  family: "Arial",
  fonts: [
    {
      src: "/fonts/Arimo-Regular.ttf",
    },
    {
      src: "/fonts/Arimo-SemiBold.ttf",
      fontWeight: 'bold'
    },
  ]
});

const tw = createTw({
  theme: {
    fontFamily: {
  },
  extend: {
    colors: {
      custom: "#bada55",
    },
  },
  },
})

const DocumentData= (props: PdfData)=> {
  const dateCreated= moment().format("DD-MM-YYYY HH:mm:ss");
  const {biodata, calculationResult}= props
  const {nutritionNeeds, nutritionNeedsPerServing}= calculationResult
    
  return (
    <Document>
      <Page size="A4" style={tw(`p-8`)}>
        <View style={{
          ...tw('flex justify-between flex-row w-full text-base font-bold'),
          fontFamily: 'Arial',
        }}>
          <Text>by TNC Team</Text>
          <Text>{dateCreated}</Text>
        </View>

        <Text style={{
          ...tw('text-center text-2xl font-extrabold mt-4 font-bold'),
          fontFamily: 'Arial',
        }}>
          Hasil perhitungan status gizi
        </Text>

        {/* Table Biodata */}
        <View style={tw('w-full border border-r-0 border-b-0')}>
          <View style={tw('flex-row items-center')}>
            <View style={tw('w-full border-b border-r py-2')}>
              <Text style={tw('text-center text-base')}>Data Diri Balita</Text>
            </View>
          </View>

          <View style={tw('flex-row items-center')}>
            <View style={tw('w-1/3 border-b border-r px-3 py-2')}>
              <Text style={tw('text-sm')}>Nama</Text>
            </View>

            <View style={tw('w-2/3 border-b border-r px-3 py-2')}>
              <Text style={tw('text-sm')}>{biodata.name}</Text>
            </View>
          </View>

          <View style={tw('flex-row items-center')}>
            <View style={tw('w-1/3 border-b border-r px-3 py-2')}>
              <Text style={tw('text-sm')}>Umur</Text>
            </View>

            <View style={tw('w-2/3 border-b border-r px-3 py-2')}>
              <Text style={tw('text-sm')}>{biodata.age} Bulan</Text>
            </View>
          </View>

          <View style={tw('flex-row items-center')}>
            <View style={tw('w-1/3 border-b border-r px-3 py-2')}>
              <Text style={tw('text-sm')}>Berat</Text>
            </View>

            <View style={tw('w-2/3 border-b border-r px-3 py-2')}>
              <Text style={tw('text-sm')}>{biodata.weight} kg</Text>
            </View>
          </View>

          <View style={tw('flex-row items-center')}>
            <View style={tw('w-1/3 border-b border-r px-3 py-2')}>
              <Text style={tw('text-sm')}>Panjang/Tinggi Badan</Text>
            </View>

            <View style={tw('w-2/3 border-b border-r px-3 py-2')}>
              <Text style={tw('text-sm')}>{biodata.height} cm</Text>
            </View>
          </View>

          <View style={tw('flex-row items-center')}>
            <View style={tw('w-1/3 border-b border-r px-3 py-2')}>
              <Text style={tw('text-sm')}>Jenis Kelamin</Text>
            </View>

            <View style={tw('w-2/3 border-b border-r px-3 py-2')}>
              <Text style={tw('text-sm')}>{biodata.gender=='male'?'Laki-laki':'Perempuan'}</Text>
            </View>
          </View>
        </View>

        {/* Table Status Gizi */}
        <View style={tw('w-full border border-r-0 border-b-0 mt-7')}>
          <View style={tw('flex-row items-center')}>
            <View style={tw('w-full border-b border-r py-2')}>
              <Text style={tw('text-center text-base')}>Status Gizi</Text>
            </View>
          </View>

          <View style={tw('flex-row items-center')}>
            <View style={tw('w-1/2 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>Data</Text>
            </View>

            <View style={tw('w-1/2 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>Hasil</Text>
            </View>
          </View>

          <View style={tw('flex-row items-center')}>
            <View style={tw('w-1/2 border-b border-r py-2')}>
              <Text style={tw('text-base px-3 text-sm')}>Berdasarkan Berat Badan per Umur</Text>
            </View>

            <View style={tw('w-1/2 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>{calculationResult.bb_u_informations.status}</Text>
            </View>
          </View>

          <View style={tw('flex-row items-center')}>
            <View style={tw('w-1/2 border-b border-r py-2')}>
              <Text style={tw('text-base px-3 text-sm')}>Berdasarkan Berat Badan per Panjang Badan</Text>
            </View>

            <View style={tw('w-1/2 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>{calculationResult.bb_pb_informations.status}</Text>
            </View>
          </View>

          <View style={tw('flex-row items-center')}>
            <View style={tw('w-1/2 border-b border-r py-2')}>
              <Text style={tw('text-base px-3 text-sm')}>Berdasarkan Panjang/Tinggi Badan per Umur</Text>
            </View>

            <View style={tw('w-1/2 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>{calculationResult.pb_tb_u_informations.status}</Text>
            </View>
          </View>

        </View>

        {/* Table Nutrisi full */}
        <View style={tw('w-full border border-r-0 border-b-0 mt-7')}>
          <View style={tw('flex-row items-center')}>
            <View style={tw('w-full border-b border-r py-2')}>
              <Text style={tw('text-center text-base')}>Nutrisi yang Dibutuhkan Per Hari</Text>
            </View>
          </View>

          <View style={tw('flex-row items-center')}>
            <View style={tw('w-1/2 border-b border-r py-2')}>
              <Text style={tw('text-base px-3 text-sm')}>Total Energi</Text>
            </View>

            <View style={tw('w-1/2 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>{nutritionNeeds.energi.toFixed(2)} kkal</Text>
            </View>
          </View>

          <View style={tw('flex-row items-center')}>
            <View style={tw('w-1/2 border-b border-r py-2')}>
              <Text style={tw('text-base px-3 text-sm')}>Karbohidrat</Text>
            </View>

            <View style={tw('w-1/2 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>{nutritionNeeds.karbo.toFixed(2)}g</Text>
            </View>
          </View>

          <View style={tw('flex-row items-center')}>
            <View style={tw('w-1/2 border-b border-r py-2')}>
              <Text style={tw('text-base px-3 text-sm')}>Protein</Text>
            </View>

            <View style={tw('w-1/2 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>{nutritionNeeds.protein.toFixed(2)}g</Text>
            </View>
          </View>

          <View style={tw('flex-row items-center')}>
            <View style={tw('w-1/2 border-b border-r py-2')}>
              <Text style={tw('text-base px-3 text-sm')}>Lemak</Text>
            </View>

            <View style={tw('w-1/2 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>{nutritionNeeds.lemak.toFixed(2)}g</Text>
            </View>
          </View>

        </View>

        {/* Table Nutrisi per 1x makan */}
        <View style={tw('w-full border border-r-0 border-b-0 mt-7')}>
          <View style={tw('flex-row items-center')}>
            <View style={tw('w-full border-b border-r py-2')}>
              <Text style={tw('text-center text-base')}>Nutrisi Untuk Sekali Makan</Text>
            </View>
          </View>

          <View style={tw('flex-row items-center')}>
            <View style={tw('w-1/4 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm text-white')}>a</Text>
            </View>

            <View style={tw('w-1/4 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>Makan Pagi</Text>
            </View>

            <View style={tw('w-1/4 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>Makan Siang</Text>
            </View>

            <View style={tw('w-1/4 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>Makan Malam</Text>
            </View>
          </View>

          <View style={tw('flex-row items-center')}>
            <View style={tw('w-1/4 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm ')}>Total Energi</Text>
            </View>

            <View style={tw('w-1/4 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>{nutritionNeedsPerServing.energi_pagi_siang.toFixed(2)} kkal</Text>
            </View>

            <View style={tw('w-1/4 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>{nutritionNeedsPerServing.energi_pagi_siang.toFixed(2)} kkal</Text>
            </View>

            <View style={tw('w-1/4 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>{nutritionNeedsPerServing.energi_malam.toFixed(2)} kkal</Text>
            </View>
          </View>
          
          <View style={tw('flex-row items-center')}>
            <View style={tw('w-1/4 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm ')}>Karbohidrat</Text>
            </View>

            <View style={tw('w-1/4 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>{nutritionNeedsPerServing.karbo_pagi_siang.toFixed(2)}g</Text>
            </View>

            <View style={tw('w-1/4 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>{nutritionNeedsPerServing.karbo_pagi_siang.toFixed(2)}g</Text>
            </View>

            <View style={tw('w-1/4 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>{nutritionNeedsPerServing.karbo_malam.toFixed(2)}g</Text>
            </View>
          </View>

          <View style={tw('flex-row items-center')}>
            <View style={tw('w-1/4 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm ')}>Protein</Text>
            </View>

            <View style={tw('w-1/4 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>{nutritionNeedsPerServing.protein_pagi_siang.toFixed(2)}g</Text>
            </View>

            <View style={tw('w-1/4 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>{nutritionNeedsPerServing.protein_pagi_siang.toFixed(2)}g</Text>
            </View>

            <View style={tw('w-1/4 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>{nutritionNeedsPerServing.protein_malam.toFixed(2)}g</Text>
            </View>
          </View>

          <View style={tw('flex-row items-center')}>
            <View style={tw('w-1/4 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm ')}>Lemak</Text>
            </View>

            <View style={tw('w-1/4 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>{nutritionNeedsPerServing.lemak_pagi_siang.toFixed(2)}g</Text>
            </View>

            <View style={tw('w-1/4 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>{nutritionNeedsPerServing.lemak_pagi_siang.toFixed(2)}g</Text>
            </View>

            <View style={tw('w-1/4 border-b border-r py-2')}>
              <Text style={tw('text-center text-sm')}>{nutritionNeedsPerServing.lemak_malam.toFixed(2)}g</Text>
            </View>
          </View>

        </View>

        {/* BB/U */}
        <View>  
          <Text style={{
            ...tw('text-xl font-extrabold mb-4 text-center font-bold'),
            fontFamily: 'Arial'
          }} break>
            Berat Badan per Umur
          </Text>

          <View style={tw('mx-auto')}>
            <Image src={props.imageBbPerU} style={tw('object-scale-down')}/>
          </View>

          <Text style={tw('text-sm font-bold my-4')}>
            Hasil Perhitungan Berat Badan per Umur : {calculationResult.bbu.toFixed(2)}
          </Text>

          <Text style={tw('text-sm font-bold mb-1')}>
            Interpretasi <Text style={{
              ...tw('font-bold'),
              fontFamily: 'Arial'
            }}>{calculationResult.bb_u_informations.status}</Text>
          </Text>

          <Text style={tw('text-sm font-bold')}>
            {calculationResult.bb_u_informations.articles}
          </Text>
        </View>

        {/* BB/PB */}
        <View style={tw('mt-4')} break> 
          <Text style={{
            ...tw('text-xl font-extrabold mb-4 text-center font-bold'),
            fontFamily: 'Arial'
          }} break>
            Berat Badan per Tinggi Badan
          </Text>

          <View style={tw('mx-auto')}>
            <Image src={props.imageBbPerPB} style={tw('object-scale-down')}/>
          </View>

          <Text style={tw('text-base font-bold my-4')}>
            Hasil Perhitungan Berat Badan per Tinggi Badan : {calculationResult.bb_pb.toFixed(2)}
          </Text>

          <Text style={tw('text-sm font-bold mb-1')}>
            Interpretasi <Text style={{
              ...tw('font-bold'),
              fontFamily: 'Arial'
            }}>{calculationResult.bb_pb_informations.status}</Text>
          </Text>

          <Text style={tw('text-sm font-bold')}>
            {calculationResult.bb_pb_informations.articles}
          </Text>
        </View>

        {/* PB/U */}
        <View style={tw('mt-4')} break>  
          <Text style={{
            ...tw('text-xl font-extrabold mb-4 text-center font-bold'),
            fontFamily: 'Arial'
          }} break>
            Panjang Badan per Umur
          </Text>

          <View style={tw('mx-auto')}>
            <Image src={props.imagePbPerU} style={tw('object-scale-down')}/>
          </View>

          <Text style={tw('text-base font-bold my-4')}>
            Hasil Perhitungan Panjang Badan per Umur : {calculationResult.pb_tb_u.toFixed(2)}
          </Text>

          <Text style={tw('text-sm font-bold mb-1')}>
            Interpretasi <Text style={{
              ...tw('font-bold'),
              fontFamily: 'Arial'
            }}>{calculationResult.pb_tb_u_informations.status}</Text>
          </Text>

          <Text style={tw('text-sm font-bold')}>
            {calculationResult.pb_tb_u_informations.articles}
          </Text>
        </View>


        <Text style={{
           position: 'absolute',
           fontSize: 12,
           bottom: 30,
           left: 0,
           right: 0,
           textAlign: 'center',
           color: 'grey',
        }} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
   </Document>
  )
}

export default DocumentData