import { StyleSheet, View } from 'react-native'
import { useEffect, useState } from 'react'
import { Appbar } from 'react-native-paper'
import { ListQuotes } from '@/components/ListCotes/ListQuotes'
import { CoinType } from '@/components/ListCotes/ListCotes'

export default function TabTwoScreen() {
  const [quotes, setQuotes] = useState<CoinType[]>()

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
      const arrayOfObjects: CoinType[]  = Object.values(response)
      setQuotes(arrayOfObjects)
    }
    else {
      throw new Error('porblemas')
    }
  }

  return (
    <>
      <View>
        <Appbar.Header style={styles.background}>
          <Appbar.Content title="Cotações" />
        </Appbar.Header>
      </View>
      <View style={styles.container}>
        <ListQuotes quotes={quotes} />
      </View>
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
  }
})

export {
  TabTwoScreen
}
