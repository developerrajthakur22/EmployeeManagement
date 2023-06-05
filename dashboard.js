let token = document.getElementById("token")
let empClass= document.querySelector(".employees")

let lstoken = localStorage.getItem("accessToken")
token.textContent = lstoken

let empURL = "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees"

var res = []
//fetching the data using pagination
function employees(page){
  
   fetch(`${empURL}?page=${page}&limit=10`)
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      //console.log(data.data)
       
      filter(data.data)
    })
 }
  
  //show Data function  
  function showdata(data){
    
    empClass.innerHTML = "";
    data.forEach(element => {
    
      let div = document.createElement("div")
      
      let img = document.createElement("img")
      img.src = element.image;
      img.alt = "Image not found"
      
      let name = document.createElement("h3")
      name.textContent = element.name;
      name.style.color = "#ED0331"
      
      let dept = document.createElement('p')
      dept.textContent = "Department: "+element.department;

      let gender = document.createElement("p")
      gender.textContent = "Gender: " + element.gender;
      
      let salary = document.createElement("p")
      salary.textContent = "Salary: Rs" + element.salary;
      
      div.append(img,name,dept,gender,salary)
      
      empClass.append(div)
    });
  }
  
  //pagination button creation
  employees(1)
  for(let i = 1; i <= 10; i++){
    let btn = document.createElement("button")
    btn.innerText = i;
    
    btn.addEventListener("click", ()=>{
      empClass.innerHTML = "";
      employees(i)
  })
  document.querySelector(".pagebtn").append(btn)
}

//filtering by department
let dept = document.getElementById("dept")
function filter(data){   

  dept.addEventListener("change", ()=>{
    
    let filtered = data.filter((element)=>{
      if(dept.value==element.department){
        return element
      }
    })
    if(dept.value ==""){
      showdata(data)
    }else{
      showdata(filtered)
    } 
  })
  showdata(data)
  
  //sorting by salary
  let high = document.getElementById("high")
  let low = document.getElementById("low")
  
  high.addEventListener("click", ()=>{
    
    data.sort(function(a,b){return b.salary - a.salary})
    console.log(data)
    showdata(data)
    
  })
  
  low.addEventListener("click", ()=>{
    
    data.sort(function(a,b){return a.salary - b.salary})
    console.log(data)
    showdata(data)
    
  })
  
}
console.log(res)