from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SubmitField
from wtforms.validators import DataRequired
# Temporary form for testing, will update
class AssetForm(FlaskForm):
    ticker_name = StringField('STOCKNAME', validators=[DataRequired()])
    symbol= StringField("STOCKSYMBOL", validators=[DataRequired()])
    purchased_price= FloatField("PRICE", validators=[DataRequired()])
    quantity= FloatField("QUANTITY", validators=[DataRequired()])
    submit = SubmitField('CREATE', validators=[DataRequired()])
