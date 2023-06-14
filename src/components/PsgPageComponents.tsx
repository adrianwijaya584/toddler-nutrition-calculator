import { IconType } from "react-icons"
import * as yup from 'yup'

export const validationDto= yup.object({
  name: yup.string().required('Nama wajib diisi'),
  age: yup.number().min(0, 'Umur minimal 0').required('Umur wajib diisi'),
  weight: yup.number().positive('Berat badan wajib diisi').required('Berat badan wajib diisi'),
  height: yup.number().positive('Tinggi badan wajib diisi').required('Tinggi wajib diisi'),
  gender: yup.string().oneOf(['male', 'female'], 'Jenis kelamin wajib dipilih').required('Jenis kelamin wajib dipilih'),
})

export const FormLabel= ({label}: {label: string})=> <p className="mb-1 font-semibold text-sm">{label}</p>

export const NutritionBox= (props: NutritionBoxData)=> {
  return (
    <div className="bg-white shadow-lg w-24 h-24 rounded-md flex flex-col justify-end pb-5 relative md:w-28 lg:w-32 lg:h-28">
      <props.Icon
        className="text-4xl absolute -top-5 left-1/2 transform -translate-x-1/2 md:text-5xl md:-top-7 xl:text-6xl xl:-top-8"
      />
      <h4 className="font-bold text-lg">{props.result}</h4>
      <p>{props.title}</p>
    </div>
  )
}

export const PerDayNutritionBox= (props: PerDayNutritionBoxData)=> {
  return (
    <div className="border-b p-6 space-y-7">
    <h2 className="font-bold text-xl">Makan {props.time}</h2>

    <div className="grid grid-cols-2 text-center gap-y-4 lg:grid-cols-4">
      <div className="">
        <h3 className="font-bold mb-1">{props.nutritionNeeds.energy}kkal</h3>
        <p>Energi</p>
      </div>

      <div className="">
        <h3 className="font-bold mb-1">{props.nutritionNeeds.fat}g</h3>
        <p>Lemak</p>
      </div>

      <div className="">
        <h3 className="font-bold mb-1">{props.nutritionNeeds.carbo}g</h3>
        <p>Karbohidrat</p>
      </div>

      <div className="">
        <h3 className="font-bold mb-1">{props.nutritionNeeds.protein}g</h3>
        <p>Protein</p>
      </div>

    </div>
  </div>
  )
}

export const InterpretationLabelBtn= ({status, hex}: InterpretationLabelBtnData)=> {
  return (
    <div className="flex flex-row items-center">
      <h3 className="text-lg font-bold md:text-xl">Interpretasi</h3>
      <span className="ml-3 font-bold px-4 py-2 rounded-md text-white text-xs md:text-sm md:px-5" style={{background: hex}}>
        {status}
      </span>
    </div>
  )
}