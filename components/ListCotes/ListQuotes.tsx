import { View, Text, StyleSheet } from "react-native"
import { Button, Card } from "react-native-paper"
import { CoinType } from "./ListCotes"

interface ListCotsProps {
    quotes: CoinType[]
    callback: Function
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
                          <Text>{quote.code}</Text>
                          <Text style={styles.marginStart}>{quote.high}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text>{quote.high}</Text>
                          <Text style={styles.marginStart}>{quote.low}</Text>
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
        alignItems: 'center', // Alinha os itens verticalmente no centro
        justifyContent: 'space-between', // Distribui os itens horizontalmente
      },
      column: {
        flex: 1, // Garante que o conteúdo de texto ocupe a maior parte do espaço
      },
      marginStart: {
        marginLeft: 15,
      },
      buttonContainer: {
        justifyContent: 'center', // Centraliza verticalmente o botão
        alignItems: 'center', // Centraliza horizontalmente o botão
        marginLeft: 10
      },
})

export {
    ListQuotes
}