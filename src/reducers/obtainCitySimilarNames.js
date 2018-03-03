export default (state=[],action)=>{
    switch (action.type){
        case 'CITY_SIMILAR_NAMES': return action.payload;
        default: return state
    }
}