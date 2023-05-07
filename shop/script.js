// const produtc = {
//   id: 1,
//   title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   price: 109.95,
//   description:
//     "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   category: "men's clothing",
//   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   rating: { rate: 3.9, count: 120 },
// };

const menItems = document.querySelector("#menItems");
const womenItems = document.querySelector("#womenItems");
const jewelleryItems = document.querySelector("#jewelleryItems");
const electronicItems = document.querySelector("#electronicItems");
const filterBtn = document.querySelectorAll(".filter");
const menSection = document.querySelector(".menSection");
const womenSection = document.querySelector(".womenSection");
const jewellerySection = document.querySelector(".jewellerySection");
const electronicSection = document.querySelector(".electronicSection");
const searchInput = document.querySelector("#searchInput");
const allSectionWrapper = document.querySelector(".allSectionWrapper");
const colorFilter = document.querySelectorAll('[name="color"]');
const sizeFilter = document.querySelectorAll('[name="size"]');
const rangeFilter = document.querySelector("#range");
const priceFilter = document.querySelectorAll('[name="prange"]');

// console.log(colorFilter)

if (!localStorage.getItem("currUser")) {
	location.href = "../login/index.html";
}

// console.log(filterBtn);

let allProducts;
if (localStorage.getItem("allProducts")) {
	allProducts = JSON.parse(localStorage.getItem("allProducts"));
}

fetch("https://fakestoreapi.com/products")
	.then((res) => res.json())
	.then((data) => {
		if (!allProducts) {
			allProducts = data.map((item) => {
				let colors = ["Red", "Blue", "Green", "Black", "White"];
				let randomColorIndex = Math.floor(Math.random() * colors.length);
				item.color = colors[randomColorIndex];

				let sizes = ["S", "M", "L", "XL"];
				let randomSizeIndex = Math.floor(Math.random() * sizes.length);
				item.size = sizes[randomSizeIndex];

				return item;
			});

			localStorage.setItem("allProducts", JSON.stringify(allProducts));
		}
		displayProducts(allProducts);
		// allProducts = data;
		console.log(allProducts);
	});

function displayProducts(allProducts) {
	menItems.innerHTML = "";
	womenItems.innerHTML = "";
	jewelleryItems.innerHTML = "";
	electronicItems.innerHTML = "";

	console.log(allProducts);

	allProducts.map((item) => {
		if (item.category === "men's clothing") {
			menItems.innerHTML += `
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
					<button id="addBtn" onclick="addToCart(this, ${item.id})" >Add to Cart</button>
				</div>
			`;
		} else if (item.category === "women's clothing") {
			womenItems.innerHTML += `
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
					<button id="addBtn" onclick="addToCart(this , ${item.id})">Add to Cart</button>
				</div>
			`;
		} else if (item.category === "jewelery") {
			jewelleryItems.innerHTML += `
				<div class="item">
					<div class="image-wrapper">
						<img src="${item.image}" alt="Item" />
					</div>
					<div class="info">
						<div class="row" style="min-height:65px"><strong>${item.title}</strong></div>
						<div class="row">
							<div class="price">₹${item.price}</div>
						</div>
						<div class="row">Rating:${Math.floor(item.rating.rate)}</div>
					</div>
					<button id="addBtn" onclick="addToCart(this, ${item.id})">Add to Cart</button>
				</div>
			`;
		} else if (item.category === "electronics") {
			electronicItems.innerHTML += `
				<div class="item">
					<div class="image-wrapper">
						<img src="${item.image}" alt="Item" />
					</div>
					<div class="info">
						<div class="row" style="min-height:65px"><strong>${item.title}</strong></div>
						<div class="row">
							<div class="price">₹${item.price}</div>
						</div>
						<div class="row">Rating:${Math.floor(item.rating.rate)}</div>
					</div>
					<button id="addBtn" onclick="addToCart(this, ${item.id})">Add to Cart</button>
				</div>
			`;
		}
	});
}

filterBtn.forEach((btn) => {
	btn.addEventListener("click", () => {
		filterBtn.forEach((btn) => {
			btn.classList.remove("active");
			menSection.style.display = "none";
			womenSection.style.display = "none";
			jewellerySection.style.display = "none";
			electronicSection.style.display = "none";
		});
		btn.classList.add("active");

		if (btn.innerText === "Mens") {
			menSection.style.display = "block";
		} else if (btn.innerText === "Womens") {
			womenSection.style.display = "block";
		} else if (btn.innerText === "Jewellery") {
			jewellerySection.style.display = "block";
		} else if (btn.innerText === "Electronics") {
			electronicSection.style.display = "block";
		} else {
			menSection.style.display = "block";
			womenSection.style.display = "block";
			jewellerySection.style.display = "block";
			electronicSection.style.display = "block";
		}
	});
});

searchInput.addEventListener("input", (e) => {
	let input = e.target.value.toLowerCase().trim();
	console.log(input);

	let searchProducts = allProducts.filter((item) => {
		if (item.title.toLowerCase().includes(input)) {
			return item;
		}
	});
	// console.log(searchProducts)
	displayProducts(searchProducts);
});

colorFilter.forEach((color) => {
	console.log(color);
	color.addEventListener("change", (e) => {
		console.log(e.target.value);

		if (e.target.checked) {
			let colorValue = e.target.value;

			let colorFilterProducts = allProducts.filter((item) => {
				if (colorValue === item.color) {
					return item;
				}
			});

			displayProducts(colorFilterProducts);
		} else {
			displayProducts(allProducts);
		}
	});
});

sizeFilter.forEach((size) => {
	console.log(size);
	size.addEventListener("change", (e) => {
		console.log("Inside size filter", e.target.checked);
		console.log(e.target.value);

		if (e.target.checked) {
			let sizeValue = e.target.value;

			let sizeFilterProducts = allProducts.filter((item) => {
				if (item.size === sizeValue) {
					return item;
				}
			});

			displayProducts(sizeFilterProducts);
		} else {
			displayProducts(allProducts);
		}
	});
});

range.addEventListener("change", (e) => {
	let rangeValue = e.target.value;

	console.log(rangeValue);

	let rangeFilterProducts = allProducts.filter((item) => {
		// console.log(Math.floor(item.rating.rate))
		if (Math.floor(item.rating.rate) == rangeValue) {
			return item;
		}
	});

	console.log(rangeFilterProducts);

	displayProducts(rangeFilterProducts);

	if (rangeValue === "0") {
		console.log("Inside 0 range");
		displayProducts(allProducts);
	}
});

// console.log(priceFilter)
priceFilter.forEach((price) => {
	// console.log(price);
	price.addEventListener("change", (e) => {
		// console.log(e.target.value);

		if (e.target.checked) {
			let priceValue = e.target.value;

			let priceFilterProducts = allProducts.filter((item) => {
				if (priceValue === "0-25" && item.price > 0 && item.price <= 25) {
					return item;
				} else if (
					priceValue === "25-50" &&
					item.price > 25 &&
					item.price <= 50
				) {
					return item;
				} else if (
					priceValue === "50-100" &&
					item.price > 50 &&
					item.price <= 100
				) {
					return item;
				} else if (priceValue === "100-on" && item.price > 100) {
					return item;
				}
			});

			console.log(priceFilterProducts);

			displayProducts(priceFilterProducts);
		} else {
			displayProducts(allProducts);
		}
	});
});

let cartArray = [];

function addToCart(e, id) {
	console.log(e, id);

	cartArray.push(allProducts[id - 1]);
	console.log(cartArray);
	localStorage.setItem("cartArray", JSON.stringify(cartArray));
}
