window.onload = function() {
    const matrix_size = [5, 5];

    const content = document.querySelector('.content-screen .content');
    const buttons = document.querySelector('.content-screen .buttons');

    const manager = new StateManager(new ConsoleMachine());

    let modeSelector = new ModeSelectorScreen(content, buttons, true);
    let matrixScreen = new MatrixScreen(content, buttons, matrix_size);
    
    // Inicio de la app
    modeSelector.drawContent();

    // Funcionalidad del botón de encendido y apagado
    document.querySelector('#onoff').addEventListener('click', async function() {
        this.classList.toggle('active');
        
        await manager.setMode(modeSelector.getMode());

        await manager.toggleState();
        if (await manager.getState()) {
            matrixScreen.drawContent();
        } else {
            modeSelector.drawContent();
        }
    });
};