export default class SignUpReq{
    constructor(){
        this.first_name = '';
        this.last_name = '';
        this.Email = '';
        this.Password = '';
        this.birthDay = '';
        this.birthMonth ='';
        this.birthYear = '';
        this.date_of_birth = '';
        this.gender = '';
    }
    getFirstName(){
        return this.first_name;
    }
    setFirstName(newFirstName){
        this.first_name = newFirstName;
    }
    getLastName(){
        return this.last_name;
    }
    setLastName(newLastName){
        this.last_name = newLastName;
    }
    getEmail(){
        return this.Email;
    }
    setEmail(newEmail){
        this.Email = newEmail;
    }
    getPassword(){
        return this.Password;
    }
    setPassword(newPassword){
        this.Password = newPassword;
    }
    getBirthDay(){
        return this.birthDay;
    }
    setBirthDay(newBirthDay){
        this.birthDay = newBirthDay;
    }
    getBirthMonth(){
        return this.birthMonth;
    }
    setBirthMonth(newBirthMonth){
        this.birthMonth = newBirthMonth;
    }
    getBirthYear(){
        return this.birthYear;
    }
    setBirthYear(newBirthYear){
        this.birthYear = newBirthYear;
    }
    getDate_of_birth(){
        return this.date_of_birth;
    }
    setDate_of_birth(newBirthYear){
        this.date_of_birth = newBirthYear;
    }
    getGender(){
        return this.gender;
    }
    setGender(newGender){
        this.gender = newGender;
    }
}