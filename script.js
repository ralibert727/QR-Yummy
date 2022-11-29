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
      //condition -- if invalid -->dont do anything make a pop .. otherwise go to homepage
      
   }


