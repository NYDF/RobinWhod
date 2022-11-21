from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired



class WatchlistForm(FlaskForm):
    owner_id = StringField('OWNERID', validators=[DataRequired()])
    name= IntegerField("WATCHLISTNAME", validators=[DataRequired()])
    submit = SubmitField('Create')
