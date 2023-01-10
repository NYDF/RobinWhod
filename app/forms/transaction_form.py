from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SubmitField, IntegerField
from wtforms.validators import DataRequired


class TransactionForm(FlaskForm):
    owner_id = IntegerField('OWNERID')
    symbol= StringField("STOCKSYMBOL", validators=[DataRequired()])
    move = StringField("BUY OR SELL", validators=[DataRequired()])
    quantity= FloatField("QUANTITY", validators=[DataRequired()])
    purchased_price= FloatField("PRICE", validators=[DataRequired()])
    submit = SubmitField('CREATE')
