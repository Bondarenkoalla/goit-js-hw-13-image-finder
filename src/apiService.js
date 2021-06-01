

export default class PictureApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchPictures() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=21861129-b5e52c4cca63d1835e3548bf1`;
    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incremenPage();
        return  hits ;
      }) .catch(error => console.log('error', error));
  }

  incremenPage() {
    this.page += 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  resetPage() {
    this.page = 1;
  }
}
