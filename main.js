window.onload = function() {
	// some of the code was taken from https://github.com/HungryTurtleCode/gameoflife/blob/master/index.js
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const res = 10;
    var width = window.innerWidth;
    var height = window.innerHeight;
    width = canvas.width = width - 30;
    height = canvas.height = height - 30;
    var rows = Math.floor(width / res);
    var columns = Math.floor(height / res);
    var grid = createGrid(rows, columns);

    renderGrid(grid);
    update();

    async function update() {
        // comment this line below to go super speed
        // await new Promise(r => setTimeout(r, 125));
        grid = updateGrid(grid);
        renderGrid(grid);
        window.requestAnimationFrame(update);
    }

    function updateGrid(grid) {
        let newGrid = grid.map(arr => [...arr]);

        for (let col = 0; col < grid.length; col++) {
            for (let row = 0; row < grid[col].length; row++) {
                const cell = grid[col][row];
                let neighbors = 0;
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        if (i === 0 && j === 0) {
                            continue;
                        }
                        
                        const x_cell = col + i;
                        const y_cell = row + j;

                        if (x_cell >= 0 && y_cell >= 0 && x_cell < columns && y_cell < rows) {
                            neighbors += grid[x_cell][y_cell];
                        }
                    }
                }
                /*
                rulles:
                - if a alive cell has less than 2 neighbors it dies
                - if a alive cell has more than 3 neighbors it dies
                - if a dead cell has 3 neighbors then it becomes alive
                - the rest stay the same
                */
               if (cell === 1 && (neighbors < 2 || neighbors > 3)) {
                    newGrid[col][row] = 0
               } else if (cell === 0 && neighbors == 3) {
                    newGrid[col][row] = 1
               }
            }
        }

        return newGrid;
    }

    function createGrid(rows, columns) {
        return new Array(columns).fill(null)
            .map(() => new Array(rows).fill(null)
                .map(() => Math.floor(Math.random() * 2)));
    }

    function renderGrid(grid) {
        for (let y = 0; y < columns; y++) {
            for (let x = 0; x < rows; x++) {
                let cell = grid[y][x];

                ctx.beginPath();
                ctx.fillStyle = cell ? "black" : "white";
                ctx.fillRect(x*res + 1, y*res + 1, res - 2, res - 2);


            }
        }
    }
};
