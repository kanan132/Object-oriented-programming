class OMDBClient {
    constructor(url, api_key) {
        this.url = url;
        this.api_key = api_key;
        this.state = {}
    }

    render(data){
        console.log(data);
        document.querySelector("#main").innerHTML= data
                .map(movie=> this.render_data_to_dom(movie))
                .join("")
    }

    render_data_to_dom = (data) => {
        return  ` <div class="col-md-6">
            <ul>
                <h4>Title:</h4><li class="Title" >
                    ${data.Title}
                </li>
                <h4>Released:</h4><li class="Released">
                    ${data.Year}
                </li>
                <h4>imdb:</h4><li class="imdb">
                    ${data.imdbID}
                </li>
                <li id="plot-area">
                <p class="plot" data-id ="${data.imdbID}" >read plot</p>
                </li>
               
            </ul>
        </div>
        <div class="col-md-6">
            <img src="${data.Poster}" class="poster" />
        </div>`;
            
            
    }
    
    add_plot (arg){
        //<p class="plot" data-id ="${data.imdbID}" >read plot</p>
        let p=document.createElement("p");
        let plot_container = this.create_tag("h4", {'class': "plot", 'id': element.imdbID})
        p.appendChild(plot_container);
        let text=document.createTextNode("read plot");
        p.appendChild(text);
        plot_container.addEventListener("click", (e) => {
            let id = e.target.dataset.id;
        
            let result = client.get_by_id(id)
        
            plot_container.appendChild(result.Plot)
    
        })	
    
    plot_container.appendChild(plot_initial_text);
    return plot_container;
        
    }

    search(keyword) {
        let url = `${this.url}/?apikey=${this.api_key}&s=${keyword}`;
    
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                if(data.Response === 'True') {
                    this.state.search_results = data.Search;
                    this.render(this.state.search_results);
                    last_searches.push(keyword);
                } else {
                    alert("Failed to load data"); 
                }
            }).catch(err => console.log(err.message));
    }

    get_by_id(id) {
        let url = `${this.url}/?apikey=${this.api_key}&i=${id}`;
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                if(data.Response === 'True') {
                    this.state.movie = data
                    this.render(this.state.movie);
                } else {
                    alert("Failed to load data"); 
                }
            }).catch(err => console.log(err.message));
    } 

    movieStorage(keyword){
        window.localStorage.setItem(keyword, JSON.stringify(this.state.search_results));
    }
    
}


 /*render_data_to_dom = (element) => {
  
        let plot_container = create_tag("h5", {'class': "plot", 'id': element.imdbID})
        let plot_initial_text = document.createTextNode("Read Plot");
        
        plot_container.addEventListener("click", (e) => {
                let id = e.target.dataset.id;
            
            let result = client.get_by_id(id)
            
            plot_container.appendChild(result.Plot)
        
        })	
        
        plot_container.appendChild(plot_initial_text);
        return plot_cont*/