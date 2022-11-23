from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired



class WatchlistForm(FlaskForm):
    owner_id = StringField('OWNERID')
    name= IntegerField("WATCHLISTNAME", validators=[DataRequired()])
    submit = SubmitField('Create')
