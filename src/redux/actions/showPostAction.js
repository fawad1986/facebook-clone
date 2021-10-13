import * as constants from '../actionConstants.js'


let showPost =(showRequest) =>{
    return {
        type: constants.ShowPostAction,
        payload:{
            user_id: showRequest.user_id,
            content_value: showRequest.content_value,
            post_text:showRequest.post_text,
            post_date: showRequest.post_date
        }
    }
}
export default showPost