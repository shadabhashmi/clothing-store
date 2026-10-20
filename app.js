// STORE SETTINGS — replace these before publishing
const STORE = {
  brand: "Masha Store",
  whatsappNumber: "91XXXXXXXXXX", // digits only: country code + number
  currency: "INR",
  bulkMinimumNote: "Bulk quantities and pricing confirmed by WhatsApp"
};

// DEMO CATALOG. Replace these with real products, prices, colors and sizes.
const products = [
  {id:1,name:"Masha Essential Oversized Tee",category:"T-Shirts",price:499,color:"#b8b5aa",label:"BESTSELLER",sizes:["S","M","L","XL"]},
  {id:2,name:"Masha Everyday Hoodie",category:"Hoodies",price:1199,color:"#8f918c",label:"NEW",sizes:["S","M","L","XL"]},
  {id:3,name:"Masha Crew Sweatshirt",category:"Sweatshirts",price:899,color:"#d0c7b8",label:"",sizes:["S","M","L","XL"]},
  {id:4,name:"Masha Utility Track Pants",category:"Bottoms",price:799,color:"#77796f",label:"",sizes:["S","M","L","XL"]},
  {id:5,name:"Masha Relaxed Cord Set",category:"Sets",price:1499,color:"#c6c4bd",label:"SET",sizes:["S","M","L","XL"]},
  {id:6,name:"Masha Casual Shirt",category:"Shirts",price:899,color:"#b5a69a",label:"",sizes:["S","M","L","XL"]},
  {id:7,name:"Masha Street Jacket",category:"Jackets",price:1599,color:"#9a9b91",label:"",sizes:["S","M","L","XL"]},
  {id:8,name:"Masha Graphic Street Tee",category:"T-Shirts",price:599,color:"#d6d1c5",label:"LIMITED",sizes:["S","M","L","XL"]}
];
let cart = [];
let activeCategory = "All";
const grid = document.querySelector("#product-grid");
const cartDrawer = document.querySelector("#cart-drawer");
const toast = document.querySelector("#toast");
const money = amount => new Intl.NumberFormat("en-IN",{style:"currency",currency:STORE.currency,maximumFractionDigits:0}).format(amount);

function renderProducts(){
  const shown = activeCategory === "All" ? products : products.filter(p=>p.category===activeCategory);
  grid.innerHTML = shown.map(p=>`
    <article class="product-card">
      <div class="product-image ${["Bottoms","Sets"].includes(p.category)?"bottoms":""}" style="--garment:${p.color}">
        ${p.label?`<span class="tag">${p.label}</span>`:""}
        <span class="shade">${p.category.toUpperCase()}</span>
      </div>
      <div class="product-info"><h3>${p.name}</h3><div class="product-meta"><span>${money(p.price)}</span><small>Sizes S–XL</small></div>
      <label class="size-label" for="size-${p.id}">Choose size</label><select id="size-${p.id}" class="size-select" aria-label="Choose size for ${p.name}">${p.sizes.map(s=>`<option value="${s}">${s}</option>`).join("")}</select>
      <button class="add-button" data-add="${p.id}">ADD TO BAG +</button></div>
    </article>`).join("");
}
function notify(message){
  toast.textContent=message;toast.classList.add("show");
  window.setTimeout(()=>toast.classList.remove("show"),2400);
}
function addToCart(id){
  const product=products.find(p=>p.id===id);
  const selectedSize=document.querySelector(`#size-${id}`)?.value||"M";
  const existing=cart.find(item=>item.id===id&&item.size===selectedSize);
  if(existing) existing.qty++; else cart.push({...product,qty:1,size:selectedSize});
  renderCart();notify(`${product.name} · Size ${selectedSize} added`);
}
function changeQty(id,size,delta){
  const item=cart.find(p=>p.id===id&&p.size===size);if(!item)return;
  item.qty+=delta;if(item.qty<=0)cart=cart.filter(p=>!(p.id===id&&p.size===size));
  renderCart();
}
function renderCart(){
  document.querySelector("#cart-count").textContent=cart.reduce((n,p)=>n+p.qty,0);
  document.querySelector("#subtotal").textContent=money(cart.reduce((n,p)=>n+p.price*p.qty,0));
  document.querySelector("#cart-items").innerHTML=cart.length?cart.map(p=>`
    <div class="cart-item"><div class="cart-thumb" style="background:${p.color}"></div>
    <div><h3>${p.name}</h3><p>Size ${p.size} · ${money(p.price)}</p>
    <div class="qty-controls"><button data-qty="${p.id}" data-size="${p.size}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${p.qty}</span><button data-qty="${p.id}" data-size="${p.size}" data-delta="1" aria-label="Increase quantity">+</button></div></div>
    <span class="cart-item-price">${money(p.price*p.qty)}</span></div>`).join(""):'<p class="empty-cart">Your bag is empty.</p>';
}
function openCart(){document.body.classList.add("cart-open");cartDrawer.setAttribute("aria-hidden","false")}
function closeCart(){document.body.classList.remove("cart-open");cartDrawer.setAttribute("aria-hidden","true")}
function whatsappOrder(){
  if(!cart.length){notify("Your bag is empty");return}
  if(!/^\d{10,15}$/.test(STORE.whatsappNumber)){notify("Add your WhatsApp number in app.js first");return}
  const lines=cart.map(p=>`• ${p.name} — Size ${p.size} × ${p.qty} — ${money(p.price*p.qty)}`).join("\n");
  const total=cart.reduce((n,p)=>n+p.price*p.qty,0);
  const message=`Hi ${STORE.brand}! I'd like to place an order:\n\n${lines}\n\nSubtotal: ${money(total)}\nPlease confirm stock, shipping and payment options.`;
  window.open(`https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(message)}`,"_blank","noopener");
}
document.addEventListener("click",e=>{
  const add=e.target.closest("[data-add]");if(add)addToCart(Number(add.dataset.add));
  const qty=e.target.closest("[data-qty]");if(qty)changeQty(Number(qty.dataset.qty),qty.dataset.size,Number(qty.dataset.delta));
  const filter=e.target.closest("[data-category]");if(filter){activeCategory=filter.dataset.category;document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===filter));renderProducts()}
});
document.querySelector("#open-cart").addEventListener("click",openCart);
document.querySelector("#close-cart").addEventListener("click",closeCart);
document.querySelector("#cart-backdrop").addEventListener("click",closeCart);
document.querySelector("#checkout-whatsapp").addEventListener("click",whatsappOrder);
document.querySelector("#online-checkout").addEventListener("click",()=>notify("Online payment is not active yet; we will connect it after hosting and backend setup."));
document.querySelector("#bulk-link").addEventListener("click",e=>{
  if(!/^\d{10,15}$/.test(STORE.whatsappNumber)){e.preventDefault();notify("Add your WhatsApp number in app.js first");return}
  e.currentTarget.href=`https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent("Hi! I'm interested in bulk/wholesale clothing orders. Please share your catalog, minimum order quantity, size options and bulk pricing.")}`;
});
document.querySelector("#year").textContent=new Date().getFullYear();
renderProducts();renderCart();
