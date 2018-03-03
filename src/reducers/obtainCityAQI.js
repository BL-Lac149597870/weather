export default (state={},action)=>{
    switch (action.type){
        case 'CITY_AQI': return action.payload;
        default: return state
    }
}