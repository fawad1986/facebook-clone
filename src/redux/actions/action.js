import * as constants from '../actionConstants.js'

let actions = {
    //All  functions will return an Action with payload, which will later be dispatched to reducers 
    loginUser : function(loginResponse){
        return {
            type: constants.LoginAction,
            payload:{
                UserName:loginResponse.UserName,
                LoginStatus:'passed',
                Route: 'Main',
                id: loginResponse.id
              }
        }
    },
    showPost : function(showRequest){
        return {
            type: constants.ShowPostAction,
            payload:[
                ...showRequest
        ]
        }
    },
    userProfile : function(userProfileRequest){
        return {
            type: constants.UserProfileAction,
            payload:[
                ...userProfileRequest
        ]
        }
    }

}
export default actions;
