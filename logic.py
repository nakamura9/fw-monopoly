import random


def go_to_jail(player, game, **kwargs):
    player.position = 9
    print('You have been sent to jail!')
    player.jail_turns = 3
    if player.get_out_of_jail_free_cards:
        print('You have a get out of jail free card.')
        use_card = input("Use get out of jail card(y|n)?")
        if use_card == "y":
            player.jail_turns = 0
            player.get_out_of_jail_free_cards -= 1

def move_x_spaces(player, game, **kwargs):
    player.position = (player.position + kwargs['x']) % len(game.board.cells)
    game.update_board()

def pay_one_scroll(player, game, **kwargs):
    player.scrolls -= 1

def receive_one_scroll(player, game, **kwargs):
    player.scrolls += 1

def receive_one_scroll_from_players(player, game, **kwargs):
    for p in game.players:
        if p.index == player.index:
            continue
        player.scrolls += 1
        p.scrolls -= 1

def move_to_go(player, game, **kwargs):
    player.position = 0

def move_to_property_x(player, game, **kwargs):
    player.position = kwargs['x']

def move_to_nearest_synagogue(player, game, **kwargs):
    synagogues = [27, 35, 13, 5]
    nearest = None 
    min = 1000
    for s in synagogues:
        distance = abs(s - player.position)
        if distance < min:
            min = distance
            nearest = s
            
    player.position = nearest - 1
    cell = game.board.cells[player.position]
    print(f"Moved {player.name} to {cell.label}")

def pick_time_and_unforeseen_occurence_card(player, game, **kwargs):
    pass

def pick_letters_from_governing_body_card(player, game, **kwargs):
    pass


class Board:
    cells = [
        {
            'label': 'Jail',
            'id': 10,
            'type': 'corner'
        },
        {
            'label': 'Thyatira',
            'id': 9,
            type: 'city',
        },
        {
            'label': 'Tarsus',
            'id': 8,
            'type': 'city',
        },
        {
            'label': 'Antioch',
            'id': 7,
            'type': 'city',
        },
        {
            'label': 'Time and unforeseen occurence',
            'id': 6,
            'type': 'times',
        },
        {
            'label': 'Corintian Synagogue',
            'id': 5,
            'type': 'synagogue'
        },
        {
            'label': 'Syracuse',
            'id': 4,
            'type': 'city',
        },
        {
            'label': 'Letters from the Governing Body',
            'id': 3,
            'type': 'times'
        },
        {
            'label': 'Salamis',
            'id': 2,
            'type': 'city',
        },
        {
            'label': 'Go',
            'id': 1,
            'type': 'corner'
        },
        {
            'label': 'Corinth',
            'id': 18,
            'type': 'city',
        },
        {
            'label': 'Beroea',
            'id': 17,
            'type': 'city',
        },
        {
            'label': 'Caesarea',
            'id': 16,
            'type': 'city',

        },
        {
            'label': 'Letters from the Governing Body',
            'id': 15,
            'type': 'letters',
        },
        {
            'label': 'Damascus',
            'id': 14,
            'type': 'city',
        },
        {
            'label': 'Phillipi Synagogue',
            'id': 13,
            'type': 'synagogue'
        },
        {
            'label': 'Pella',
            'id': 12,
            'type': 'city',
        },
        {
            'label': 'Troas',
            'id': 11,
            'type': 'city',
        },
        {
            'label': 'Derbe',
            'id': 29,
            'type': 'city',
        },
        {
            'label': 'Letters from the Governing Body',
            'id': 30,
            'type': 'letters',
            
        },
        {
            'label': 'Lystra',
            'id': 31,
            'type': 'city',
        },
        {
            'label': 'Iconium',
            'id': 32,
            'type': 'city',
        },
        {
            'label': 'The one Scroll Tax',
            'id': 33,
            'type': 'taxes'
        },
        {
            'label': 'Colossae',
            'id': 34,
            'type': 'city',
        },
        {
            'label': 'Roman Synagogue',
            'id': 35,
            'type': 'synagogue'
        },
        {
            'label': 'Laodicea',
            'id': 36,
            'type': 'city',
        },
        {
            'label': 'Inn',
            'id': 19,
            'type': 'corner'
        },
        {
            'label': 'Jerusalem',
            'id': 20,
            'type': 'city',
        },
        {
            'label': 'Ephesus',
            'id': 21,
            'type': 'city',
        },
        {
            'label': 'Antioch',
            'id': 22,
            'type': 'city',
        },
        {
            'label': 'Time and unforeseen occurence',
            'id': 23,
            'type': 'times',
        },
        {
            'label': 'Phillipi',
            'id': 24,
            'type': 'city',
        },
        {
            'label': 'Alexandria',
            'id': 25,
            'type': 'city',
        },
        {
            'label': 'Athens',
            'id': 26,
            'type': 'city',
        },
        {
            'label': 'Jerusalem Synagogue',
            'id': 27,
            'type': 'synagogue'
        },
        {
            'label': 'Go To Jail',
            'id': 28,
            'type': 'corner',
        },
    ]
    time_and_unforeseen_occurences = [
        ('Go To Jail', go_to_jail),
        ('Move 3 spaces back', move_x_spaces, {'x': 3}),
        ('Pay 1 scroll', pay_one_scroll),
        ('Receive 1 scroll', receive_one_scroll),
        ('Receive 1 scroll from each player', receive_one_scroll_from_players),
        ('Proceed to go', move_to_go),
        ('Go to property x', move_to_property_x, {'x': 4}),
        ('Go to nearest synagogue', move_to_nearest_synagogue),
    ]
    letters_from_governing_body = [
        ('Go To Jail', go_to_jail),
        ('Move 3 spaces back', move_x_spaces, {'x': 3}),
        ('Pay 1 scroll', pay_one_scroll),
        ('Receive 1 scroll', receive_one_scroll),
        ('Receive 1 scroll from each player', receive_one_scroll_from_players),
        ('Proceed to go', move_to_go),
        ('Go to property x', move_to_property_x, {'x': 4}),
        ('Go to nearest synagogue', move_to_nearest_synagogue),
    ]
    
    def __init__(self):
        self.cells = sorted(self.cells, key=lambda x: x['id'])
        self.current_letter = 0
        self.current_event = 0

