import React from 'react'
import { LineChart } from 'react-native-chart-kit'
import { Dimensions, View } from 'react-native'

interface MyChartProps {
  categories: string[];
  series: number[];
}

const MyChart = (props: MyChartProps) => {
  console.log('cheguei amendo')
  const screenWidth = Dimensions.get("window").width;

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
        width={screenWidth} // Largura do gráfico
        height={220} // Altura do gráfico
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}

export default MyChart