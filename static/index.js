const store = window.localStorage

const colors = [
    "crimson",
    "limegreen",
    "steelblue",
    "#007bff"
]


$(document).ready(() => {
    // const socket = io()
    // socket.on('connect', () => {
    //     socket.emit('my event', {data: 'I am connected'})
    // })
    
    $(".menu-button").click(showMenu)
    $(".close-menu-button").click(hideMenu)

    renderBoard()
    onPageLoad()
    registerEventHandlers()
    // renderMessage([
    //     {label: "Caleb Is great", content:"Fo sho"},
    //     {label: "Conrad Is lame", content:"Mzanzi"},
    // ])
})


const renderBoard = () => {
    
    const renderCell = (cell, container, orientation) => {
        const prepend = [".cells-left", ".cells-bottom"].includes(container) 
        if(cell.type == 'city') {
            const cityContent = `
                <div class="monopoly-property ${orientation}" data-cell_id=${cell.id}>
                    <div class='monopoly-property-header' style="background-color: ${cell.color};"></div>
                    <div>
                        <h4 class='monopoly-property-name'>${cell.label}</h4>
                        <div class="monopoly-property-tokens"></div>
                    </div>
                </div>
            ` 
            prepend ? $(container).prepend(cityContent) : $(container).append(cityContent)
        } else if (cell.type == "synagogue") {
            const synagogueContent = `
                <div class="monopoly-property ${orientation}" data-cell_id=${cell.id}>
                    <div>
                        <h4 class='monopoly-property-name'>${cell.label}</h4>
                        <div class="monopoly-property-tokens">
                            <i class="fas fa-scroll fa-2x cell-icon"></i>
                        </div>
                    </div>
                </div>
            `
            prepend ? $(container).prepend(synagogueContent) : $(container).append(synagogueContent)
        } else if (cell.type == "corner") {
            const cornerContent = `
                <div class="corner-square" data-cell_id=${cell.id}>
                    <h2>${cell.label}</h2>
                    <div class="monopoly-property-tokens"> 
                    </div>
                </div>
            `
            prepend ? $(container).prepend(cornerContent) : $(container).append(cornerContent)
        } else if (["letters", 'times', 'taxes'].includes(cell.type )) {
            let icon
            switch(cell.type) {
                case "letters":
                    icon = "fas fa-feather"
                    break;
                case "times":
                    icon = "fas fa-exclamation-triangle"
                    break;
                case "taxes":
                    icon = "fas fa-coins"
                    break;
            }
            const otherContent = `
                <div class="monopoly-property ${orientation}" data-cell_id=${cell.id}>
                    <div>
                        <h4 class='monopoly-property-name'>${cell.label}</h4>
                        <div class="monopoly-property-tokens">
                            <i class="${icon} fa-2x cell-icon"></i>
                        </div>
                    </div>
                </div>
            `
            prepend ? $(container).prepend(otherContent) : $(container).append(otherContent)
        }
 
    }
    $.ajax({
        method: "GET",
        url: "/get-cells/",
    }).then(res => {
        console.log(res)
        res.cells.forEach(cell => {
            switch(cell.direction) {
                case "N":
                    renderCell(cell, '.cells-top', 'top-property')
                    break;
                case "S":
                    renderCell(cell, '.cells-bottom', '')
                    break;
                case "W":
                    renderCell(cell, '.cells-left', 'left-property')
                    break;
                case "E":
                    renderCell(cell, '.cells-right', 'right-property')
                    break;
            }
        })
    }) 
    /*
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
    */

}


const onPageLoad = () => {

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
        if(game_type == "new") {
            renderNewGame()
        } else {
            renderContinueGame()
        }
    })

}


