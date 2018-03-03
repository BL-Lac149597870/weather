import React,{Component} from 'react';
import {connect} from 'react-redux';
import cityIcon from "../reducers/obtainIcon";
import Entrance from './Entrance';
import {Button} from 'antd';
class S extends Component {
    toHome=()=>{
        window.location = '/';
    }
    render(){
        const data = this.props.cityWeather15Days[1];
        const liveData = this.props.cityWeatherLive;
        const quality = this.props.cityAQI;
        const a = '#131111';
        var po = [['优级','#21C81C'],['良好','#6A9F36'],['轻度污染','#C8810D'],['中度污染','#8A210C'],['重度污染','#31000E']];
        const value = Number(quality.value);
        var sindex = 4;
        if(quality.value< 50){
            sindex = 0;
        }else if(quality.value< 100){
            sindex = 1;
        }else if(quality.value< 200){
            sindex = 2;
        }else if(quality.value< 300){
            sindex = 3;
        }
        var pollution = po[sindex][0];
        return (

            <div className='S'>
                {
                    this.props.cityWeather15Days[0]&&this.props.cityWeatherLive.conditionId&&this.props.cityIcon.conditionID?
                        <div style={{height: '100%'}}>
                            <Button type="primary" className='mmbtn'  onClick={this.toHome} icon="search" size='small' />
                            <div className='cities'>
                                {this.props.cityAQI.cityName}
                            </div>
                            <div style={{textAlign: 'left'}} className='todayDeatil clearFix'>
                                <div className='mtodayTemp'>
                                    {liveData.temp}
                                </div>
                                <div className='mtodayTempStyle'>
                                    <p className='limitWind'>℃</p>
                                    <p className='limitWind'>{liveData.condition}</p>
                                    <p className='limitWind'>(实时)</p>

                                </div>

                            </div>
                            <p className='todaySubDetail limitWind'>{liveData.tips}</p>

                            <div className='minfo'>
                                <img src={require(`../static/icons/W${new Date().getHours()>=6&&new Date().getHours()<=18?this.props.cityIcon['icon1']:this.props.cityIcon['icon2']}.png`)} alt="weather"/>
                                <p className='todaySubDetail limitWind'>{data.tempNight}~{data.tempDay}℃</p>
                                <p className='todaySubDetail limitWind'>{liveData.windDir}{liveData.windLevel}级</p>
                                <p className='todaySubDetail limitWind'><span style={{backgroundColor: po[sindex][1]}} className='todayAir'>{quality.value} {pollution}</span></p>

                            </div>
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
        cityWeatherLive: state.cityWeatherLive,
        cityAQI: state.cityAQI,
        cityLifeIndex: state.cityLifeIndex,
        cityIcon: state.cityIcon
    }
})(S);