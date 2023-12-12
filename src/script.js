const accessKey=`nZ2WnVY7297XBr4elJeBhCsE4eTFwulJTzcL9N9dfPM`;

const formEl=document.querySelector("form");
const inputEl=document.getElementById("search-input");
const searchResult=document.querySelector(".search-results");
const showMore=document.getElementById("show-more-button");

let inputData="";
let page=1;
async function seacrImages(){
    inputData=inputEl.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    
    const responce=await fetch(url);
    const data=await responce.json();

    const results=data.results;

    if(page==1){
        searchResult.innerHTML="";
    }

    results.map((result)=>{
        const imageWrapper=document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image =document.createElement("img");
        image.src=result.urls.small;
        image.alt=result.alt_description;
        const imageLink=document.createElement("a");
        imageLink.href=result.links.html;
        imageLink.target="-blank";
        imageLink.textContent=result.alt_description

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResult.appendChild(imageWrapper);

    });
    page++;
    if(page>1){
        showMore.style.display="block";
    }

}

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    page=1;
    seacrImages();
})

showMore.addEventListener("click",()=>{
    seacrImages();
})
