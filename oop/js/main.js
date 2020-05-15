let url = 'http://omdbapi.com';
let api_key = "29278bb8";

let client = new OMDBClient(url, api_key);

document.querySelector("#submit-button").addEventListener("click", () => {
    let  keyword = document.querySelector("#keyword").value;
    client.search(keyword);
    
});


client.plot_container.addEventListener("click", (e) => {
    let id = e.target.dataset.id;
    let result = client.get_by_id(id)
    client.plot_container.appendChild(result.Plot)
    
})

/*document.addEventListener('click',function(e){
    if(e.target.className==='plot'){
        alert(e.target.dataset.id);
    }
})*/
/*let last_searches = localStorage.getItem("last-searches");
if (last_searches == undefined) {
   last_searches = [];
} else {
   last_searches = last_searches.split(",");
}

let textToDisplay = "";
if(last_searches.length < 1 ) {
	textToDisplay = "You haven't searched before";
} else {
  last_searches.map()
}
*/