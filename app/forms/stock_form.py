from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class StockForm(FlaskForm):
    symbol= StringField("STOCKSYMBOL", validators=[DataRequired()])
    submit = SubmitField('CREATE')
