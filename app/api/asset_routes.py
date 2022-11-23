from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user, login_user
from app.models import User, Asset
from app.forms import AssetForm
import json

asset_routes = Blueprint('assets', __name__)


@asset_routes.route('/current')
@login_required
def asset_list():
    """
    Query for all assets belong to the current user
    """
    print ('here--------------------')
    current_assets = Asset.query.filter_by(is_cash = False)
    dicts = [asset.to_dict() for asset in current_assets]
    user = current_user
    result = []
    for asset in dicts:
        if user.id == asset['owner_id']:
            result.append(asset)
    return json.dumps({"assets" : result})


@asset_routes.route('/new', methods=["POST"])
@login_required
def add_new_asset():
    """
    Query to buy a new asset
    """
    form = AssetForm()
    print ('here!!in !! route')
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_add_stock= Portfolio(
            symbol = data["symbol"],
            owner_id = current_user.id,
            quantity = data["quantity"],
            purchased_price = data["purchased_price"],
        )
        db.session.add(add_new_asset)
        db.session.commit()
        return add_new_asset.to_dict()
    else:
        return {"errors": "Can't buy new asset"}, 404



@asset_routes.route('/addfunds', methods=['POST'])
@login_required
def add_funds_to_account():
    form = AssetForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        buying_power = Asset.query.filter(
                                    Asset.owner_id == current_user.id,
                                    Asset.is_cash == True).first()
        buying_power.add_to_existing_asset(form.data['quantity'])
        db.session.commit()
        return {'message' : { buying_power.ticker_name: buying_power.to_dict() }}, 200
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400



@asset_routes.route('/<symbol>', methods=["PUT"])
@login_required
def update_one_asset():
    """
    Query to buy or sell current asset
    """
    form = AssetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    currentStock = Asset.query.filter_by(
    symbol = form.data['symbol'],
    owner_id = current_user.id
    )
    if form.validate_on_submit():
        data = form.data
        portfolio = {'asset': [stock.to_dict() for stock in currentStock]}
        pre_purchased_price = portfolio['asset'][0]['purchased_price']
        pre_quantity = portfolio['asset'][0]['quantity']
        portfolio['asset'][0]['quantity'] = float(pre_quantity) + float(form.data['quantity'])
        if (float(form.data['quantity'] > 0)):
           portfolio['asset'][0]['purchased_price'] =((float(pre_purchased_price)*float(pre_quantity)) +
           (float(form.data['purchased_price'])*(abs(float(form.data['quantity'])))))/(float(pre_quantity) +
           float(form.data['quantity']))

        currentStock.quantity = portfolio['asset'][0]['quantity']
        if (currentStock.quantity > 0):
            currentStock.purchased_price = portfolio['asset'][0]['purchased_price']

        db.session.commit()
        return portfolio
    else:
        return {"errors": "Can't buy current asset"}, 404


@asset_routes.route('/<symbol>', methods= ["DELETE"])
@login_required
def delete_asset(symbol):
    asset_to_delete= Asset.query.filter(Asset.symbol == symbol).first()
    db.session.delete(asset_to_delete)
    db.session.commit()
    return dict(message=f"Sold all ${symbol} shares")
