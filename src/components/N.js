import React,{Component} from 'react';
import bg from '.././static/detail/5.png';
import {connect} from 'react-redux';
import cityAQI5Days from "../reducers/obtainCityAQI5Days";
class N extends Component {
    render(){
        if(this.props.cityWeather15Days[this.props.index+2]&&this.props.cityAQI5Days[(this.props.index+2)%7]){
            var data = this.props.cityWeather15Days[this.props.index+2]||{};
            var quality = this.props.cityAQI5Days[(this.props.index+2)]||{};
            // if(!((this.props.index+2)%7)){
            //     quality.value = Number(this.props.cityAQI5Days[4].value)+5;
            // }
            var index = (new Date().getDay()+this.props.index+1)%7;
            var weeks = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
            var month = Number(data.predictDate.split('-')[1]);
            var day = Number(data.predictDate.split('-')[2]);
            var po = [['优级','#21C81C'],['良好','#6A9F36'],['轻度污染','#C8810D'],['中度污染','#8A210C'],['重度污染','#31000E']];
            var sindex = 4;
            var value = Number(quality.value||0);
            if(value< 50){
                sindex = 0;
            }else if(value< 100){
                sindex = 1;
            }else if(value< 200){
                sindex = 2;
            }else if(value< 300){
                sindex = 3;
            }
            var pollution = po[sindex][0];

        }
        let time = new Date().getHours();
        let whichId = time>=6&&time<=18?'conditionIdDay':'conditionIdNight';
        return (
            <div className='N'>
                {
                    this.props.cityWeather15Days[this.props.index+2]&&this.props.cityAQI5Days[(this.props.index+2)%7]?
                        <div>

                            <p className='todaySubDetail limitWind' style={{paddingTop: 0,marginBottom: 0}}>{weeks[index]}</p>
                            <p className='todaySubDetail limitWind'>{month}月{day}日</p>
                            <div>
                                <img src={require('../static/icons/W'+data[whichId]+'.png')} alt="天气"/>
                            </div>
                            <p style={{marginTop: '15px'}} className='todaySubDetail limitWind'>{data.tempNight}~{data.tempDay}℃</p>
                            <p className='todaySubDetail limitWind'>{data.conditionDay===data.conditionNight?data.conditionDay:data.conditionDay+'转'+data.conditionNight}</p>
                            <p className='todaySubDetail limitWind'>{data.windDirDay===data.windDirNight?data.windDirDay:data.windDirDay+'转'+data.windDirNight}</p>
                            <p className='todaySubDetail limitWind'>{value!=0?<span style={{backgroundColor: po[sindex][1]}} className='todayAir'>{value} {pollution}</span>:<span className='todayAir'>暂无数据</span>}</p>

                        </div>
                        :null

                }

            </div>
        );
    }
}
export default connect(state=>{
    return {
        cityWeather15Days: state.cityWeather15Days,
        cityAQI5Days: state.cityAQI5Days,
    }
})(N);