class Screen {
    constructor(content, buttons) {
        this.content = content;
        this.buttons = buttons;
    }

    /**
     * Limpia el contenido y los botones
     */
    clearScreen() {
        this.content.innerHTML = '';
        this.buttons.innerHTML = '';
    }

    /**
     * Dibuja el contenido en pantalla
     */
    drawContent() {
        console.log('Screen -> draw content');
    }

    /**
     * Actualiza las celdas de la matriz
     * @param {Array} data Información para actualizar la pantalla
     */
    updateContent(data) {
        console.log('Screen -> update content data:', data);
    }
}

class ModeSelectorScreen extends Screen {
    constructor(content, buttons, defaultMode) {
        super(content, buttons);
        this.mode = defaultMode;
    }

    drawContent() {
        // TODO: aplicar modo por defecto
        this.clearScreen();
        this.content.innerHTML = '<div class="modo">\
            <div id="auto">auto</div>\
            <div id="separador">|</div>\
            <div id="manual">manual</div>\
        </div>';
    }

    /**
     * Obtiene el modo que el usuario quiere para la máquina.
     * @returns Boolean
     */
    getMode() {
        return this.mode;
    }
}

class MatrixScreen extends Screen {
    constructor(content, buttons, size) {
        super(content, buttons);
        this.size = size;
    }

    drawContent() {
        this.clearScreen();

        this.content.innerHTML = '<div class="matrix"></div>';
        let e = this.content.querySelector('.matrix');
        for (let x = 0; x < this.size[0]; x++) {
            for (let y = 0; y < this.size[1]; y++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.id = `r${x}c${y}`;
                e.appendChild(cell);
            }
        }
    }

    /**
     * Actualiza las celdas de la matriz
     * @param {Array} data Array bidimensional con 0s y 1s
     */
    updateContent(data) {
        // Asumiendo que el tamaño de data es el mismo que el de la matriz
        for (let x = 0; x < this.size[0]; x++) {
            for (let y = 0; y < this.size[1]; y++) {
                let cell = this.content.querySelector(`r${x}c${y}`);

                if (!cell) throw `La celda fila:${y} columna:${x} no existe.`

                if (data[x][y]) {
                    // 1 = Chocolate blanco
                    cell.className = 'blanco';
                } else {
                    // 0 = Chocolate con leche
                    cell.className = 'negro';
                }
            }
        }
    }
}