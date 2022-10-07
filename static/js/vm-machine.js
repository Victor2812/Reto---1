class VMMachine extends BaseMachine {
    /**
     * Recoge los datos de las variables procedentes del PLC en formato json.
     * @returns boolean and array of position x & y
     */
    async getVariablesVM() {
        let response = await fetch(".../variables/variables.html");
        let variables = await response.json();
        return variables;
    }

    async setVariableVM(name, value) {
        let response = await fetch(".../variables/variables.html", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;"
            },
            body: JSON.stringify({
                nombre: valor
            })
        });
        return response;
    }

    async changeState(newState){
        let response = await this.setVariableVM('martxa', newState);
        return await response.json();
    }

    async getState() {
        return await this.getVariablesVM()['Martxa'];
    }

    async changeMode(newMode) {
        let response = await this.setVariableVM('modo', newMode);
        return await response.json();
    }

    async getMode() {
        return await this.getVariablesVM()['Modo'];
    }

    async setMatrixPos(x, y, value) {
        console.log('testing');
    }

    async getMatrixPos(x, y) {
        return CHOC_CONLECHE;
    }

    async getMatrix() {
    return [[1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1]];
    }

    async getNextChocolate() {
        return 1;
    }

    async wasteCurrentChocolate() {
        console.log('testing');
    }
}