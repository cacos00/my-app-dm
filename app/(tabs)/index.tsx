import { StyleSheet, View, Text, Switch } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { Button, TextInput } from 'react-native-paper'

export default function HomeScreen() {
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [inputValue, setInputValue] = useState('')
  const [listPicker] = useState([
    { label: 'USD', value: 'USD' },
    { label: 'BRL', value: 'BRL' },
    { label: 'EUR', value: 'EUR' },
  ])
  const [isEnabled, setIsEnabled] = useState(false)

  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  return (
    <LinearGradient colors={['#4CC9F0', '#B2F7EF']} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setInputValue(value)}
            value={inputValue}
            placeholder="Digite o valor"
            keyboardType="numeric"
          />
          <Picker
            selectedValue={selectedCurrency}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
          >
            {listPicker.map((coin, index) => (
              <Picker.Item key={index} label={coin.label} value={coin.value} />
            ))}
          </Picker>
        </View>
        <Button icon="autorenew" mode="contained" buttonColor='gray' onPress={() => console.log('Pressed')}>
          Converter
        </Button>
      </View>
      <View style={styles.container1}>
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
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 20,
    position: 'absolute',
    top: 0,
    left: '10%',
  },
  input: {
    flex: 0.55,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
    backgroundColor: '#B2F7EF',
    marginRight: 10,
  },
  picker: {
    flex: 0.25,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#B2F7EF',
    borderRadius: 5
  },
  text: {
    fontSize: 18,
    marginRight: 5,
    borderRadius: 5,
  },
  buttonConver: {
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10
  },
  row: {
    flexDirection: 'row',
  }
})