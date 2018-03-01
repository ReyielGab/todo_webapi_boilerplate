import axios from 'axios'

var boilerAxios = axios.create({
    baseURL: 'http://localhost:2940/'
});

const USER_LIST_REQUEST = 'USER_LIST_REQUEST';
const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS';
const USER_LIST_ERROR = 'USER_LIST_ERROR';

// ** Foreign action
const ADD_NEW_USER_SUCCESS = 'ADD_NEW_USER_SUCCESS';
const EDIT_SELECTED_USER_SUCCESS = 'EDIT_SELECTED_USER_SUCCESS';


export default (state = {
    usersList: [],
    userListRequestPending : false

}, action) => {
    switch (action.type) {
        

        case USER_LIST_REQUEST :
            return state = {
                ...state,
                userListRequestPending : true
            };

        case USER_LIST_SUCCESS : 
            return state = {
                ...state,
                usersList : action.payload,
                userListRequestPending : false
            };

        case USER_LIST_ERROR :
            return state = {
                ...state
            };

        case ADD_NEW_USER_SUCCESS :
            return state = {
                ...state,
                usersList : [...state.usersList, action.payload]
            }

        case EDIT_SELECTED_USER_SUCCESS :
            return state = {
                ...state,
                usersList: state.usersList.map(selectedUser => {
                    if(selectedUser.id == action.payload.id){
                        return action.payload;
                    }else {
                        return selectedUser;
                    }
                })
            }

        default : return state;
    }
};

const getUserListRequest = () => ({
    type : USER_LIST_REQUEST
})

const getUserListSuccess = (listOfUser) => ({
    type : USER_LIST_SUCCESS,
    payload : listOfUser
}) 

const getUserListError = () => ({
    type : USER_LIST_ERROR
})


export function getListOfUsers() {
    return (dispatch) => {
        dispatch(getUserListRequest());

        boilerAxios.get('/api/Users/GetAllUsers')
            .then(response => {
                dispatch(getUserListSuccess(response.data))
            })
            .catch(error => {

            })

    }
}