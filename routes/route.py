from flask import Flask, Blueprint
from .nutritions import psg

app= Flask(__name__)

routers= Blueprint("routes", __name__)

@routers.post("/psg")
def nutritionCalculation():
  return psg.nutritionCalculation()