import{a as L,i as l,S as v}from"./assets/vendor-b0d10f48.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const w="36655990-0724db180fb71d9be8c2c1bf3",E="https://pixabay.com/api/?key=",P="&image_type=photo&orientation=horizontal&safesearch=true&per_page=15";async function h(r,t){try{return(await L.get(E+w+`&q=${r}`+P+`&page=${t}`)).data}catch{throw new Error("Failed to fetch photos")}}function u(r,t){const n=r.map(({webformatURL:c,largeImageURL:e,tags:o,likes:a,views:m,comments:g,downloads:b})=>`
      <div class="photo-card">
        <a href="${e}">
          <img src="${c}" alt="${o}" loading="lazy" max-width="400px" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b><br>${a}</p>
          <p class="info-item"><b>Views</b><br>${m}</p>
          <p class="info-item"><b>Comments</b><br>${g}</p>
          <p class="info-item"><b>Downloads</b><br>${b}</p>
        </div>
      </div>
    `).join("");t.insertAdjacentHTML("beforeend",n)}const f=document.querySelector(".search-form"),p=document.querySelector(".gallery"),s=document.querySelector(".load-more"),i=document.querySelector(".loader");let y=1,d="";s.style.display="none";i.style.display="none";f.addEventListener("submit",async r=>{if(r.preventDefault(),d=f.elements.searchQuery.value.trim(),!!d){p.innerHTML="",y=1,s.style.display="none",i.style.display="block";try{const t=await h(d,y);if(t.hits.length===0){l.warning({title:"Warning",message:"No images found for your search query.",position:"topRight"}),i.style.display="none";return}u(t.hits,p),t.hits.length<15?(s.style.display="none",l.info({title:"Info",message:"You have reached the end of the images.",position:"topRight"})):s.style.display="block"}catch(t){console.error("Error fetching photos:",t),l.error({title:"Error",message:"Failed to fetch images. Please try again later.",position:"topRight"})}finally{i.style.display="none"}}});s.addEventListener("click",async()=>{s.style.display="none",i.style.display="block";try{const r=await h(d,++y);u(r.hits,p),r.hits.length<15?(s.style.display="none",l.info({title:"Info",message:"You have reached the end of the images.",position:"topRight"})):s.style.display="block"}catch(r){console.error("Error fetching more photos:",r),l.error({title:"Error",message:"Failed to load more images. Please try again later.",position:"topRight"})}finally{i.style.display="none"}});new v(".gallery a",{captionsData:"alt"});
//# sourceMappingURL=commonHelpers.js.map
