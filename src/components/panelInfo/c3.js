import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Chart,Legend,Axis,Tooltip,Geom} from 'bizcharts';
class C3 extends Component{
    render(){
        const data = this.props.cityAQI5Days.slice(0,24);
        const humidity = data.map(item=>({
            date:item.date.split('-').slice(1).join('/'),
            value:item.value
        }))
        const humidityCols = {
            value: {
                range: [ 0, 1 ],
                alias: 'AQI',
            },
            date: {
                alias: '时间',// 为属性定义别名
            }
        }
        return(
            <Chart width={450} height={300} data={humidity} scale={humidityCols} forceFit>
                <Legend />
                <Axis name="date" label={{
                    textStyle: {
                        fill:'#fff',
                        fontSize: '20', // 文本大小
                    }
                }}/>
                <Axis name="value"
                      title={{
                          autoRotate: false,
                          textStyle: {
                              fill: '#fff',
                              fontSize: '20', // 文本大小
                          }, // 坐标轴文本属性配置
                          offset: 50, // 设置标题 title 距离坐标轴线的距离
                          position: 'end', // 标题的位置，**新增**
                      }}
                      label={{
                          offset: 5, // 设置坐标轴文本 label 距离坐标轴线的距离
                          textStyle: {
                              textAlign: 'center', // 文本对齐方向，可取值为： start middle end
                              fontSize: '20', // 文本大小
                              rotate: 0,
                              fill:'#fff',
                              textBaseline: 'middle' // 文本基准线，可取 top middle bottom，默认为middle
                          },
                          autoRotate: false, // 是否需要自动旋转，默认为 true
                          formatter: val => `${val} `, // 回调函数，用于格式化坐标轴上显示的文本信息
                      }}/>

                <Tooltip crosshairs={{type : "时间"}}/>
                <Geom type="line" position="date*value" size={2}  shape={'smooth'} />
            </Chart>
        );
    }
}
export default connect(({cityAQI5Days})=>{
    return {
        cityAQI5Days
    }
})(C3);