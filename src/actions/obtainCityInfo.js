import axios from 'axios';
import qs from 'qs';

/**
 * 查询城市ID
 * @param name
 * @returns {function(*)}
 */
export const obtainCityID = (name)=>{
    return dispatch =>{
        //根据城市名查询城市id
        return axios.post('http://www.qianhaogege.com/artwork/1/dbApi/demo.php',qs.stringify({area_name: name})).then(res=>{
            dispatch({
                type: 'CITY_ID',
                payload: res.data
            });
            return Promise.resolve(res.data)
        }).catch(error=>{
            console.log(error)
        })
    }
};
//            axios.post('/qh/artwork/1/dbApi/demo3.php',qs.stringify({area_name: '上'})).then(res=>{console.log(res)})
/**
 * 模糊查询城市
 * @param name
 * @returns {function(*)}
 */
export const obtainSimilarNames = (name)=>{
    return dispatch =>{
        if(!name){
            dispatch({
                type: 'CITY_SIMILAR_NAMES',
                payload: {}
            });
        }else{
            return axios.post('http://www.qianhaogege.com/artwork/1/dbApi/demo3.php',qs.stringify({area_name: name})).then(res=>{
                dispatch({
                    type: 'CITY_SIMILAR_NAMES',
                    payload: res.data
                });
                return Promise.resolve(res.data)
            }).catch(error=>{
                console.log(error)
            })
        }

    }
};
/**
 * 查询城市名
 * @param id
 * @returns {function(*)}
 */
export const obtainCityName = (id)=>{
    return dispatch =>{
        //根据城市名查询城市id
        return axios.post('http://www.qianhaogege.com/artwork/1/dbApi/demo2.php',qs.stringify({area_id: id})).then(res=>{
            dispatch({
                type: 'CITY_ID',
                payload: res.data
            });
            return Promise.resolve(res.data)
        }).catch(error=>{
            console.log(error)
        })
    }
};

/**
 * 查询天气实况
 * @param data
 * @returns {function(*)}
 */
export const obtainCityWeatherLive = (data)=>{
    return dispatch =>{
        //根据查询到的id查询天气
        return axios.post( `http://aliv18.data.moji.com/whapi/json/alicityweather/condition`,qs.stringify({cityId:data.id}),{headers: {"Authorization":"APPCODE 82cda60c63ce4e18a239ff405184c64f"}})
            .then((res)=>{
                axios.post('http://www.qianhaogege.com/artwork/1/dbApi/demo4.php',qs.stringify({conditionID:res.data.data.condition.conditionId})).then(res=>{
                    dispatch({
                        type: 'ICON',
                        payload: res.data
                    });
                });

                dispatch({
                    type: 'CITY_WEATHER_LIVE',
                    payload: res.data.data.condition
                });

                return Promise.resolve(res.data.data.condition)

            }).catch((error)=>{
            console.log(error)
        });
    }
};

/**
 * 查询限行数据
 * @param data
 * @returns {function(*)}
 */
export const obtainCityTrafficControl = (data)=>{
    return dispatch =>{
        //根据查询到的id查询天气
        return axios.post( `http://aliv18.data.moji.com/whapi/json/alicityweather/limit`,qs.stringify({cityId:data.id}),{headers: {"Authorization":"APPCODE 82cda60c63ce4e18a239ff405184c64f"}})
            .then((res)=>{

                dispatch({
                    type: 'CITY_TRAFFIC_CONTROL',
                    payload: res.data.data.limit || []
                });

                return Promise.resolve(res.data.data.limit)

            }).catch((error)=>{
                console.log(error)
            });
    }
};

/**
 * 查询空气质量指数
 * @param data
 * @returns {function(*)}
 */
export const obtainCityAQI = (data)=>{
    return dispatch =>{
        //根据查询到的id查询天气
        return axios.post( `http://aliv18.data.moji.com/whapi/json/alicityweather/aqi`,qs.stringify({cityId:data.id}),{headers: {"Authorization":"APPCODE 82cda60c63ce4e18a239ff405184c64f"}})
            .then((res)=>{

                dispatch({
                    type: 'CITY_AQI',
                    payload: res.data.data.aqi
                });

                return Promise.resolve(res.data.data.aqi)

            }).catch((error)=>{
                console.log(error)
            });
    }
};

