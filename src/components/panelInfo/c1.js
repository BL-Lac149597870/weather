import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Chart,Legend,Axis,Tooltip,Geom} from 'bizcharts';
import {Tabs} from 'antd';
class C1 extends Component{
    render(){
        const TabPane = Tabs.TabPane;

        if(this.props.cityWeather24HOURS.length){
            const data = this.props.cityWeather24HOURS.slice(0,24);
            const temp = data.map(item=>({
                temp:Number(item.temp),
                hour:item.hour+':00',
                condition: item.condition
            }))
            const tempCols = {
                temp: {
                    range: [ 0, 1 ],
                    alias: '温度',
                },
                hour: {
                    alias: '时间',// 为属性定义别名
                }
            };
            const wind = data.map(item=>({
                temp:Number(item.windSpeed),
                hour:item.hour+':00',
                direction: item.windDir
            }))
            const windCols = {
                temp: {
                    range: [ 0, 1 ],
                    alias: '风速',
                },
                hour: {
                    alias: '时间',// 为属性定义别名
                }
            };
            const humidity = data.map(item=>({
                temp:Number(item.humidity),
                hour:item.hour+':00'
            }))
            const humidityCols = {
                temp: {
                    range: [ 0, 1 ],
                    alias: '湿度',
                },
                hour: {
                    alias: '时间',// 为属性定义别名
                }
            }
            return(
                <div style={{height: '100%'}}>
                    <Tabs tabPosition={window.notMobile?'left':'top'}>
                        <TabPane tab="温度" key="1">
                            <Chart height={300} width={450} data={temp} scale={tempCols} forceFit>
                                <Legend />
                                <Axis name="hour" label={{
                                    textStyle: {
                                        fill:'#fff',
                                        fontSize: '20', // 文本大小
                                    }
                                }}/>
                                <Axis name="temp"
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
                                          formatter: val => `${val}°C`, // 回调函数，用于格式化坐标轴上显示的文本信息
                                      }}/>

                                <Tooltip itemTpl={
                                    `<li data-index={index}>
                                  <span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
                                  {value}°C {condition}
                                </li>
                                `
                                }
                                         crosshairs={{type : "时间"}}/>
                                <Geom tooltip={['hour*temp', (hour, stemp) => {
                                    const condition = temp.find(item=>item.hour == hour).condition;
                                    return {
                                        name: hour,
                                        value: stemp,
                                        condition
                                    };
                                }]}
                                      type="line" position="hour*temp" size={2}  shape={'smooth'} />
                            </Chart>

                        </TabPane>
                        <TabPane tab="风力" key="2">
                            <Chart width={450} height={300} data={wind} scale={windCols} forceFit>
                                <Legend />
                                <Axis name="hour" label={{
                                    textStyle: {
                                        fill:'#fff',
                                        fontSize: '20', // 文本大小
                                    }
                                }}/>
                                <Axis name="temp"
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

                                <Tooltip itemTpl={
                                    `<li data-index={index}>
                                  <span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
                                  风速：{value}m/s
                                  <br/>
                                  <span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
                                  风向：{direction}
                                </li>
                                `
                                }
                                         crosshairs={{type : "时间"}}/>
                                <Geom tooltip={['hour*temp', (hour, temp) => {
                                    const direction = wind.find(item=>item.hour == hour).direction;
                                    return {
                                        name: hour,
                                        value: temp,
                                        direction
                                    };
                                }]}
                                      type="line" position="hour*temp" size={2}  shape={'smooth'} />
                            </Chart>

                        </TabPane>
                        <TabPane tab="湿度" key="3">
                            <Chart width={450} height={300} data={humidity} scale={humidityCols} forceFit>
                                <Legend />
                                <Axis name="hour" label={{
                                    textStyle: {
                                        fill:'#fff',
                                        fontSize: '20', // 文本大小
                                    }
                                }}/>
                                <Axis name="temp"
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
                                <Geom type="line" position="hour*temp" size={2}  shape={'smooth'} />
                            </Chart>

                        </TabPane>
                    </Tabs>

                </div>
            );
        }
        return null;
    }
}
export default connect((state)=>{
    return {
        cityWeather24HOURS:state.cityWeather24HOURS
    }
})(C1);