from flask import jsonify, request, Blueprint
import os
import requests

EXERCISE_API_URL = os.getenv("EXERCISE_API_URL") 
# EXERCISE_API_URL = "https://www.exercisedb.dev/api/v1/exercises"

if not EXERCISE_API_URL:
    raise RuntimeError("EXERCISE_API_URL not properly set")

exercise_bp = Blueprint("exercise", __name__)


@exercise_bp.route("/all", methods=["GET"])
def get_all_workouts():
    response = requests.get(EXERCISE_API_URL)
    response.raise_for_status()
    
    return jsonify(response.json()), 200