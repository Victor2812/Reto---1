class BaseMachine {
    #state = false;
    #mode = true;  // false = auto, true = manual

    changeState(newState, callback) {
        this.#state = newState;
    }

    getState() {
        return this.#state;
    }

    changeMode(newMode, callback) {
        this.#mode = newMode;
    }

    getMode() {
        return this.#mode;
    }
}

class ConsoleMachine extends BaseMachine {
    changeState(newState, callback) {
        console.log('changeState => ' + newState);
        super.changeState(newState);
        callback(this.getState());
    }

    changeMode(newMode, callback) {
        console.log('changeMode => ' + newMode);
        super.changeMode(newMode);
        callback(this.getMode());
    }
}