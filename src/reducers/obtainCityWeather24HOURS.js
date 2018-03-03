export default (state=[],action)=>{
    switch (action.type){
        case 'CITY_WEATHER_24_HOURS': return action.payload;
        default: return state
    }
}