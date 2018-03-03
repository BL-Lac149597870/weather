export default (state={},action)=>{
    switch (action.type){
        case 'CITY_WEATHER_LIVE': return action.payload;
        default: return state
    }
}