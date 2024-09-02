import { View, Text, StyleSheet } from "react-native"
import { Button, Card, Icon } from "react-native-paper"
import { CoinType } from "./ListCotesType"
import { decodeCoin } from "@/constants/Coin"

interface ListCotsProps {
  quotes: CoinType[]
  callback: Function
}

function extractCoin(nameCoin: string) {
  let posicaoBarra = nameCoin.indexOf('/')

  return nameCoin.substring(0, posicaoBarra)
}

function ListQuotes(props: ListCotsProps) {
  return (
    <>
      {props.quotes && props.quotes.map((quote: CoinType, index: number) => (
        <View style={styles.container} key={index}>

          <Card>
            <Card.Content>
              <View style={styles.row}>
                <View style={styles.column}>
                  <View style={styles.row}>
                    <Text>{quote.code} / {extractCoin(quote.name)}</Text>
                    <Text style={styles.marginStart}>
                      <Icon
                        source="arrow-up-circle"
                        color={'green'}
                        size={18}
                      /> {quote.high}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text>{decodeCoin(quote.code)}{quote.high}</Text>
                    <Text style={styles.marginStart}>
                      <Icon
                        source="arrow-down-circle"
                        color={'red'}
                        size={18}
                      /> {quote.low}</Text>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <Button icon="chart-areaspline" mode="contained" onPress={() => props.callback(quote.code)}>
                    chart
                  </Button>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      ))}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 5,
    marginStart: 3,
    marginEnd: 3,
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
  marginStart: {
    marginLeft: 15,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
})

export {
  ListQuotes
}