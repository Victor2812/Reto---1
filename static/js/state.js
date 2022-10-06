class BaseMachine {
    #state = false;
    #mode = false;

    async changeState(newState) {
        this.#state = newState;
    }

    async getState() {
        return this.#state;
    }

    async changeMode(newMode) {
        this.#mode = newMode;
    }

    async getMode() {
        return this.#mode;
    }
}

class ConsoleMachine extends BaseMachine {
    async changeState(newState) {
        console.log('changeState => ' + newState);
        super.changeState(newState);
    }

    async changeMode(newMode) {
        console.log('changeMode => ' + newMode);
        super.changeMode(newMode);
    }
}

class StateManager {
    constructor(content, buttons, matrix_size, machine) {
        this.machine = machine;

        this.modeSelectorScreen = new ModeSelectorScreen(content, buttons, true);
        this.matrixScreen = new MatrixScreen(content, buttons, matrix_size);
        this.colorScreen = new ColorScreen(content, buttons);
        this.loadScreen = new LoadScreen(content, buttons);

        this.currentScreen = this.modeSelectorScreen;
    }

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
        } else {
            this.currentScreen = this.modeSelectorScreen;
        }

        await this.showCurentScreen();
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
}