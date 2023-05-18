from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes import route
import os

app= Flask(__name__)

CORS(app)
load_dotenv()

app.register_blueprint(route.routers)
app.config["JSON_SORT_KEYS"] = False

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=os.environ.get("PORT"), debug=bool(os.environ.get("DEBUG")))