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


})