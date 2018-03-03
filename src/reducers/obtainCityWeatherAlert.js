export default (state=[],action)=>{
    switch (action.type){
        case 'CITY_WEATHER_ALERT': return action.payload;
        default: return state
    }
}