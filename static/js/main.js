window.onload = function (){
    const matrix_size = [5, 5];

    const auto = document.getElementById('auto');
    const manual = document.getElementById('manual');

    auto.addEventListener('click', function(e) {
        auto.style.color = '#8D6448';
        auto.style.textDecoration = 'underline';

        manual.style.color = '#473123';
        manual.style.textDecoration = 'none';
    });

    manual.addEventListener('click', function(e) {
        auto.style.color = '#473123';
        auto.style.textDecoration = 'none';

        manual.style.color = '#8D6448';
        manual.style.textDecoration = 'underline';
    });
    

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
    let e; (e = document.querySelector('.content .matrix')) && createMatrix(e);
};
