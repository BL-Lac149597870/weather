import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Chart,Legend,Axis,Tooltip,Geom} from 'bizcharts';
import DataSet from '@antv/data-set';
class C2 extends Component{
    render(){
        if(this.props.cityWeather15Days.length){
            const data = this.props.cityWeather15Days.slice(0,24);
            data.forEach(item=>{
                item.tempDay = Number(item.tempDay);
                item.tempNight = Number(item.tempNight);
                item.month = item.predictDate.split('-').slice(1).join('/')
            })
            const ds = new DataSet();
            const dv = ds.createView().source(data);
            dv.transform({
                type: 'fold',
                fields: [ 'tempDay', 'tempNight' ], // 展开字段集
                key: 'city', // key字段
                value: 'temperature', // value字段
            });
            const cols = {
                month: {
                    range: [ 0, 1 ]
                },
                tempDay: {
                    alias: '白天平均气温',// 为属性定义别名
                },
                tempNight: {
                    alias: '夜间平均气温',// 为属性定义别名
                }
            };
            return(
                <Chart height={300} data={dv} scale={cols} forceFit>
                    <Legend offsetY={-10} textStyle={{
                        fill:'#fff',
                        fontSize: '20', // 文本大小
                    }}
                   itemFormatter={con=>con==='tempDay'?'白天':'夜间'}/>
                    <Axis name="month"  label={{
                        textStyle: {
                            fill:'#fff',
                            fontSize: '20', // 文本大小
                        }
                    }}/>
                    <Axis
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
                          formatter: val => `${val}°C`, // 回调函数，用于格式化坐标轴上显示的文本信息
                      }}
                        name="temperature"/>
                    <Tooltip itemTpl={
                        `<li data-index={index}>
                          <span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
                           温度：{temp} 天气：{condition} 风力：{windLevel} 风向：{windDir}
                          <br/>
                        </li>
                        `
                    }
                        crosshairs={{type : "y"}}/>
                    <Geom tooltip={['month*temperature', (month, temperature) => {
                        const sdata = data.find(item=>item.month == month);
                        const isNight = sdata.tempNight === temperature?1:0;
                        const newData = {
                            temp:[sdata.tempDay,sdata.tempNight][isNight],
                            condition: [sdata.conditionDay,sdata.conditionNight][isNight],
                            windLevel: [sdata.windLevelDay,sdata.windLevelNight][isNight],
                            windDir: [sdata.windDirDay,sdata.windDirNight][isNight]
                        }
                        return newData;
                    }]}
                        type="line" position="month*temperature" size={2} color={'city'} shape={'smooth'} />
                </Chart>
            );

        }
        return null;
    }
}
export default connect(({cityWeather15Days})=>{
    return {
        cityWeather15Days
    }
})(C2);