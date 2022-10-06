class BaseMachine {
    async changeState(newState) {}

    async getState() {}

    async changeMode(newMode) {}

    async getMode() {}

    async setMatrixPos(x, y, value) {}

    async getMatrixPos(x, y) {}

    async getMatrix() {}

    async getNextChocolate() {}

    async wasteCurrentChocolate() {}
}

class ConsoleMachine extends BaseMachine {
    #state = false;
    #mode = false;
    #matrix = [];

    constructor() {
        super();
        this.#setMatrix();
    }

    #setMatrix() {
        this.#matrix = []; // impiar
        for (let x = 0; x < 5; x++) {
            let r = [];
            for (let y = 0; y < 5; y++) {
                r.push(CHOC_VACIO);
            }
            this.#matrix.push(r);
        }
    }

    async changeState(newState) {
        console.log('changeState => ' + newState);
        this.#state = newState;
        if (!this.#state) {
            // Si se apaga limpiar la matriz
            this.#setMatrix();
        }
    }

    async getState() {
        return this.#state;
    }

    async changeMode(newMode) {
        console.log('changeMode => ' + newMode);
        this.#mode = newMode;
    }

    async getMode() {
        return this.#mode;
    }

    async setMatrixPos(x, y, value) {
        console.log('setMatrixPos => ' + x + ', ' + y + ' => ' + value);
        this.#matrix[x][y] = value;
    }

    async getMatrixPos(x, y) {
        try {
            return this.#matrix[x][y];
        } catch {
            return undefined;
        }
    }

    async getMatrix() {
        return this.#matrix;
    }

    async getNextChocolate() {
        let c =  Math.floor(Math.random() * 2) + 1; // 1 chocolate con leche, 2 chocolate blanco
        console.log('getNextChocolate => ' + c);
        return c;
    }

    async wasteCurrentChocolate() {
        console.log('wasteCurrentChocolate');
    }
}

class StateManager {
    constructor(content, buttons, matrix_size, machine) {
        this.machine = machine;

        this.modeSelectorScreen = new ModeSelectorScreen(content, buttons, false);
        this.matrixScreen = new MatrixScreen(content, buttons, matrix_size);
        this.colorScreen = new ColorScreen(content, buttons);
        this.loadScreen = new LoadScreen(content, buttons);

        this.currentScreen = this.modeSelectorScreen;

        // Añadir los eventos de las pantallas
        this.modeSelectorScreen.onModeChange = async (newMode) => await this.setMode(newMode);

        this.matrixScreen.onAdd = async () => await this.#matrixFuncAdd();
        this.matrixScreen.onClear = async () => await this.#matrixFuncClear();

        this.colorScreen.onNext = async () => await this.#colorFuncNext();
        this.colorScreen.onCancel = async () => await this.#colorFuncCancel();
    }

    /**
     * Función privada, lógica del botón "añadir" de la matriz
     */
    async #matrixFuncAdd() {
        let pos = this.matrixScreen.getSelectedPos();
        if (pos && !await this.isMatrixPosBusy(pos[0], pos[1])) {
            let chocolate = await this.machine.getNextChocolate();
            this.colorScreen.updateContent(chocolate);
            this.currentScreen = this.colorScreen;
            this.drawScreen();
        }
    }

    /**
     * Función privada, lógica del botón "añadir" de la matriz
     */
    async #matrixFuncClear() {
        let pos = this.matrixScreen.getSelectedPos();
        if (pos && await this.isMatrixPosBusy(pos[0], pos[1])) {
            // Actualizar máquina
            await this.machine.setMatrixPos(pos[0], pos[1], CHOC_VACIO);

            // Actualizar pantalla de la matriz
            let matrix = await this.machine.getMatrix()
            this.matrixScreen.updateContent(matrix);
        }
    }

    async #colorFuncNext() {
        // Añadir a la posición
        let pos = this.matrixScreen.getSelectedPos();
        let choc = this.colorScreen.getColor();
        if (pos) {
            // Actualizar matriz en la máquina
            await this.machine.setMatrixPos(pos[0], pos[1], choc);

            // Actualizar pantalla de matriz
            let matrix = await this.machine.getMatrix()
            this.matrixScreen.updateContent(matrix);

            // Cambiar de pantalla
            this.currentScreen = this.matrixScreen;
            this.drawScreen();
        } else {
            // Si no es posible recuperar la posición, cancelar
            this.#colorFuncCancel();
        }
    }

    async #colorFuncCancel() {
        await this.machine.wasteCurrentChocolate();
        this.currentScreen = this.matrixScreen;
        this.drawScreen();
    }

    /**
     * Muestra la pantalla actual con sus botones si son necesarios
     */
    async drawScreen() {
        let mode = await this.getMode();
        this.currentScreen.drawContent();
        if (mode) {
            this.currentScreen.drawButtons();
        }
    }

    /**
     * Cambia el estado en el que se encuentra la máquina, de encendido a apagado y viceversa
     */
    async toggleState() {
        let newState = !await this.machine.getState();
        await this.machine.changeState(newState);

        // Comprobar el estado de la máquina (por si ha cambiado o no)
        if (await this.getState()) {
            this.currentScreen = this.matrixScreen;

            // Actualizar pantalla de la amtriz
            let matrix = await this.machine.getMatrix()
            this.matrixScreen.updateContent(matrix);
        } else {
            this.currentScreen = this.modeSelectorScreen;
        }

        await this.drawScreen();
    }

    /**
     * Obtiene el estado en el que se encuentra la máquina, encendida o apagada
     * @returns True o False
     */
    async getState() {
        return await this.machine.getState();
    }

    /**
     * Cambia el modo de la máquina
     * @param {Boolean} mode Automático (false) o manual (true)
     */
    async setMode(mode) {
        await this.machine.changeMode(mode);
    }

    /**
     * Obtiene el modo en el que la máquina está funcionando
     * @returns Manual (true) o automático (False)
     */
    async getMode() {
        return await this.machine.getMode();
    }

    async isMatrixPosBusy(x, y) {
        let matrix = await this.machine.getMatrix();

        return matrix[x][y] != CHOC_VACIO;
    }
}