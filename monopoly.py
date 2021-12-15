from flask import Flask, _app_ctx_stack, json, jsonify, request
from flask import render_template
from sqlalchemy.orm import scoped_session
from flask_socketio import SocketIO
from db import SessionLocal, engine
import models 
import random

from logic import handle_player_move

models.Base.metadata.create_all(bind=engine)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
# socketio = SocketIO(app)

app.session = scoped_session(
    SessionLocal,
    scopefunc=_app_ctx_stack.__ident_func__
)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/get-cells/")
def get_cells():
    return jsonify({
        "cells": [
            {
                "color": cell.color,
                "icon": cell.icon,
                "id": cell.cell_id,
                "type": cell.cell_type,
                "label": cell.label,
                "direction": cell.direction
            } for cell in app.session.query(models.BoardCell).order_by(models.BoardCell.cell_id).all()
        ]
    })


@app.route("/new-game/", methods=["POST"])
def new_game():
    num_players = request.form['num_players']
    players = ["player_one", "player_two", "player_three", "player_four"]
    game = models.Game(
        num_players=num_players,
        game_over=False,
        c1=0,
        c2=0,
        current_player=0,
        current_player_index=0
    )
    
    app.session.add(game)
    app.session.commit()
    
    for field in players:
        player_name = request.form[field]
        if player_name:
            player = models.Player(
                name=player_name,
                game=game.id,
                position=1,
                scrolls=3,
                get_out_of_jail_cards=0,
                jail_turns=0,
                complete_tours=0
            )
            app.session.add(player)
            
    app.session.commit()
    game.current_player = game.players[0].id
    app.session.commit()

    return jsonify({
        'success': True,
        'game': game.id,
        'state': {
            'current_player': game.current_player,
            'positions': map_player_positions(game.players)
        }
    })


@app.route('/end-turn/', methods=["POST"])
def end_turn():
    game = app.session.query(models.Game).get(int(request.form['game_id']))
    player_id = game.current_player
    player = app.session.query(models.Player).get(player_id)
    player.turn_ended = True
    next_player_index = (game.current_player_index + 1 ) % game.num_players
    game.current_player_index = next_player_index
    next_player = game.players[next_player_index]
    next_player.turn_ended = False
    game.current_player = next_player.id
    app.session.commit()    
    
    return jsonify({
        'success': True,
        'game': game.id,
        'state': {
            'current_player': next_player.id,
            'positions': map_player_positions(game.players)
        },
    })


@app.route('/roll-dice/', methods=["POST"])
def roll_dice():
    dice_img_url = {
        1: "static/images/dice-six-faces-one.svg",
        2: "static/images/dice-six-faces-two.svg",
        3: "static/images/dice-six-faces-three.svg",
        4: "static/images/dice-six-faces-four.svg", 
        5: "static/images/dice-six-faces-five.svg",
        6: "static/images/dice-six-faces-six.svg"
    }
    
    one = random.randint(1, 6)
    two = random.randint(1, 6)
    delta = one + two
    game = app.session.query(models.Game).get(int(request.form['game_id']))
    player_id = game.current_player
    player = app.session.query(models.Player).get(player_id)
    pre_player_position = player.position
    resp = {
            'success': True,
            'positions': map_player_positions(game.players)
        }
    if player.jail_turns > 0:
        # TODO handle get out of jail prompt
        player.jail_turns -= 1
        app.session.commit()
        messages = [{
            'label': 'Jail',
            'content': f'Player {player.name} spent this turn in jail.'
                       f'({player.jail_turns} turns left)'
        }]
        resp.update({"messages": messages})
        return jsonify(resp)

    else:
        player.position = ((player.position + delta) % 36) + 1
        messages = []
        while player.position != pre_player_position:
            pre_player_position = player.position
            messages.extend(handle_player_move(app.session, player, game))
            app.session.commit()
            
        resp.update({
            'dice_one': dice_img_url.get(one),
            'dice_two': dice_img_url.get(two),
            'positions': map_player_positions(game.players),
            'messages': messages
        })
        return jsonify(resp)


@app.route("/continue-game/", methods=["POST"])
def continue_game():
    game_id = int(request.form['game_id'])
    games = app.session.query(models.Game).filter(
        models.Game.id == game_id).all()
    if not games:
        return jsonify({'success': False})
    
    game = app.session.query(models.Game).get(game_id)
    
    return jsonify({
        'success': True,
        'game': game_id,
        'state': {
            'current_player': game.current_player,
            'positions': map_player_positions(game.players)
        }
    })


# @socketio.on('my event')
# def handle_my_custom_event(json):
#     print('received json: ' + str(json))


@app.teardown_appcontext
def remove_session(*args, **kwargs):
    app.session.remove()


def map_player_positions(players):
    def get_cities(plyr):
        cities = app.session.query(models.OwnedCity).filter(models.OwnedCity.player == plyr.id).all()
        return [c.cell_details(app.session) for c in cities]
        
    return {
        player.id: {
            "name": player.name,
            "pos": player.position,
            "scrolls": player.scrolls,
            "cities": get_cities(player)
        } \
            for player in players
    }


if __name__ == '__main__':
    # socketio.run(app, '0.0.0.0', 5000, debug=True)
    app.run('0.0.0.0', 5000, debug=True)
    # app.run()
    # $env:FLASK_APP = "app"   
    # python app.py
