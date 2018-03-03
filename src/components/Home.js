import React,{Component} from 'react';
import Entrance from './Entrance';
import {List } from 'antd';
import {connect} from 'react-redux';
import enquire from 'enquire.js';
import {obtainCityName,obtainCityID} from '../actions/obtainCityInfo';
class Home extends Component {
    obtain=item=>{
        this.props.dispatch({
            type: 'CITY_SIMILAR_NAMES',
            payload: {}
        });
        this.props.dispatch( obtainCityName(item.id) );
    }
    //@TODO: 模糊搜索不能找到所有匹配项
    render(){
        return (
            <div className='home'>
                {
                    !window.notMobile?null:<video style={{position: 'absolute',objectFit: 'fill'}} loop autoPlay className='homeBGVideo' src="http://www.qianhaogege.com/video180201.mp4"/>

                }
                <Entrance po={0}/>
                {
                    this.props.citySimilarNames.length?
                        <List className={window.notMobile?'similar':'msimilar'}
                             size="small"
                             header={<div>为您匹配到以下城市</div>}
                             bordered
                             dataSource={this.props.citySimilarNames}
                             renderItem={(item,index) => (index<9?<List.Item className='sslis' onClick={this.obtain.bind(this,item)}>{item.name}</List.Item>:<List.Item style={{display:'none'}}/>)}
                    />:null
                }
            </div>
        );
    }
}
export default connect(state=>{
    return (
        {
            citySimilarNames: state.citySimilarNames
        }
    );
})(Home);

//http://webapi.amap.com/maps/ipLocation?key=f97efc35164149d0c0f299e7a8adb3d2&callback=jsonp_90072_&csid=97077BE5-345A-49F0-93B2-51B3DC7536FC
// isMobile?
//
// :
