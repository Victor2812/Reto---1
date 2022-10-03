window.onload = function() {
    const matrix_size = [5, 5];

    const machine = new ConsoleMachine();
    const controller = new MachienController(machine);

    let content = document.querySelector('.content-screen .content');
    let buttons = document.querySelector('.content-screen .buttons');

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

    document.querySelector('#onoff')
        .addEventListener('click', function() {
            controller.changeMode(!controller.getCurrentMode());
            this.classList.toggle('active');
        });
};