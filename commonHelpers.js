import{a as v,S as P,i as w}from"./assets/vendor-c493984e.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();async function h(r,e){const o="https://pixabay.com/api/?key=36655990-0724db180fb71d9be8c2c1bf3",a={method:"GET",params:{image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:"15",page:e,q:r}};return(await v.get(o,a)).data}const g="/goit-js-hw-11--/assets/x-icon-36b820d9.svg",S=document.querySelector(".container-imgs");function E({largeImageURL:r,webformatURL:e,tags:s,likes:n,views:t,comments:o,downloads:a}){return`<div class="gallery">
    <div class="container-img-wrap">
      <a href="${r}" class="img-link">
          <img src="${e}" alt="${s}" title="${s}" />
        </a>
    </div>
    <table border="0" class="image-descrip">
      <tr class="td-descrip">
        <td>Likes</td>
        <td>Views</td>
        <td>Comments</td>
        <td>Downloads</td>
      </tr>
      <tr class="td-result">
        <td>${n}</td>
        <td>${t}</td>
        <td>${o}</td>
        <td>${a}</td>
      </tr>
    </table>
  </div>`}function I(r){return r.map(E).join("")}function p(r){const e=I(r);S.insertAdjacentHTML("beforeend",e)}const i={searchForm:document.querySelector(".form"),loadDiv:document.querySelector(".loader"),loadMorePictures:document.querySelector(".load-morepics"),userKeyWordInput:document.querySelector(".data-userInput"),containerForImages:document.querySelector(".container-imgs")},y=new P(".container-img-wrap a",{close:!0,captionsData:"alt",captionDelay:50,captionsPosition:"bottom",animationSpeed:1,captionSelector:"img",loop:!0});let c,d,l;i.searchForm.addEventListener("submit",M);i.loadMorePictures.addEventListener("click",$);async function M(r){if(r.preventDefault(),l=i.userKeyWordInput.value.trim(),c=1,L(),!l){d=0,m(),f(),i.containerForImages.innerHTML="",u("Empty field!","green","black",!1);return}try{const e=await h(l,c);e.totalHits===0&&u("Sorry, there are no images matching your search query. Please try again!","red","white",g);const s=e.hits;d=Math.ceil(e.totalHits/20),i.containerForImages.innerHTML="",p(s),y.refresh()}catch{u("Error occured! Please, try again! ","red","white",g),d=0,i.containerForImages.innerHTML=""}finally{m()}f(),r.target.reset()}async function $(){c+=1,L();const r=await h(l,c);p(r.hits),y.refresh(),f(),m(),c===d&&u("We are sorry, but you have reached the end of search results.","lightblue","white",!1);const e=i.containerForImages.firstElementChild.getBoundingClientRect().height;scrollBy({behavior:"smooth",top:e*3})}function O(){i.loadMorePictures.classList.remove("hidden")}function q(){i.loadMorePictures.classList.add("hidden")}function m(){c>=d?q():O()}function L(){i.loadDiv.classList.remove("hidden")}function f(){i.loadDiv.classList.add("hidden")}function u(r,e,s,n){w.error({position:"topRight",iconUrl:n,message:r,messageColor:s,messageSize:"16",messageLineHeight:"15",backgroundColor:e,timeout:5e3,displayMode:2,close:!0,closeOnEscape:!0,closeOnClick:!0})}
//# sourceMappingURL=commonHelpers.js.map
