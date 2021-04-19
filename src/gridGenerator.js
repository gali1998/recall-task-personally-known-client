import axios from 'axios';
var _ = require('lodash');
const columnNames = ["משפחה", "חברים של משפחה", "חברים", "משפחה של חברים", "בית ספר", "חברים לעבודה", "אנשים מאיזור המגורים", "עובדים בחנויות", "חברים לספורט", "מעגלים חברתיים", "נוסעים בתחברה ציבורית", "סטודנטים", "מרצים", "בעלי מקצוע", "צבא"]

export async function getGrid(id) {
    let grid = []
    let h = []

    columnNames.forEach(name => {
        h.push({ value: name, dateOfChange: null, className: "cell-header", readOnly: true, width: 50 })
    })

    grid.push(h)

    let allData = [];

    await axios.get('http://personally-known-server.herokuapp.com/results').then((response) => {
        allData = response.data;
    });

    let participantData = allData.filter(participant => participant.id == id);

    participantData = _.unionBy(participantData, 'startTime')

    console.log(participantData)

    let unifiedData = [];

    columnNames.forEach(name => {
        let line = []
        line.push({ value: name, dateOfChange: null, width: 50})
        unifiedData.push(line)
    })

    let mostRecent = 0;

    participantData.forEach(session => {
        console.log(session)
        let numberOfEntries = 0;
        for(let i = 0; i < session.results.length; i++){
            numberOfEntries += session.results[i].length;
            for(let j = 1; j < session.results[i].length; j++){
                unifiedData[i].push(session.results[i][j]);
            }
        }

        if (mostRecent < numberOfEntries){
            mostRecent = numberOfEntries;
            unifiedData = session.results;
        }
    })

    console.log(participantData)

    let max = 0;

    for (let k = 0; k < unifiedData.length; k++){
        if (unifiedData[k].length > max){
            max = unifiedData[k].length;
        }
    }

    max = max + 200;

    console.log(unifiedData)

    for (let i = 0; i  < max; i++) {
        let line = []
        
        columnNames.forEach(name => {
            line.push({ value: "", dateOfChange: null, width: 50})
        })
        
        grid.push(line)
    }

    for (let i = 0; i < unifiedData.length; i++){
        for (let j = 0; j < unifiedData[i].length; j++){
            grid[j][i] = unifiedData[i][j];
        }
    }

    for (let i = 0; i < grid[0].length; i++){
        grid[0][i].className = "cell-header";
    }

    return grid
}

export function extendGrid(grid) {
    for (let i = 0; i  < 20; i++) {
        let line = []
        
        columnNames.forEach(name => {
            line.push({ value: "", dateOfChange: null})
        })
        
        grid.push(line)  
    }
    
    return grid;
}

export function getMinimizedGrid(grid) {
    let newGrid = [];
    let gridHeaders = grid[0].length;

    for (let i = 0; i < gridHeaders; i++){
        let col = getFullColumn(i, grid)
        newGrid.push(col);
    }

    return newGrid;
}

function getFullColumn(col, grid) {
    let column = [];
    let numOfRows = grid.length;

    for (let i = 0; i < numOfRows; i++) {
        let cell = grid[i][col];

        if (cell.value != ""){
            column.push(cell);
        }
    }

    return column;
}
