from app.models import db, Stock

def seed_stocks():
    stock_btc = Stock(
                        symbol = 'btc',
                        ticker_name = 'Bitcoin')

    stock_ada = Stock(
                        symbol = 'ada',
                        ticker_name = 'Cardano')

    stock_doge = Stock(
                        symbol = 'doge',
                        ticker_name = 'Dogecoin')





    db.session.add(stock_btc)
    db.session.add(stock_ada)
    db.session.add(stock_doge)

    db.session.commit()

def undo_stocks():
    db.session.execute('TRUNCATE stocks RESTART IDENTITY CASCADE;')
    db.session.commit()
