import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar, Button } from 'react-native-paper'
import { ListQuotes } from '@/components/ListCotes/ListQuotes'
import { CoinType } from '@/components/ListCotes/ListCotes'
import MyChart from '@/components/ChartCoin/ChartCoin'

export default function TabTwoScreen() {
  const [quotes, setQuotes] = useState<CoinType[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [series, setSeries] = useState<any[]>([])

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
    }
    else {
      throw new Error('problemas')
    }
  }

  async function handleOnClickRefreshQuotes(): Promise<void> {
    await fetchQuotes()
  }

  async function handleOnClickOpenModalChart(coin: any) {
    const data = await fetch(`https://economia.awesomeapi.com.br/json/daily/${coin}-BRL/15`)
    const response = await data.json()

    let categories: any[] = []
    let series: any[] = []

    for (let index = 0; index < response.length; index++) {
      const element = response[index]

      categories.push(element.timestamp)
      series.push(element.bid)
    }

    setCategories(categories)
    setSeries(series)
  }

  return (
    <>
      <View>
        <Appbar.Header style={styles.background}>
          <Appbar.Content title="Cotações" />
        </Appbar.Header>
      </View>
      <View style={styles.container}>
        <ListQuotes
          quotes={quotes}
          callback={handleOnClickOpenModalChart} />
      </View>
      <Button style={styles.button} icon="autorenew" mode="contained" buttonColor='gray' onPress={handleOnClickRefreshQuotes}>
        atualizar
      </Button>
      <MyChart categories={categories} series={series} />
    </>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  background: {
    backgroundColor: '#4CC9F0',
  },
  container: {
    marginTop: 10
  },
  button: {
    marginTop: 10
  }
})

export {
  TabTwoScreen
}
