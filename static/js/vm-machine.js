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

    /**
     * Cambio estado on/off via fetch -> post json
     */
    //falta función que llame a los fetch:
    /*
    let state = false;

    fucntion changeStateVar(){
        state = !state;
        if(state == true){
            changeSateOn();
        } else {
            changeStateOff();
        }
    }
    */ 
    async changeStateOn(){
        let response = fetch(".../variables/variables.html", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;"
                },
                body: JSON.stringify({
                    "martxa": true
                })
            });
        let estado = await response.json();
        return estado;
    }
    async changeStateOff(){
        let response = fetch(".../variables/variables.html", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;"
                },
                body: JSON.stringify({
                    "martxa": false
                })
            });
        let estado = await response.json();
        return estado;
    }

    /**
     * Genera formularios invisibles para cambiar de estado el modo dentro del PLC, necesita llmada desde el botonx
     */
    async setModeAuto() {
        var formAuto = document.createElement("form");
        formAuto.name = "Auto";
        formAuto.method = "POST";
        contenedor.appendChild(formAuto);

        var mode = document.createElement("input");
        mode.type = "hidden";
        mode.name = '"wonka".modo';
        mode.value = 0;
        formAuto.appendChild(mode);

        formAuto.submit();
    }

    async setModeManual() {
        var formManual = document.createElement("form");
        formManual.name = "Manual";
        formManual.method = "POST";
        contenedor.appendChild(formManual);

        var mode = document.createElement("input");
        mode.type = "hidden";
        mode.name = '"wonka".modo';
        mode.value = 1;
        formManual.appendChild(mode);

        formManual.submit();
    }

}