const renderNewGame = () => {
    $('.modal-content').empty()
    $('.modal-content').append(`
        <h2>New Game</h2>
        <p>Please enter the number of players and their names below:</p>
        <div class="form-group">
            <label>Number of players:</label>
            <input type="number" id="num_players"/>
        </div>
        <div class="form-grid">
            <div>
                <div class="form-group">
                    <label>Player 1:</label>
                    <input type="text" id="player_one"/>
                </div>
                <div class="form-group">
                    <label>Player 2:</label>
                    <input type="text" id="player_two"/>
                </div>
            </div>
            <div>
                <div class="form-group">
                    <label>Player 3:</label>
                    <input type="text" id="player_three"/>
                </div>
                <div class="form-group">
                    <label>Player 4:</label>
                    <input type="text" id="player_four"/>
                </div>
            </div>
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
        hideModal()
        renderPositions(res.state.positions)
        updateSidebar(res)
        store.setItem('game', res.game)
    })
}

const hideModal = () => {
    $(".modal-background").hide()
}

const showModal = () => {
    $(".modal-background").show()
}

const hideMenu = () => {
    $(".menu").css('left', '-30vw')
}

const showMenu = () => {
    $(".menu").css('left', '0px')
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
        if(res.success) {
            hideModal()
            renderPositions(res.state.positions)
            updateSidebar(res)
            store.setItem('game', res.game)
        } else {
            $("#continue-game-msg").text("Invalid game id")
        }
        
    })
}

const renderContinueGame = () => {
    const storedValue = localStorage.getItem("game") || ""
    
    $('.modal-content').empty()
    $('.modal-content').append(`
        <h2>Resume Game</h2>
        <p>Please game ID you want to resume/join:</p>
        <div>
            <label>Game ID:</label>
            <input type="number" id="game_id" value="${storedValue}"/>
        </div>
        <p id="continue-game-msg"></p>
        <button class="btn btn-primary" id ="continue_game_btn"> Continue Game </button>
    `)
    $("#continue_game_btn").click(handleContinueGame)
}

const renderPositions = (positions) => {
    $(".token").remove()

    Object.values(positions).forEach((p, idx) => {
        const cellID = p.pos
        const container = $(`div[data-cell_id=${cellID}] .monopoly-property-tokens`)
        console.log(cellID)
        console.log(container)
        container.append(`
            <div class="token" style="background-color: ${colors[idx]};"></div>
        `)
    })

}

const updateSidebar = (res) => {
    const state = res.state
    const current_player = state.positions[state.current_player].name
    $("#game-id").empty()
    $("#current-player").empty()
    $("#player-list").empty()
    $("#player-properties").empty()
    $("#game-id").text(res.game)
    $("#current-player").text(current_player)
    console.log(state.positions)
    Object.values(state.positions).forEach((p, idx) => {
        $("#player-list").append(`<li> 
            <div class="indicator" 
                 style="background-color: ${colors[idx]};">${p.scrolls}</div>  
                 ${p.name}      
    </li>`)
        $("#player-properties").append(`
            <div>
                <h4>${p.name}</h4>
                <hr>
                <div>
                    ${p.cities.map(c => `<div class="mini-property"><div class="mini-property-heading" style="background-color: ${c.color};"></div><span>${c.label}</span></div>`).join("")}
                </div>
            </div>
        `)
    })
}

const rollDice = () => {
    $.ajax({
        method: 'POST',
        url: '/roll-dice/',
        data: {
            game_id: store.getItem('game')
        }
    }).then(res => {
        console.log(res)
        renderPositions(res.positions)
        renderDie(res)
        renderMessage(res.messages)
        $("#roll-dice-btn").prop("disabled", true)
        $("#end-turn-btn").prop("disabled", false)
        
    })
}

const endTurn = () => {
    $.ajax({
        method: 'POST',
        url: '/end-turn/',
        data: {
            game_id: store.getItem('game')
        }
    }).then(res => {
        console.log(res)
        updateSidebar(res)
        $("div.die").empty()
        // renderPositions(res.state.positions)
        $("#roll-dice-btn").prop("disabled", false)
        $("#end-turn-btn").prop("disabled", true)
    })
}

const registerEventHandlers = () => {
    $("#roll-dice-btn").click(rollDice)
    $("#end-turn-btn").click(endTurn)
}

const renderDie = (state) => {
    console.log(state)
    $("div.die").empty()
    if(state.dice_one) {
        $("div.die").append(`
            <div><img src="${state.dice_one}" alt="dice 1" /></div>
            <div><img src="${state.dice_two}" alt="dice 2" /></div>
        `)
    }
}

const renderMessage = (payload) => {
    
    const render = (data, dismissHandler) => {
        if(!data) { return }
        $('.modal-content').empty()
        if(data.content) {
            $('.modal-content').append(`
                <h2 class="text-center">${data.label}</h2>
                <hr />
                <p class="txt-md text-center">${data.content}</p
                <div>
                    <button class="btn btn-primary" id="modal-dismiss-btn">Dismiss</button>
                </div>
            `)
            $("#modal-dismiss-btn").click(dismissHandler)
        }
    
        if(data.prompt) {
    
        }
        
        showModal()
    }
    if(Array.isArray(payload)) {
        let idx = 0
        const onDismiss = () => {
            idx++
            console.log(idx)
            if(idx < payload.length) {
                render(payload[idx], onDismiss)
            } else {
                hideModal()
            }
        }
        render(payload[idx], onDismiss)

    } else {
        render(payload, hideModal)
    }
    

    const onDismiss = () => {

    }
    
}