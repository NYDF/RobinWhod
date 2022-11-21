from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SubmitField
from wtforms.validators import DataRequired


class TransactionForm(FlaskForm):
    ticker_name = StringField('Stock Name', validators=[DataRequired()])
    symbol = StringField('STOCK SYMBOL', validators=[DataRequired()])
    move = StringField("BUY OR SELL", validators=[DataRequired()])
    quantity = FloatField('QUANTITY', validators=[DataRequired()])
    purchased_price = FloatField('PRICE', validators=[DataRequired()])

    submit = SubmitField('Create')
