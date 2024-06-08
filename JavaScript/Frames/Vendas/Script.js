const button = document.querySelector('#send');
const form = document.querySelector('#form');
const section = document.querySelector('.section');

function formatCurrency(amount) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
}

function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);

    const name = formData.get("name");
    const product = formData.get("product");
    const value = parseFloat(formData.get("value"));
    const amount = parseInt(formData.get("amount"));
    const total = value * amount;

    let newForm = `
        <form class="form" method="post">
        <div class="header">
            <h3>EMITENTE</h3>
            <h3>Loja do José - Tecnologia e Informática</h3>

            <div class="info_">
                <div class="id_">
                    <h3>CNPJ:</h3>
                    <p>26.444.782/0001-41</p>
                </div>
                <div class="id_">
                    <h3>Inscrição estadual:</h3>
                    <p>123010847</p>
                </div>
            </div>

            <div class="info_">
                <div class="id_">
                    <h3>Endereço:</h3>
                    <p>Rua Não Interessa, S/N, Sem Bairro, Cidade não Existe</p>
                </div>
            </div>
        </div>

        <div class="client">
            <h3>DESTINATÁRIO</h3>
            <div class="final_name final">
                <h3 class="user_name">Cliente:</h3>
                <p class="final_values">${name}</p>
            </div>
        </div>

        <div class="main">
            <table>
                <thead>
                    <tr>
                        <th>QTD</th>
                        <th>DESCRIÇÃO</th>
                        <th>V. UNIT.</th>
                        <th>V. TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${amount}</td>
                        <td>${product}</td>
                        <td>${formatCurrency(value)}</td>
                        <td>${formatCurrency(total)}</td>
                    </tr>
                </tbody>
            </table>
            <div class="total_value">
                <h3>TOTAL</h3>
                <p>${formatCurrency(total)}</p>
            </div>
        </div>
        <h3 class="footer">Documento sem valor fiscal!</h3>
    </form>
    `;

    section.innerHTML = newForm;

    const new_button = document.createElement('button');
    new_button.innerHTML = 'Nova venda';
    document.querySelector('.form').appendChild(new_button);

    button.removeEventListener('click', handleSubmit);

    new_button.addEventListener('click', () => {
        location.reload();
    });

    form.reset();
}

button.addEventListener('click', handleSubmit);
