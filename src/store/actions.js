import * as types from './mutation-types'
export const addStart=({commit,state},{value})=>{
    commit(types.ADD_START,value)
}
export const decreaseStart=({commit,state},{value})=>{
    commit(types.DECREASE_START,value)
}