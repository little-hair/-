def start():
    get_command = input('Digite (L) para fazer LOGIN ou (C) para CRIAR CONTA: ').lower()
    if get_command == 'l':
        from login import init
        init()
    elif get_command == 'c':
        from sign import get_data
        get_data()
    else:
        print('Comando inválido!')
        start()


start()
