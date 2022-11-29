from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Watchlist


# def watchlist_exists(form, field):
#     # Checking if username is already in use
#     name = field.data
#     watchlist = Watchlist.query.filter(Watchlist.name == name).first()
#     if watchlist:
#         raise ValidationError('Watchlist name is already in use.')


class WatchlistForm(FlaskForm):
    owner_id = StringField('OWNERID')
    name= IntegerField("WATCHLISTNAME", validators=[DataRequired()])
    submit = SubmitField('Create')
