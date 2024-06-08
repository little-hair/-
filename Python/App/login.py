import json


def init():
    print('----- LOGIN -----')
    email = input("Email: ").lower()
    password = input("Senha: ")

    with open('DataBase/data.json', 'r') as f:
        data = json.load(f)

    try:
        rec_main = data[email]
        rec_name = rec_main["name"]
        rec_pass = rec_main["password"]

        if password == rec_pass:
            print('LOGIN EFETUADO!\n')
            print(f'Bem vindo de volta {rec_name}')

            from home import home
            home(data[email])
        else:
            print('Erro! EMAIL E/OU SENHA INCORRETO(S)')
            init()
    except KeyError:
        print('Erro! Email não encontrado!')
        init()
