from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.String(required=True)
    password = fields.String(required=True, load_only=True)