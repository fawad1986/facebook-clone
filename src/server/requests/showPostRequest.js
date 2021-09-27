export default class ShowPost_req{
    constructor(){
    this.user_id='';
    this.content_value='';
    this.post_text= '';
    this.post_date= '';
    }
    getuser_id(){
        return this.user_id;
    }
    setUser_id(newid){
        return this.user_id = newid;
    }
    getContent_value(){
        return this.content_value;
    }
    setContent_value(newcontent){
        return this.content_value = newcontent;
    }
    getPost_text(){
        return this.post_text;
    }
    setPost_text(newtext){
        return this.post_text = newtext;
    }
    getPost_date(){
        return this.post_date;
    }
    setPost_date(newdate){
        return this.post_date = newdate;
    }

}