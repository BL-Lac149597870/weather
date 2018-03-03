export default (state={},action)=>{
    switch (action.type){
        case 'CITY_ID': return action.payload;
        default: return state
    }
}