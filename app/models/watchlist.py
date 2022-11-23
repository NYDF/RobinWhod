from .db import db, environment, SCHEMA, add_prefix_for_prod
from .watchlist_stock import watchlist_stock


class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

    watchlist_owner = db.relationship('User', back_populates='self_watchlists')

    item_in_list = db.relationship(
        'Stock',
        secondary = watchlist_stock,
        back_populates='stock_in_list',
        cascade="all, delete"
    )


    def to_dict(self):
        watchlist_dict = {
            "id": self.id,
            "name": self.name,
            "item_in_list": [item.to_dict() for item in self.item_in_list]
        }
        return watchlist_dict
