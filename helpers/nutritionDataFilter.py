import json
import os

def nutritionDataFilter(nutritionIndex):
  nutritionJson= json.load(open(os.path.join(os.getcwd(), "datasets/nutriton_data.json")))
  nutritionDataFilter=  next(filter(lambda v: v['tag']==nutritionIndex, nutritionJson), None)
  
  return nutritionDataFilter