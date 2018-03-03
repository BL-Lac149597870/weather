export default (state=[],action)=>{
    switch (action.type){
        case 'CITY_AQI_5_DAYS': return action.payload;
        default: return state
    }
}