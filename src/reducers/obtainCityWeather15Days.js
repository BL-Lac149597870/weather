export default (state=[],action)=>{
    switch (action.type){
        case 'CITY_WEATHER_15_DAYS': return action.payload;
        default: return state
    }
}