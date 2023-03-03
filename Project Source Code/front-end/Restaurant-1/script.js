let navbar = document.querySelector('.header .navbar');
let menuBtn = document.querySelector('#menu-btn');
let CustomerName;
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
      previewBox.forEach(preview =>{
         let target = preview.getAttribute('data-target');
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
      

      
      CustomerName=document.getElementById('CustomerName').value
      let PhNumber=document.getElementById('PhNumber').value.toString()
      let email=document.getElementById('email1').value
      let CustomerID=email.substr(0, email.indexOf('@'))
      let password=document.getElementById('password1').value
      let confirmpassword = document.getElementById('confirmpassword').value
      let CurrentRestaurant="Restaurant-1"

      fetch('https://6lryqkzhae.execute-api.us-east-1.amazonaws.com/Dev/usersignin', {
      method: 'POST',
      body: JSON.stringify({
         CustomerName:CustomerName,
         CustomerID:CustomerID,
         PhNumber:PhNumber,
         email:email,
         password:password,
         ConfirmPassword:confirmpassword,
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
         // if(data.body=="Error")
          
         document.getElementById("message").innerHTML = data.body;  

      
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
    
   //function for dropdown
   function goToSection() {
  var selectedValue = document.getElementById("cuisine-dropdown").value;
  if (selectedValue !== "") {
    window.location = selectedValue;
  }
}

//script for the cart 
// if (document.readyState == 'loading') {
//    document.addEventListener('DOMContentLoaded', ready)
// } else {
//    ready()
// }

// function ready() {
//    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
//    for (var i = 0; i < removeCartItemButtons.length; i++) {
//        var button = removeCartItemButtons[i]
//        button.addEventListener('click', removeCartItem)
//    }

//    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
//    for (var i = 0; i < quantityInputs.length; i++) {
//        var input = quantityInputs[i]
//        input.addEventListener('change', quantityChanged)
//    }

//    var addToCartButtons = document.getElementsByClassName('shop-item-button')
//    for (var i = 0; i < addToCartButtons.length; i++) {
//        var button = addToCartButtons[i]
//        button.addEventListener('click', addToCartClicked)
//    }

//    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
// }

// function purchaseClicked() {
//    alert('Thank you for your purchase')
//    var cartItems = document.getElementsByClassName('cart-items')[0]
//    while (cartItems.hasChildNodes()) {
//        cartItems.removeChild(cartItems.firstChild)
//    }
//    updateCartTotal()
// }

// function removeCartItem(event) {
//    var buttonClicked = event.target
//    buttonClicked.parentElement.parentElement.remove()
//    updateCartTotal()
// }

// function quantityChanged(event) {
//    var input = event.target
//    if (isNaN(input.value) || input.value <= 0) {
//        input.value = 1
//    }
//    updateCartTotal()
// }

// function addToCartClicked(event) {
//    var button = event.target
//    var shopItem = button.parentElement.parentElement
//    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
//    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
//    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
//    addItemToCart(title, price, imageSrc)
//    updateCartTotal()
// }

// function addItemToCart(title, price, imageSrc) {
//    var cartRow = document.createElement('div')
//    cartRow.classList.add('cart-row')
//    var cartItems = document.getElementsByClassName('cart-items')[0]
//    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
//    for (var i = 0; i < cartItemNames.length; i++) {
//        if (cartItemNames[i].innerText == title) {
//            alert('This item is already added to the cart')
//            return
//        }
//    }
//    var cartRowContents = `
//        <div class="cart-item cart-column">
//            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
//            <span class="cart-item-title">${title}</span>
//        </div>
//        <span class="cart-price cart-column">${price}</span>
//        <div class="cart-quantity cart-column">
//            <input class="cart-quantity-input" type="number" value="1">
//            <button class="btn btn-danger" type="button">REMOVE</button>
//        </div>`
//    cartRow.innerHTML = cartRowContents
//    cartItems.append(cartRow)
//    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
//    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
// }

// function updateCartTotal() {
//    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
//    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
//    var total = 0
//    for (var i = 0; i < cartRows.length; i++) {
//        var cartRow = cartRows[i]
//        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
//        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
//        var price = parseFloat(priceElement.innerText.replace('$', ''))
//        var quantity = quantityElement.value
//        total = total + (price * quantity)
//    }
//    total = Math.round(total * 100) / 100
//    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
// }


function addOrder1 () {
   console.log("hbsdchvsdljv")
   // function(e){
   //    e.preventDefault()
   // console.log("printing price") //printing price
   // // window.location= Restaurant-1/order.html;
    

   let CustomerName=getCookie("userid")//document.getElementById('CustomerName').value //from cookie
   let OrderStatus="Added"
   let Unit="$"
   let RestaurantName="Restaurant-1"
   const FoodName = document.getElementById('shop-item-title').textContent;
   let Cuisine=document.getElementById('cuisine-dropdown').value;
   const Price = document.getElementById('shop-item-price').textContent;   // let Price1= Price.replace($,'')
   const randomNumber = Math.floor(Math.random() * 1000) + 1;
   // console.log (FoodName,Cuisine.substring(1),Price);

    fetch('https://6lryqkzhae.execute-api.us-east-1.amazonaws.com/test/addtocart', {
      method: 'POST',
      body: JSON.stringify({
         CustomerName:CustomerName,
         RestaurantName:RestaurantName,
         OrderStatus:OrderStatus,
         Unit:Unit,
         FoodName:FoodName,
         Cuisine:Cuisine.substring(1),
         Price:Price,
         OrderNumber:randomNumber

         
      }),
      headers: {
         'Content-type': 'application/json',
      }
      })
      .then(function(response){ 
         return response.json()})
         .then(function(data){
            console.log(data)
         }).catch(error => console.error('Error:', error));
}

async function addOrder()
{ 
   

   const addButton = document.getElementById("cart");  
   console.log("function call ")
   addButton.addEventListener('click', addOrder1);
      
   }
