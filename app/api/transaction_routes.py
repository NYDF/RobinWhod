from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user, login_user
from app.models import User, Transaction, db
from app.forms import TransactionForm
from datetime import datetime

transaction_routes = Blueprint('transactions', __name__)


@transaction_routes.route('/current')
@login_required
def get_all_transactions():
    """
    Query for all transactions belong to the current user
    """
    all_transactions = Transaction.query.filter_by(owner_id = current_user.id).all()
    return {"transactions": [transaction.to_dict() for transaction in all_transactions]}



@transaction_routes.route('/<int:id>')
@login_required
def get_one_transaction(id):
    """
    Query for one transaction by transaction_id
    """
    one_transaction = Transaction.query.get(id)
    return one_transaction.to_dict()




@transaction_routes.route('/new', methods=["POST"])
@login_required
def add_transaction():
    # print('here--------------------------------------')
    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        print('here++++++++++', form.data)
        data = form.data
        new_transaction = Transaction(
            owner_id=current_user.id,
            symbol=data["symbol"],
            move=data["move"],
            quantity=data["quantity"],
            purchased_price=data["purchased_price"],
            created_at = datetime.now()
        )
        # form.populate_obj(new_transaction)
        print('here@@@@@@@@@@@@@@@@@@@@', new_transaction.symbol)
        print('here@@@@@@@@@@@@@@@@@@@@', new_transaction.move)
        print('here@@@@@@@@@@@@@@@@@@@@', new_transaction.quantity)
        print('here@@@@@@@@@@@@@@@@@@@@', new_transaction.purchased_price)
        db.session.add(new_transaction)
        db.session.commit()
        return new_transaction.to_dict()

    else:
        return form.errors



# @transaction_routes.route('/<int:transaction_id>', methods=['DELETE'])
# @login_required
# def delete_transaction_by_id(transaction_id):
#     transaction = Transaction.query.get(transaction_id)

#     if transaction:
#         db.session.delete(transaction)
#         db.session.commit()
#         return {"messages": "Transaction delete successfully"}, 200
#     else:
#         return {"errors": "Transaction couldn't be found"}, 404
