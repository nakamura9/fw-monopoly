$(document).ready(() => {

    
    const topCells = [
        {
            label: 'Inn',
            icon: null,
            id: 19,
            type: 'corner'
        },
        {
            label: 'Jerusalem',
            icon: null,
            id: 20,
            type: 'city',
            color: 'red'
        },
        {
            label: 'Ephesus',
            icon: null,
            id: 21,
            type: 'city',
            color: 'red'
        },
        {
            label: 'Antioch',
            icon: null,
            id: 22,
            type: 'city',
            color: 'red'

        },
        {
            label: 'Time and unforeseen occurence',
            icon: null,
            id: 23,
            type: 'times'
        },
        {
            label: 'Phillipi',
            icon: null,
            id: 24,
            type: 'city',
            color: 'yellow'
        },
        {
            label: 'Alexandria',
            icon: null,
            id: 25,
            type: 'city',
            color: 'yellow'
        },
        {
            label: 'Athens',
            icon: null,
            id: 26,
            type: 'city',
            color: 'yellow'
        },
        
        {
            label: 'Jerusalem Synagogue',
            icon: null,
            id: 27,
            type: 'synagogue'
        },
        {
            label: 'Go To Jail',
            icon: null,
            id: 28,
            type: 'corner'
        },
    ]

    const rightCells = [
        {
            label: 'Derbe',
            icon: null,
            id: 29,
            type: 'city',
            color: 'green'
        },
        {
            label: 'Letters from the Governing Body',
            icon: null,
            id: 30,
            type: 'letters'
        },
        {
            label: 'Lystra',
            icon: null,
            id: 31,
            type: 'city',
            color: 'green'
        },
        {
            label: 'Iconium',
            icon: null,
            id: 32,
            type: 'city',
            color: 'green'

        },
        {
            label: 'The one Scroll Tax',
            icon: null,
            id: 33,
            type: 'taxes'
        },
        {
            label: 'Colossae',
            icon: null,
            id: 34,
            type: 'city',
            color: 'royalblue'
        },
        {
            label: 'Roman Synagogue',
            icon: null,
            id: 35,
            type: 'synagogue'
        },
        {
            label: 'Laodicea',
            icon: null,
            id: 36,
            type: 'city',
            color: 'royalblue'
        },
    ]
    const leftCells = [
        {
            label: 'Corinth',
            icon: null,
            id: 18,
            type: 'city',
            color: 'orange'
        },
        {
            label: 'Beroea',
            icon: null,
            id: 17,
            type: 'city',
            color: 'orange'
        },
        {
            label: 'Caesarea',
            icon: null,
            id: 16,
            type: 'city',
            color: 'orange'

        },
        {
            label: 'Letters from the Governing Body',
            icon: null,
            id: 15,
            type: 'letters'
        },
        {
            label: 'Damascus',
            icon: null,
            id: 14,
            type: 'city',
            color: '#7D0552'
        },
        {
            label: 'Phillipi Synagogue',
            icon: null,
            id: 13,
            type: 'synagogue'
        },
        {
            label: 'Pella',
            icon: null,
            id: 12,
            type: 'city',
            color: '#7D0552'
        },
        {
            label: 'Troas',
            icon: null,
            id: 11,
            type: 'city',
            color: '#7D0552'
        },
        
    ]

    const bottomCells = [
        {
            label: 'Jail',
            icon: null,
            id: 10,
            type: 'corner'
        },
        {
            label: 'Thyatira',
            icon: null,
            id: 9,
            type: 'city',
            color: 'skyblue'
        },
        {
            label: 'Tarsus',
            icon: null,
            id: 8,
            type: 'city',
            color: 'skyblue'
        },
        {
            label: 'Antioch',
            icon: null,
            id: 7,
            type: 'city',
            color: 'skyblue'

        },
        {
            label: 'Time and unforeseen occurence',
            icon: null,
            id: 6,
            type: 'times'
        },
        {
            label: 'Corintian Synagogue',
            icon: null,
            id: 5,
            type: 'synagogue'
        },
        {
            label: 'Syracuse',
            icon: null,
            id: 4,
            type: 'city',
            color: 'brown'
        },
        {
            label: 'Letters from the Governing Body',
            icon: null,
            id: 3,
            type: 'times'
        },
        
        {
            label: 'Salamis',
            icon: null,
            id: 2,
            type: 'city',
            color: 'brown'
        },
        {
            label: 'Go',
            icon: null,
            id: 1,
            type: 'corner'
        },
    ]
    
    const renderCell = (cell, container, orientation) => {
        if(cell.type == 'city') {
            console.log(cell)
            $(container).append(`
                <div class="monopoly-property ${orientation}">
                    <div class='monopoly-property-header' style="background-color: ${cell.color};"></div>
                    <div>
                        <h4 class='monopoly-property-name'>${cell.label}</h4>
                    </div>
                </div>
            `)
        } else if (cell.type == "synagogue") {
            $(container).append(`
                <div class="monopoly-property ${orientation}">
                    <div>
                        <h4 class='monopoly-property-name'>${cell.label}</h4>
                    </div>
                </div>
            `)
        } else if (cell.type == "corner") {
            $(container).append(`
                <div class="corner-square">
                    <h2>${cell.label}</h2>
                </div>
            `)
        } else if (["letters", 'times', 'taxes'].includes(cell.type )) {
            $(container).append(`
                <div class="monopoly-property ${orientation}">
                    <div>
                        <h4 class='monopoly-property-name'>${cell.label}</h4>
                    </div>
                </div>
            `)
        }
 
    } 
    
    topCells.forEach(cell => {
        renderCell(cell, '.cells-top', 'top-property')
    })

    leftCells.forEach(cell => {
        renderCell(cell, '.cells-left', 'left-property')
    })

    rightCells.forEach(cell => {
        renderCell(cell, '.cells-right', 'right-property')
    })

    bottomCells.forEach(cell => {
        renderCell(cell, '.cells-bottom', '')
    })


    $('.modal-content').append(`
        <h2>Welcome</h2>
        <p>Please choose an option to get started:</p>
        <ol>
            <li><input type="radio" name="game_type" value="continue" checked /> Continue an existing game</li>
            <li><input type="radio" name="game_type" value="new" /> Start a new game</li>
        </ul> 
        <button class="btn btn-primary" id ="select_btn"> Go! </button>
    `)

    $("#select_btn").click(() => {
        const game_type = $("input[name='game_type']:checked").val()
        console.log(game_type)
        if(game_type == "new") {
            renderNewGame()
        } else {
            renderContinueGame()
        }
    })

})

