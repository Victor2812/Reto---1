window.onload = function (){
    const matrix_size = [5, 5];

    // Crear matriz
    function createMatrix(e) {
        for (let x = 0; x < matrix_size[0]; x++) {
            for (let y = 0; y < matrix_size[1]; y++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.id = `r${x}c${y}`;
                e.appendChild(cell);
            }
        }
    }

    // TEST de creación de la matriz
    let e;
    (e = document.querySelector('.content .matrix')) && createMatrix(e);
};