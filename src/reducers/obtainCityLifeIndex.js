export default (state={},action)=>{
    switch (action.type){
        case 'CITY_LIFE_INDEX': return action.payload;
        default: return state
    }
}