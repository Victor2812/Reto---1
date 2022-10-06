class BaseMachine {

    async changeState(newState) {
    }

    async getState() {
    }

    async changeMode(newMode) {
    }

    async getMode() {
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
    constructor(machine) {
        this.machine = machine;
    }

    /**
     * Cambia el estado en el que se encuentra la máquina, de encendido a apagado y viceversa
     */
    async toggleState() {
        let newState = !await this.machine.getState();
        await this.machine.changeState(newState);
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