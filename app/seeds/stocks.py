from app.models import db, Stock, environment, SCHEMA


def seed_stocks():
    stock_tsla = Stock(
        symbol='tsla',
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

    stock_all = Stock(
        symbol='all',
    )

    stock_aa = Stock(
        symbol='aa',
    )

    stock_meta = Stock(
        symbol='meta',
    )

    stock_aten = Stock(
        symbol='aten',
    )

    stock_jnj = Stock(
        symbol='jnj',
    )

    stock_unh = Stock(
        symbol='unh',
    )

    stock_wmt = Stock(
        symbol='wmt')

    stock_jpm = Stock(
        symbol='jpm',
    )

    stock_pg = Stock(
        symbol='pg',
    )

    stock_ma = Stock(
        symbol='ma',
    )

    stock_mrk = Stock(
        symbol= 'mrk')

    stock_ko = Stock(
        symbol='ko',
    )

    stock_hd = Stock(
        symbol='hd',
    )

    stock_pep = Stock(
        symbol='pep',
    )

    stock_orcl = Stock(
        symbol='orcl',
    )

    stock_baba = Stock(
        symbol='baba',
    )

    stock_cost = Stock(
        symbol='cost',
    )

    stock_bac = Stock(
        symbol='bac')

    stock_pfe = Stock(
        symbol='pfe',
    )

    stock_crm = Stock(
        symbol='crm',
    )

    stock_tm = Stock(
        symbol='tm',
    )

    stock_nke = Stock(
        symbol= 'nke')

    stock_csco = Stock(
        symbol='csco',
    )

    stock_tmus = Stock(
        symbol='tmus',
    )

    stock_meta = Stock(
        symbol='meta',
    )

    stock_adbe = Stock(
        symbol='adbe',
    )

    stock_amd = Stock(
        symbol='amd',
    )

    stock_hsbc = Stock(
        symbol='hsbc',
    )

    stock_wfc = Stock(
        symbol='wfc')

    stock_ups = Stock(
        symbol='ups',
    )

    stock_intc = Stock(
        symbol='intc',
    )

    stock_sbux = Stock(
        symbol='sbux',
    )

    stock_ba = Stock(
        symbol= 'ba')

    db.session.add(stock_tsla)
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
    db.session.add(stock_all)
    db.session.add(stock_aa)
    db.session.add(stock_meta)
    db.session.add(stock_aten)
    db.session.add(stock_jnj)
    db.session.add(stock_unh)
    db.session.add(stock_wmt)
    db.session.add(stock_jpm)
    db.session.add(stock_pg)
    db.session.add(stock_ma)
    db.session.add(stock_mrk)
    db.session.add(stock_ko)
    db.session.add(stock_hd)
    db.session.add(stock_pep)
    db.session.add(stock_orcl)
    db.session.add(stock_baba)
    db.session.add(stock_cost)
    db.session.add(stock_bac)
    db.session.add(stock_pfe)
    db.session.add(stock_crm)
    db.session.add(stock_tm)
    db.session.add(stock_nke)
    db.session.add(stock_csco)
    db.session.add(stock_tmus)
    db.session.add(stock_meta)
    db.session.add(stock_adbe)
    db.session.add(stock_amd)
    db.session.add(stock_hsbc)
    db.session.add(stock_wfc)
    db.session.add(stock_ups)
    db.session.add(stock_intc)
    db.session.add(stock_sbux)
    db.session.add(stock_ba)

    db.session.commit()


def undo_stocks():

    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM stocks")

    db.session.commit()
