import React from 'react'
import { LineChart } from 'react-native-chart-kit'
import { Dimensions, View } from 'react-native'

interface MyChartProps {
  categories: string[]
  series: number[]
}

function Chart(props: MyChartProps) {
  const screenWidth = Dimensions.get("window").width * 0.85

  return (
    <View>
      <LineChart
        data={{
          labels: props.categories,
          datasets: [
            {
              data: props.series,
            },
          ],
        }}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: '#6a0dad', 
          backgroundGradientFrom: '#8a2be2', 
          backgroundGradientTo: '#9b30ff', 
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke:  "#9b30ff",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  )
}

export {
  Chart
} 