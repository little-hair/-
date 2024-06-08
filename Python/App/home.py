import json


def home(mail):
    with open("DataBase/data.json", "r") as file:
        data_existent = json.load(file)
    total_data = mail["email"]

    name = data_existent[total_data]["name"]
    mail = data_existent[total_data]["email"]
    password = data_existent[total_data]["password"]

    print('SUAS INFORMAÇÕES DE LOGIN:')
    print(f' NOME: {name}\n E-MAIL: {mail}')

    get_command = input('Digite (T) para trocar a SENHA ou (S) para SAIR: ').lower()
    if get_command == 't':
        change(name, mail, password)
    elif get_command == 's':
        print('Programa finalizado!')
        exit()
    else:
        print('Comando inválido!')


def change(name, mail, password):
    check_pass = input('Senha ANTIGA: ')
    new_pas = input('Senha NOVA: ')

    if check_pass == password:
        novo_dado = {
            "name": name,
            "email": mail,
            "password": new_pas
        }

        with open("DataBase/data.json", "r") as file:
            data_existent = json.load(file)
        data_existent[mail] = novo_dado

        with open("DataBase/data.json", "w") as file:
            json.dump(data_existent, file, indent=4)
        print('SENHA ALTERADA COM SUCESSO!')
        from login import init
        init()

    else:
        print('SENHA INCORRETA! Tente novamente...')
        home(mail)
