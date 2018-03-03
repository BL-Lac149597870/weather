export default (state='',action)=>{
    switch (action.type){
        case 'AREA_CODE': return action.payload;
        default: return state
    }
}