let userURL = "https://reqres.in/api/login";

let username = document.getElementById("username")
let password = document.getElementById("password")

//let btn = document.getElementById("submit")
let accessToken = localStorage.getItem("accessToken") || null;

document.querySelector(".loginWindow").addEventListener("submit", (ev)=>{
    ev.preventDefault()
    console.log("click")
    userAuthentication()  
})

function userAuthentication(){

  let obj = {
      email: username.value,
      password:password.value 
  }
  
  fetch(userURL,{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
    },
    body:JSON.stringify(obj)
  })
  .then((data)=>{
    return data.json()
  })
  .then((data)=>{
    console.log(data)
    if(data.error != undefined){
       alert(data.error)
    }else{
        accessToken = data.token;
        localStorage.setItem("accessToken", accessToken)
        window.location.href = "dashboard.html"
        
    }
  })

}