function decodeCoin(coin: string) {
    if (coin === 'USD') {
        return '$ '
    } else if (coin === 'BRL') {
        return 'R$ '
    } else if (coin === 'EUR') {
        return 'Є '
    } else if (coin === 'BTC') {
        return '₿ '
    } else if (coin === 'CAD') {
        return 'C$ '
    } else if (coin === 'ARS') {
        return '$ '
    } else if (coin === 'ETH') {
        return 'Ξ '
    } else if (coin === 'GBP') {
        return '£ '
    }
}

export {
    decodeCoin
}