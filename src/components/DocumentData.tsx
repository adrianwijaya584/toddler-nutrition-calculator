import {  Page, Document, Text, Image, View } from "@react-pdf/renderer"
import { createTw } from "react-pdf-tailwind";
import moment from 'moment'

interface propsData {
  biodata: {
    name: string
    age: number
    weight: number
    height: number
    gender: string
  }
  data: {
    bbu: number
    bb_pb: number
    pb_tb_u: number
  }
  imageBbPerU: string
  imageBbPerP: string
  imagePbPerUChart: string
}

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

export default (props: propsData)=> {
  const dateCreated= moment().format("DD-MM-YYYY HH:mm:ss");
  const {biodata}= props
    
  return (
    <Document>
      <Page size="A4" style={tw('p-8')}>
        <View style={tw('flex justify-between flex-row w-full text-base')}>
          <Text>by me</Text>
          <Text>{dateCreated}</Text>
        </View>

        <Text style={tw('text-center text-2xl font-bold')}>
          Hasil perhitungan status gizi
        </Text>

        <View style={tw('border-2 rounded-md px-5 py-2')}>
          <Text style={tw('text-base')}>Nama : {biodata.name}</Text>
          <Text style={tw('text-base')}>Umur : {biodata.age} Bulan</Text>
          <Text style={tw('text-base')}>Berat : {biodata.weight} Kg</Text>
          <Text style={tw('text-base')}>Panjang Badan : {biodata.height} Cm</Text>
          <Text style={tw('text-base')}>Jenis Kelamin : {biodata.gender=='male'?'Laki-laki':'Perempuan'}</Text>
        </View>

        <Text style={tw('text-center text-base font-bold text-xl')}>
          chart berat badan per umur
        </Text>

        <Image src={props.imageBbPerU} />

        <Text style={tw('text-center text-base font-bold text-xl')}>
          chart berat badan per tinggi badan
        </Text>

        <Image src={props.imageBbPerP} />

        <Text style={tw('text-center text-base font-bold text-xl')}>
          chart panjang badan per umur
        </Text>

        <Image src={props.imagePbPerUChart} />

        <Text style={tw('text-justify text-sm font-normal')}>
          BB per U : {props.data?.bbu}
        </Text>

        <Text style={tw('text-justify text-sm font-normal')}>
          BB per PB : {props.data?.bb_pb}
        </Text>

        <Text style={tw('text-justify text-sm font-normal')}>
          PB TB per U : {props.data?.pb_tb_u}
        </Text>

        <Text style={tw('text-justify text-sm font-normal')}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda eaque veritatis, nesciunt consequatur perferendis similique quisquam animi! Et aperiam, quisquam iste dolore corporis vel, doloribus ex ad culpa, voluptates amet?
        </Text>
      </Page>
   </Document>
  )
}