import client from '../../../api.js';

import Notifications from 'react-notification-system-redux';

const notificationOpts = {
    title: '',
    message: '',
    position: 'tc',
    autoDismiss: 6
};


const ADD_NEW_USER_REQUEST = 'ADD_NEW_USER_REQUEST';
const ADD_NEW_USER_SUCCESS = 'ADD_NEW_USER_SUCCESS';
const ADD_NEW_USER_ERROR = 'ADD_NEW_USER_ERROR';  


export default (state = {
    userList: []
}, action) => {
    switch(action.type){
  
    case ADD_NEW_USER_REQUEST :
        return state = {
            ...state,
        }

    case ADD_NEW_USER_SUCCESS : 
        return state = {
            ...state
        }

    case ADD_NEW_USER_ERROR :
        return state = {
            ...state
        }

    }
    return state;
};

const newUserRequest = () => ({
    type : ADD_NEW_USER_REQUEST
})

const newUserSuccess = (newUser) => ({
    type : ADD_NEW_USER_SUCCESS,
    payload : newUser
})

const newUserError = () => ({
    type : ADD_NEW_USER_ERROR
})

export const newUser = (userDto, closeDialog) => (dispatch) => {

    client
        .post('api/Users/NewUser', userDto)
        .then(response => {
            dispatch(Notifications.success({
                ...notificationOpts,
                title: 'SUCCESS',
                message: 'Sucessfully added a user'
            }))

            dispatch(newUserSuccess(response.data))
            // closeDialog();
    
        })
        .catch(error => {

        })

}