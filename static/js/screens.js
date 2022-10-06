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
        this.selfButtons = [];
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
     * Dibuja los botones en la pantalla
     */
    drawButtons() {
        for (const b of this.selfButtons) {
            this.buttons.appendChild(b);
        }
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
        
        this.selfContent.className = 'modo';

        this.btnAuto = document.createElement('button');
        this.btnAuto.addEventListener('click', () => this.updateContent(false));
        this.btnAuto.textContent = 'auto';
        this.selfContent.appendChild(this.btnAuto);

        let span = document.createElement('span');
        span.textContent = '|';
        this.selfContent.appendChild(span);

        this.btnManual = document.createElement('button');
        this.btnManual.addEventListener('click', () => this.updateContent(true));
        this.btnManual.textContent = 'manual';
        this.selfContent.appendChild(this.btnManual);

        this.updateContent(defaultMode);
    }

    /**
     * Actualiza el modo
     * @param {Boolean} data El modo de la máquina, automático (false) o manual (true)
     */
    updateContent(data) {
        this.mode = data;
        this.btnAuto.className = !this.mode ? 'btn-mode-selected' : 'btn-mode-unselected';
        this.btnManual.className = this.mode ? 'btn-mode-selected' : 'btn-mode-unselected';
    }

    /**
     * Obtiene el modo que el usuario quiere para la máquina.
     * @returns Boolean
     */
    getMode() {
        return this.mode;
    }
}

class LoadScreen extends Screen {
    /**
     * Crea la pantalla del selector de modo
     * @param {Element} content Elemento contenedor de los contenidos
     * @param {Element} buttons Elemento contenedor de los botones
     */
    constructor(content, buttons) {
        super(content, buttons);
        
        this.selfContent.className = 'load';
        this.selfContent.innerHTML = '<div class="loader"></div>';
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
        this.selected;

        // Eventos
        this.onCellSelected;
        this.onAdd;
        this.onClear;

        // Contenido
        this.selfContent.className = 'matrix';
        for (let x = 0; x < this.size[0]; x++) {
            for (let y = 0; y < this.size[1]; y++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.id = `r${x}c${y}`;
                cell.addEventListener('click', () => this.selectCell(cell.id))
                this.selfContent.appendChild(cell);
            }
        }

        // Botones
        this.selfButtons['add'] = document.createElement('button');
        this.selfButtons['add'].textContent = 'añadir';
        this.selfButtons['add'].addEventListener('click', () => this.onAdd && this.onAdd());

        this.selfButtons['clear'] = document.createElement('button');
        this.selfButtons['clear'].textContent = 'vaciar';
        this.selfButtons['clear'].addEventListener('click', () => this.onClear && this.onClear());
    }

    selectCell(id) {
        let cell = this.selfContent.querySelector(`#${id}`);
        if (cell) {
            this.selected = id;
            cell.classList.toggle('selected');

            // Llamar al evento si está definido
            this.onCellSelected && this.onCellSelected(cell);
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
                let cell = this.selfContent.querySelector(`#r${x}c${y}`);

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