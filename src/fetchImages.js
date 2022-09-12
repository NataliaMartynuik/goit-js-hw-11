import axios from 'axios'

const axios = require('axios');
const KEY = '29822317-9536f778ac0e6fb075a845c56'
const BASE_URL = 'https://pixabay.com/api/'
export default class ImagesApiServise {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
     }
    
    async fetchImages() {
        axios.defaults.baseURL = BASE_URL
        const response = await axios.get(`?key=${KEY}&q=${this.searchQuery}&image_type=photo&pretty=true&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
        const data = await response.data
           
        this.incrementPage()
        
        return data
        
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