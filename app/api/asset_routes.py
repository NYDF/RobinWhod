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


@asset_routes.route('/get/<symbol>')
@login_required
def this_asset(symbol):
    """
    Query for one asset
    """
    # print ('here--------------------')
    thisAsset = Asset.query.filter_by(
        symbol=symbol,
        owner_id=current_user.id
    ).first()

    if thisAsset:
        return thisAsset.to_dict()


@asset_routes.route('/cash')
@login_required
def user_cash():
    """
    Query for current user cash
    """
    # print ('here--------------------')
    current_cash = Asset.query.filter_by(
        is_cash=True,
        owner_id=current_user.id
    ).first()

    if current_cash:
        return current_cash.to_dict()
    else:
        return {"errors": "Where is your cash?"}, 406


@asset_routes.route('/new/', methods=["POST"])
@login_required
def add_new_asset():
    # print('here!!in !! route')
    """
    Query to buy a new asset
    """

    form = AssetForm()
    print('here!!in !! route')
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        # print('here********************', form.data)
        new_add_stock = Asset(
            symbol=data["symbol"],
            owner_id=current_user.id,
            quantity=data["quantity"],
            purchased_price=data["purchased_price"],
            is_cash=False
        )

        print('here#####################', new_add_stock.symbol)
        print('here#####################', new_add_stock.quantity)
        print('here#####################', new_add_stock.purchased_price)
        db.session.add(new_add_stock)

        buyingPower = Asset.query.filter_by(
            owner_id=current_user.id,
            is_cash=True
        ).first()

        pre_buyingPower_amount = buyingPower.quantity
        buyingPower.quantity = float(pre_buyingPower_amount) - (
            float(form.data['purchased_price']))*(float(form.data['quantity']))

        db.session.commit()
        return new_add_stock.to_dict()
    else:
        return {"errors": "Can't buy new asset"}, 406



@asset_routes.route('/addfunds', methods=['POST'])
@login_required
def add_funds_to_account():

    """
    Query to add cash to current user
    """

    form = AssetForm()
    # print('here!!in !! route')
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_add_cash = Asset(
            symbol='$',
            owner_id=current_user.id,
            quantity=data["quantity"],
            purchased_price= 1,
            is_cash=True
        )
        db.session.add(new_add_cash)

        db.session.commit()
        return new_add_stock.to_dict()
    else:
        return {"errors": "Can't buy new asset"}, 406



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
            buyingPower.quantity = float(pre_buyingPower_amount) - (
                float(form.data['purchased_price']))*(float(form.data['quantity']))

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
            buyingPower.quantity = float(pre_buyingPower_amount) + (
                float(form.data['purchased_price']))*(float(form.data['quantity']))

        db.session.commit()
        return preAsset.to_dict(), 200
    else:
        return {"errors": "Can't buy current asset"}, 406


@asset_routes.route('/sellall/<symbol>', methods=["DELETE"])
@login_required
def delete_asset(symbol):
    """
    Query to sell all current asset
    """
    # print('asset_to_delete------------------')

    asset_to_delete = Asset.query.filter_by(
        symbol=symbol,
        owner_id=current_user.id
    ).first()

    form = AssetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    id = asset_to_delete.id

    # print('asset_to_delete------------------', asset_to_delete)

    if form.validate_on_submit():
        data = form.data

        if (float(form.data['quantity'] > 0)):

            buyingPower = Asset.query.filter_by(
                owner_id=current_user.id,
                is_cash=True
            ).first()

            pre_buyingPower_amount = buyingPower.quantity
            buyingPower.quantity = float(pre_buyingPower_amount) + (
                float(form.data['purchased_price']))*(float(form.data['quantity']))

            db.session.delete(asset_to_delete)
            db.session.commit()
            return dict(message=f"{id}")
    else:
        return {"errors": "some data in form missing"}, 406
