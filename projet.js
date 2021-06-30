const prompt = require("prompt")

var grid = [

	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
];

var rover ={
    direction: "N",
    x: 0,
    y: 0,
    collision :false,
    travelLog: []
}

var commands =[
    {
        name: "cmd",
        description: `[L]eft | [R]right | [F]orward | [B]ackward | [Q]uit
$ `,
        validator: /^(l|r|f|b|q){1}$/i,
        warning: "La commande n'est pas valide"
    }
]

let command

function drawMap() {
    grid[rover.y][rover.x] = rover.direction
    process.stdout.write("\u001b[2J\u001b[0;0H");
    console.table(grid)
    if (rover.collision) console.log("Vous vous prenez les mures :)")
    rover.collision = false
    grid[rover.y][rover.x] = "="
    rover.travelLog.push([rover.x, rover.y, rover.direction, (command === undefined) ? " ": command.toUpperCase()])
    
}
function pilotRover() {   
    
    drawMap()

    prompt.start();
    prompt.get(commands, function (err, res) {

        if (err) return console.error(err)
        else {
            command =(res.cmd)

            switch (command.toLowerCase()) {

                case "r" :
                    if (rover.direction === "N") rover.direction = "E"
                    else if (rover.direction === "S") rover.direction = "W"
                    else if (rover.direction === "E") rover.direction = "S"
                    else if (rover.direction === "W") rover.direction = "N"
    
                    break;
                case "l" :
                    if (rover.direction === "N") rover.direction = "W"
                    else if (rover.direction === "S") rover.direction = "E"
                    else if (rover.direction === "E") rover.direction = "N"
                    else if (rover.direction === "W") rover.direction = "S"
                
                    break;
                case "f" :
                    if (rover.direction === "N" && (rover.y -1) >= 0 ) rover.y--
                    else if (rover.direction === "S" && (rover.y +1) < grid.length) rover.y++
                    else if (rover.direction === "E" && (rover.x +1) < grid[0].length) rover.x++
                    else if (rover.direction === "W" && (rover.x -1) >= 0) rover.x--
                    else rover.collision = true
                    break;
                case "b" :
                    if (rover.direction === "N" && (rover.y +1) < grid.length) rover.y++
                    else if (rover.direction === "S" && (rover.y -1) >= 0 ) rover.y--
                    else if (rover.direction === "E" && (rover.x -1) >= 0) rover.x--
                    else if (rover.direction === "W" && (rover.x +1) < grid[0].length) rover.x++
                    else rover.collision = true
                    break;
                case "q" :
                    console.log("Route parcourue :")
                    console.table(rover.travelLog)
                    
                    return
            }
        }
        pilotRover()

    });

    
}

pilotRover()
