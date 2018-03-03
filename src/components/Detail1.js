import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Row,Col,Tabs,Button,message,notification} from 'antd';
import MS from './MS';
import N from './N';
import QueueAnim from 'rc-queue-anim';
import {connect} from 'react-redux';
import TweenOne from 'rc-tween-one';
import Entrance from './Entrance';
import {
    obtainCityName,
    obtainCityID,
    obtainCityWeatherLive,
    obtainCityTrafficControl,
    obtainCityAQI,
    obtainCityWeather24HOURS,
    obtainCityAQI5Days,
    obtainCityWeather15Days,
    obtainCityLifeIndex,
    obtainCityWeatherAlert
} from '../actions/obtainCityInfo';
import UIMap from './UIMap';
import { Map } from 'react-amap';
import C1 from './panelInfo/c1';
import C2 from './panelInfo/c2';
import C3 from './panelInfo/c3';
import C4 from './panelInfo/c4';
import C5 from './panelInfo/c5';
import '../css/detail.css';
import '../css/area.css';
class Detail extends Component {
    constructor(props){
        super(props);
        const res = {id: this.props.match.params.cityID};
        if(!this.props.cityID.id){
            this.props.dispatch(obtainCityName(this.props.match.params.cityID));
        }
        this.props.dispatch(obtainCityWeatherLive(res));
        this.props.dispatch(obtainCityTrafficControl(res));
        this.props.dispatch(obtainCityAQI(res));
        this.props.dispatch(obtainCityWeather24HOURS(res));
        this.props.dispatch(obtainCityAQI5Days(res));
        this.props.dispatch(obtainCityWeather15Days(res));
        this.props.dispatch(obtainCityLifeIndex(res));
        this.props.dispatch(obtainCityWeatherAlert(res));
        this.state={
            tab: 1,
            col: 0,
            type:0
        };
    }
    changeBg=(e)=>{
        if(!this.isHover){
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,.3)';
        }
    };
    isHover=false;
    returnBg=(e)=>{
        e.currentTarget.style.backgroundColor = 'transparent';
    };
    tabClick(tab){
        this.setState({
            tab
        });
    }
    changeCol=()=>{
        notification.destroy();
        let col = this.state.col?0:20;
        this.setState({
            col
        });
    }
    changeType=()=>{
        let type = this.state.type?0:1;
        this.setState({
            type
        });
    }
    //显示搜索类型及相应组件
    //@TODO: 过渡效果太粗糙
    mode=()=>{
        let constructs = <Button onClick={this.changeCol} className='otherEntrance' type="primary" icon={this.state.col?'minus':'plus'}/>
        let map = null;
        if(this.state.col){
        }
        return (
            constructs
        );
    };
    note(item){
        item.map(sitem=>{
            notification.warn({
                message: sitem.title,
                description: sitem.content,
                duration: 0,
                style:{ width: 280, marginLeft: -450, },
                placement: 'topRight'
            });
        })
    }

    alertInfo=(info)=> {
        let sinfo = '';
        info.map((item, index) => {
            sinfo+=item.content;
            // message.config({
            //     top: 100,
            // });
            // message.warning(item.title,2);
        });
        return (
            <div style={{position:'absolute'}} onClick={this.note.bind(this, info)} className='alertWrapper'>
                <div className='alert'>{sinfo}</div>
            </div>
        )
    };

    //@TODO: 鼠标移入显示天气 ，网站作品页天气
    render(){
        const TabPane = Tabs.TabPane;
        return (
            <div className='detail'>


                {
                    this.alertInfo(this.props.cityWeatherAlert)
                }

                <Row className={'mline1'}>
                    <Col className='Col' key='0' span={24}><MS/></Col>
                </Row>
                <Row className='mline3'>
                    {
                        [1,1,1,1,1,1].map((item,index)=>{
                            return (
                                <Col className='Col'
                                     onMouseOver={this.changeBg}
                                     onMouseOut={this.returnBg}
                                     key={index+1}
                                     span={4}
                                     style={{borderLeft: '1px solid rgba(255,255,255,.4)'}}
                                ><N index={index}/></Col>
                            );
                        })
                    }
                </Row>
                <Row  className='line2' id='mqhbar'>
                    <QueueAnim style={{width: '100%',height: '100%'}} animConfig={[
                        { opacity: [1, 0], translateY: [0, -100] },
                        { opacity: [1, 0], translateY: [100, -100] }
                    ]}>
                        {
                            this.props.cityID.id?
                                <Tabs
                                    defaultActiveKey="1"
                                    tabPosition='top'
                                    style={{ height: '100%'}}
                                >
                                    <TabPane tab="未来五天AQI" key="3"><C3/></TabPane>
                                    <TabPane tab="实时空气质量" key="4"><C4/></TabPane>
                                    <TabPane tab="生活指数" key="5"><C5/></TabPane>
                                </Tabs>
                                :null
                        }
                    </QueueAnim>
                </Row>
            </div>
        );
    }
}
export default connect(state=>{
    return {
        cityID: state.cityID,
        cityWeatherAlert: state.cityWeatherAlert
    }
})(Detail);

// this.state.type?
//     <div>
//         <Button style={{position: 'absolute',left: '55px',top:'10px'}} onClick={this.changeType} type="primary" >切换为地图</Button>
//         <div className='secEntrance'>
//             <Entrance po={1}/>
//         </div>
//     </div>
//     :