let navbar = document.querySelector('.header .navbar');
let menuBtn = document.querySelector('#menu-btn');

menuBtn.onclick = () =>{
   menuBtn.classList.toggle('fa-times');
   navbar.classList.toggle('active');
};

window.onscroll = () =>{
   menuBtn.classList.remove('fa-times');
   navbar.classList.remove('active');
};

var swiper = new Swiper(".home-slider", {
   grabCursor:true,
   loop:true,
   centeredSlides:true,
   navigation: {
     nextEl: ".swiper-button-next",
     prevEl: ".swiper-button-prev",
   },
});

var swiper = new Swiper(".food-slider", {
   grabCursor:true,
   loop:true,
   centeredSlides:true,
   spaceBetween: 20,
   pagination: {
      el: ".swiper-pagination",
      clickable: true,
   },
   breakpoints: {
      0: {
        slidesPerView: 1,
      },
      700: {
        slidesPerView: 2,
      },
      1000: {
        slidesPerView: 3,
      },
   },
});

let previewContainer = document.querySelector('.food-preview-container');
let previewBox = previewContainer.querySelectorAll('.food-preview');

document.querySelectorAll('.food .slide').forEach(food =>{
   food.onclick = () =>{
      previewContainer.style.display = 'flex';
      let name = food.getAttribute('data-name');
      previewBox.forEach(preveiw =>{
         let target = preveiw.getAttribute('data-target');
         if(name == target){
            preveiw.classList.add('active');
         }
      });
   };
});

previewContainer.querySelector('#close-preview').onclick = () =>{
   previewContainer.style.display = 'none';
   previewBox.forEach(close =>{
      close.classList.remove('active');
   });
};

var swiper = new Swiper(".menu-slider", {
   grabCursor:true,
   loop:true,
   autoHeight:true,
   centeredSlides:true,
   spaceBetween: 20,
   pagination: {
      el: ".swiper-pagination",
      clickable: true,
   },
});

var swiper = new Swiper(".blogs-slider", {
   grabCursor:true,
   loop:true,
   centeredSlides:true,
   autoHeight:true,
   spaceBetween: 20,
   pagination: {
      el: ".swiper-pagination",
      clickable: true,
   },
   breakpoints: {
      0: {
        slidesPerView: 1,
      },
      700: {
        slidesPerView: 2,
      },
      1000: {
        slidesPerView: 3,
      },
   },
});


async function postapi(){

   document.getElementById("message").innerHTML = "**Registration Successful.Please Login.";  

   let register = document.getElementById('register')

      register.addEventListener('submit', function(e){
      e.preventDefault()
      

      
      let CustomerName=document.getElementById('CustomerName').value
      let PhNumber=document.getElementById('PhNumber').value.toString()
      let email=document.getElementById('email1').value
      let CustomerID=email.substr(0, email.indexOf('@'))
      let password=document.getElementById('password1').value
      let CurrentRestaurant="Restaurant-1"

      fetch('https://6lryqkzhae.execute-api.us-east-1.amazonaws.com/Dev/usersignin', {
      method: 'POST',
      body: JSON.stringify({
         CustomerName:CustomerName,
         CustomerID:CustomerID,
         PhNumber:PhNumber,
         email:email,
         password:password,
         CurrentRestaurant:CurrentRestaurant
      }),
      headers: {
         'Content-type': 'application/json',
      }
      })
      .then(function(response){ 
      return response.json()})
      .then(function(data)
      {console.log(data)
      
      }).catch(error => console.error('Error:', error)); 
      });

}


async function login1() {

   

   let login=document.getElementById('login')


   login.addEventListener('submit', function(e){
      e.preventDefault()
   const username = document.getElementById("email").value;
   const password = document.getElementById("password").value;
   let us=username.substr(0, username.indexOf('@'));
   // document.cookie = us;
   document.cookie = "userid="+us;

   fetch('https://6lryqkzhae.execute-api.us-east-1.amazonaws.com/Dev/login', {
      method: 'POST',
      body: JSON.stringify({
         email:username,
         password:password
      }),
      headers: {
         'Content-type': 'application/json',
      }
      })
      .then(function(response){ 
      return response.json()})
      .then(function(data)
      {
         if (data.status == "success") 
         {
            window.location.href = "Restaurant-1/menu.html";
         }
      }).catch(error => console.error('Error:', error)); 
      });
      
   }

   function getCookie(cname)
   {
      let name = cname + "=";
      let ca = document.cookie.split(';');
      for(const element of ca) {
        let c = element;
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
   }

   async function modify() {
      document.getElementById("message").innerHTML = "**Changes Saved.Go to profile page to view changes.";  

     
      let modifyUser = document.getElementById('modifyuser')

      modifyUser.addEventListener('submit', function(e){
      e.preventDefault()
      

      
      let CustomerName=document.getElementById('CustomerName').value
      let PhNumber=document.getElementById('PhNumber').value.toString()
      let email=document.getElementById('email').value
      let CustomerID=getCookie("userid")
      let password=document.getElementById('password').value
      let CurrentRestaurant=document.getElementById('CurrentRestaurant').value

      fetch('https://6lryqkzhae.execute-api.us-east-1.amazonaws.com/Dev/usersignin', {
      method: 'PUT',
      body: JSON.stringify({
         CustomerName:CustomerName,
         CustomerID:CustomerID,
         PhNumber:PhNumber,
         email:email,
         password:password,
         CurrentRestaurant:CurrentRestaurant
      }),
      headers: {
         'Content-type': 'application/json',
      }
      })
      .then(function(response){ 
      return response.json()})
      .then(function(data)
      {console.log(data)
      
      }).catch(error => console.error('Error:', error)); 
      });


   }
   

   async function deleteUser() {

      
      
      let stringUrl= "https://6lryqkzhae.execute-api.us-east-1.amazonaws.com/Dev/usersignin/"+getCookie("userid");

    // console.log("======",stringUrl)

      fetch(stringUrl,
      {
      method: 'DELETE',
      headers: {
         'Content-type': 'application/json',
      }
      })
      .then(function(response){ 
      return response.json()})
      .then(function(data){
         console.log(data)
         window.location.href = "login.html";
      }).catch(error => console.error('Error:', error));
   }
   




   function logout() {
      document.cookie = "userid=;";
      window.location.href = "login.html";
    }
    
   


