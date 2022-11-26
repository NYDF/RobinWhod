from app.models import db, Transaction
from datetime import datetime

def seed_transactions():
    demo_btc = Transaction(
                        owner_id = 1,
                        symbol = 'aa',
                        move = 'in',
                        quantity = 200,
                        purchased_price = 47,
                        created_at = datetime.now())

    demo_cash = Transaction(
                        owner_id = 1,
                        symbol = '$',
                        move = 'in',
                        quantity = 10000,
                        purchased_price = 1,
                        created_at = datetime.now())



    db.session.add(demo_btc)
    db.session.add(demo_cash)


    db.session.commit()


def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
