export default class creatPostRequest{
    constructor(){
        this.email='';
        this.post_text='';
        this.content_value='';
    }

    setEmail(newEmail){
        this.email = newEmail;
    }
    getEmail(){
        return this.email;
    }

    setPostText(newPostText){
        this.post_text = newPostText;
    }
    getPostText(){
        return this.post_text;
    }
    setContentValue(newContentValue){
        this.content_value = newContentValue;
    }
    getContentValue(){
        return this.content_value;
    }

}