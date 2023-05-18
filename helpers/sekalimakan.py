class sekali_makan():
  def __init__(self, tee, protein, lemak, karbo):
    self.tee =  tee
    self.protein = protein
    self.lemak = lemak
    self.karbo = karbo

  def makan(self):
    energi_pagi = round(0.35 * self.tee, 1)
    protein_pagi = round(0.35 * self.protein, 1)
    lemak_pagi =  round(0.35 * self.lemak, 1)
    karbo_pagi = round(0.35 * self.karbo, 1)        
        
    energi_malam = round(0.30 * self.tee, 1)
    protein_malam = round(0.30 * self.protein, 1)
    lemak_malam =  round(0.30 * self.lemak, 1)
    karbo_malam = round(0.30 * self.karbo, 1)

    makan = {
        'energi_pagi_siang':energi_pagi,
        'protein_pagi_siang' : protein_pagi,
        'lemak_pagi_siang' : lemak_pagi,
        'karbo_pagi_siang' : karbo_pagi,

        'energi_malam':energi_malam,
        'protein_malam' : protein_malam,
        'lemak_malam' : lemak_malam,
        'karbo_malam' : karbo_malam,
    }

    return makan

# print(sekali_makan(tee=1000, protein=90, lemak=50, karbo=200).makan()['energi pagi'])

