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
            payload:{
                ...showRequest
            }
        }
    },
    createPost : function(create){
        return {
            type: constants.CreatePostAction,
            payload: {
                ...create
            }
        }
    }

}
export default actions;
