import{a as h,i as c,S as L}from"./assets/vendor-CRCB-GUD.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const g=t=>`
  <li class="gallery-card">
    <a class="gallery-a" href="${t.largeImageURL}">
       <img class="gallery-img" src="${t.webformatURL}" alt="${t.tags}"  />
    </a>

<ul class="img-description-list">
  <li class="img-description-el">
  <p>Likes</p>
  <p>${t.likes}</p></li>
  <li class="img-description-el">
  <p>Views</p>
  <p>${t.views}</p></li>
  <li class="img-description-el">
  <p>Comments</p>
  <p>${t.comments}</p></li>
  <li class="img-description-el">
  <p>Downloads</p>
  <p>${t.downloads}</p></li>
</ul>
  </li>`;h.defaults.baseURL="https://pixabay.com/api/";const y=(t,s)=>{const a={params:{key:"45491885-d594c4380fd68d18bb383d8af",q:t,image_type:"photo",orientation:"horizontal",per_page:15,page:s,safesearch:!0}};return h.get("",a)},m=document.querySelector(".js-search-form"),d=document.querySelector(".js-gallery"),i=document.querySelector(".load-more");let l=1,p="",f=0;const o=document.querySelector(".loader"),b=async t=>{try{if(t.preventDefault(),l=1,p=m.elements.user_query.value.trim(),!p){c.error({message:"Please enter a valid search query.",position:"topRight"});return}d.innerHTML="",i.classList.add("is-hidden"),o.classList.remove("is-hidden");const s=await y(p,l);if(s.data.hits.length===0){c.error({message:"Sorry, no images found. Please try again!",position:"topRight"}),o.classList.add("is-hidden");return}const a=s.data.hits.map(e=>g(e)).join("");d.innerHTML=a,o.classList.add("is-hidden"),l<Math.ceil(s.data.totalHits/15)&&i.classList.remove("is-hidden");const n=d.querySelector("li");n&&(f=n.getBoundingClientRect().height),new L(".js-gallery a",{captionsData:"alt",captionDelay:250}),m.reset()}catch{c.error({message:"Oops, something went wrong. Please try again later.",position:"topRight"}),o.classList.add("is-hidden")}},w=async()=>{try{l++,o.classList.remove("is-hidden"),i.disabled=!0;const t=await y(p,l),s=t.data.hits.map(a=>g(a)).join("");d.insertAdjacentHTML("beforeend",s),o.classList.add("is-hidden"),i.disabled=!1,scrollBy({top:f*2,behavior:"smooth"}),l>=Math.ceil(t.data.totalHits/15)&&(i.classList.add("is-hidden"),c.error({message:"You've reached the end of search results.",position:"topRight"}))}catch{c.error({message:"Oops, something went wrong while loading more images. Please try again later.",position:"topRight"}),o.classList.add("is-hidden"),i.disabled=!1}};m.addEventListener("submit",b);i.addEventListener("click",w);
//# sourceMappingURL=index.js.map
