import React,{Component} from "react";
import {connect} from 'react-redux';
import {notification,Icon } from 'antd';
import {
    obtainAreacode,
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


class UIMap extends Component {
    constructor(props) {
        super(props);
        this.loadUI();
        // notification.open({
        //     message: '您好',
        //     description: '建议使用谷歌浏览器浏览',
        //     placement: 'topLeft',
        //     icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
        //     style: {
        //         width: 300,
        //         marginRight: 300,
        //     },
        //     duration: 2
        // });
    }

    loadUI() {
        //加载DistrictExplorer，loadUI的路径参数为模块名中 'ui/' 之后的部分
        window.AMapUI.loadUI(['geo/DistrictExplorer'], (DistrictExplorer) => {
            this.initPage(DistrictExplorer);
        })

    }

    initPage(DistrictExplorer) {
        //创建一个实例
        const districtExplorer = new DistrictExplorer({
            eventSupport: true, //打开事件支持
            map: this.props.__map__ //关联的地图实例
        });
        this.districtExplorer = districtExplorer;
        this.div = document.createElement('div');
        this.div.className = 'tipMarker top';
        //鼠标hover提示内容
        this.tipMarker = new window.AMap.Marker({
            content: this.div,
            offset: new window.AMap.Pixel(0, 0),
            bubble: true,
        });
        // feature被点击
        districtExplorer.on('featureClick', (e, feature) => {
            const props = feature.properties;
            //查询具体城市 存进redux
            if(props.acroutes.length>1){
                //避免重复点击申请
                if(props.name !== this.props.cityName){
                    this.props.dispatch( obtainCityID(props.name) ).then(res=>{
                        this.props.dispatch(obtainCityWeatherLive(res));
                        this.props.dispatch(obtainCityTrafficControl(res));
                        this.props.dispatch(obtainCityAQI(res));
                        this.props.dispatch(obtainCityWeather24HOURS(res));
                        this.props.dispatch(obtainCityAQI5Days(res));
                        this.props.dispatch(obtainCityWeather15Days(res));
                        this.props.dispatch(obtainCityLifeIndex(res));
                        this.props.dispatch(obtainCityWeatherAlert(res));

                    });
                }

            }
            //如果存在子节点
            if (props.childrenNum > 0) {
                //切换聚焦区域
                this.switch2AreaNode(props.adcode);
            }
        });

        //外部区域被点击
        districtExplorer.on('outsideClick', (e)=> {

            districtExplorer.locatePosition(e.originalEvent.lnglat, (error, routeFeatures)=> {

                if (routeFeatures && routeFeatures.length > 1) {
                    //切换到省级区域
                    this.switch2AreaNode(routeFeatures[1].properties.adcode);
                } else {
                    //切换到全国
                    this.switch2AreaNode(100000);
                }

            }, {
                levelLimit: 2
            });
        });

        //监听feature的hover事件
        districtExplorer.on('featureMouseout featureMouseover', (e, feature)=> {
            this.toggleHoverFeature(feature, e.type === 'featureMouseover',
                e.originalEvent ? e.originalEvent.lnglat : null);
        });

        //监听鼠标在feature上滑动
        districtExplorer.on('featureMousemove', (e, feature)=> {
            //更新提示位置
            this.tipMarker.setPosition(e.originalEvent.lnglat);
        });
        
        const adcode = this.props.areaCode||100000;//全国的区划编码
        districtExplorer.loadAreaNode(adcode, (error, areaNode) => {

            if (error) {
                console.error(error);
                return;
            }

            //绘制载入的区划节点
            this.renderAreaNode(districtExplorer, areaNode);
        });

        //解决关闭按钮后再打开鼠标hover不出现提示
        this.switch2AreaNode(adcode);
    }

    //根据Hover状态设置相关样式
    toggleHoverFeature(feature, isHover, position) {
        this.tipMarker.setMap(isHover ? this.props.__map__ : null);
        if (!feature) {
            return;
        }

        const props = feature.properties;

        if (isHover) {
            //更新提示内容
            this.div.innerHTML = (props.name);
            //更新位置
            this.tipMarker.setPosition(position || props.center);
        }


        //更新相关多边形的样式
        const polys = this.districtExplorer.findFeaturePolygonsByAdcode(props.adcode);
        for (let i = 0, len = polys.length; i < len; i++) {

            polys[i].setOptions({
                fillOpacity: isHover ? 0.5 : 0.2
            });
        }
    }

    //切换区域
    switch2AreaNode(adcode, callback) {
        if (this.currentAreaNode && ('' + this.currentAreaNode.getAdcode() === '' + adcode)) {
            return;
        }

        this.loadAreaNode(adcode, (error, areaNode)=> {
            if (error) {
                if (callback) {
                    callback(error);
                }
                return;
            }
            this.currentAreaNode = window.currentAreaNode = areaNode;
            //设置当前使用的定位用节点
            this.props.dispatch( obtainAreacode(areaNode.adcode) );
            this.districtExplorer.setAreaNodesForLocating([this.currentAreaNode]);
            this.refreshAreaNode(areaNode);
            if (callback) {
                callback(null, areaNode);
            }
        });
    }

    //加载区域
    loadAreaNode(adcode, callback) {
        this.districtExplorer.loadAreaNode(adcode, (error, areaNode)=> {
            if (error) {
                if (callback) {
                    callback(error);
                }
                return;
            }

            if (callback) {
                callback(null, areaNode);
            }
        });
    }

    //切换区域后刷新显示内容
    refreshAreaNode(areaNode) {
        this.districtExplorer.setHoverFeature(null);
        this.renderAreaNode(this.districtExplorer,areaNode);
    }

    renderAreaNode(districtExplorer, areaNode) {

        //清除已有的绘制内容
        districtExplorer.clearFeaturePolygons();

        //just some colors
        const colors = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00"];

        //绘制子级区划
        districtExplorer.renderSubFeatures(areaNode, (feature, i) => {

            const fillColor = colors[i % colors.length];
            const strokeColor = colors[colors.length - 1 - i % colors.length];

            return {
                cursor: 'default',
                bubble: true,
                strokeColor: strokeColor, //线颜色
                strokeOpacity: 1, //线透明度
                strokeWeight: 1, //线宽
                fillColor: fillColor, //填充色
                fillOpacity: 0.35, //填充透明度
            };
        });

        //绘制父级区划，仅用黑色描边
        districtExplorer.renderParentFeature(areaNode, {
            cursor: 'default',
            bubble: true,
            strokeColor: 'black', //线颜色
            fillColor: null,
            strokeWeight: 3, //线宽
        });

        //更新地图视野以适合区划面
        this.props.__map__.setFitView(districtExplorer.getAllFeaturePolygons());
    }

    render() {
        return null;
    }
}

export default connect((state, ownProps)=>{
    return {
        cityName: state.cityID.name,
        areaCode: state.areaCode
    }
})(UIMap);
