class rumus_gizi():
  def __init__(self, umur, bb, pb_tb):
      self.umur = umur
      self.bb = bb 
      self.pb_tb = pb_tb 

  def nilai_gizi(self):
    if self.umur > 0 and self.umur < 7:
      energi = 108 * self.bb
      protein = 0.15 * energi / 4
      lemak = 0.25 * energi / 9
      karbo = 0.65 * energi / 4
    
    elif self.umur > 5 and self.umur < 13:
      energi = 98 * self.bb
      protein = 0.15 * energi / 4
      lemak = 0.25 * energi / 9
      karbo = 0.65 * energi / 4


    elif self.umur > 12 and self.umur < 37:
      energi = 102 * self.bb
      protein = 0.15 * energi / 4
      lemak = 0.25 * energi / 9
      karbo = 0.65 * energi / 4
    
    
    elif self.umur > 36 and self.umur < 73:
      energi = 90 * self.bb
      protein = 0.15 * energi / 4
      lemak = 0.25 * energi / 9
      karbo = 0.65 * energi / 4
    
    elif self.umur > 72 and self.umur < 121:
      energi = 70 * self.bb
      protein = 0.15 * energi / 4
      lemak = 0.25 * energi / 9  
      karbo = 0.65 * energi / 4
    
    return {'energi':energi, 'protein':protein, 'lemak':lemak, 'karbo':karbo}
