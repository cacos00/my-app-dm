import { StyleSheet, View, Text, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar, Button, Modal, Portal, Provider as PaperProvider } from 'react-native-paper'
import { ListQuotes } from '@/components/ListCotes/ListQuotes'
import { CoinType } from '@/components/ListCotes/ListCotes'
import { Chart } from '@/components/Chart/Chart'

export default function TabTwoScreen() {
  const [quotes, setQuotes] = useState<CoinType[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [series, setSeries] = useState<any[]>([])

  const [visible, setVisible] = React.useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  useEffect(() => {
    createdComponent()
  }, [])

  function createdComponent() {
    fetchQuotes()
  }

  async function fetchQuotes() {
    const data = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL')
    const response = await data.json()
    if (response) {
      const arrayOfObjects: CoinType[] = Object.values(response)
      setQuotes(arrayOfObjects)
    } else {
      throw new Error('problemas')
    }
  }

  async function handleOnClickRefreshQuotes(): Promise<void> {
    await fetchQuotes()
  }

  async function handleOnClickOpenModalChart(coin: any) {
    showModal()
    const data = await fetch(`https://economia.awesomeapi.com.br/json/daily/${coin}-BRL/15`)
    const response = await data.json()

    let categories: any[] = []
    let series: any[] = []

    for (let index = 0; index < response.length; index++) {
      const element = response[index]

      categories.push(new Date(element.timestamp * 1000).toLocaleDateString())
      series.push(parseFloat(element.bid))
    }

    setCategories(categories)
    setSeries(series)
  }

  return (
    <PaperProvider>
      <View>
        <Appbar.Header style={styles.background}>
          <Appbar.Content title="Cotações" />
        </Appbar.Header>
      </View>
      <View style={styles.container}>
        <ListQuotes
          quotes={quotes}
          callback={handleOnClickOpenModalChart}
        />
      </View>
      <Button style={styles.button} icon="autorenew" mode="contained" buttonColor='gray' onPress={handleOnClickRefreshQuotes}>
        Atualizar
      </Button>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <View style={styles.chartWrapper}>
            {series.length > 0 && categories.length > 0 ? (
              <Chart categories={categories} series={series} />
            ) : (
              <Text>Carregando gráfico...</Text>
            )}
            <Button onPress={hideModal}>Fechar</Button>
          </View>
        </Modal>
      </Portal>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#4CC9F0',
  },
  container: {
    marginTop: 10
  },
  button: {
    marginTop: 10
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    maxWidth: '95%',
    alignSelf: 'center'
  },
  chartWrapper: {
    width: '100%',
    alignItems: 'center',
  },
})

export {
  TabTwoScreen
} 
