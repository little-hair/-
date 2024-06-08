function initializeCalculator() {
    // Limpa o campo de entrada ao inicializar
    const inputField = document.querySelector('.get_number');
    inputField.value = '';

    // Seleciona todos os elementos <li> com símbolos
    const symbols = document.querySelectorAll('li');

    // Adiciona um listener de clique a cada <li>
    symbols.forEach(symbol => {
        symbol.addEventListener('click', () => {
            const data = symbol.getAttribute('data-name');
            inputField.value += data;
        });
    });

    // Função para calcular e mostrar o resultado
    function calculateAndShowResult() {
        const values = inputField.value;

        try {
            // Calcula o valor da expressão
            const result = eval(values);
            inputField.value = result;
            printResult(values, result);
        } catch (e) {
            inputField.value = 'Erro';
        }
    }

    // Cria os resultados das operações
    function printResult(expression, result) {
        const results = document.querySelector('.results');
        const p = document.createElement('p');

        p.innerHTML = `${expression} = <strong>${result}</strong>`;
        results.appendChild(p);
    }

    // Adiciona um listener de clique ao botão de calcular
    document.querySelector('button#btn').addEventListener('click', calculateAndShowResult);

    // Adiciona um listener de clique ao botão de backspace (Del)
    document.getElementById('del').addEventListener('click', () => {
        inputField.value = inputField.value.slice(0, -1);
    });

    // Adiciona um listener de clique ao botão de deletar (C)
    document.getElementById('esc').addEventListener('click', () => {
        inputField.value = '';
    });

    // Adiciona um listener de teclado ao campo de entrada
    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            calculateAndShowResult();
        }
    });
}

// Inicializa a calculadora
initializeCalculator();
