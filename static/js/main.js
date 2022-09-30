window.onload = function (){
    // Código JS aquí dentro
    const auto = document.getElementById('auto');
    const manual = document.getElementById('manual');

    auto.addEventListener('click', function(e) {
        auto.style.color = '#8D6448';
        auto.style.textDecoration = 'underline';

        manual.style.color = '#473123';
        manual.style.textDecoration = 'none';
    });

    manual.addEventListener('click', function(e) {
        auto.style.color = '#473123';
        auto.style.textDecoration = 'none';

        manual.style.color = '#8D6448';
        manual.style.textDecoration = 'underline';
    });
};
