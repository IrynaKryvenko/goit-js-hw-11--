import{a as b,S as P,i as c}from"./assets/vendor-c493984e.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();function L(t,o,s){const a=t.map(({webformatURL:e,largeImageURL:r,tags:i,likes:m,views:h,comments:y,downloads:g})=>`
          <div class="photo-card">
            <a href="${r}">
              <img src="${e}" alt="${i}" loading="lazy" max-width="400px" />
            </a>
            <div class="info">
              <p class="info-item">
                <b>Likes</b><br>${m}</br>
              </p>
              <p class="info-item">
                <b>Views</b><br>${h}</br>
              </p>
              <p class="info-item">
                <b>Comments</b><br>${y}</br>
              </p>
              <p class="info-item">
                <b>Downloads</b><br>${g}</br>
              </p>
            </div>
          </div>
        `).join("");o.insertAdjacentHTML("beforeend",a),s.refresh()}const v="36655990-0724db180fb71d9be8c2c1bf3",S="https://pixabay.com/api/?key=",w="}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40";async function $(t,o){try{return(await b.get(S+v+`&q=${t}`+w+`&page=${o}`)).data}catch{throw new Error("Failed to fetch photos")}}const E=document.querySelector(".search-form"),p=document.querySelector(".gallery"),n=document.querySelector(".load-more");let l=1,u="";n.style.setProperty("display","none","important");let d=0;E.addEventListener("submit",q);n.addEventListener("click",f);let O=new P(".gallery a",{captionsData:"alt"});function q(t){t.preventDefault(),u=t.currentTarget.elements.searchQuery.value,p.innerHTML="",d=0,u!==""&&(l=1,f(),n.style.setProperty("display","none","important"))}function f(){n.style.setProperty("display","none","important"),$(u,l).then(t=>{L(t.hits,p,O),d+=t.hits.length;const o=t.totalHits;d===0?c.warning({title:"Warning",message:"Sorry, there are no images matching your search query. Please try again!"}):d>=o?c.error({title:"Error",message:"You have reached the end of the search results."}):(n.style.removeProperty("display"),H(),l===2&&c.success({title:"Hooray!",message:`We found ${o} images.`}))}).catch(t=>{c.error({title:"Error",message:"Failed to fetch images. Please try again later."})}),l+=1}function H(){const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
