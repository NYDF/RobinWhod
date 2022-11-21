from app.models import db, Watchlist, Stock
from datetime import datetime

def seed_watchlists():
    demo_watchlist = Watchlist(
                            owner_id = 1,
                            name = 'First List')


    items_in_watchlist = Stock.query.all()


    for item in items_in_watchlist:
        demo_watchlist.item_in_list.append(item)


    db.session.add(demo_watchlist)

    db.session.commit()


def undo_watchlists():
    db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE;')
    db.session.commit()
