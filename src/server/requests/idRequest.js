import { FaTheRedYeti } from "react-icons/fa";

export default class IdReq{
    constructor(){
        this.currentUserId='';
        this.addFriendId = '';
        
    }
    setCurrentUserId(newId){
        this.id = newId;
    }
    getCurrentUserId(){
        return this.currentUserId;
    }
    setAddFriendId(newFriend){
        this.addFriendId = newFriend;
    }
    getAddFriendId(){
        return this.addFriendId;
    }

}