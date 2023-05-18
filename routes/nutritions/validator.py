from marshmallow import Schema, fields
from marshmallow.validate import Range

class NutritionDto(Schema):
  weight= fields.Float(required=True)
  height= fields.Float(required=True)
  age= fields.Int(required=True, strict=True, validate=Range(0, 60))
