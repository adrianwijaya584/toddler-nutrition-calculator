const nutitionNeeds= (age: number, weight: number)=> {
  let energi= 0;
  let protein= 0;
  let lemak= 0;
  let karbo= 0;

  if (age >= 0 && age < 7) {
    energi = 108 * weight
    protein = 0.15 * energi / 4
    lemak = 0.25 * energi / 9
    karbo = 0.65 * energi / 4
  }

  else if ( age > 5 && age < 13) {
    energi = 98 * weight
    protein = 0.15 * energi / 4
    lemak = 0.25 * energi / 9
    karbo = 0.65 * energi / 4
  }

  else if (age > 12 && age < 37) {
    energi = 102 * weight
    protein = 0.15 * energi / 4
    lemak = 0.25 * energi / 9
    karbo = 0.65 * energi / 4
  }

  else if (age > 36 && age < 73) {
    energi = 90 * weight
    protein = 0.15 * energi / 4
    lemak = 0.25 * energi / 9
    karbo = 0.65 * energi / 4
  }

  else if (age > 72 && age < 121) {    
    energi = 70 * weight
    protein = 0.15 * energi / 4
    lemak = 0.25 * energi / 9  
    karbo = 0.65 * energi / 4
  }

  return {
    energi: +energi.toFixed(2), 
    protein: +protein.toFixed(2), 
    lemak: +lemak.toFixed(2), 
    karbo: +karbo.toFixed(2),
  }
}

export default nutitionNeeds;