/**
 * 查询24小时天气
 * @param data
 * @returns {function(*)}
 */
export const obtainCityWeather24HOURS = (data)=>{
    return dispatch =>{
        //根据查询到的id查询天气
        return axios.post( `http://aliv18.data.moji.com/whapi/json/alicityweather/forecast24hours`,qs.stringify({cityId:data.id}),{headers: {"Authorization":"APPCODE 82cda60c63ce4e18a239ff405184c64f"}})
            .then((res)=>{

                dispatch({
                    type: 'CITY_WEATHER_24_HOURS',
                    payload: res.data.data.hourly
                });

                return Promise.resolve(res.data.data.hourly)

            }).catch((error)=>{
                console.log(error)
            });
    }
};

/**
 * 查询aqi 5天
 * @param data
 * @returns {function(*)}
 */
export const obtainCityAQI5Days = (data)=>{
    return dispatch =>{
        //根据查询到的id查询天气
        return axios.post( `http://aliv18.data.moji.com/whapi/json/alicityweather/aqiforecast5days`,qs.stringify({cityId:data.id}),{headers: {"Authorization":"APPCODE 82cda60c63ce4e18a239ff405184c64f"}})
            .then((res)=>{

                dispatch({
                    type: 'CITY_AQI_5_DAYS',
                    payload: res.data.data.aqiForecast
                });

                return Promise.resolve(res.data.data.aqiForecast)

            }).catch((error)=>{
                console.log(error)
            });
    }
};

/**
 * 查询天气 15天
 * @param data
 * @returns {function(*)}
 */
export const obtainCityWeather15Days = (data)=>{
    return dispatch =>{
        //根据查询到的id查询天气
        return axios.post( `http://aliv18.data.moji.com/whapi/json/alicityweather/forecast15days`,qs.stringify({cityId:data.id}),{headers: {"Authorization":"APPCODE 82cda60c63ce4e18a239ff405184c64f"}})
            .then((res)=>{

                dispatch({
                    type: 'CITY_WEATHER_15_DAYS',
                    payload: res.data.data.forecast
                });

                return Promise.resolve(res.data.data.forecast)

            }).catch((error)=>{
                console.log(error)
            });
    }
};

/**
 * 查询生活指数
 * @param data
 * @returns {function(*)}
 */
export const obtainCityLifeIndex = (data)=>{
    return dispatch =>{
        //根据查询到的id查询天气
        return axios.post( `http://aliv18.data.moji.com/whapi/json/alicityweather/index`,qs.stringify({cityId:data.id}),{headers: {"Authorization":"APPCODE 82cda60c63ce4e18a239ff405184c64f"}})
            .then((res)=>{
                dispatch({
                    type: 'CITY_LIFE_INDEX',
                    payload: res.data.data.liveIndex
                });


                return Promise.resolve(res.data.data.liveIndex)

            }).catch((error)=>{
                console.log(error)
            });
    }
};

/**
 * 查询天气预警
 * @param data
 * @returns {function(*)}
 */
export const obtainCityWeatherAlert = (data)=>{
    return dispatch =>{
        //根据查询到的id查询天气
        return axios.post( `http://aliv18.data.moji.com/whapi/json/alicityweather/alert`,qs.stringify({cityId:data.id}),{headers: {"Authorization":"APPCODE 82cda60c63ce4e18a239ff405184c64f"}})
            .then((res)=>{

                dispatch({
                    type: 'CITY_WEATHER_ALERT',
                    payload: res.data.data.alert||[]
                });

                return Promise.resolve(res.data.data.alert)

            }).catch((error)=>{
                console.log(error)
            });
    }
};

/**
 * 提交areacode
 * @param data
 * @returns {function(*)}
 */
export const obtainAreacode = (data)=>{
    return dispatch =>{
        dispatch({
            type: 'AREA_CODE',
            payload: data
        });

        return Promise.resolve(data)
    }
};