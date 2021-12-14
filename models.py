from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.orm import relationship
from db import Base


class Game(Base):
    __tablename__ = "game"
    
    id = Column(Integer, index=True, primary_key=True)
    num_players = Column(Integer)
    game_over = Column(Boolean, default=False)
    players = relationship("Player")
    c1 = Column(Integer) # time and unforeseen ocurrence
    c2 = Column(Integer) # letters from the governing body
    # use integers not primary keys, for iterating e.g. 0-3 
    current_player = Column(Integer)
    current_player_index = Column(Integer)


class Player(Base):
    __tablename__ = "player"
    # replace index in logic.py with id in models.py
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    game = Column(Integer, ForeignKey("game.id"))
    position = Column(Integer)
    get_out_of_jail_cards = Column(Integer)
    scrolls = Column(Integer)
    jail_turns = Column(Integer)
    complete_tours = Column(Integer)
    turn_ended = Column(Boolean, default=False)

  
class BoardCell(Base):
    __tablename__ = "board_cell"
    
    id = Column(Integer, index=True, primary_key=True)
    direction = Column(String) #N, S, E, W
    cell_type = Column(String) # corner, city, times, letters, synagogue
    color = Column(String)
    cell_id = Column(Integer)
    icon = Column(String)
    label = Column(String)


class OwnedCity(Base):
    __tablename__ = "owned_city"
    
    id = Column(Integer, index=True, primary_key=True) 
    game = Column(Integer, ForeignKey("game.id"))
    player = Column(Integer, ForeignKey("player.id"))
    cell_id = Column(Integer)


class QuizQuestion(Base):
    __tablename__ = "question"
    
    id = Column(Integer, index=True, primary_key=True)
    question = Column(String)
    option_1 = Column(String)
    option_2 = Column(String)
    option_3 = Column(String)
    answer = Column(Integer)
