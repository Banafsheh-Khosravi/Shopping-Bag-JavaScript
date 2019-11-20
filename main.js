//----------------------------Add To bag----------------------------
const addTobag = document.querySelectorAll(".add-to-bag-button");
for (i = 0; i < addTobag.length; i++) {
  var button = addTobag[i];
  button.addEventListener("click", addTobagClicked);
}

function addTobagClicked(event) {
  var button = event.target; // The target property returns the element that triggered the event.
  var item = button.parentElement.parentElement; //The parentElement property returns the parent element of the specified element
  var title = item.querySelectorAll(".item-title")[0].innerText;
  var price = item.querySelectorAll(".item-price")[0].innerText;
  var image = item.querySelectorAll(".item-image")[0].src;
  addItemToBag(title, price, image); //***
  updateTotal();
}
//-------------------------Add Row----------------------------------------
function addItemToBag(title, price, image) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.querySelectorAll(".cart-items")[0]; //add to cartItems in html
  var cartItemNames = cartItems.querySelectorAll(".cart-item-title");
  for (i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the shopping bag");
      return; // stops executing below and returns to ***
    }
  }
  var cartRowContents = `
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${image}" width="100" height="100">
                <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="quantity-input" type="number" value="1">
                <li class="fa fa-trash"  style="font-size:36px;color:red"></li>
            </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .querySelectorAll(".fa-trash")[0]
    .addEventListener("click", removeItem);
  cartRow
    .querySelectorAll(".quantity-input")[0]
    .addEventListener("change", quantityChange);
}

//--------------------------Quantity Input---------------------------------
const quantityInput = document.querySelectorAll(".quantity-input");
for (i = 0; i < quantityInput.length; i++) {
  var input = quantityInput[i];
  input.addEventListener("change", quantityChange);
}

function quantityChange(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

//-------------------------Remove Button--------------------------------
const removeCartBtn = document.querySelectorAll(".fa-trash");
for (i = 0; i < removeCartBtn.length; i++) {
  var btn = removeCartBtn[i]; // which element in the loop we are in
  btn.addEventListener("click", removeItem);
}
// eventlistener always returns an even object inside the function that it calls
function removeItem(event) {
  var btnClicked = event.target;
  btnClicked.parentElement.parentElement.remove();
  updateTotal();
}

//-------------------------------Update Total--------------------------
function updateTotal() {
  var cartItem = document.querySelectorAll(".cart-items")[0]; // this returns array of element , so we want only one just 1
  var cartRows = cartItem.querySelectorAll(".cart-row");
  var total = 0;
  //loop over cartRows
  for (i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var cartPrice = cartRow.querySelectorAll(".cart-price")[0];
    var cartQuantity = cartRow.querySelectorAll(".quantity-input")[0];
    var price = parseFloat(cartPrice.innerText.replace("$", "")); // innertext returns the text inside price column. we want to be number not a string: so we use parsefloat
    var quantity = cartQuantity.value; // get quantity
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.querySelectorAll(".cart-total-price")[0].innerText = "$" + total;
}

//------------------------check out---------------------------------
document
  .querySelectorAll(".btn-checkout")[0] // we want to get the first button
  .addEventListener("click", checkoutClicked);

function checkoutClicked() {
  alert("Thank you for your shopping");
  //remove all the cart items
  var cartItems = document.querySelectorAll(".cart-items")[0];
  while (cartItems.hasChildNodes()) {
    // check all the childeren inside cart items
    cartItems.removeChild(cartItems.firstChild);
  }
  updateTotal();
}
