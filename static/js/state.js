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
    #autoInterval;

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

    async #autoMatrix() {
        let available = []; // array de posiciones
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                if (this.#matrix[x][y] == CHOC_VACIO) {
                    available.push([x, y]);
                }
            }
        }

        if (available.length > 0) {
            let pos = available[Math.floor(Math.random() * available.length)];
            let c =  await this.getNextChocolate();
            this.#matrix[pos[0]][pos[1]] = c;
        } else {
            // Finalizar
            this.#autoInterval && clearInterval(this.#autoInterval);
            this.#autoInterval = undefined;
            console.log('auto mode ended');
        }
    }

    async changeState(newState) {
        console.log('changeState => ' + newState);
        this.#state = newState;
        if (!this.#state) {
            // Recuperar valores por defecto
            this.#setMatrix();
            this.#mode = false;

            // Limpiar intervalo del modo automático
            this.#autoInterval && clearInterval(this.#autoInterval);
            this.#autoInterval = undefined;
        } else if (!this.#mode) {
            // Encendida en modo automático
            this.#autoInterval = setInterval(async () => await this.#autoMatrix(), 250);
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
        this.modeSelectorScreen.onModeChange = async (newMode) => await this.machine.changeMode(newMode);

        this.matrixScreen.onAdd = async () => await this.#matrixFuncAdd();
        this.matrixScreen.onClear = async () => await this.#matrixFuncClear();

        this.colorScreen.onNext = async () => await this.#colorFuncNext();
        this.colorScreen.onCancel = async () => await this.#colorFuncCancel();

        // Variables del modo automático
        this.autoModeTimer;
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
            await this.updateMatrix();
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
            await this.updateMatrix();

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

    async updateMatrix() {
        let matrix = await this.machine.getMatrix()
        this.matrixScreen.updateContent(matrix);
    }

    /**
     * Muestra la pantalla actual con sus botones si son necesarios
     */
    async drawScreen() {
        let mode = await this.machine.getMode();
        this.currentScreen.drawContent();
        if (mode) {
            this.currentScreen.drawButtons();
        }
    }

    /**
     * Cambia el estado en el que se encuentra la máquina, de encendido a apagado y viceversa
     */
    async toggleState() {
        // Establece el modo de la pantalla de modos
        await this.machine.changeMode(this.modeSelectorScreen.getMode());

        // Actualiza el estado de la máquina
        let newState = !await this.machine.getState();
        await this.machine.changeState(newState);

        // Obtiene el modo actual (por si la orden previa ha fallado)
        let mode = await this.machine.getMode();

        // Comprobar el estado de la máquina (por si la orden previa ha fallado)
        if (await this.machine.getState()) {
            // ENCENDER
            this.currentScreen = this.matrixScreen;

            // Actualizar pantalla de la amtriz
            await this.updateMatrix();

            if (!mode) {
                this.autoModeTimer = setInterval(async () => await this.updateMatrix(), 500, this);
            }
        } else {
            // APAGAR
            this.currentScreen = this.modeSelectorScreen;

            // Finalizar timer del modo automático si estaba definido
            this.autoModeTimer && clearInterval(this.autoModeTimer);
            this.autoModeTimer = undefined;
        }

        await this.drawScreen();
    }

    async isMatrixPosBusy(x, y) {
        let matrix = await this.machine.getMatrix();

        return matrix[x][y] != CHOC_VACIO;
    }
}