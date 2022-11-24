from .db import db, environment, SCHEMA, add_prefix_for_prod


class Asset(db.Model):
    __tablename__ = 'assets'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(10), nullable=False)
    is_cash = db.Column(db.Boolean, nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    purchased_price = db.Column(db.Float, nullable=False)

    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)


    owner_asset = db.relationship("User", back_populates="asset_owner")



    def add_to_existing_asset(self, quantity):
        self.quantity = self.quantity + quantity


    def deduct_from_existing_asset(self, quantity):
        if (quantity > self.quantity):
            raise Exception('Insufficient amount.')
        self.quantity = self.quantity - quantity


    def to_dict(self):
        asset_dict = {
            "id": self.id,
            "symbol": self.symbol,
            "is_cash": self.is_cash,
            "quantity": self.quantity,
            "purchased_price": self.purchased_price,
            "owner_id": self.owner_id,
        }
        return asset_dict
