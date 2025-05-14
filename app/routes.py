import requests
from flask import Blueprint, render_template, request
from datetime import datetime

dog_bp = Blueprint("dog", __name__, template_folder="../templates")


@dog_bp.route("/", methods=["GET", "POST"])
def index():
    image_url = None
    raza = None
    subraza = None

    if request.method in ["POST", "GET"]:
        response = requests.get("https://dog.ceo/api/breeds/image/random")
        data = response.json()
        image_url = data["message"]

        # Extraer raza y subraza desde la URL
        partes = image_url.split("/")
        raza_info = partes[4]
        if "-" in raza_info:
            raza, subraza = raza_info.split("-")
        else:
            raza = raza_info
            subraza = None

    return render_template("index.html", image_url=image_url, raza=raza, subraza=subraza, now=datetime.now())
