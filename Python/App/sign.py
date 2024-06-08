import json


def get_data():
    print('----- CRIAR CONTA -----')
    name = input("NOME: ")
    email = input("E-MAIL: ").lower()
    password = input("SENHA: ")
    return name, email, password


def save_json(name, email, password):
    novo_dado = {
        "name": name,
        "email": email,
        "password": password
    }
    
    with open("DataBase/data.json", "r") as file:
        data_existent = json.load(file)
    data_existent[email] = novo_dado
    
    with open("DataBase/data.json", "w") as file:
        json.dump(data_existent, file, indent=4)


name, email, password = get_data()

try:
    save_json(name, email, password)
    print('CADASTRO CONCLUÍDO COM SUCESSO!')
    print(f'Suas informações de LOGIN:\n NOME: {name}\n EMAIL: {email}\n')
    from login import init
    init()

except ValueError:
    print('HOUVE ALGUM ERRO!')

