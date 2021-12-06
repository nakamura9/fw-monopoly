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
    
