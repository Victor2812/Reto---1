window.onload = function() {
    const matrix_size = [5, 5];

    const content = document.querySelector('.content-screen .content');
    const buttons = document.querySelector('.content-screen .buttons');

    const manager = new StateManager(new ConsoleMachine());

    let modeSelectorScreen = new ModeSelectorScreen(content, buttons, true);
    let matrixScreen = new MatrixScreen(content, buttons, matrix_size);
    let colorScreen = new ColorScreen(content, buttons);
    let loadScreen = new LoadScreen(content, buttons);
    
    // Inicio de la app
    modeSelectorScreen.drawContent();

    // Funcionalidad del botón de encendido y apagado
    document.querySelector('#onoff').addEventListener('click', async function() {
        this.classList.toggle('active');
        
        await manager.setMode(modeSelectorScreen.getMode());

        await manager.toggleState();
        
        if (await manager.getState()) {
            loadScreen.drawContent();
        } else {
            // modeSelectorScreen
            modeSelectorScreen.drawContent();
        }
    });
};