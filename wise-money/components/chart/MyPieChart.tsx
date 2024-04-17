import React from 'react';
import { View, Text as RNText } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import { COLORS, SIZES } from '../../constants';
import FullChartData from './interface'

class MyPieChart extends React.PureComponent<{ data: FullChartData }> {

    render() {
        const { data } = this.props;

        // Generate a key and color for each data item
        // Calculate the total
        const total = data.list.reduce((sum, item) => sum + item.value, 0);

        const colors = ['gray', 'yellow', 'red', 'olive', 'green', 'brown', 'purple', 'orange', 'pink', 'lavender', 'blue', 'viridian', 'magenta']; // Add more colors if needed

        const dataWithKeysAndColors = data.list.map((item, index) => ({
            ...item,
            key: `pie-item-${index}`,
            svg: { fill: colors[index % colors.length] },
        }));

        const Labels = ({ slices }) => {
            return slices.map((slice, index) => {
                const { pieCentroid, data } = slice;
                let [labelX, labelY] = pieCentroid;

                const offset = 130; // You can adjust this value for your needs

                // Calculate the position of the label
                const angle = Math.atan2(labelY, labelX);
                labelX = Math.cos(angle) * offset;
                labelY = Math.sin(angle) * offset;

                return (
                    <View key={index}>
                        <Text
                            x={labelX}
                            y={labelY} // Adjust this value to move the value up
                            fill={'black'}
                            textAnchor={'middle'}
                            alignmentBaseline={'middle'}
                            fontSize={12}
                            stroke={'black'}
                            strokeWidth={0}
                        >
                            {data.value.toLocaleString('en-US', { style: 'currency', currency: 'VND' })}
                        </Text>
                        <Text
                            x={labelX}
                            y={labelY + 14} // Adjust this value to move the percentage down
                            fill={'black'}
                            textAnchor={'middle'}
                            alignmentBaseline={'middle'}
                            fontSize={12}
                            stroke={'black'}
                            strokeWidth={0}
                        >
                            {`(${(data.value / total * 100).toFixed(1)}%)`}
                        </Text>
                    </View>
                )
            })
        }


        return (
            <View style={{ flexDirection: 'column', width: '100%', alignSelf: "center" }}>
                <PieChart
                    style={{ height: data.height }}
                    valueAccessor={({ item }) => item.value}
                    data={dataWithKeysAndColors}
                    spacing={0}
                    outerRadius={'0%'}
                    key={({ item }) => item.key}
                >
                    <Labels />
                </PieChart>
                <RNText style={{ fontSize: SIZES.h3, textAlign: 'center', marginTop: 10 }}>{data.title}</RNText>
            </View>
        )
    }
}

export default MyPieChart;
