import * as types from './mutation-types'
const mutations={
    [types.ADD_START](state,value){
        state.start++
    },
    [types.DECREASE_START](state,value){
        if(start.start<=0){
            start.start=0
            return
        }
        state.start--
    }

}
export default mutations