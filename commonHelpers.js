import{a as P,i as d,S as L}from"./assets/vendor-d93b82f1.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const v="36655990-0724db180fb71d9be8c2c1bf3",S="https://pixabay.com/api/?key=",w="&image_type=photo&orientation=horizontal&safesearch=true&per_page=15";async function $(r,s){try{return(await P.get(S+v+`&q=${r}`+w+`&page=${s}`)).data}catch{throw new Error("Failed to fetch photos")}}function O(r,s,i){const l=r.map(({webformatURL:e,largeImageURL:t,tags:n,likes:m,views:h,comments:g,downloads:b})=>`
          <div class="photo-card">
            <a href="${t}">
              <img src="${e}" alt="${n}" loading="lazy" max-width="400px" />
            </a>
            <div class="info">
              <p class="info-item">
                <b>Likes</b><br>${m}</br>
              </p>
              <p class="info-item">
                <b>Views</b><br>${h}</br>
              </p>
              <p class="info-item">
                <b>Comments</b><br>${g}</br>
              </p>
              <p class="info-item">
                <b>Downloads</b><br>${b}</br>
              </p>
            </div>
          </div>
        `).join("");s.insertAdjacentHTML("beforeend",l),i.refresh()}const E=document.querySelector(".search-form"),y=document.querySelector(".gallery"),a=document.querySelector(".load-more"),o=document.querySelector(".loader");let c=1,p="";a.style.setProperty("display","none","important");o&&o.style.setProperty("display","none","important");E.addEventListener("submit",q);a.addEventListener("click",u);let f;function q(r){r.preventDefault(),p=r.currentTarget.elements.searchQuery.value,y.innerHTML="",c=1,a.style.setProperty("display","none","important"),o&&o.style.setProperty("display","block"),p!==""&&u()}function u(){$(p,c).then(r=>{o&&o.style.setProperty("display","none"),O(r.hits,y,f),r.hits.length>0?(a.style.removeProperty("display"),c++):(a.style.setProperty("display","none"),d.warning({title:"Warning",message:"No more images to load."}))}).catch(r=>{o&&o.style.setProperty("display","none"),d.error({title:"Error",message:"Failed to fetch images. Please try again later."})})}f=new L(".gallery a",{captionsData:"alt"});
//# sourceMappingURL=commonHelpers.js.map
