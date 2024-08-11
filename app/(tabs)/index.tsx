import { StyleSheet, TextInput, View, Text, Switch } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'

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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    paddingHorizontal: 20,
    paddingTop: 20,
    position: 'absolute',
    top: 0,
    left: '10%',
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,   
  },
  picker: {
    height: 50,
    width: 100,
    backgroundColor: '#B2F7EF',
    borderRadius: 5,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
    backgroundColor: '#B2F7EF',
  },
  text: {
    fontSize: 18,
    marginRight: 5
  },
})