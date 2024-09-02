import { StyleSheet, View, Text, Switch } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { Button, TextInput } from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'
import { decodeCoin } from '@/constants/Coin'

export default function HomeScreen() {
  const [listPicker] = useState([
    { label: 'USD', value: 'USD' },
    { label: 'BRL', value: 'BRL' },
    { label: 'EUR', value: 'EUR' },
    { label: 'CAD', value: 'CAD' },
    { label: 'ARS', value: 'ARS' },
    { label: 'GBP', value: 'GBP' },
    { label: 'ETH', value: 'ETH' },
  ])
  const [coinInput, setCoinInput] = useState<string>('BRL')
  const [coinOutput, setCoinOutput] = useState<string>('USD')
  const [inputValue, setInputValue] = useState<string>('')
  const [outputValue, setOutputValue] = useState<string>('')

  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  async function handleOnClickConversion(): Promise<void> {
    if (coinInput === coinOutput) {
      console.log('selecione moedas diferentes para prosseguir')
    } else {
      const data = await fetch(`https://economia.awesomeapi.com.br/json/last/${coinInput}-${coinOutput}`)

      const response = await data.json()

      const coin = `${coinInput}${coinOutput}`

      const cleanedInputValue = inputValue.replace(/[^\d.,]/g, '').replace(/\./g, '').replace(/,/g, '.')

      const value: number = Number(cleanedInputValue) * response[coin].bid
      const outputValue = String(value.toFixed(2))

      setOutputValue(outputValue)
    }
  }

  return (
    <LinearGradient colors={['#4CC9F0', '#B2F7EF']} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.rowFullWidth}>
          <TextInputMask
            type='money'
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: decodeCoin(coinInput),
              suffixUnit: ''
            }}
            style={styles.input}
            onChangeText={(value) => setInputValue(value)}
            value={inputValue}
            placeholder="Digite o valor"
            keyboardType="numeric"
          />
          <Picker
            selectedValue={coinInput}
            style={styles.picker}
            onValueChange={(itemValue) => setCoinInput(itemValue)}
          >
            {listPicker.map((coin, index) => (
              <Picker.Item key={index} label={coin.label} value={coin.value} />
            ))}
          </Picker>
        </View>

        <Button
          style={styles.buttonConver}
          icon="autorenew"
          mode="contained"
          buttonColor='gray'
          onPress={handleOnClickConversion}
        >
          Converter
        </Button>

        <View style={styles.rowFullWidth}>
          <TextInputMask
            type='money'
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: decodeCoin(coinOutput),
              suffixUnit: ''
            }}
            style={styles.input}
            value={outputValue ? outputValue : 'sem valor inserido'}
            editable={false}
            selectTextOnFocus={false}
            keyboardType="numeric"
          />
          <Picker
            selectedValue={coinOutput}
            style={styles.picker}
            onValueChange={(itemValue) => setCoinOutput(itemValue)}
          >
            {listPicker.map((coin, index) => (
              <Picker.Item key={index} label={coin.label} value={coin.value} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.containerFlexButton}>
        <Text style={styles.text}>Múltiplas Conversões</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
    width: '100%',
    paddingHorizontal: 15,
    flex: 1, 
  },
  rowFullWidth: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20, 
  },
  input: {
    flex: 0.7,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
    backgroundColor: '#B2F7EF',
    marginRight: 10,
  },
  picker: {
    flex: 0.3,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#B2F7EF',
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    marginRight: 5,
    borderRadius: 5,
  },
  buttonConver: {
    width: '60%',
    alignSelf: 'center',
    marginVertical: 20, 
  },
  containerFlexButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
})