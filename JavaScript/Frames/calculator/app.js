while (true) {
    let get_values = prompt('COLOQUE O CÁLCULO: ')
    var result = 0
    try {
        result = eval(get_values)
    } catch (error) {
        console.error(error, 'Invalid value')
    }
    alert('RESULTADO>>> '+ result)
}