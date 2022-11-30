from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user, login_user
from app.models import User, Watchlist, db, Stock
from app.forms import WatchlistForm, AddtoWatchlistForm

watchlist_routes = Blueprint('watchlists', __name__)


@watchlist_routes.route('/current')
@login_required
def get_all_watchlists():
    """
    Query for all watchlists belong to the current user
    """
    all_watchlists = Watchlist.query.filter_by(owner_id = current_user.id).all()
    return {"watchlists": [watchlist.to_dict() for watchlist in all_watchlists]}



@watchlist_routes.route('/<int:id>')
@login_required
def get_one_watchlists(id):
    """
    Query for all watchlists belong to the current user
    """
    one_watchlists = Watchlist.query.get(id)
    return watchlist.to_dict()



@watchlist_routes.route('/new', methods=["POST"])
@login_required
def add_watchlist():
    # print('here')
    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print('form!!!!!!!!!', form)
    if form.validate_on_submit():
        new_watchlist = Watchlist(
            name=form.data["name"],
            owner_id=current_user.id
        )
        db.session.add(new_watchlist)
        db.session.commit()
        return new_watchlist.to_dict(), 200
    else:
        return form.errors



@watchlist_routes.route('/<int:watchlist_id>', methods=['PUT'])
@login_required
def edit_watchlist_by_id(watchlist_id):

    watchlist = Watchlist.query.get(watchlist_id)
    print('watchlist==============', watchlist)
    if watchlist:
        form = WatchlistForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        print('form++++++', form.data)
        if form.validate_on_submit:

            data = form.data
            print('form-------', form.data)

            watchlist.name = data["name"]
            watchlist.owner_id = current_user.id

            db.session.commit()
            return watchlist.to_dict(), 200
        else:
            return form.errors
    else:
        return {"errors": "Watchlist couldn't be found"}, 404




@watchlist_routes.route('/<int:watchlist_id>', methods=['DELETE'])
@login_required
def delete_watchlist_by_id(watchlist_id):
    # print('watchlist_id!!!!!!!!!!!',watchlist_id)
    watchlist = Watchlist.query.get(watchlist_id)

    if watchlist:
        db.session.delete(watchlist)
        db.session.commit()
        return {"messages": "Watchlist delete successfully"}, 200
    else:
        return {"errors": "Watchlist couldn't be found"}, 404


@watchlist_routes.route('/add_item/<int:watchlist_id>', methods=['PUT'])
@login_required
def add_to_watchlist(watchlist_id):
    # print("here-----")
    watchlist = Watchlist.query.get(watchlist_id)
    # print('watchlist!!!!!!!!', watchlist)
    if watchlist:
        form = AddtoWatchlistForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        # print('form++++++', form.data)
        if form.validate_on_submit:
            data = form.data
            # print('form-------', form.data)
            stock = Stock.query.filter_by(symbol=data['symbol']).first()
            # print('++++++++++++++++++++++++++', stock, watchlist)
            if(stock):
                watchlist.item_in_list.append(stock)

                db.session.commit()
                return watchlist.to_dict(), 200
        else:
            return form.errors
    else:
        return {"errors": "Cant add stock to watchlist"}, 406
