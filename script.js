// Hania Jewels storefront with owner-supplied product photography.
const WHATSAPP_BUSINESS_NUMBER = "923392117615"; // Pakistan number in international format, without +
const categories = [
  ["Necklaces","Delicate everyday necklaces"],["Bracelets","Beaded & charm bracelets"],
  ["Anklets","Delicate everyday details"],["Rings","Minimal and playful rings"],
  ["Earrings","Cute everyday earrings"],["Chains","Simple chains & pendants"],["Charms","Personal little details"]
];
const names = [
  // necklaces
 ["Pearl Glow Necklace","Necklaces",949,"A delicate pearl necklace for everyday elegance.","product-images/n1.png"],
 ["Everyday Layered Chain","Necklaces",899,"Two fine layers for an easy everyday look.","product-images/n2.png"],
 ["Pastel Bead Necklace","Necklaces",849,"A playful necklace with soft pastel beads.","product-images/n3.jpg"],
 ["Golden Heart Pendant","Necklaces",799,"A tiny heart pendant on a simple chain.","product-images/n4.png"],
 ["Daisy Charm Necklace","Necklaces",749,"A sweet floral charm for casual styling.","product-images/n5.png"],
 ["Classic Pearl Strand","Necklaces",979,"A simple pearl-inspired strand for day-to-day wear.","product-images/n6.jpg"],
  // braclets
 ["Blush Blossom Bead Bracelet","Bracelets",449,"Bright beads that add a pop of colour.","product-images/b1.png"],
 ["Pear Blush  Bracelet","Bracelets",399,"A dainty bracelet with charming details.","product-images/b2.png"],
 ["Buttercup Bracelet","Bracelets",349,"A soft pearl bracelet made for stacking.","product-images/b3.png"],
 ["Friendship Bracelet","Bracelets",299,"A cheerful adjustable friendship bracelet.","product-images/b4.png"],
 ["Ruby frost Bracelet","Bracelets",479,"A minimal gold-tone bracelet.","product-images/b5.png"],
 ["Daisy Bead Bracelet","Bracelets",249,"Tiny flower details with colourful beads.","product-images/b6.jpg"],
//  anklets
 ["Shell & Pearl Anklet","Anklets",249,"A light anklet with pearl-inspired accents.","product-images/a1.jpg"],
 ["Golden Everyday Anklet","Anklets",279,"A delicate chain anklet for everyday wear.","product-images/a2.jpg"],
 ["Spiderman Bag Pins"," Bag Pins",299,"A playful mix of  beads.","product-images/p1.png"],
 ["Tiny Charm Anklet","Anklets",269,"A subtle charm detail for your ankle.","product-images/a3.jpg"],
 ["Pearl Drop Anklet","Anklets",289,"A little pearl-inspired shine.","product-images/a4.jpg"],
 ["Summer Bead Anklet","Anklets",199,"Colourful beads for sunny days.","product-images/a5.jpg"],
//  rings
 ["Daisy Bead Ring","Rings",249,"A tiny flower-inspired ring.","product-images/r1.jpg"],
 ["Pearl bag pins","Bag pins",199,"A clean, simple elegant bag pins.","product-images/p2.jpg"],
 ["White Flower Charm","Charms",229,"A colourful stone-inspired statement.","product-images/c1.png"],
 
//  earrings
 ["Silver Mini beads","Earrings",249,"Lightweight hoops that go with everything.","product-images/silver.png"],
 ["Cherry Pearl Earrings","Earrings",299,"Soft pearl drops with a modern feel.", "product-images/cherry perl earrings.png"],
 ["Everyday Stud Earrings","Earrings",199,"Simple studs for daily styling.", "product-images/Everyday Stud Earrings.png"],
 ["Matcha Pearl Earrings","Earrings",229,"Fun bead details with a playful finish.", "product-images/matcha.png"],
 
 ["Pearl Choker","Necklace",249,"A pretty pearl detail for your style.","product-images/n7.png"],
 ["Candy Garden Charm","Charms",299,"A colourful charm to make it personal.","product-images/c2.png"],
 ["Mini Star Earring","Earrings",199,"A tiny star earrings with a little sparkle.","product-images/e1.png"]
];
const products = names.map((x,i)=>({id:i+1,name:x[0],category:x[1],price:x[2],desc:x[3],image:x[4]||""}));
// Owner-supplied collection photos added in this update.
products.push(
 {id:31,name:"Pink Dream Phone Charm",category:"Charms",price:299,desc:"A dreamy pastel-pink phone charm with sweet beads, hearts, butterflies and delicate little details.",image:"product-images/pink-dream-phone-charm.png"},
 {id:32,name:"Sweetheart Pearl Bracelet",category:"Bracelets",price:399,desc:"A soft pink-and-pearl bracelet finished with tiny heart details for a romantic everyday look.",image:"product-images/sweetheart-pearl-bracelet.png"},
 {id:33,name:"Infinity Love Necklace",category:"Necklaces",price:899,desc:"A minimal silver-tone necklace with a graceful infinity pendant.",image:"product-images/infinity-love-necklace.png"},
 {id:34,name:"Pearl Bow Bracelet",category:"Bracelets",price:479,desc:"A delicate pearl bracelet with a statement bow charm and sparkling crystal accents.",image:"product-images/pearl-bow-bracelet.png"},
 {id:35,name:"Cherry Blossom Phone Charm",category:"Charms",price:279,desc:"A cute phone charm with a pearl bow, crystal heart and cherry-red bead drops.",image:"product-images/cherry-blossom-phone-charm.png"},
 
);
products.forEach(p => { p.price = Math.min(499, Math.max(1, Number(p.price) || 1)); });
const customizableCategories = ["Necklaces","Bracelets","Anklets"];
let activeCategory="All", cart=JSON.parse(localStorage.getItem("hj_cart")||"[]"), wishlist=JSON.parse(localStorage.getItem("hj_wishlist")||"[]"), selectedProduct=null;
const $=id=>document.getElementById(id), money=n=>"Rs. "+Number(n).toLocaleString("en-PK");
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function showToast(message){$("toast").textContent=message;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2300)}
function persist(){localStorage.setItem("hj_cart",JSON.stringify(cart));localStorage.setItem("hj_wishlist",JSON.stringify(wishlist));updateCounts()}
function updateCounts(){$("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);$("wishCount").textContent=wishlist.length}
function photoSlot(label="H",src=""){return src?`<div class="product-image"><img src="${escapeHTML(src)}" alt="${escapeHTML(label)}" loading="lazy"></div>`:`<div class="product-image-placeholder"><span>H✧</span><small>${escapeHTML(label)}</small><i>PHOTO COMING SOON</i></div>`}
function productCard(p){let wished=wishlist.includes(p.id);let canCustomize=customizableCategories.includes(p.category);return `<div class="col-6 col-md-4 col-lg-3"><article class="product-card">${photoSlot(p.category,p.image)}<button class="wish-btn" data-wish="${p.id}" aria-label="Save ${escapeHTML(p.name)}">${wished?"♥":"♡"}</button><div class="product-info"><small>${p.category}</small><h3>${escapeHTML(p.name)}</h3><p class="product-price">${money(p.price)}</p><div class="product-actions"><button class="btn-outline-gold" data-details="${p.id}">Details</button>${canCustomize?`<button class="btn-gold" data-custom="${p.id}">Customize</button>`:`<button class="btn-gold" data-quick="${p.id}">Add to bag</button>`}</div></div></article></div>`}
function renderCategoryCards(){
 const images={
  Necklaces:"product-images/n3.jpg",
  Bracelets:"product-images/sweetheart-pearl-bracelet.png",
  Anklets:"product-images/a2.jpg",
  Rings:"product-images/r1.jpg",
  Earrings:"product-images/Colour Pop Bead Hoops.jpg",
  Chains:"product-images/infinity-love-necklace.png",
  Charms:"product-images/pink-dream-phone-charm.png"
 };
 $("categoryGrid").innerHTML=categories.map(([name,desc])=>`<div class="col-6 col-md-4 col-lg-3"><button class="category-card category-button" data-category="${name}"><img src="${images[name]}" alt="${name} casual bead and pearl jewellery" loading="lazy"><b>${name}</b><small>${desc}</small></button></div>`).join("")
}
function renderFilters(){let cats=["All",...categories.map(x=>x[0])];$("filterBar").innerHTML=cats.map(c=>`<button class="filter-chip ${activeCategory===c?"active":""}" data-filter="${c}">${c}</button>`).join("")}
function renderProducts(){let q=($("searchInput")?.value||"").toLowerCase();let list=products.filter(p=>(activeCategory==="All"||p.category===activeCategory)&&(p.name+" "+p.category+" "+p.desc).toLowerCase().includes(q));let sort=$("sortSelect")?.value;if(sort==="low")list.sort((a,b)=>a.price-b.price);if(sort==="high")list.sort((a,b)=>b.price-a.price);$("productGrid").innerHTML=list.map(productCard).join("")||'<div class="col-12"><p class="empty-state">No products found. Try another search.</p></div>'}
function renderFeatured(){$("featuredGrid").innerHTML=products.slice(0,4).map(productCard).join("")}
function renderGallery(){$("galleryGrid").innerHTML=products.filter(p=>p.id>=31&&p.id<=35).map(productCard).join("")}
function goPage(page){document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));let target=$("page-"+page);if(!target){page="home";target=$("page-home")}target.classList.remove("hidden");document.querySelectorAll(".nav-link").forEach(a=>a.classList.toggle("active",a.dataset.page===page));if(page==="products"){renderFilters();renderProducts()}if(page==="gallery")renderGallery();if(page==="wishlist")renderWishlist();if(page==="cart")renderCart();if(page==="offers")$("offersGrid").innerHTML=products.slice(-8).map(productCard).join("");if(page==="reviews")renderReviews();document.getElementById("navLinks").classList.remove("show");window.scrollTo({top:0,behavior:"smooth"})}
function openDetails(id){let p=products.find(x=>x.id===Number(id));if(!p)return;selectedProduct=p;$("detailsModal").querySelector(".modal-product-image").innerHTML=p.image?`<img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}">`:photoSlot(p.category);$("detailsTitle").textContent=p.name;$("detailsPrice").textContent=money(p.price);$("detailsDescription").textContent=p.desc;$("detailsCategory").textContent="Category: "+p.category;$("detailsAddBtn").textContent="Add to bag";$("detailsModal").classList.remove("hidden");document.body.style.overflow="hidden"}
function setSelectOptions(id,placeholder,options){$(id).innerHTML=`<option value="">${placeholder}</option>`+options.map(x=>`<option value="${x}">${x}</option>`).join("")}
function openCustomize(id){
 let p=products.find(x=>x.id===Number(id));
 if(!p||!customizableCategories.includes(p.category)){openDetails(id);return}
 selectedProduct=p;
 $("productModal").querySelector(".modal-product-image").innerHTML=p.image?`<img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}">`:photoSlot(p.category);
 $("customProductId").value=p.id;$("modalTitle").textContent=p.name;$("modalPrice").textContent=money(p.price);$("modalDescription").textContent=p.desc;
 let config={
  Necklaces:{color:["Gold","Silver","Rose Gold","Pearl White","Pastel Mix","Rainbow"],size:["14 inches","16 inches","18 inches","20 inches","Adjustable"],labels:["Necklace Colour","Necklace Length"]},
  Bracelets:{color:["Gold","Silver","Rose Gold","Pastel Mix","Rainbow","Pearl White"],size:["Small wrist","Medium wrist","Large wrist","Adjustable"],labels:["Bracelet Colour","Wrist Size / Length"]},
  Anklets:{color:["Gold","Silver","Rose Gold","Pearl White","Pastel Mix","Rainbow"],size:["8 inches","9 inches","10 inches","11 inches","Adjustable"],labels:["Anklet Colour","Anklet Length"]}
 }[p.category];
 $("customColorLabel").textContent=config.labels[0];$("customSizeLabel").textContent=config.labels[1];
 setSelectOptions("customColor","Choose colour",config.color);
 setSelectOptions("customSize","Choose length / size",config.size);
 $("customQty").value=1;updateCustomTotal();$("productModal").classList.remove("hidden");document.body.style.overflow="hidden";
}
function closeModal(){document.querySelectorAll(".modal-shell").forEach(m=>m.classList.add("hidden"));document.body.style.overflow=""}
function updateCustomTotal(){if(!selectedProduct)return;let qty=Math.max(1,Math.min(10,Number($("customQty").value)||1));$("customTotal").textContent=money(selectedProduct.price*qty)}
function addToCart(p,options={}){cart.push({key:Date.now()+Math.random(),id:p.id,qty:options.qty||1,color:options.color||"Default",size:options.size||"Standard",style:options.style||"Original"});persist();showToast(p.name+" added to your bag")}
function renderWishlist(){let list=products.filter(p=>wishlist.includes(p.id));$("wishlistGrid").innerHTML=list.map(productCard).join("");$("wishlistEmpty").classList.toggle("hidden",list.length>0)}
function renderCart(){if(!cart.length){$("cartItems").innerHTML="";$("cartSummary").classList.add("hidden");$("cartEmpty").classList.remove("hidden");return}$("cartEmpty").classList.add("hidden");$("cartItems").innerHTML=cart.map(item=>{let p=products.find(x=>x.id===item.id);return `<div class="cart-row"><div class="cart-thumb">H✧</div><div><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(item.color)} · ${escapeHTML(item.size)}</p><p>Qty: ${item.qty}</p><button class="remove-btn" data-remove="${item.key}">Remove</button></div><b>${money(p.price*item.qty)}</b></div>`}).join("");let total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);$("cartSummary").classList.remove("hidden");$("cartSummary").innerHTML=`<div><span>Subtotal</span><b>${money(total)}</b></div><div><span>Delivery</span><span>Confirmed by store</span></div><hr><div><b>Estimated total</b><strong>${money(total)}</strong></div><button class="btn-gold w-100" id="checkoutBtn">Continue to checkout</button>`}
const defaultReviews=[["Ayesha","The pearl necklace is so delicate and pretty. I have worn it almost every day!",5],["Zoya","Loved choosing my own bead colours. The packaging was beautiful too.",5],["Maham","Cute, lightweight earrings and lovely quality. Will order again.",5]];
function renderReviews(){let extra=JSON.parse(localStorage.getItem("hj_reviews")||"[]");$("allReviews").innerHTML=[...defaultReviews,...extra].map(r=>`<div class="col-md-4"><article class="review-card"><div class="stars">${"★".repeat(r[2])}</div><p>“${escapeHTML(r[1])}”</p><b>— ${escapeHTML(r[0])}</b></article></div>`).join("")}
function openCheckout(){if(!cart.length){showToast("Your bag is empty.");return}$("checkoutError").textContent="";$("checkoutForm").reset();$("checkoutModal").classList.remove("hidden");document.body.style.overflow="hidden"}
document.addEventListener("click",e=>{
 let page=e.target.closest("[data-page]");if(page){e.preventDefault();goPage(page.dataset.page);return}
 let cat=e.target.closest("[data-category]");if(cat){e.preventDefault();activeCategory=cat.dataset.category;goPage("products");return}
 let filter=e.target.closest("[data-filter]");if(filter){activeCategory=filter.dataset.filter;renderFilters();renderProducts();return}
 let wish=e.target.closest("[data-wish]");if(wish){let id=Number(wish.dataset.wish);wishlist.includes(id)?wishlist=wishlist.filter(x=>x!==id):wishlist.push(id);persist();renderProducts();renderFeatured();if(!$("page-wishlist").classList.contains("hidden"))renderWishlist();showToast("Wishlist updated");return}
 let details=e.target.closest("[data-details]");if(details){openDetails(details.dataset.details);return}
 let custom=e.target.closest("[data-custom]");if(custom){openCustomize(custom.dataset.custom);return}
 let quick=e.target.closest("[data-quick]");if(quick){let p=products.find(x=>x.id===Number(quick.dataset.quick));addToCart(p);return}
 if(e.target.closest("[data-close-modal]")){closeModal();return}
 if(e.target.id==="detailsAddBtn"){addToCart(selectedProduct);closeModal();return}
 let remove=e.target.closest("[data-remove]");if(remove){cart=cart.filter(x=>String(x.key)!==remove.dataset.remove);persist();renderCart();return}
 if(e.target.id==="checkoutBtn")openCheckout();
});
$("locationSelect").addEventListener("change",()=>{
 const isOther=$("locationSelect").value==="__other__";
 $("otherLocation").classList.toggle("hidden",!isOther);
 $("locationError").textContent="";
 if(isOther) $("otherLocation").focus();
});
$("continueBtn").addEventListener("click",()=>{
 let loc=$("locationSelect").value;
 if(!loc){$("locationError").textContent="Please select your Karachi location before continuing.";return}
 if(loc==="__other__"){
  loc=$("otherLocation").value.trim();
  if(loc.length<2){$("locationError").textContent="Please type your Karachi area to continue.";$("otherLocation").focus();return}
  loc=loc+" (Karachi)";
 }
 localStorage.setItem("hj_location",loc);
 $("footerLocation").textContent=loc;
 $("locationScreen").classList.add("hidden");
 $("store").classList.remove("hidden");
 goPage("home");
});
$("customQty").addEventListener("input",updateCustomTotal);
$("customForm").addEventListener("submit",e=>{e.preventDefault();if(!e.currentTarget.reportValidity())return;let p=products.find(x=>x.id===Number($("customProductId").value));let qty=Number($("customQty").value);if(!p||!customizableCategories.includes(p.category)||qty<1||qty>10){showToast("Please check your customization details.");return}addToCart(p,{qty,color:$("customColor").value,size:$("customSize").value});closeModal()});
$("searchInput").addEventListener("input",renderProducts);$("sortSelect").addEventListener("change",renderProducts);
$("reviewForm").addEventListener("submit",e=>{e.preventDefault();let name=$("reviewName").value.trim(),review=$("reviewText").value.trim();if(!name||!review){$("reviewMessage").textContent="Please complete both fields.";return}let list=JSON.parse(localStorage.getItem("hj_reviews")||"[]");list.push([name,review,Number($("reviewRating").value)]);localStorage.setItem("hj_reviews",JSON.stringify(list));$("reviewForm").reset();$("reviewMessage").textContent="Thank you! Your review has been saved on this device.";renderReviews()});
$("checkoutForm").addEventListener("submit",e=>{
 e.preventDefault();
 let name=$("checkoutName").value.trim(),email=$("checkoutEmail").value.trim(),phone=$("checkoutPhone").value.trim(),address=$("checkoutAddress").value.trim();
 let emailOK=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
 let phoneOK=/^(?:\+92|0)3\d{9}$/.test(phone.replace(/[\s-]/g,""));
 let nameOK=/^[A-Za-zÀ-ÿ\s.'-]{3,60}$/.test(name);
 let addressOK=address.length>=12&&/[A-Za-z0-9]/.test(address);
 if(!nameOK||!emailOK||!phoneOK||!addressOK){$("checkoutError").textContent="Please enter a valid name, email, Pakistani mobile number (03XXXXXXXXX / +923XXXXXXXXX) and complete delivery address.";return}
 if(!cart.length){$("checkoutError").textContent="Your bag is empty.";return}
 const orderItems=cart.map((item,index)=>{
  const product=products.find(p=>p.id===item.id);
  if(!product)return `${index+1}. Unavailable product (Qty: ${item.qty})`;
  return `${index+1}. ${product.name}\n   Category: ${product.category}\n   Customization: ${item.color}, ${item.size}, ${item.style}\n   Quantity: ${item.qty}\n   Price: ${money(product.price*item.qty)}`;
 });
 const subtotal=cart.reduce((sum,item)=>{const product=products.find(p=>p.id===item.id);return sum+(product?product.price*item.qty:0)},0);
 const selectedArea=localStorage.getItem("hj_location")||"Not selected";
 const message=[
  "Assalam-o-Alaikum Hania Jewels! I would like to place an order.",
  "",
  "CUSTOMER DETAILS",
  `Name: ${name}`,
  `Email: ${email}`,
  `Phone: ${phone}`,
  `Delivery area: ${selectedArea}`,
  `Full address: ${address}`,
  "",
  "ORDER ITEMS",
  ...orderItems,
  "",
  `Subtotal: ${money(subtotal)}`,
  "Delivery charges: Please confirm",
  "Total: To be confirmed with the store",
  "",
  "Please confirm availability and delivery details. Thank you!"
 ].join("\n");
 const whatsappURL=`https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(message)}`;
 const whatsappTab=window.open(whatsappURL,"_blank");
 if(whatsappTab){whatsappTab.opener=null;closeModal();showToast("WhatsApp opened. Press Send there to submit your order.");}
 else {window.location.href=whatsappURL;}
});
function start(){
 renderCategoryCards();renderFeatured();updateCounts();
 // A fresh visit always starts with the two-second brand intro, then the location gate.
 // Previously selected area is pre-filled for convenience, but Continue is still required.
 const savedLocation=localStorage.getItem("hj_location")||"";
 const locationOption=[...$("locationSelect").options].find(option=>option.value===savedLocation||option.textContent===savedLocation);
 if(locationOption){$("locationSelect").value=locationOption.value;}
 else if(savedLocation){$("locationSelect").value="__other__";$("otherLocation").value=savedLocation.replace(/ \(Karachi\)$/i,"");$("otherLocation").classList.remove("hidden");}
 $("store").classList.add("hidden");
 $("locationScreen").classList.add("hidden");
 $("introScreen").classList.remove("hidden");
 setTimeout(()=>{
  $("introScreen").classList.add("hidden");
  $("locationScreen").classList.remove("hidden");
 },2000);
}
start();
