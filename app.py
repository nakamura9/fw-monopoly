from flask import Flask, _app_ctx_stack, jsonify, request
from flask import render_template
from sqlalchemy.orm import scoped_session
from db import SessionLocal, engine
import models 

models.Base.metadata.create_all(bind=engine)

app = Flask(__name__)
app.session = scoped_session(
    SessionLocal,
    scopefunc=_app_ctx_stack.__ident_func__
)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/new-game/", methods=["POST"])
def new_game():
    num_players = request.form['num_players']
    players = ["player_one", "player_two", "player_three", "player_four"]
    game = models.Game(
        num_players=num_players,
        game_over=False,
        c1=0,
        c2=0,
        current_player=0
    )
    
    app.session.add(game)
    app.session.commit()
    
    for field in players:
        player_name = request.form[field]
        if player_name:
            player = models.Player(
                name=player_name,
                game=game.id,
                position=0,
                scrolls=3,
                get_out_of_jail_cards=0,
                jail_turns=0,
                complete_tours=0
            )
            app.session.add(player)
            
    app.session.commit()
            
            
    return jsonify({'success': True})

@app.route("/continue-game/", methods=["POST"])
def continue_game():
    game_id = int(request.form['game_id'])
    games = app.session.query(models.Game).filter(
        models.Game.id == game_id).all()
    if not games:
        return jsonify({'success': False})
    
    return jsonify({
        'success': True,
        'game': game_id
    })


@app.teardown_appcontext
def remove_session(*args, **kwargs):
    app.session.remove()


if __name__ == '__main__':
    app.run('0.0.0.0', 5000, debug=True)
    # $env:FLASK_APP = "app"   
    # python app.py