class Game:
    def __init__(self, num_players=2):
        self.num_players = num_players
        self.players = []
        self.current_player = None
        self.board = Board()
        
    def move_player(self):
        pass 
    
    def run(self):
        self.num_players = int(input('Enter the number of players: '))
        for i in range(self.num_players):
            name = input(f'PLayer {i}, enter your name: ')
            self.players.append(Player(name, self, i))

        self.current_player = 0
        self.playing = True
        while self.playing:
            self.check_winner()
            player = self.players[self.current_player]
            player.play_turn()
        
    def update_board(self):
        pass
    
    def check_winner(self):
        for player in self.players:
            if player.tours > 0:
                self.playing = False
                print(f"{player.name} is the winner!")
        
    def move_player(self):
        pass


class Player:
    def __init__(self, name, game, idx):
        self.name = name
        self.index = idx
        self.game = game
        self.position = 0
        self.tours = 0
        self.scrolls = 3
        self.get_out_of_jail_free_cards = 0
        self.jail_turns = 0
    
    def roll_dice(self):
        dice_1 = random.randint(1, 6)
        dice_2 = random.randint(1, 6)
        self.handle_move(dice_1, dice_2)
        return (dice_1, dice_2)

    def handle_move(self, dice_1, dice_2):
        print(f' You rolled a {dice_1} and a {dice_2}')
        current_cell = self.game.board.cells[self.position]
        print(f'your current position is {current_cell["label"]}')
        self.position = (dice_1 + dice_2 + self.position) % len(self.game.board.cells)
        if self.position < current_cell['id'] - 1: # passed go
            print('you have finished a tour. Here is one scroll')
            self.scrolls += 1
        new_cell = self.game.board.cells[self.position]
        print(f'you have moved to {new_cell["label"]}')
        board = self.game.board
        
        if new_cell['type'] in  ["city", "synagogue"]:
            # check if owned
            if new_cell.get('owner'):
                owner = self.game.players[new_cell['owner']]
                print(f'Congregation started by {owner.name}')
            else:
                print('City has no congregations')
                if self.scrolls > 0:
                    should_buy = input("Start congregation here for 1 scroll(y|n)?> ")
                    if should_buy.lower() == "y":
                        self.game.board.cells[self.position]['owner'] = self.index
                        self.scrolls -= 1
        elif new_cell['type'] == 'taxes':
            print('You have been charged a 1 scroll tax')
            self.scrolls -= 1
            
        elif new_cell['type'] == 'letters':
            letter_id = board.`current_letter
            letter = board.letters_from_governing_body[letter_id]
            print(letter[0])
            kwargs = {} if len(letter) == 2 else letter[2]
            letter[1](self, self.game, **kwargs)
            board.current_letter = board.current_letter + 1 % len(board.letters) 
        
        elif new_cell['type'] == 'times':
            event_id = board.current_event
            event = board.time_and_unforeseen_occurences[event_id]
            print(event[0])
            kwargs = {} if len(event) == 2 else event[2]
            event[1](self, self.game, **kwargs)
            
        elif new_cell['label'] == 'Go To Jail':
            go_to_jail(self, self.game)
        else:
            pass
            
        self.game.update_board()
    
    def play_turn(self):
        print(f"It's {self.name} turn. You have {self.scrolls} scrolls")
        if self.jail_turns > 0:
            print('You are still in jail.')
            self.game.current_player = (self.game.current_player + 1) % len(self.game.players)
            self.jail_turns -= 1
            return
        
        roll_dice = "n"
        while roll_dice.lower() != "y":
            roll_dice = input('Roll dice(y|n)?> ')

        self.roll_dice()
        print('End Turn')
        self.game.current_player = (self.game.current_player + 1) % len(self.game.players)


if __name__ == "__main__":
    game = Game()
    game.run()