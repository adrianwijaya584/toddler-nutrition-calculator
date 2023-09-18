const nutritionPerServing= (energi: number, protein: number, lemak: number, karbo: number)=> {
  const energi_pagi_siang= +(0.35 * energi).toFixed(1)
  const protein_pagi_siang= +(0.35 * protein).toFixed(1)
  const lemak_pagi_siang=  +(0.35 * lemak).toFixed(1)
  const karbo_pagi_siang= +(0.35 * karbo).toFixed(1)
      
  const energi_malam= +(0.30 * energi).toFixed(1)
  const protein_malam= +(0.30 * protein).toFixed(1)
  const lemak_malam=  +(0.30 * lemak).toFixed(1)
  const karbo_malam= +(0.30 * karbo).toFixed(1)

  return {
    energi_pagi_siang,
    protein_pagi_siang,
    lemak_pagi_siang,
    karbo_pagi_siang,

    energi_malam,
    protein_malam,
    lemak_malam,
    karbo_malam,
  }
}

export default nutritionPerServing;