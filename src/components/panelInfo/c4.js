import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Chart, Axis, Geom, Tooltip, Coord, Guide, Shape} from 'bizcharts';
import {Tabs} from 'antd';
class C4 extends Component{
    render(){
        if(this.props.cityAQI.rank){
            var PData = this.props.cityAQI;
            var TabPane = Tabs.TabPane;

            var sdata = [
                { particle: 'CO', num: Number(PData.co) },
                { particle: 'NO2', num: Number(PData.no2) },
                { particle: 'O3', num: Number(PData.o3) },
                { particle: 'PM10', num: Number(PData.pm10) },
                { particle: 'PM2.5', num: Number(PData.pm25) },
                { particle: 'SO2', num: Number(PData.so2) },
            ];
            var scols = {
                'num': {
                    tickInterval: 20,
                    alias: '数量'
                },
            };


            var { Arc, Html, Line } = Guide;
            // 自定义Shape 部分
            Shape.registerShape('point', 'pointer', {
                drawShape(cfg, group) {
                    let point = cfg.points[0]; // 获取第一个标记点
                    point = this.parsePoint(point);
                    const center = this.parsePoint({ // 获取极坐标系下画布中心点
                        x: 0,
                        y: 0
                    });
                    // 绘制指针
                    group.addShape('line', {
                        attrs:  {
                            x1: center.x,
                            y1: center.y,
                            x2: point.x,
                            y2: point.y - 20,
                            stroke: cfg.color,
                            lineWidth: 5,
                            lineCap: 'round'
                        }
                    });
                    return group.addShape('circle', {
                        attrs: {
                            x: center.x,
                            y: center.y,
                            r: 12,
                            stroke: cfg.color,
                            lineWidth: 4.5,
                            fill: '#fff'
                        }
                    });
                }
            });
            var info = this.props.cityAQI.rank.split('/');
            var data = [
                { value:(Number(info[1])-Number(info[0]))/Number(info[1])*9 }
            ];
            var cols = {
                'value': {
                    min: 0,
                    max: 9,
                    ticks: [ 2.25, 3.75, 5.25, 6.75 ],
                    nice: false
                }
            };
        }



        return(
            <div>
                {
                    this.props.cityAQI.rank?
                        <Chart  height={300} data={sdata} scale={scols} forceFit>
                            <Axis name="particle" label={{
                                textStyle: {
                                    fill:'#fff',
                                    fontSize: '20', // 文本大小
                                }
                            }} />
                            <Axis name="num"  label={{
                                textStyle: {
                                    fill:'#fff',
                                    fontSize: '20', // 文本大小
                                }
                            }}/>
                            <Tooltip crosshairs={{type : "y"}}/>
                            <Geom color={'#fff'} type="interval" position="particle*num" />
                        </Chart>

                        :null
                }
            </div>

        )
    }
}
export default connect(({cityAQI})=>{
    return {
        cityAQI
    }
})(C4);

// {/*<Tabs tabPosition='left'>*/}
// {/*<TabPane tab="实时空气质量" key="1">*/}
//
// // </TabPane>
// {/*<TabPane tab="全国排名" key="2">*/}
// {/*<Chart height={300} data={data} scale={cols} padding={[ 0, 0, 200, 0 ]} forceFit>*/}
// {/*<Coord type='polar' startAngle={-9 / 8 * Math.PI} endAngle={1 / 8 * Math.PI} radius={0.75} />*/}
// {/*<Axis name='value'*/}
// {/*zIndex={2}*/}
// {/*line={null}*/}
// {/*label={{*/}
// {/*offset: -20,*/}
// {/*formatter: val => {*/}
// {/*if (val === '2.25') {*/}
// {/*return '差';*/}
// {/*} else if (val === '3.75') {*/}
// {/*return '中';*/}
// {/*} else if (val === '5.25') {*/}
// {/*return '良';*/}
// {/*}*/}
//
// {/*return '优';*/}
// {/*},*/}
// {/*textStyle: {*/}
// {/*fill: '#fff',*/}
// {/*textAlign: 'center',*/}
// {/*fontSize: '20', // 文本大小*/}
// {/*}*/}
// {/*}}*/}
// {/*/>*/}
// {/*<Axis name="1" visible ={false} />*/}
// {/*<Guide>*/}
// {/*<Line start={[ 3, 0.905 ]} end={[ 3.0035, 0.85 ]}*/}
// {/*lineStyle={{*/}
// {/*stroke: '#19AFFA', // 线的颜色*/}
// {/*lineDash: null, // 虚线的设置*/}
// {/*lineWidth: 3*/}
// {/*}}  />*/}
// {/*<Line start={[ 4.5, 0.905 ]} end={[ 4.5, 0.85 ]}*/}
// {/*lineStyle={{*/}
// {/*stroke: '#19AFFA', // 线的颜色*/}
// {/*lineDash: null, // 虚线的设置*/}
// {/*lineWidth: 3*/}
// {/*}} />*/}
// {/*<Line start={[ 6, 0.905 ]} end={[ 6.0035, 0.85 ]}*/}
// {/*lineStyle={{*/}
// {/*stroke: '#19AFFA', // 线的颜色*/}
// {/*lineDash: null, // 虚线的设置*/}
// {/*lineWidth: 3*/}
// {/*}} />*/}
// {/*<Arc zIndex={0} start={[ 0, 0.965 ]} end={[ 9, 0.965 ]}*/}
// {/*style={{ // 底灰色*/}
// {/*stroke: '#000',*/}
// {/*lineWidth: 18,*/}
// {/*opacity: 0.09*/}
// {/*}} />*/}
// {/*<Arc zIndex={1} start={[ 0, 0.965 ]} end={[ data[0].value, 0.965 ]}*/}
// {/*style={{ // 底灰色*/}
// {/*stroke: '#1890FF',*/}
// {/*lineWidth: 18,*/}
// {/*}}/>*/}
// {/*<Html position={[ '50%', '95%' ]} html={() => {return ('<div style="width: 300px;text-align: center;font-size: 12px!important;"><p style="font-size: 20px; color: rgba(0,0,0,0.43);margin: 0;">全国排名</p><p style="font-size: 3em;color: rgba(0,0,0,0.85);margin: 0;">'+ this.props.cityAQI.rank+'</p></div>')}} />*/}
// {/*</Guide>*/}
// {/*<Geom type="point" position="value*1" shape='pointer' color='#1890FF'*/}
// {/*active={false}*/}
// {/*style={{stroke: '#fff',lineWidth: 1}}*/}
// {/*/>*/}
// {/*</Chart>*/}
// {/*</TabPane>*/}
// {/*</Tabs>*/}
