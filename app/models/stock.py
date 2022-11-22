from .db import db, environment, SCHEMA, add_prefix_for_prod
from .watchlist_stock import watchlist_stock

class Stock(db.Model):
    __tablename__ = 'stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(10), nullable=False)
    ticker_name = db.Column(db.String(50), nullable=False)


    stock_in_list = db.relationship(
        'Watchlist',
        secondary=watchlist_stock,
        back_populates='item_in_list'
    )

    def to_dict(self):
        stock_dict = {
            "id": self.id,
            "symbol": self.symbol,
            "ticker_name": self.ticker_name
        }
        return stock_dict
