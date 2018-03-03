export default (state={},action)=>{
    switch (action.type){
        case 'ICON': return action.payload;
        default: return state
    }
}