from app.models import db, Asset, environment, SCHEMA

def seed_assets():
    demo_tsla = Asset(
                        owner_id = 1,
                        symbol = 'tsla',
                        is_cash = False,
                        purchased_price = 180,
                        quantity = 200)

    demo_cash = Asset(
                        owner_id = 1,
                        symbol = '$',
                        is_cash = True ,
                        purchased_price = 1 ,
                        quantity = 10000.00)

    demo_ibm = Asset(
                        owner_id = 1,
                        symbol = 'ibm',
                        is_cash = False,
                        purchased_price = 140,
                        quantity = 300)

    demo_aapl = Asset(
                        owner_id = 1,
                        symbol = 'aapl',
                        is_cash = False,
                        purchased_price = 120,
                        quantity = 600)


    db.session.add(demo_tsla)
    db.session.add(demo_ibm)
    db.session.add(demo_aapl)
    db.session.add(demo_cash)


    db.session.commit()



def undo_assets():

    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.assets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM assets")

    db.session.commit()
