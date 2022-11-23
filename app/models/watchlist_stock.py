from .db import db, environment, SCHEMA, add_prefix_for_prod

watchlist_stock = db.Table(
    'watchlist_stock',
    db.Model.metadata,
    db.Column('watchlist_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('watchlists.id')), primary_key=True),
    db.Column('stocks_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('stocks.id')), primary_key=True)
)
if environment == 'production':
    server_member.schema = SCHEMA
