class VMMachine extends BaseMachine {
    /**
     * Recoge los datos de las variables procedentes del PLC en formato json.
     * @returns boolean and array of position x & y
     */
    async getVariablesVM() {
        let response = await fetch("static/variables/variables.html");
        let variables = await response.json();
		console.log(variables);
        return variables;
    }

    async setVariableVM(name, value) {
        let response = await fetch("static/variables/variables.html", {
            method: "POST",
            headers: {
                "Content-Type": "x-www-form-urlencoded;"
            },
            body: encodeURI(name) + '=' + encodeURI(value)
        });
		if (!response.ok) {
			console.log('error en el plc');
		}
        return response;
    }

    async changeState(newState){
		console.log('new state', newState);
        let response = await this.setVariableVM('"wonka".martxa', newState ? 1 : 0);
        return await response.json();
    }

    async getState() {
        return (await this.getVariablesVM()).martxa;
    }

    async changeMode(newMode) {
        let response = await this.setVariableVM('"wonka".modo', newMode ? 1 : 0);
        return await response.json();
    }

    async getMode() {
        return (await this.getVariablesVM()).modo;
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