from flask import request
from helpers.psg import psg
from helpers.nutritionDataFilter import nutritionDataFilter
from helpers.rumus_gizi import rumus_gizi
from helpers.sekalimakan import sekali_makan
from .validator import NutritionDto

# print(f'hasil = {psg(umur=30, bb=5.7, pb_tb=92).bb_pb()}')

def nutritionCalculation():
  validator= NutritionDto()
  errors= validator.validate(request.json)

  if errors:
    return {
      "error": True,
      "errors": errors
    }, 400

  weight= request.json["weight"]
  height= request.json["height"]
  age= request.json["age"]

  psgObj= psg(umur= int(age), bb= float(weight), pb_tb=float(height))
  rumusGizi= rumus_gizi(umur= int(age), bb= float(weight), pb_tb=float(height))
  bbuScore= psgObj.bbu()
  bbpbScore= psgObj.bb_pb()
  pbtbuScore= psgObj.pb_tb_u()

  # obesitas malnutrisi stunting ideal
  bbuIndex= 'ideal'
  bbPbIndex= 'ideal'
  pbTbUIndex= 'ideal'

  bbuScoreInformations= nutritionDataFilter(bbuIndex)
  bbPbInformations= nutritionDataFilter(bbPbIndex)
  pbTbUInformations= nutritionDataFilter(pbTbUIndex)

  nutritionNeeds= rumusGizi.nilai_gizi()

  return {
    "bbu": bbuScore,
    "bb_pb": bbpbScore,
    "pb_tb_u": pbtbuScore,
    "nutritionNeeds": nutritionNeeds,
    "nutritionNeedsPerServing": sekali_makan(tee=nutritionNeeds['energi'], karbo=nutritionNeeds['karbo'], lemak=nutritionNeeds['lemak'], protein=nutritionNeeds['protein']).makan(),
    "bb_u_informations":  {
      "status": bbuIndex,
      "symtomps": bbuScoreInformations["gejala"],
      "articles": bbuScoreInformations["artikel"],
      # "symtomps": nutritionDataFilter["gejala"],
    },
    "bb_pb_informations":  {
      "status": bbPbIndex,
      "symtomps": bbPbInformations["gejala"],
      "articles": bbPbInformations["artikel"],
      # "symtomps": nutritionDataFilter["gejala"],
    },
    "pb_tb_u_informations":  {
      "status": pbTbUIndex,
      "symtomps": pbTbUInformations["gejala"],
      "articles": pbTbUInformations["artikel"],
      # "symtomps": nutritionDataFilter["gejala"],
    },
  }