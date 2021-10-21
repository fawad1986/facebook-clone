/*
This class will be responsible for providing methods which will be used to send requests to the API
and give the desired result to Redux
The name Dispatcher is not to be confused with Redux Dispatcher
*/
import sendRequest from './requestFactory.js'
import genericResponse from '../server/responses/genericResponse';
import genericError from '../server/responses/errors/genericError';

const validateFromApi = async (url = '', data = {}, reqMethod) =>{
    return await sendRequest(url,data,reqMethod);
  }

export async function sendLoginRequest(LoginRequestObject){

   let response =  await (await validateFromApi(`http://localhost:5000/usersignin`,LoginRequestObject,'POST')).json();
            console.log("--Recieved data from API");
             console.log(response);
             let error;
             // eslint-disable-next-line default-case
             switch(response.status){
                 case '503':
                    error = new genericError();
                    error.setStatus(response.status);
                    error.setError(response.error);
                    return error;
                case '404':
                    error = new genericError();
                    error.setStatus(response.status);
                    error.setError(response.error);
                    return error;
                case '200':
                    let resp = new genericResponse();
                    resp.setStatus(response.status);
                    resp.setData(response.data[0]);
                    return resp;
             }
             
}

export function sendSignUpRequest(signUpRequest){

    validateFromApi('http://localhost:5001/newuser',signUpRequest,'POST').then(response => response.json()).then(response => {
        console.log("--Recieved data from API");
         console.log(response);
         let error;
         // eslint-disable-next-line default-case
         switch(response.status){
             case '503':
                    //log the error
                    error = new genericError();
                    error.setStatus(response.status);
                    error.setError(response.error);
                 throw error;
            case '404':
                 error = new genericError();
                    error.setStatus(response.status);
                    error.setError(response.error);
                throw error;
            case '200':
                let resp = new genericResponse();
                resp.setStatus(response.status);
                resp.setData(response.data);
             break;
         }
    }).catch(error => console.log(error));

}

export async function sendShowPostRequest(showPostRequest){

    let response = await (await validateFromApi(`http://localhost:5004/showposts`,showPostRequest,'POST')).json();
            console.log(response);
            let error;
            switch(response.status){
                case '200':
                let res = new genericResponse();
                res.setStatus(response.status);
                res.setData(response.data);
                return res;
                error = new genericError();
                error.setStatus(response.status);
                error.setError(response.error);
                return error;
                
                case'404':
                error = new genericError();
                error.setStatus(response.error);
                error.setError(response.error);
                return error;
            }

        
}

export async function sendCreatePostRequest(createPostRequest){

    let response = await(await validateFromApi(`http://localhost:5005/CreateTimelineData`,createPostRequest,'POST')).json();
            console.log(response);
            let error;
            switch(response.status) {
                case '200':
                let res = new genericResponse();
                res.setStatus(response.status);
                res.setData(response.data);
                return res
                case'503' :
                error = new genericError();
                error.setStatus(response.status);
                error.setError(response.error);
                return error;
            
                case '404' :
                error = new genericError();
                error.setStatus(response.error);
                error.setError(response.error);
                return error;
            }

        
}

export async function sendUserProfileRequest(profileRequestObject){

    let response =  await (await validateFromApi(`http://localhost:5006/userProfile`,profileRequestObject,'POST')).json();
             console.log("--Recieved data from API");
              console.log(response);
              let error;
              // eslint-disable-next-line default-case
              switch(response.status){
                  case '503':
                     error = new genericError();
                     error.setStatus(response.status);
                     error.setError(response.error);
                     return error;
                 case '404':
                     error = new genericError();
                     error.setStatus(response.status);
                     error.setError(response.error);
                     return error;
                 case '200':
                     let resp = new genericResponse();
                     resp.setStatus(response.status);
                     resp.setData(response.data);
                     return resp;
              }
              
 }
 export async function seachFriendRequest(searchRequestObject){

    let response =  await (await validateFromApi(`http://localhost:5007/searchFriend`,searchRequestObject,'POST')).json();
             console.log("--Recieved data from API");
              console.log(response);
              let error;
              // eslint-disable-next-line default-case
              switch(response.status){
                  case '503':
                     error = new genericError();
                     error.setStatus(response.status);
                     error.setError(response.error);
                     return error;
                 case '404':
                     error = new genericError();
                     error.setStatus(response.status);
                     error.setError(response.error);
                     return error;
                 case '200':
                     let resp = new genericResponse();
                     resp.setStatus(response.status);
                     resp.setData(response.data);
                     return resp;
              }
              
 }

 export async function addFriendRequest(idReq){

    let response =  await (await validateFromApi(`http://localhost:5008/addFriend`,idReq,'POST')).json();
             console.log("--Recieved data from API");
              console.log(response);
              let error;
              // eslint-disable-next-line default-case
              switch(response.status){
                  case '503':
                     error = new genericError();
                     error.setStatus(response.status);
                     error.setError(response.error);
                     return error;
                 case '404':
                     error = new genericError();
                     error.setStatus(response.status);
                     error.setError(response.error);
                     return error;
                 case '200':
                     let resp = new genericResponse();
                     resp.setStatus(response.status);
                     resp.setData(response.data);
                     return resp;
              }
              
 }