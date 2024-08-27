//BOOK CLASS :REPRESENTS A SIGNUP
class Signup{
    constructor(firstName,lastName,Phone,Email,password,confirmpassword,pin){
    this.firstName=firstName;
    this.lastName=lastName;
    this.Phone=Phone;
    this.Email=Email;
    this.password=password;
    this.confirmpassword=confirmpassword;
    this.pin=pin;
} 
}




//UI CLASS: HANDLE UI TASK
class UI{
    static displaySignups(){
        /*const StoredSignups=[
            {  
                firstName:'valentine',
                lastName:'abiamuew',
                Phone:'081333342648',
                Email:'mistrevaldaboss@gamil.com',
                password:'1234',
                confirmpassword:'1234',
                pin:'1900'
            },
            {
                firstName:'bobo',
                lastName:'abiamuew',
                Phone:'081333342648',
                Email:'mistrevaldaboss@gamil.com',
                password:'1234',
                confirmpassword:'1234',
                pin:'1900' 
            }
        ]*/ 

        const signups = Store.getSignups();
        signups.forEach((signup)=>UI.addSignupToList(signup));
    }

   static addSignupToList(signup){
   const list =document.querySelector('#form-list');
    
   const row = document.createElement('tr');

   /*row.innerHTML=`
   <td>${signup.firstName}</td>
   <td>${signup.lastName}</td>
   <td>${signup.Phone}</td>
   <td>${signup.Email}</td>
   <td>${signup.password}</td>
   <td>${signup.confirmpassword}</td>
   <td>${signup.pin}</td>
   <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>

   `;*/
   list.appendChild(row);

   }

  static deleteSignup(el){
    if(el.classList.contains('delete')){
        el.parentElement.parentElement.remove();
    }

  }

   static showAlert(message,className){
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#bookform');
    container.insertBefore(div, form);
   //set timeout to 3secs
    setTimeout(()=>document.querySelector('.alert').remove(),3000);

   }
    






    static clearFields(){
    document.querySelector('#firstName').value='';
    document.querySelector('#lastName').value='';
    document.querySelector('#Phone').value='';
    document.querySelector('#Email').value='';
    document.querySelector('#password').value='';
    document.querySelector('#confrimpassword').value='';
    document.querySelector('#pin').value='';
  }

}



//STORE CLASS:HANDLR THE STORAGE
  class Store{
   static getSignups() {
     let signups;
     if(localStorage.getItem('signups')===null){
      signups = [];
     }else{
        signups = JSON.parse(localStorage.getItem('signups'));
     }
     return signups;
   }    

  static addSignup(signup){
   const signups = Store.getSignups();
   signups.push(signup);
   localStorage.setItem('signups', JSON.stringify(signups));
 }


  static removeSignup(Phone){
     const signups = Store.getSignups();

     signups.forEach((signup, index)=>{
        if(signup.Phone===Phone){
        signups.splice(index, 1);

        }
     });

     localStorage.setItem ('signups',JSON.stringify(signups));
  }

  }










//EVENT :DISPLAY SIGNUP
document.addEventListener('DOMContentLoaded',UI.displaySignups);



//EVENT : ADD a SIGNUP
document.querySelector('#book-form').addEventListener('submit',(e)=>{
   //prevent submit

   e.preventDefault();


    //get form value
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const phone = document.querySelector('#Phone').value;
    const Email= document.querySelector('#Email').value;
    const password = document.querySelector('#password').value;
    const confrimpassword = document.querySelector('#confrimpassword').value;
    const pin = document.querySelector('#pin').value;


    //validate
    if(firstName===''|| lastName===''|| phone===''|| Email===''|| password===''|| confrimpassword===''||  password==='' ){
       UI.showAlert('please fill in all fields', 'danger');
        }else{
            //instatiate signup
        const signup=new Signup(firstName,lastName,phone,Email,password,confrimpassword,pin)

        //add signup to UI 
        UI.addSignupToList(signup);

        //add signup to store
        Store.addSignup(signup);

        //show success message
        UI.showAlert('Success','success')

        //clear fields
        UI.clearFields();


    }

});


//EVENT : REMOVE SIGNUP  
document.querySelector('#form-list').addEventListener('click',(e)=>{
UI.deleteSignup(e.target)

  //REMOVE  BOOK  FROM STORE
  Store.removeSignup(e.target.parentElement.previousElementSibling.textContent);

         //show success message
         UI.showAlert('Signup removed','success')


})