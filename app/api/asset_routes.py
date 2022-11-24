from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user, login_user
from app.models import User, Asset, db
from app.forms import AssetForm
import json

asset_routes = Blueprint('assets', __name__)


@asset_routes.route('/current')
@login_required
def asset_list():
    """
    Query for all assets belong to the current user
    """
    # print ('here--------------------')
    current_assets = Asset.query.filter_by(is_cash=False)
    dicts = [asset.to_dict() for asset in current_assets]
    user = current_user
    result = []
    for asset in dicts:
        if user.id == asset['owner_id']:
            result.append(asset)
    return json.dumps({"assets": result})


@asset_routes.route('/new/', methods=["POST"])
@login_required
def add_new_asset():
    print('here!!in !! route')
    """
    Query to buy a new asset
    """

    form = AssetForm()
    print('here!!in !! route')
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_add_stock = Asset(
            symbol=data["symbol"],
            owner_id=current_user.id,
            quantity=data["quantity"],
            purchased_price=data["purchased_price"],
            is_cash=False
        )
        db.session.add(new_add_stock)

        buyingPower = Asset.query.filter_by(
            owner_id=current_user.id,
            is_cash=True
        ).first()

        pre_buyingPower_amount = buyingPower.quantity
        buyingPower.quantity = float(pre_buyingPower_amount) - (float(form.data['purchased_price']))*(float(form.data['quantity']))

        db.session.commit()
        return new_add_stock.to_dict()
    else:
        return {"errors": "Can't buy new asset"}, 406


# @asset_routes.route('/addfunds', methods=['POST'])
# @login_required
# def add_funds_to_account():
#     form = AssetForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         buying_power = Asset.query.filter(
#                                     Asset.owner_id == current_user.id,
#                                     Asset.is_cash == True).first()
#         buying_power.add_to_existing_asset(form.data['quantity'])
#         db.session.commit()
#         return {'message' : { buying_power.ticker_name: buying_power.to_dict() }}, 200
#     else:
#         return { 'errors': validation_errors_to_error_messages(form.errors) }, 400


@asset_routes.route('/<symbol>', methods=["PUT"])
@login_required
def buy_one_asset(symbol):
    """
    Query to buy current asset
    """
    # print('++++++++++++++++++++++++++++++++++++++++++++')

    preAsset = Asset.query.filter_by(
        symbol=symbol,
        owner_id=current_user.id
    ).first()

    # print('preAsset--------------------------', preAsset)

    form = AssetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print('form+++++++++++++++++++++++++++++', form.data)
    if form.validate_on_submit():

        data = form.data

        pre_purchased_price = preAsset.purchased_price
        pre_quantity = preAsset.quantity

        if (float(form.data['quantity'] > 0)):
            preAsset.quantity = float(pre_quantity) + \
                float(form.data['quantity'])
            preAsset.purchased_price = ((float(pre_purchased_price))*(float(pre_quantity)) +
                                        (float(form.data['purchased_price']))*(float(form.data['quantity'])))/(preAsset.quantity)

            buyingPower = Asset.query.filter_by(
                owner_id=current_user.id,
                is_cash=True
            ).first()

            pre_buyingPower_amount = buyingPower.quantity
            buyingPower.quantity = float(pre_buyingPower_amount) - (float(form.data['purchased_price']))*(float(form.data['quantity']))

        db.session.commit()
        return preAsset.to_dict(), 200
    else:
        return {"errors": "Can't buy current asset"}, 406


@asset_routes.route('/sell/<symbol>', methods=["PUT"])
@login_required
def sell_one_asset(symbol):
    """
    Query to sell current asset
    """

    preAsset = Asset.query.filter_by(
        symbol=symbol,
        owner_id=current_user.id
    ).first()

    # print('preAsset--------------------------', preAsset)

    form = AssetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print('form+++++++++++++++++++++++++++++', form.data)
    if form.validate_on_submit():

        data = form.data

        pre_purchased_price = preAsset.purchased_price
        pre_quantity = preAsset.quantity

        if (float(form.data['quantity'] > 0)):
            preAsset.quantity = float(pre_quantity) - \
                float(form.data['quantity'])
            preAsset.purchased_price = ((float(pre_purchased_price))*(float(pre_quantity)) -
                                        (float(form.data['purchased_price']))*(float(form.data['quantity'])))/(preAsset.quantity)

            buyingPower = Asset.query.filter_by(
                owner_id=current_user.id,
                is_cash=True
            ).first()

            pre_buyingPower_amount = buyingPower.quantity
            buyingPower.quantity = float(pre_buyingPower_amount) + (float(form.data['purchased_price']))*(float(form.data['quantity']))

        db.session.commit()
        return preAsset.to_dict(), 200
    else:
        return {"errors": "Can't buy current asset"}, 406


@asset_routes.route('/sellall/<symbol>', methods=["DELETE"])
@login_required
def delete_asset(symbol):
    print('asset_to_delete------------------')
    asset_to_delete = Asset.query.filter_by(
        symbol=symbol,
        owner_id=current_user.id
    ).first()
    print('asset_to_delete------------------', asset_to_delete)
    if (asset_to_delete):
        db.session.delete(asset_to_delete)
        db.session.commit()
        return dict(message=f"Sold all ${symbol} shares")
    else:
        return {"errors": "Asset not found"}, 406
