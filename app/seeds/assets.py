from app.models import db, Asset

def seed_assets():
    demo_btc = Asset(
                        owner_id = 1,
                        symbol = 'btc',
                        is_cash = False,
                        purchased_price = 10000,
                        quantity = 2)

    demo_cash = Asset(
                        owner_id = 1,
                        symbol = '$',
                        is_cash = True ,
                        purchased_price = 1 ,
                        quantity = 10000.00)




    db.session.add(demo_btc)
    db.session.add(demo_cash)



    db.session.commit()



def undo_assets():
    db.session.execute('TRUNCATE assets RESTART IDENTITY CASCADE;')
    db.session.commit()
