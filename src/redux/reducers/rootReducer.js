import * as constants from '../actionConstants.js'



const initialState ={
  App: {"LoginStatus":'','UserName':'','Route':'/',"id":''},
  ShowPosts:[{
    "user_id": "",
    "content_value": "",
    "post_text":"",
    "post_date": ""
}],
UserProfile:[{
  "profile_pic": "",
  "gender": "",
  "first_name":"",
  "date_of_birth": ""
}]
}

let rootReducer = (state = initialState , action) => {
    switch (action.type) {
    case constants.LoginAction:
        return {...state,App:{...action.payload}}
    case constants.ShowPostAction:
      return {...state,ShowPosts:[...action.payload]}
      case constants.UserProfileAction:
        return {...state,UserProfile:[...action.payload]}
    default:
        return state;
    }
  }
  export default rootReducer;

