import{a as L,i,S as w}from"./assets/vendor-b0d10f48.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const P="36655990-0724db180fb71d9be8c2c1bf3",E="https://pixabay.com/api/?key=",S="&image_type=photo&orientation=horizontal&safesearch=true&per_page=15";async function u(r,t){try{return(await L.get(E+P+`&q=${r}`+S+`&page=${t}`)).data}catch{throw new Error("Failed to fetch photos")}}function f(r,t){const a=r.map(({webformatURL:c,largeImageURL:e,tags:o,likes:l,views:g,comments:m,downloads:b})=>`<li class="search-list-item">
                    <a class="gallery-link" href="${e}">
                      <img class="search-list-img" src="${c}" alt="${o}" />
                    </a>
                    <ul>
                      <li>
                        <h3>Likes</h3>
                        <p>${l}</p>
                      </li>
                      <li>
                        <h3>Views</h3>
                        <p>${g}</p>
                      </li>
                      <li>
                        <h3>Comments</h3>
                        <p>${m}</p>
                      </li>
                      <li>
                        <h3>Downloads</h3>
                        <p>${b}</p>
                      </li>
                    </ul>
                  </li>`).join("");t.insertAdjacentHTML("beforeend",a)}const y=document.querySelector(".search-form"),d=document.querySelector(".gallery"),s=document.querySelector(".load-more"),n=document.querySelector(".loader");let h=1,p="";s.style.display="none";n.style.display="none";y.addEventListener("submit",async r=>{if(r.preventDefault(),p=y.elements.searchQuery.value.trim(),!p){i.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}d.innerHTML="",h=1,s.style.display="none",n.style.display="block";try{const t=await u(p,h);if(t.hits.length===0){i.warning({title:"Warning",message:"No images found for your search query.",position:"topRight"}),n.style.display="none";return}f(t.hits,d),t.hits.length<15?(s.style.display="none",i.info({title:"Info",message:"You have reached the end of the images.",position:"topRight"})):s.style.display="block"}catch(t){console.error("Error fetching photos:",t),i.error({title:"Error",message:"Failed to fetch images. Please try again later.",position:"topRight"})}finally{n.style.display="none"}});s.addEventListener("click",async()=>{s.style.display="none",n.style.display="block";try{const r=await u(p,++h);f(r.hits,d),r.hits.length<15?(s.style.display="none",i.info({title:"Info",message:"You have reached the end of the images.",position:"topRight"})):s.style.display="block"}catch(r){console.error("Error fetching more photos:",r),i.error({title:"Error",message:"Failed to load more images. Please try again later.",position:"topRight"})}finally{n.style.display="none"}});new w(".gallery a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map
