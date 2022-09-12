import ImagesApiServise from './fetchImages'
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";



const imagesApiServise = new ImagesApiServise();
const refs = {
    searchForm: document.querySelector('#search-form'),
    imagesContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
    
}
const perPage = 40;
const gallery = new SimpleLightbox(".gallery a");
refs.loadMoreBtn.hidden = true;
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);



function onSearch(evt) {
    evt.preventDefault();
    imagesApiServise.query = evt.currentTarget.elements.searchQuery.value
   
    if (imagesApiServise.query === '') {
        clearImageContainer()
        noticeNoEmptySearch()
        refs.loadMoreBtn.hidden = true;
       
        return;
    }
    imagesApiServise.resetPage()
    imagesApiServise.fetchImages().then(data => {
        if (data.totalHits === 0) {
            noticeNoImagesFound()
            refs.loadMoreBtn.hidden = true;
        } else {
           clearImageContainer()
           createImageCard(data.hits)
           gallery.refresh(); 
           noticeImagesFound(data)
            refs.loadMoreBtn.hidden = true;
        if (data.totalHits >= perPage) {
            refs.loadMoreBtn.hidden = false
        }
        }
      })
    .catch(error => console.log(error))
    
   
}

function onLoadMore() {
        imagesApiServise.fetchImages().then(data => {
        createImageCard(data.hits)
        gallery.refresh(); 
        const totalPage = Math.ceil(data.totalHits / perPage)
        const currentPage = imagesApiServise.page - 1
        if (totalPage <  currentPage) {
            noticeEndSearch()
            refs.loadMoreBtn.hidden = true;
         }
    })
       .catch(error => console.log(error))
  
}

 function createImageCard(hits) {
        
    const markup = hits
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
           
                <div class="photo-card">
                <a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                    <b>Likes ${likes}</b>
                    </p>
                    <p class="info-item">
                    <b>Views ${views}</b>
                    </p>
                    <p class="info-item">
                    <b>Comments ${comments}</b>
                    </p>
                    <p class="info-item">
                    <b>Downloads ${downloads}</b>
                    </p>
                </div></a>
        </div>
        `
    })
    .join('')
      refs.imagesContainer.insertAdjacentHTML('beforeend', markup)
 }

function clearImageContainer() {
    refs.imagesContainer.innerHTML = ''
}

function noticeNoEmptySearch() {
     Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.')
}

function noticeImagesFound(data) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

function noticeEndSearch() {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
}

function noticeNoImagesFound() {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

























// import './css/styles.css';
// import API from './fetchCountries'
// import debounce from 'lodash.debounce';
// import Notiflix from 'notiflix';

// const DEBOUNCE_DELAY = 300;
// const inputCountry = document.querySelector('#search-box')
// const countryInfo = document.querySelector('.country-info')
// const countryList = document.querySelector('.country-list')

// inputCountry.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))

// function onSearch() {
//     let name = inputCountry.value.trim();
//     if (name === '') {
//         return (countryList.innerHTML = ''), (countryInfo.innerHTML = '')
//     }

//     API.fetchCountries(name)
//         .then(countries => {
//             countryList.innerHTML = '';
//             countryInfo.innerHTML = '';

//             if (countries.length === 1) {
//                 countryList.insertAdjacentHTML('beforeend', createCountryList(countries))
//                 countryInfo.insertAdjacentHTML('beforeend', createCountryCard(countries))
//             } else if (countries.length >= 10) {
//                 Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
//             } else {
//                 countryList.insertAdjacentHTML('beforeend', createCountryList(countries))
//             }
//         })
//         .catch(countries => {
//             Notiflix.Notify.failure('Oops, there is no country with that name');
//         })
// }
       
   
// function createCountryCard(countries) {
//     const markup = countries
//     .map(({ capital, population, languages }) => {
//       return `
//         <ul class="country-info__list">
//             <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
//             <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
//             <li class="country-info__item"><p><b>Languages: </b>${Object.values(languages).join(', ')}</p></li>
//         </ul>
//         `
//     })
//     .join('')
//   return markup
  
// }

// function createCountryList(countries) {
//     const markup = countries
//         .map(({ name, flags }) => {
//             return `
//           <li class="country-list__item">
//               <img class="country-list__flag" src="${flags.svg}" alt="${name.official}" width = 40px height = 25px>
//               <h2 class="country-list__name">${name.official}</h2>
//           </li>
//           `
//         })
//         .join('')
//     return markup
// }
