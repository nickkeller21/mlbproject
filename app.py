import os

import pandas as pd
import numpy as np
from pymongo import MongoClient

from flask import Flask, jsonify, render_template



app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
FLASK_DEBUG=1

#################################################
# Database Setup
#################################################

client = MongoClient('mongodb://nick21:Nick21**@ds335678.mlab.com:35678/heroku_s4gpc8qj')
client = pymongo.MongoClient("mongodb+srv://nickkeller21:<password>@baseball.iroer.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client.test
# db = client.heroku_s4gpc8qj
collection = db.baseball

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/statistics")
def statistics():
    """Return the statistics"""
    return render_template("statistics.html")

@app.route("/salary")
def salary():
    """Return the salary."""
    return render_template("salary.html")

@app.route("/batter")
def batter():
    """Return the batter slider prediction."""
    return render_template("batter_salary.html")

@app.route("/pitcher")
def pitcher():
    """Return the pitcher slider prediction."""
    return render_template("pitcher_salary.html")

@app.route("/about")
def about():
    """Return the about."""
    return render_template("about.html")

@app.route("/mlabout")
def mlabout():
    """Return the about."""
    return render_template("ml_about.html")

@app.route("/names")
def names():
    """Return a list of player names."""
    names = [i['playerName'] for i in collection.find()]
    names.sort()
    return jsonify(names)

@app.route("/pic_url/<player>")
def pic_url(player):
    """Return a photo url of the player."""
    picture = collection.find({'playerName':player})[0]['imgURL']
    return jsonify(picture)

@app.route("/bio/<player>")
def bio(player):
    """Return the bio to fill under the pic"""
    bio = collection.find({'playerName':player})[0]['Bio']
    return jsonify(bio)

@app.route("/stats/<player>")
def stats(player):
    """Create a dictionary entry for each row of stats information"""
    #open dict of that player
    ref = collection.find({'playerName':player})[0]
    years = [i for i in ref['years']]
    stats= {}
    if ref['position'] == 'pitcher':
        stats['year'] = [i for i in ref['years']]
        stats['WAR'] = [ref['years'][i]['WAR'] for i in years]
        stats['ERA'] = [ref['years'][i]['ERA'] for i in years]
        stats['WHIP'] = [ref['years'][i]['WHIP'] for i in years]
        stats['W'] = [ref['years'][i]['W'] for i in years]
        stats['SO'] = [ref['years'][i]['SO'] for i in years]
        stats['TEAM'] = [ref['years'][i]['TEAM'] for i in years]
    else:
        stats['year'] = [i for i in ref['years']]
        stats['WAR'] = [ref['years'][i]['WAR'] for i in years]
        stats['AVG'] = [ref['years'][i]['AVG'] for i in years]
        stats['OPS'] = [ref['years'][i]['OPS'] for i in years]
        stats['HR'] = [ref['years'][i]['HR'] for i in years]
        stats['RBI'] = [ref['years'][i]['RBI'] for i in years]
        stats['TEAM'] = [ref['years'][i]['TEAM'] for i in years]
    return jsonify(stats)

@app.route("/salarystats/<player>")
def salarystats(player):
    salary ={}
    ref = collection.find_one({'playerName':player})
    years = [i for i in ref['years']]
    ref["Predicted"]["Percent Difference"]=int(abs(ref['Predicted']["Avg Annual"]-ref['Predicted']["Predicted Salary"])/((ref['Predicted']["Avg Annual"]+ref['Predicted']["Predicted Salary"])/2)*100)
    salary['Salary']=ref['Salary']
    salary['Predicted']=ref['Predicted']
    salary['WAR'] = [ref['years'][i]['WAR'] for i in years]
    return jsonify(salary)

if __name__ == "__main__":
    app.run(debug=True)
