window.onload = function() {
    const matrix_size = [5, 5];

    const content = document.querySelector('.content-screen .content');
    const buttons = document.querySelector('.content-screen .buttons');

    const manager = new StateManager(content, buttons, matrix_size, new ConsoleMachine());
    
    // Inicio de la app
    manager.drawScreen();

    // Funcionalidad del botón de encendido y apagado
    document.querySelector('#onoff').addEventListener('click', async function() {
        this.classList.toggle('active');
        
        await manager.toggleState();
    });
};