class BaseMachine {
    #state = false;
    #mode = false;  // false = auto, true = manual

    changeState(newState) {
        this.#state = newState;
    }

    changeMode(newMode) {
        this.#mode = newMode;
    }

    getState() {
        return this.#state;
    }

    getCurrentMode() {
        return this.#mode;
    }
}

class ConsoleMachine extends BaseMachine {
    changeState(newState) {
        console.log('changeState => ' + newState);
        super.changeState(newState);
    }

    changeMode(newMode) {
        console.log('changeMode => ' + newMode);
        super.changeMode(newMode);
    }
}

class MachienController {
    constructor(machine) {
        this.machine = machine;
    }

    changeMode(manual) {
        this.machine.changeMode(manual === true);
    }

    getCurrentMode() {
        return this.machine.getCurrentMode();
    }
}