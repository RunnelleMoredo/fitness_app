from flask import Flask
from dotenv import load_dotenv
from routes.exercises import exercise_bp

load_dotenv()

app = Flask(__name__)

app.register_blueprint(exercise_bp, url_prefix="/api/exercises")

@app.route("/")
def home():
    return "fuck"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)