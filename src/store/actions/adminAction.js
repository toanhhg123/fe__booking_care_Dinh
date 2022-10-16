import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService } from "../../services/userService";
import actionTypes from "./actionTypes";
import { toast } from "react-toastify";

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
                // console.log('check res: ', res)
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
                // console.log('check res: ', res)
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

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try{
            let res = await createNewUserService(data);
            if(res && res.errCode === 0){
                toast.success('Create a new user succeed!')
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(saveUserFailed());
            }
        }catch(e){
            dispatch(saveUserFailed());
            console.log('saveUserFailed erorr', e)
        }
    }
}

export const createFailed = () => {
    return async (dispatch, getState) => {
        try{
            let res = await getAllCodeService("ROLE");
            if(res && res.errCode === 0){
                // console.log('check res: ', res)
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

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try{
            let res = await getAllUsers('ALL');
            if(res && res.errCode === 0){
                
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                toast.error('Fetch all users erorr!');
                dispatch(fetchAllUserFailed());
            }
        }catch(e){
            toast.error('Fetch all users erorr!');

            dispatch(fetchAllUserFailed());
            console.log('fetchAllUserFailed erorr', e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed= () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try{
            let res = await deleteUserService(userId);
            if(res && res.errCode === 0){
                toast.success("Delete the user succeed!");
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error('Delete the users erorr!');
                dispatch(deleteUserFailed());
            }
        }catch(e){
            toast.error('Delete the users erorr!');

            dispatch(deleteUserFailed());
            console.log('fetchAllUserFailed erorr', e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed= () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try{
            let res = await editUserService(data);
            console.log('check data edit: ',data);
            if(res && res.errCode === 0){
                toast.success("Update the user succeed!");
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error('Update the users erorr!');
                dispatch(editUserFailed());
            }
        }catch(e){
            toast.error('Update the users erorr!');

            dispatch(editUserFailed());
            console.log('editUserFailed erorr', e);
        }
    }
}

