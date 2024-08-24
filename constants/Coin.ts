function decodeCoin(coin: string) {
    console.log('coin: ', coin)
    if (coin === 'USD') {
        return '$ '
    } else if (coin === 'BRL') {
        return 'R$ '
    } else if (coin === 'EUR') {
        return 'Є '
    } else if (coin === 'BTC') {
        return '₿ '
    }
}

export {
    decodeCoin
}