const renderNewGame = () => {
    $('.modal-content').empty()
    $('.modal-content').append(`
        <h2>New Game</h2>
        <p>Please enter the number of players and their names below:</p>
        <div class="form-group">
            <label>Number of players:</label>
            <input type="number" id="num_players"/>
        </div>
        <div class="form-group">
            <label>Player 1:</label>
            <input type="text" id="player_one"/>
        </div>
        <div class="form-group">
            <label>Player 2:</label>
            <input type="text" id="player_two"/>
        </div>
        <div class="form-group">
            <label>Player 3:</label>
            <input type="text" id="player_three"/>
        </div>
        <div class="form-group">
            <label>Player 4:</label>
            <input type="text" id="player_four"/>
        </div>
        <button class="btn btn-primary" id ="start_game_btn"> Create Game! </button>
    `)
    $("#start_game_btn").click(handleNewGame)
}

const handleNewGame = () => {
    console.log('new game')
    $.ajax({
        method: 'POST',
        url: '/new-game/',
        data: {
            num_players: $("#num_players").val(),
            player_one: $("#player_one").val(),
            player_two: $("#player_two").val(),
            player_three: $("#player_three").val(),
            player_four: $("#player_four").val(),
        }
    }).then(res => {
        console.log(res)
    })
}

const handleContinueGame = () => {
    console.log('continue game')
    $.ajax({
        method: 'POST',
        url: '/continue-game/',
        data: {
            game_id: $("#game_id").val()
        }
    }).then(res => {
        console.log(res)
    })
}

const renderContinueGame = () => {
    $('.modal-content').empty()
    $('.modal-content').append(`
        <h2>Resume Game</h2>
        <p>Please game ID you want to resume/join:</p>
        <div>
            <label>Game ID:</label>
            <input type="number" id="game_id"/>
        </div>
        <button class="btn btn-primary" id ="continue_game_btn"> Continue Game </button>
    `)
    $("#continue_game_btn").click(handleContinueGame)
}