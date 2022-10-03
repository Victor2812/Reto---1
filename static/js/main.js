window.onload = function() {
    const matrix_size = [5, 5];

    const content = document.querySelector('.content-screen .content');
    const buttons = document.querySelector('.content-screen .buttons');

    const machine = new ConsoleMachine();

    function clearScreen() {
        content.innerHTML = '';
        buttons.innerHTML = '';
    }

    function createModeSelectorScreen() {
        clearScreen();
        content.innerHTML = '<div class="modo">\
            <div id="auto">auto</div>\
            <div id="separador">|</div>\
            <div id="manual">manual</div>\
        </div>';
    }

    function createMatrixScreen() {
        clearScreen();
        content.innerHTML = '<div class="matrix"></div>';
        let e = content.querySelector('.matrix');
        for (let x = 0; x < matrix_size[0]; x++) {
            for (let y = 0; y < matrix_size[1]; y++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.id = `r${x}c${y}`;
                e.appendChild(cell);
            }
        }
    }

    // Funcionalidad del botón de encendido y apagado
    document.querySelector('#onoff').addEventListener('click', function() {
        this.classList.toggle('active');
        clearScreen();

        machine.changeState(!machine.getState(),
            function(state) {
                if (state) {
                    createMatrixScreen();
                } else {
                    createModeSelectorScreen();
                }
            });
    });



    // Inicio de la app
    createModeSelectorScreen();
};