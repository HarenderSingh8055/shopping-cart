

const cartLeft = document.querySelector(".cartLeft");
const checkoutItems = document.querySelector(".checkoutItems");
const totalPrice = document.querySelector(".totalPrice");
const checkoutBtn = document.querySelector(".checkoutBtn");




let cartProducts = JSON.parse(localStorage.getItem("cartArray"));

console.log(cartProducts)
var price;

function displayProducts(cartProducts) {
    cartLeft.innerHTML = "";
    checkoutItems.innerHTML = "";
    totalPrice.innerText = "";
    let sum = 0;

    cartProducts.map((item, index) => {
        cartLeft.innerHTML += `
                <div class="item">
                    <div class="image-wrapper">
                        <img src="${item.image}" alt="Item" />
                    </div>
                    <div class="info">
                        <div class="row" style="min-height:65px"><strong>${item.title}</strong></div>
                        <div class="row">
                            <div class="price">₹${item.price}</div>
                            <div class="sized">${item.size}</div>
                        </div>
                        <div class="colors">
                            Colors:
                            <div class="row">
                                <div class="circle" style="background-color: ${item.color}"></div>
                            </div>
                        </div>
                        <div class="row">Rating:${Math.floor(item.rating.rate)}</div>
                    </div>
                    <button id="addBtn" onclick="removeFromCart(this, ${index})" >Remove From Cart</button>
                </div>
                `;

        checkoutItems.innerHTML += `
                <li><span>${index + 1}. ${item.title.slice(0, 12)}..</span><span>₹${item.price}</span></li>
        `


        sum = sum + item.price;
        console.log(sum)

        totalPrice.innerText = `₹${sum}`;
        price = sum;
    })
}

window.onload = displayProducts(cartProducts);


function removeFromCart(e, index) {
    console.log(index);
    cartProducts.splice(index, 1);

    localStorage.setItem("cartArray", JSON.stringify(cartProducts));
    console.log(cartProducts)

    displayProducts(cartProducts)
}





// Link for the documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration

// Add button code documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration#code-to-add-pay-button


console.log(price)
checkoutBtn.addEventListener("click", (e) => {
    var options = {
        key: "rzp_test_PV1oQ0oMtgXOsq", // Enter the Key ID generated from the Dashboard
        amount: price * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "MyShop Checkout",
        description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        theme: {
            color: "#000",
        },
        image:
            "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
    };

    var rzpy1 = new Razorpay(options);
    rzpy1.open();
    localStorage.removeItem("cartArray");
    // e.preventDefault();

    cartProducts = [];
    // location.reload();
    displayProducts(cartProducts);
})

