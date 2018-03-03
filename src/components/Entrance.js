import React,{Component} from 'react';
import { Input, message,notification,Button } from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {obtainCityID,obtainSimilarNames} from '../actions/obtainCityInfo';


import 'antd/lib/button/style';
import cityID from "../reducers/obtainCityID";
class Entrance extends Component {
    constructor(props){
        super(props);
        if(!this.props.po){
            message.info('建议使用谷歌浏览器浏览');
        }
    }
    state={
        route: '/',
        loading: false
    };
    isOnComposition = false;
    isChrome=!!window.chrome && !!window.chrome.webstore;


    search=()=>{
        const cityName = this.refs.income.value.trim();

        if(this.state.route !== '/'){
            message.config({
                top: 50,
                duration: 2,
            });
            message.success(`已为您找到${cityName}`);
        }else{
            message.config({
                top: 100,
                duration: 2,
            });
            if(!cityName){
                {
                    message.error('请输入城市名称');
                }
            }else if(this.props.citySimilarNames.length){
                message.error(`很遗憾未能找到相应城市，您可以尝试输入 ${cityName}市/${cityName}县 `, 5);
            }else {
                message.error(`很遗憾未能找到${cityName}`,3);
            }
        }
    };

    //处理中文输入法
    handleComposition=(e)=>{
        if (e.type === 'compositionend') {
            // composition is end
            this.isOnComposition = false;

            // fixed for Chrome v53+ and detect all Chrome
            // https://chromium.googlesource.com/chromium/src/
            // +/afce9d93e76f2ff81baaa088a4ea25f67d1a76b3%5E%21/
            if (!this.isOnComposition && this.isChrome) {
                // fire onChange
                this.changeValue(e);
            }
        } else {
            // in composition
            this.isOnComposition = true
        }
    };

    //判断是否模糊搜索
    handleChange=(e)=>{
        if(this.isOnComposition){
            this.changeValue(e);
        }
    };

    //用户输入时模糊搜索
    //@TODO:输入城市名立刻回车也会提示错误，来不及查询，回车不跳转
    changeValue=(e)=>{
        const cityName = this.refs.income.value.trim();
        this.props.dispatch( obtainSimilarNames(cityName));
        if(cityName){ //输入了城市
            this.props.dispatch( obtainCityID(cityName) ).then(res=>{
                if(res){
                    this.setState({
                        route: `/a/${res.id}`
                    });
                }else{

                    this.setState({
                        route: '/'
                    });
                }
            });
        }
    };

    prepareSearch=(e)=>{
        if(e.keyCode === 13){
            message.destroy();
            this.search();
        }
    };
    
    componentWillReceiveProps(nextProps){
        if(nextProps.cityID){
            this.refs.income.value = nextProps.cityID.name;
            this.setState({
                route: `/a/${nextProps.cityID.id}`
            })
        }

    }
    getCity=()=>{
        if(this.state.loading){
            return;
        }
        this.setState({
            loading: true
        })
        // axios.get('http://webapi.amap.com/maps?v=1.4.4&key=88d259ec1d02d8b2be0bdf2c186ec50d&plugin=AMap.CitySearch').then(res=>{
        //     console.log(res)
        // })

        //处理react-amap与原生amap citysearch冲突
        if(!window.city){
            window.city = window.AMap.CitySearch;
        }
        let citysearch = new window.city();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity((status, result) =>{
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city && result.bounds) {
                    this.props.dispatch({
                        type: 'CITY_SIMILAR_NAMES',
                        payload: {}
                    });
                    this.setState({
                        loading: false
                    })
                    this.props.dispatch( obtainCityID(result.city) );
                    // var citybounds = result.bounds;
                    // document.getElementById('tip').innerHTML = '您当前所在城市：'+cityinfo;
                    // //地图显示当前城市
                    // map.setBounds(citybounds);
                }
            }
        });
    }

    render(){
        const Search = Input.Search;
        if(this.refs.income){
            if(this.refs.income.value === 'undefined'){
                this.refs.income.value = '';
            }
        }
        let swidth = !window.notMobile?'homeInMobile':'homeNotMobile';
        let homeEn = !window.notMobile?'homeInMEntrance':'homeEntrance';
        return (
            <div className={homeEn}>
                <span className={"ant-input-search ant-input-search-enter-button ant-input-search-large ant-input-affix-wrapper ant-input-affix-wrapper-lg "+swidth} >
                    <input
                        // onCompositionStart={this.handleComposition}
                        // onCompositionUpdate={this.handleComposition}
                        // onCompositionEnd={this.handleComposition}
                        autoFocus
                        ref='income'
                        type="text"
                        id='scri'
                        onKeyDown={this.prepareSearch}
                        onChange={this.changeValue}
                        placeholder="示例：北京市"
                        className="ant-input ant-input-lg"/>
                    <span className="ant-input-suffix">
                        <Link to={this.state.route} onClick={this.search} style={{textDecoration: 'none',border:'none',width:'100%'}} className="ant-btn ant-input-search-button ant-btn-primary ant-btn-lg">
                            <span>Search</span>
                        </Link>
                    </span>
                </span>
                <Button type="primary" style={{marginLeft: '20px'}} shape="circle" onClick={this.getCity} icon="environment-o" loading={this.state.loading} size='large' />
            </div>
        );
    }
}
export default connect(state=>{
    return ({
        cityID: state.cityID,
        citySimilarNames: state.citySimilarNames
    });
})(Entrance);