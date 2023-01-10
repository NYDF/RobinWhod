from flask import Blueprint, jsonify
import json
from app.models import Stock
from flask_login import login_required
from app.forms import StockForm

stock_routes = Blueprint('stocks', __name__)


@stock_routes.route('/')
def all_stocks():
    """
    Query for all stocks
    """
    all_stocks = Stock.query.all()
    return json.dumps({"stocks": [stock.to_dict() for stock in all_stocks]})



@stock_routes.route('/new', methods=["POST"])
@login_required
def add_stock():
    # print('here--------------------------------------')
    form = StockForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        print('here++++++++++', form.data)
        new_stock = StockForm(
            symbol=form.data["symbol"],
        )
        print('here@@@@@@@@@@@@@@@@@@@@', new_stock)
        db.session.add(new_stock)
        db.session.commit()
        return new_stock.to_dict()

    else:
        return form.errors
