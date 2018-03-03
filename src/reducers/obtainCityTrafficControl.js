export default (state={},action)=>{
    switch (action.type){
        case 'CITY_TRAFFIC_CONTROL': return action.payload;
        default: return state
    }
}