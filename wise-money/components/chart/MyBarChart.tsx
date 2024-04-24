import React from 'react';
import { View, Text as RNText } from 'react-native';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import { COLORS, SIZES } from '../../constants';
import FullChartData from './interface'


class MyBarChart extends React.PureComponent<{ data: FullChartData }> {

    render() {
        const { data } = this.props;

        const Labels = ({ x, y, bandwidth, data }) => (
            data.map((value, index) => (
                <Text
                    key={index}
                    x={x(index) + (bandwidth / 2)}
                    // y={y(value) + 18 - data.length}
                    y={y(value) - 15}
                    fontSize={23 - data.length * 2}
                    fill={'black'}
                    alignmentBaseline={'middle'}
                    textAnchor={'middle'}
                >
                    {value.toLocaleString('en-US', { style: 'currency', currency: 'VND' })}
                </Text>
                // <>Nothing here</>
            ))
        )

        return (
            <View style={{ flexDirection: 'column', width: '95%', alignSelf: "center" }}>
                <View style={{ flexDirection: 'row', height: data.height }}>
                    {/* <YAxis
                        data={data.list.map(item => item.value)}
                        contentInset={{ top: 10, bottom: 10 }}
                        svg={{ fill: 'grey', fontSize: 10 }}
                        numberOfTicks={10}
                        formatLabel={(value) => `${value - 1000000}`}
                    /> */}
                    <BarChart
                        style={{ flex: 1 }}
                        data={data.list.map(item => item.value)}
                        svg={{ fill: COLORS.primary }}
                        contentInset={{ top: 30, bottom: 10 }}
                        spacing={0.2}
                        gridMin={0}
                    >
                        <Labels />
                    </BarChart>
                </View>
                <XAxis
                    data={data.list.map((_, index) => index)} // array of numbers
                    formatLabel={(value, index) => data.list[index].name} // display the names
                    contentInset={{ left: 90 - data.list.length * 10, right: 90 - data.list.length * 10 }}
                    svg={{ fontSize: 23 - data.list.length * 2, fill: 'black' }}
                />
                <RNText style={{ fontSize: SIZES.h3, textAlign: 'center', marginTop: 10 }}>{data.title}</RNText>
            </View>
        )
    }

}

export default MyBarChart;
