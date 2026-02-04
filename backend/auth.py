from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import db, User
from schemas import UserSchema
from marshmallow import ValidationError

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")
user_schema = UserSchema()

#register
@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        data = user_schema.load(request.json)
    except ValidationError as err:
        return jsonify({"error": "Validation Failed", "messages": err.messages}),400
    
    username = data.get("username")
    password = data.get("password")
    
    if len(password) < 8:
        return jsonify({"error": "Password must be more than 8 characters long"}), 400
    
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400
    
    