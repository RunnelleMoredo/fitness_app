from flask import jsonify, request, Blueprint
import os
import requests

EXERCISE_API_URL = os.getenv("EXERCISE_API_URL") 

if not EXERCISE_API_URL:
    raise RuntimeError("EXERCISE_API_URL not properly set")

exercise_bp = Blueprint("exercise", __name__)

#get all exercises
@exercise_bp.route("/", methods=["GET"])
def get_all_exercises():
    response = requests.get(EXERCISE_API_URL)
    response.raise_for_status()
    
    return jsonify(response.json()), 200

#search exercise
@exercise_bp.route("/search", methods=["GET"])
def search_exercise():
    
    query = request.args.get('q', '')
    if not query:
        return jsonify({"error": "Missing search query"}), 400
    
    response = requests.get(
        EXERCISE_API_URL + "/search",
        params={"q": query}, 
        timeout= 5
    )
    
    
    if response.status_code != 200:
        return jsonify({
            "error": "Upstream API error",
            "status": response.status_code
        }), 502
    
    data = response.json()
    
    cleaned = []
    
    for exercise in data.get("data", []):
        cleaned.append({
            "name": exercise.get("name"),
            "equipments": exercise.get("equipments"),
            "instructions": exercise.get("instructions"),
            "targetMuscles": exercise.get("targetMuscles"),
            "secondaryMuscles": exercise.get("secondaryMuscles"),
            "gifUrl": exercise.get("gifUrl"),
        })
        
    return jsonify(cleaned), 200        