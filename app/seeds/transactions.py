from app.models import db, Transaction, environment, SCHEMA
from datetime import datetime

def seed_transactions():
    t_demo_tsla = Transaction(
                        owner_id = 1,
                        symbol = 'tsla',
                        move = 'in',
                        quantity = 200,
                        purchased_price = 180,
                        created_at = datetime.now())

    t_demo_cash = Transaction(
                        owner_id = 1,
                        symbol = '$',
                        move = 'in',
                        quantity = 10000,
                        purchased_price = 1,
                        created_at = datetime.now())

    t_demo_ibm = Transaction(
                        owner_id = 1,
                        symbol = 'ibm',
                        move = 'in',
                        quantity = 300,
                        purchased_price = 140,
                        created_at = datetime.now())

    t_demo_aapl = Transaction(
                        owner_id = 1,
                        symbol = 'aapl',
                        move = 'in',
                        quantity = 600,
                        purchased_price = 120,
                        created_at = datetime.now())


    db.session.add(t_demo_tsla)
    db.session.add(t_demo_cash)
    db.session.add(t_demo_ibm)
    db.session.add(t_demo_aapl)

    db.session.commit()


def undo_transactions():

    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM transactions")

    db.session.commit()
