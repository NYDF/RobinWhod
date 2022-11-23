from .db import db, environment, SCHEMA, add_prefix_for_prod


class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(10), nullable=False)
    move = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    purchased_price = db.Column(db.Float, nullable=False)

    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)


    owner_transaction = db.relationship("User", back_populates="transaction_owner", cascade='all, delete')



    def to_dict(self):
        transaction_dict = {
            "id": self.id,
            "symbol": self.symbol,
            "move": self.move,
            "quantity": self.quantity,
            "owner_id": self.owner_id,
            "stock_id": self.stock_id,
            "purchased_price": self.purchased_price,
            "created_at": self.created_at,
        }
        return transaction_dict
