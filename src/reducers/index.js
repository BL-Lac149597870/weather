import {combineReducers} from 'redux';
import cityAQI from './obtainCityAQI';
import cityWeatherLive from './obtainCityWeatherLive';
import cityAQI5Days from './obtainCityAQI5Days';
import cityID from './obtainCityID';
import cityLifeIndex from './obtainCityLifeIndex';
import cityTrafficControl from './obtainCityTrafficControl';
import cityWeather15Days from './obtainCityWeather15Days';
import cityWeather24HOURS from './obtainCityWeather24HOURS';
import cityWeatherAlert from './obtainCityWeatherAlert';
import citySimilarNames from './obtainCitySimilarNames';
import cityIcon from './obtainIcon';
import areaCode from './obtainAreaCode';
export default combineReducers({
    areaCode,
    cityIcon,
    citySimilarNames,
    cityWeatherLive,
    cityAQI,
    cityAQI5Days,
    cityID,
    cityLifeIndex,
    cityTrafficControl,
    cityWeather15Days,
    cityWeather24HOURS,
    cityWeatherAlert
})