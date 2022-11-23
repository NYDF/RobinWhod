from app.models import db, Stock

def seed_stocks():
    stock_btc = Stock(
                        symbol = 'btc',
                        ticker_name = 'Bitcoin')

    stock_aapl = Stock(
                        symbol = 'aapl',
                        ticker_name = 'Apple')

    stock_msft = Stock(
                        symbol = 'msft',
                        ticker_name = 'Microsoft')

    stock_amzn = Stock(
                        symbol = 'amzn',
                        ticker_name = 'Amazon')

    stock_tcehy = Stock(
                        symbol = 'tcehy',
                        ticker_name = 'Tencent')

    stock_dis = Stock(
                        symbol = 'dis',
                        ticker_name = 'Disney')

    stock_ibm = Stock(
                        symbol = 'ibm',
                        ticker_name = 'IBM')

    stock_nflx = Stock(
                        symbol = 'nflx',
                        ticker_name = 'Netflix')

    stock_snow = Stock(
                        symbol = 'snow',
                        ticker_name = 'Snowflake')

    stock_shop = Stock(
                        symbol = 'shop',
                        ticker_name = 'Shopify')

    stock_ea = Stock(
                        symbol = 'ea',
                        ticker_name = 'EA')


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
