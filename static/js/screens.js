class Screen {
    /**
     * Crea la pantalla
     * @param {Element} content Elemento contenedor de los contenidos
     * @param {Element} buttons Elemento contenedor de los botones
     */
    constructor(content, buttons) {
        this.content = content;
        this.buttons = buttons;

        // Contenido propio de la pantalla
        this.selfContent = document.createElement('div');
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
        this.clearScreen();
        this.content.appendChild(this.selfContent);
    }

    /**
     * Actualiza la pantalla con datos nuevos
     * @param {*} data Información para actualizar la pantalla
     */
    updateContent(data) {
        console.log('Screen -> update content data:', data);
    }
}

class ModeSelectorScreen extends Screen {
    /**
     * Crea la pantalla del selector de modo
     * @param {Element} content Elemento contenedor de los contenidos
     * @param {Element} buttons Elemento contenedor de los botones
     * @param {Boolean} defaultMode Modo por defecto, automático (false) o manual (true)
     */
    constructor(content, buttons, defaultMode) {
        super(content, buttons);
        this.mode = defaultMode;
        
        // TODO: aplicar modo por defecto
        this.selfContent.className = 'modo';
        this.selfContent.innerHTML = '<div id="auto">auto</div>\
            <div id="separador">|</div>\
            <div id="manual">manual</div>';
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
    /**
     * Crea la pantalla de la matriz
     * @param {Element} content Elemento contenedor de los contenidos
     * @param {Element} buttons Elemento contenedor de los botones
     * @param {Array} size Array unidimensional de dos valores [Width, Height]
     */
    constructor(content, buttons, size) {
        super(content, buttons);
        this.size = size;

        this.selfContent = document.createElement('div');
        this.selfContent.className = 'matrix';
        for (let x = 0; x < this.size[0]; x++) {
            for (let y = 0; y < this.size[1]; y++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.id = `r${x}c${y}`;
                this.selfContent.appendChild(cell);
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

class ColorScreen extends Screen {
    /**
     * Crea la pantalla de la muestra de colr
     * @param {Element} content Elemento contenedor de los contenidos
     * @param {Element} buttons Elemento contenedor de los botones
     */
    constructor(content, buttons) {
        super(content, buttons);

        this.color = false; // chocolate con leche (false), chocolate blanco (true)

        this.selfContent.className = 'color-container';

        this.img = document.createElement('img');
        this.img.alt = '';
        this.img.src = '';
        this.selfContent.appendChild(this.img);

        let p = document.createElement('p');
        p.textContent = 'chocolate';
        this.selfContent.appendChild(p);

        // parrafo con texto distintivo dependiendo del color
        this.text = document.createElement('p');
        this.selfContent.appendChild(this.text);
    }

    /**
     * Acutaliza el color que se muestra
     * @param {Boolean} data Chocolate blanco (true) o con leche (false)
     */
    updateContent(data) {
        this.color = data;

        if (data) {
            this.img.src = 'static/img/choco-blanco.svg';
            this.text.textContent = 'blanco';
        } else {
            this.img.src = 'static/img/choco-con-leche.svg';
            this.text.textContent = 'con leche';
        }
    }

    /**
     * Obtiene el color del chocolate mostrado
     * @returns Chocolate blanco (true) o con leche (false)
     */
    getColor() {
        return self.color;
    }
}