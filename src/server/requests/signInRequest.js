export default class SignInReq{
    constructor(){
        this.email='';
        this.password=''
    }

    setEmail(newEmail){
        this.email = newEmail;
    }
    getEmail(){
        return this.email;
    }

    setPassword(newPassword){
        this.password = newPassword;
    }
    getPassword(){
        return this.password;
    }

}

