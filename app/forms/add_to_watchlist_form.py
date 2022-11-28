from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired



class AddtoWatchlistForm(FlaskForm):
    symbol = StringField('SYMBOL', validators=[DataRequired()])

