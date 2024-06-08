const storage = JSON.parse(localStorage.getItem('active'));
if (storage) {
    const check_login_auto = storage[0].active;
    const mail_login_auto = storage[0].email;
    if (check_login_auto === 'true') {
        document.querySelector('section.layout').classList.add('off');
        home(mail_login_auto)
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('input[type="submit"]');
    const reload = document.querySelectorAll('.back');
    const btn_login = document.getElementById('lgn');
    const btn_sign = document.getElementById('sgn');
    const submit_lgn = document.getElementById('submit_lgn');
    const submit_sgn = document.getElementById('submit_sgn');

    reload.forEach((btn) => {
        btn.addEventListener('click', () => {
            reloadPage();
        })
    })

    buttons.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
        });
    });

    btn_login.addEventListener('click', () => {
        closeWelcome();
        document.querySelector('.login').classList.remove('off');
    });

    btn_sign.addEventListener('click', () => {
        closeWelcome();
        document.querySelector('.sign').classList.remove('off');
    });

    function closeWelcome() {
        document.querySelector('.layout').classList.add('off');
    }

    if (submit_sgn) {
        submit_sgn.addEventListener('click', () => {
            sign();
        });
    }

    if (submit_lgn) {
        submit_lgn.addEventListener('click', () => {
            login();
        });
    }
});

function sign() {
    const form_sgn = document.getElementById('act_sgn');
    const form_data_sgn = new FormData(form_sgn);

    const mailId = form_data_sgn.get('mail_sgn');
    const pass = form_data_sgn.get('pass_sgn');

    function checkEmail(mailId) {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(mailId).toLowerCase());
    }

    if (!mailId) {
        alert('Email é obrigatório!');
    } else if (!checkEmail(mailId)) {
        alert('Email inválido!');
    } else if (pass.length < 8) {
        alert('Senha deve conter pelo menos 8 caracteres!');
    } else if (pass.includes(' ') === true) {
        alert('Senha não deve conter espaços em branco!');
    } else {
        checkStorage(mailId);
    }

    function checkStorage(mailId) {
        const storage = localStorage.getItem(`dataSign_${mailId}`);
        if (storage) {
            alert('E-mail já cadastrado!');
        } else {
            dataSign(mailId);
        }
    }

    function dataSign(mail) {
        let storageKey = `dataSign_${mail}`;
        let storage = JSON.parse(localStorage.getItem(storageKey)) || [];
        let active_login = JSON.parse(localStorage.getItem('active')) || [];


        let data = {
            name: form_data_sgn.get('nm_sgn'),
            email: form_data_sgn.get('mail_sgn'),
            pass: form_data_sgn.get('pass_sgn'),
            active: 'false'
        };
        storage.push(data);
        localStorage.setItem(storageKey, JSON.stringify(storage));

        let active = {
            mail: mail,
            active: 'false'
        };
        active_login.push(active);
        localStorage.setItem('active', JSON.stringify(active_login));

        alert('Cadastro confirmado!');
        reloadPage();
    }
};

function login() {
    const form_lgn = document.getElementById('act_lgn');
    const form_data_lgn = new FormData(form_lgn);

    const mail = form_data_lgn.get('mail_lgn');
    const pass = form_data_lgn.get('pass_lgn');

    try {
        const key_storage = `dataSign_${mail}`;
        const entry_storage = JSON.parse(localStorage.getItem(key_storage));

        if (entry_storage && entry_storage[0].pass === pass) {

            let new_data = {
                email: mail,
                active: 'true'
            };
            localStorage.setItem('active', JSON.stringify([new_data]));

            alert('Login efetuado com sucesso!');
            home(entry_storage[0].email);
        } else {
            alert('Senha ou email incorretos!');
        }
    } catch (error) {
        if (error instanceof TypeError) {
            alert('Email não encontrado!');
        } else {
            console.error(error);
        }
    }
};

function home(mail) {
    const storageKey = `dataSign_${mail}`
    const entry_storage = JSON.parse(localStorage.getItem(storageKey));

    let home = `
        <h1>Bem vindo(a) ${entry_storage[0].name}!</h1>
        <div class="home_data">
            <p class="_name">Nome: <span>${entry_storage[0].name}</span></p>
            <p class="_mail">E-mail: <span>${entry_storage[0].email}</span></p>
            <span class="_pass">Alterar senha</span>
        </div>
    `;

    const div_contain = document.createElement('div');
    document.querySelector('.login').classList.add('off');
    document.querySelector('.home').classList.remove('off');
    div_contain.innerHTML = home;
    document.querySelector('.home_login').appendChild(div_contain);

    document.querySelector('._pass').addEventListener('click', () => {
        document.querySelector('.home_login').classList.add('off');
        document.querySelector('.frames').classList.add('off');
        document.querySelector('.change_pass').classList.remove('off');
        changePass(mail);
    });

    document.querySelector('.close').addEventListener('click', () => {
        exitAccount()
    })
};

function changePass(mail) {
    const storageKey = `dataSign_${mail}`;
    const entry_storage = JSON.parse(localStorage.getItem(storageKey));
    const old_pass = entry_storage[0].pass;

    document.querySelector('.home_back').addEventListener('click', () => {
        document.querySelector('.home_login').classList.remove('off');
        document.querySelector('.frames').classList.remove('off');
        document.querySelector('.change_pass').classList.add('off');
        changePass(mail);
    });

    document.getElementById('submit_pass').addEventListener('click', () => {
        const form_pass = document.getElementById('change_pass');
        const form_data_pass = new FormData(form_pass);
        const check_pass_old = form_data_pass.get('old_pass');
        const new_pass = form_data_pass.get('new_pass');

        if (old_pass === check_pass_old) {
            if (new_pass.length >= 8) {
                let new_data = {
                    name: entry_storage[0].name,
                    email: entry_storage[0].email,
                    pass: new_pass,
                };
                localStorage.setItem(storageKey, JSON.stringify([new_data]));
                alert('Senha alterada com sucesso!');
                reloadPage();
            } else {
                alert('A nova senha deve conter pelo menos 8 caracteres!');
            }
        } else {
            alert('Senha atual incorreta!');
        }
    });
};

function exitAccount() {
    const email = storage[0].email;

    const new_data = {
        email: email,
        active: 'false'
    }
    localStorage.setItem('active', JSON.stringify([new_data]));
    alert('Você foi desconectado da sua conta!');
    reloadPage();
}

function reloadPage() {
    location.reload();
};
