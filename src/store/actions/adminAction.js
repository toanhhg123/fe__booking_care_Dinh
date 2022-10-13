import { getAllCodeService } from "../../services/userService";
import actionTypes from "./actionTypes";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try{
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER");
            if(res && res.errCode === 0){
                console.log('check res: ', res)
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed());
            }
        }catch(e){
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart erorr', e)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try{
            let res = await getAllCodeService("POSITION");
            if(res && res.errCode === 0){
                console.log('check res: ', res)
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed());
            }
        }catch(e){
            dispatch(fetchPositionFailed());
            console.log('fetchPositionStart erorr', e)
        }
    }
}

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try{
            let res = await getAllCodeService("ROLE");
            if(res && res.errCode === 0){
                console.log('check res: ', res)
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed());
            }
        }catch(e){
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart erorr', e)
        }
    }
}