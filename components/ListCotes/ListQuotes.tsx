import { View, Text, StyleSheet } from "react-native"
import { Card } from "react-native-paper"
import { CoinType } from "./ListCotes"

interface ListCotsProps {
    quotes: any
}

function ListQuotes(props: ListCotsProps) {
    return (
        <>
            {props.quotes && props.quotes.map((quote: CoinType, index: number) => (
                <View style={styles.container} key={index}>
                    <Card>
                        <Card.Content>
                            <Text>{quote.code}</Text>
                            <Text>{quote.high}</Text>
                        </Card.Content>
                    </Card>
                </View>
            ))}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
    }
})

export {
    ListQuotes
}