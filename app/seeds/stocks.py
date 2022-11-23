from app.models import db, Stock


def seed_stocks():
    stock_btc = Stock(
        symbol='btc',
    )

    stock_aapl = Stock(
        symbol='aapl',
    )

    stock_msft = Stock(
        symbol='msft',
    )

    stock_amzn = Stock(
        symbol='amzn',
    )

    stock_tcehy = Stock(
        symbol='tcehy',
    )

    stock_dis = Stock(
        symbol='dis',
    )

    stock_ibm = Stock(
        symbol='ibm')

    stock_nflx = Stock(
        symbol='nflx',
    )

    stock_snow = Stock(
        symbol='snow',
    )

    stock_shop = Stock(
        symbol='shop',
    )

    stock_ea = Stock(
        symbol= 'ea')

    db.session.add(stock_btc)
    db.session.add(stock_aapl)
    db.session.add(stock_msft)
    db.session.add(stock_amzn)
    db.session.add(stock_tcehy)
    db.session.add(stock_dis)
    db.session.add(stock_ibm)
    db.session.add(stock_nflx)
    db.session.add(stock_snow)
    db.session.add(stock_shop)
    db.session.add(stock_ea)

    db.session.commit()


def undo_stocks():
    db.session.execute('TRUNCATE stocks RESTART IDENTITY CASCADE;')
    db.session.commit()
