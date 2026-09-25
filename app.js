const WHATSAPP = "5500000000000";

const products = [
  {name:"Conjunto Siena",cat:"conjuntos",img:"look-01.jpg"},
  {name:"Conjunto Roma",cat:"conjuntos",img:"look-02.jpg"},
  {name:"Conjunto Coral",cat:"conjuntos",img:"look-03.jpg"},
  {name:"Conjunto Rubi",cat:"conjuntos",img:"look-04.jpg"},
  {name:"Macaquinho Ameixa",cat:"shorts",img:"look-05.jpg"},
  {name:"Conjunto Azul",cat:"conjuntos",img:"look-06.jpg"},
  {name:"Macaquinho Vinho",cat:"shorts",img:"look-07.jpg"},
  {name:"Vestido Grafite",cat:"vestidos",img:"look-08.jpg"},
  {name:"Look Listrado",cat:"blusas",img:"look-09.jpg"},
  {name:"Conjunto Areia",cat:"conjuntos",img:"look-10.jpg"},
  {name:"Conjunto Duo",cat:"conjuntos",img:"look-11.jpg"},
  {name:"Macacão Azul",cat:"conjuntos",img:"look-12.jpg"},
  {name:"Macaquinho Rosa",cat:"shorts",img:"look-13.jpg"},
  {name:"Macaquinho Preto",cat:"shorts",img:"look-14.jpg"},
  {name:"Calça Alfaiataria",cat:"calcas",img:"look-15.jpg"},
  {name:"Conjunto Essencial",cat:"conjuntos",img:"look-16.jpg"},
  {name:"Short Floral",cat:"shorts",img:"look-17.jpg"},
  {name:"Calça Caramelo",cat:"calcas",img:"look-18.jpg"},
  {name:"Conjunto Rubi",cat:"conjuntos",img:"look-19.jpg"},
  {name:"Conjunto Neutro",cat:"conjuntos",img:"look-20.jpg"},
  {name:"Conjunto Soft",cat:"conjuntos",img:"look-21.jpg"},
  {name:"Macaquinho Bordô",cat:"shorts",img:"look-22.jpg"},
  {name:"Look White",cat:"blusas",img:"look-23.jpg"},
  {name:"Vestido Preto",cat:"vestidos",img:"look-24.jpg"},
  {name:"Conjunto Verde",cat:"conjuntos",img:"look-25.jpg"},
  {name:"Vestido Editorial",cat:"vestidos",img:"look-26.jpg"},
  {name:"Vestido Marrom",cat:"vestidos",img:"look-27.jpg"},
  {name:"Vestido Terracota",cat:"vestidos",img:"look-28.jpg"},
  {name:"Vestido Azul Cinto",cat:"vestidos",img:"look-29.jpg"},
  {name:"Vestido Aqua",cat:"vestidos",img:"look-30.jpg"},
  {name:"Conjunto Azul Claro",cat:"conjuntos",img:"look-31.jpg"},
  {name:"Look Saia & Top",cat:"saias",img:"look-32.jpg"},
  {name:"Vestido Chocolate",cat:"vestidos",img:"look-33.jpg"},
  {name:"Vestido Azul",cat:"vestidos",img:"look-34.jpg"},
  {name:"Vestido Midi",cat:"vestidos",img:"look-35.jpg"},
  {name:"Vestido Celeste",cat:"vestidos",img:"look-36.jpg"}
];

const categoryNames = {
  all:"Tudo", vestidos:"Vestidos", conjuntos:"Conjuntos",
  blusas:"Blusas", calcas:"Calças", saias:"Saias", shorts:"Shorts"
};

const productsEl = document.querySelector("#products");
const filtersEl = document.querySelector("#filters");
const modal = document.querySelector("#productModal");
const modalImg = document.querySelector("#modalImg");
const modalCat = document.querySelector("#modalCat");
const modalName = document.querySelector("#modalName");
const modalWhatsapp = document.querySelector("#modalWhatsapp");

