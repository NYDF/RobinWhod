from flask import Blueprint, jsonify
import json
from app.models import Stock

stock_routes = Blueprint('stocks', __name__)


@stock_routes.route('/')
def all_stocks():
    """
    Query for all stocks
    """
    all_stocks = Stock.query.all()
    return json.dumps({"stocks": [stock.to_dict() for stock in all_stocks]})
