import axios from 'axios'

export default class ImagesApiServise {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
     }
    
    async fetchImages() {
        axios.defaults.baseURL = 'https://pixabay.com/api/'
        const KEY = '29822317-9536f778ac0e6fb075a845c56'

            const response = await axios.get(`?key=${KEY}&q=${this.searchQuery}&image_type=photo&pretty=true&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
        console.log(response)
        
            this.incrementPage()
        return response.data.hits
        
         
    }

    incrementPage() {
        this.page += 1
    }

    resetPage() {
        this.page = 1
    }

    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery
    } 
}