function buildFilters(){
  filtersEl.innerHTML = Object.entries(categoryNames).map(([key,label]) =>
    `<button class="filter ${key==="all"?"active":""}" data-filter="${key}">${label}</button>`
  ).join("");
  filtersEl.querySelectorAll(".filter").forEach(btn=>{
    btn.addEventListener("click",()=>{
      filtersEl.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      render(btn.dataset.filter);
    });
  });
}

function render(filter="all"){
  const visible = products.filter(p=>filter==="all" || p.cat===filter);
  productsEl.innerHTML = visible.map((p,i)=>`
    <article class="product" data-index="${products.indexOf(p)}" style="animation-delay:${Math.min(i*35,500)}ms">
      <div class="product-media">
        <img src="assets/products/${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-meta"><span>${categoryNames[p.cat]}</span><span>ver peça ↗</span></div>
      </div>
    </article>`).join("");

  productsEl.querySelectorAll(".product").forEach(card=>{
    card.addEventListener("click",()=>openProduct(products[Number(card.dataset.index)]));
  });
  if(typeof bindProductTilt === "function") bindProductTilt();
}

function openProduct(p){
  modalImg.src = `assets/products/${p.img}`;
  modalImg.alt = p.name;
  modalCat.textContent = categoryNames[p.cat];
  modalName.textContent = p.name;
  modalWhatsapp.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Gostei da peça "${p.name}" da AURA FEMME. Pode me passar disponibilidade, tamanhos e valor?`)}`;
  modal.classList.add("open");
  document.body.style.overflow="hidden";
}
function closeProduct(){
  modal.classList.remove("open");
  document.body.style.overflow="";
}
modal.querySelectorAll("[data-close]").forEach(el=>el.addEventListener("click",closeProduct));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeProduct()});

buildFilters();
render();

/* ---------- STORE ENTRY ---------- */
const intro = document.querySelector("#introScene");
const enter = document.querySelector("#enterStore") || document.querySelector(".entry-door");
let entered = false;
function finishIntro(){
  if(entered) return;
  entered = true;
  intro.classList.add("entering");
  document.body.classList.add("store-entering");
  setTimeout(()=>{
    intro.classList.add("exit");
    document.body.classList.remove("intro-active","store-entering");
    setTimeout(()=>intro.remove(),950);
  },950);
}
enter.addEventListener("click",finishIntro);

/* floating sparkles */
const sparkles = document.querySelector("#sparkles");
if(sparkles) for(let i=0;i<24;i++){
  const s=document.createElement("i");
  s.className="spark";
  s.style.left=`${Math.random()*100}%`;
  s.style.top=`${45+Math.random()*55}%`;
  s.style.animationDelay=`${Math.random()*4}s`;
  s.style.animationDuration=`${3+Math.random()*4}s`;
  sparkles.appendChild(s);
}

/* ---------- REVEAL ON SCROLL ---------- */
const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting)e.target.classList.add("visible");
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));

/* ---------- HEADER ---------- */
const header=document.querySelector("#header");
window.addEventListener("scroll",()=>{
  header.classList.toggle("scrolled",window.scrollY>50);
},{passive:true});

/* ---------- MOBILE MENU ---------- */
const menu=document.querySelector("#mobileMenu");
document.querySelector("#menuBtn").addEventListener("click",()=>menu.classList.toggle("open"));
document.querySelectorAll(".mobile-menu a").forEach(a=>a.addEventListener("click",()=>menu.classList.remove("open")));

