let form = document.getElementById('form');
let btn = document.getElementById('submit');

document.addEventListener('DOMContentLoaded', (event) => {
    const numberInput = document.getElementById('number');

    numberInput.addEventListener('input', (event) => {
        let value = event.target.value;

        // Remove valores negativos ou zero
        if (value <= 0) {
            value = 1;
        }

        // Remove números decimais
        value = Math.floor(value);

        event.target.value = value;
    });
});


btn.addEventListener('click', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const number = parseInt(formData.get('number'));
    const symbol = formData.get('symbol');
    calculate(number, symbol)
});

function calculate(number, symbol) {
    var init = 1
    let list = [];

    while (init <= 10) {
        let result = eval(`${number} ${symbol} ${init}`)
        let format = `${number} ${symbol} ${init} = ${result}`
        list.push(format)
        init += 1;
    }
    document.querySelector('.output').innerHTML = list.map(item => `<p><span>>>> </span>${item}</p>`).join('');
}
