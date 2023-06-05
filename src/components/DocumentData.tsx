/* eslint-disable jsx-a11y/alt-text */
import {  Page, Document, Text, Image, View } from "@react-pdf/renderer"
import { createTw } from "react-pdf-tailwind";
import moment from 'moment'


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
    
  return (
    <Document>
      <Page size="A4" style={tw('p-8')}>
        <View style={tw('flex justify-between flex-row w-full text-base mb-5')}>
          <Text>by me</Text>
          <Text>{dateCreated}</Text>
        </View>

        <Text style={tw('text-center text-2xl font-extrabold')}>
          Hasil perhitungan status gizi
        </Text>

        <View style={tw('border rounded-md px-6 py-5 mb-7 flex flex-row text-base')}>
          <View >
            <Text style={tw('mb-2')}>Nama</Text>
            <Text style={tw('mb-2')}>Umur</Text>
            <Text style={tw('mb-2')}>Berat</Text>
            <Text style={tw('mb-2')}>Panjang Badan</Text>
            <Text>Jenis Kelamin</Text>
          </View>

          <View style={tw('mx-2')}>
            <Text style={tw('mb-2')}>:</Text>
            <Text style={tw('mb-2')}>:</Text>
            <Text style={tw('mb-2')}>:</Text>
            <Text style={tw('mb-2')}>:</Text>
            <Text>:</Text>
          </View>

          <View>
            <Text style={tw('mb-2')}>{biodata.name}</Text>
            <Text style={tw('mb-2')}>{biodata.age} Bulan</Text>
            <Text style={tw('mb-2')}>{biodata.weight} Kg</Text>
            <Text style={tw('mb-2')}>{biodata.height} Cm</Text>
            <Text>{biodata.gender=='male'?'Laki-laki':'Perempuan'}</Text>
          </View>
        </View>

        {/* <View style={tw('table w-full border-2 border-r-0 border-b-0')}>
          <View style={tw('flex-row items-center')}>
            <View style={tw('w-1/4 border-2 border-l-0 border-t-0')}>
              <Text style={tw('text-md text-center')}>name</Text>
            </View>

            <View style={tw('w-1/4 border-2 border-l-0 border-t-0')}>
              <Text style={tw('text-md text-center')}>abc</Text>
            </View>

            <View style={tw('w-1/4 border-2 border-l-0 border-t-0')}>
              <Text style={tw('text-md text-center')}>abc</Text>
            </View>

            <View style={tw('w-1/4 border-2 border-l-0 border-t-0')}>
              <Text style={tw('text-md text-center')}>abc</Text>
            </View>
          </View>
          <View style={tw('flex-row items-center')}>
            <View style={tw('w-1/4 border-2 border-l-0 border-t-0')}>
              <Text style={tw('text-lg text-center mt-2')}>name</Text>
            </View>

            <View style={tw('w-1/4 border-2 border-l-0 border-t-0')}>
              <Text style={tw('text-lg text-center mt-2')}>abc</Text>
            </View>

            <View style={tw('w-1/4 border-2 border-l-0 border-t-0')}>
              <Text style={tw('text-lg text-center mt-2')}>abc</Text>
            </View>

            <View style={tw('w-1/4 border-2 border-l-0 border-t-0')}>
              <Text style={tw('text-lg text-center mt-2')}>abc</Text>
            </View>
          </View>
        </View> */}

        <View
          style={tw('mx-auto')}
        >
          <Image 
            src={props.imageBbPerU}
          />

          <Text style={tw('text-center text-base font-bold text-[15px]')}>
            chart berat badan per umur
          </Text>
        </View>

        <View>
          <Image src={props.imageBbPerP} />
          
          <Text style={tw('text-center text-base font-bold text-[15px]')}>
            chart berat badan per tinggi badan
          </Text>
        </View>

        <View>
          <Image src={props.imagePbPerUChart} />

          <Text style={tw('text-center text-base font-bold text-[15px]')}>
            chart panjang badan per umur
          </Text>
        </View>

        <Text style={tw('text-justify text-sm font-normal mt-3')}>
          BB per U : {calculationResult.bbu}, 
          BB per PB : {calculationResult.bb_pb}, 
          PB per U : {calculationResult.pb_tb_u}
        </Text>

        <Text style={tw('text-justify text-sm font-normal mt-3')}>
          status BB per U : {calculationResult.bb_u_informations.status}, 

          status BB per PB : {calculationResult.bb_pb_informations.status}, 

          status PB per U : {calculationResult.pb_tb_u_informations.status}
        </Text>

        <Text style={tw('text-justify text-sm font-normal mt-3')}>
          Total energi : {calculationResult.nutritionNeeds.energi}, 
          Total karbo : {calculationResult.nutritionNeeds.karbo}, 
          Total lemak : {calculationResult.nutritionNeeds.lemak}, 
          Total protein : {calculationResult.nutritionNeeds.protein}, 
        </Text>

        <Text style={tw('text-justify text-sm font-normal mt-3')}>
          Total energi untuk pagi dan siang : {calculationResult.nutritionNeedsPerServing.energi_pagi_siang}, 
          Total karbo untuk pagi dan siang : {calculationResult.nutritionNeedsPerServing.karbo_pagi_siang}, 
          Total lemak untuk pagi dan siang : {calculationResult.nutritionNeedsPerServing.lemak_pagi_siang}, 
          Total protein untuk pagi dan siang : {calculationResult.nutritionNeedsPerServing.protein_pagi_siang}, 
        </Text>
        
        <Text style={tw('text-justify text-sm font-normal mt-3')}>
          Total energi untuk malam : {calculationResult.nutritionNeedsPerServing.energi_malam}, 
          Total karbo untuk malam : {calculationResult.nutritionNeedsPerServing.karbo_malam}, 
          Total lemak untuk malam : {calculationResult.nutritionNeedsPerServing.lemak_malam}, 
          Total protein untuk malam : {calculationResult.nutritionNeedsPerServing.protein_malam}, 
        </Text>
      </Page>
   </Document>
  )
}

export default DocumentData