/* ---------- SCROLL-DRIVEN EDITORIAL RUNWAY ---------- */
const fashionSection=document.querySelector(".scroll-fashion");
const runway=document.querySelector(".runway");
const runwayCards=[...document.querySelectorAll(".runway-card")];
function animateScrollScene(){
  if(!fashionSection || !runway) return;
  const rect=fashionSection.getBoundingClientRect();
  const total=Math.max(1,fashionSection.offsetHeight-window.innerHeight);
  const progress=Math.max(0,Math.min(1,-rect.top/total));
  const eased=progress*progress*(3-2*progress);
  runway.style.transform=`translate3d(0,${(progress-.5)*18}px,0) rotate(${(progress-.5)*-4}deg) scale(${1+eased*.07})`;
  runwayCards.forEach((card,i)=>{
    const directions=[[-120,70,-12],[110,-50,11],[-20,110,-3]][i];
    const x=directions[0]*eased;
    const y=directions[1]*eased;
    const r=directions[2]+(progress-.5)*10;
    const scale=1+eased*(i===1?.16:.09);
    card.style.transform=`translate3d(${x}px,${y}px,0) rotate(${r}deg) scale(${scale})`;
  });
}
window.addEventListener("scroll",animateScrollScene,{passive:true});
window.addEventListener("resize",animateScrollScene,{passive:true});
animateScrollScene();

/* ---------- PARALLAX HERO ---------- */
const hero=document.querySelector(".hero");
const heroMain=document.querySelector(".hero-main");
const heroFloat1=document.querySelector(".hero-float-1");
const heroFloat2=document.querySelector(".hero-float-2");
window.addEventListener("scroll",()=>{
  const y=window.scrollY;
  if(y<window.innerHeight*1.2){
    if(heroMain) heroMain.style.transform=`translateY(${y*.055}px) scale(${1+y*.00012})`;
    if(heroFloat1) heroFloat1.style.transform=`translateY(${y*-.025}px) rotate(-4deg)`;
    if(heroFloat2) heroFloat2.style.transform=`translateY(${y*.04}px) rotate(7deg)`;
  }
},{passive:true});

/* ---------- SMOOTH IMAGE LOADING ---------- */
document.querySelectorAll("img").forEach(img=>{
  img.addEventListener("load",()=>img.classList.add("loaded"),{once:true});
});

/* ---------- 3D PHOTO DEPTH ---------- */
const entryGallery = document.querySelector('#iceBoutique');
if(entryGallery){
  entryGallery.addEventListener('pointermove',(e)=>{
    if(window.matchMedia('(max-width: 700px)').matches) return;
    const r=entryGallery.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    entryGallery.style.transform=`translate(-50%,-50%) rotateX(${(-y*3.2).toFixed(2)}deg) rotateY(${(x*4.5).toFixed(2)}deg)`;
    const main=entryGallery.querySelector('.entry-main');
    const left=entryGallery.querySelector('.entry-left');
    const right=entryGallery.querySelector('.entry-right');
    if(main) main.style.transform=`rotate(-1deg) translate3d(${x*-12}px,${y*-8}px,30px)`;
    if(left) left.style.transform=`rotate(-6deg) translate3d(${x*-22}px,${y*-14}px,55px)`;
    if(right) right.style.transform=`rotate(5deg) translate3d(${x*22}px,${y*14}px,45px)`;
  });
  entryGallery.addEventListener('pointerleave',()=>{
    entryGallery.style.transform='translate(-50%,-50%)';
    const main=entryGallery.querySelector('.entry-main');
    const left=entryGallery.querySelector('.entry-left');
    const right=entryGallery.querySelector('.entry-right');
    if(main) main.style.transform='';
    if(left) left.style.transform='';
    if(right) right.style.transform='';
  });
}

/* Subtle 3D tilt on clothing cards, kept restrained so the photography stays dominant. */
function bindProductTilt(){
  document.querySelectorAll('.product').forEach(card=>{
    card.addEventListener('pointermove',(e)=>{
      if(window.matchMedia('(max-width: 700px)').matches) return;
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`translateY(-10px) perspective(900px) rotateX(${(-y*2.2).toFixed(2)}deg) rotateY(${(x*2.6).toFixed(2)}deg)`;
    });
    card.addEventListener('pointerleave',()=>{ card.style.transform=''; });
  });
}
