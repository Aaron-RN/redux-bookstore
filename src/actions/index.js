import axios from 'axios';

const URL = 'https://arn-bookstore-backend.herokuapp.com/';

const FETCH_REQUEST = 'FETCH_REQUEST';
const FETCH_REQUEST_SUCCESS = 'FETCH_REQUEST_SUCCESS';
const FETCH_REQUEST_FAILURE = 'FETCH_REQUEST_FAILURE';
const FETCH_BOOKLIST = 'FETCH_BOOKLIST';
const FETCH_GENRES = 'FETCH_GENRES';
const CREATE_GENRE = 'CREATE_GENRE';
const REMOVE_GENRE = 'REMOVE_GENRE';
const CREATE_COMMENT = 'CREATE_COMMENT';
const REMOVE_COMMENT = 'REMOVE_COMMENT';
const CREATE_BOOK = 'CREATE_BOOK';
const REMOVE_BOOK = 'REMOVE_BOOK';
const CHANGE_FILTER = 'CHANGE_FILTER';
const TOGGLE_MODAL = 'TOGGLE_MODAL';

const fetchRequest = () => ({
  type: FETCH_REQUEST,
});

const fetchRequestSuccess = response => ({
  type: FETCH_REQUEST_SUCCESS,
  response,
});
const fetchRequestFailure = response => ({
  type: FETCH_REQUEST_FAILURE,
  response,
});

const fetchBookListSuccess = books => ({
  type: FETCH_BOOKLIST,
  response: books,
});

const fetchGenresSuccess = genres => ({
  type: FETCH_GENRES,
  response: genres,
});

const createBook = book => ({
  type: CREATE_BOOK,
  book,
});

const removeBook = book => ({
  type: REMOVE_BOOK,
  book,
});

const createComment = comment => ({
  type: CREATE_COMMENT,
  comment,
});

const removeComment = comment => ({
  type: REMOVE_COMMENT,
  comment,
});

const createGenre = genre => ({
  type: CREATE_GENRE,
  genre,
});

const removeGenre = genre => ({
  type: REMOVE_GENRE,
  genre,
});

const changeFilter = genre => ({
  type: CHANGE_FILTER,
  genre,
});

const toggleModal = () => ({
  type: TOGGLE_MODAL,
});


// Asyncronous Requests to Backend API

// BookList Populate List
const fetchBookList = () => dispatch => {
  dispatch(fetchRequest());
  axios.get(`${URL}`)
    .then(response => {
      dispatch(fetchRequestSuccess(response.statusText));
      dispatch(fetchBookListSuccess(response.data));
    })
    .catch(error => {
      dispatch(fetchRequestFailure(error.response.data.error));
    });
};

// Genres Populate List
const fetchGenres = () => dispatch => {
  dispatch(fetchRequest());
  axios.get(`${URL}api/v1/genre`)
    .then(response => {
      dispatch(fetchRequestSuccess(response.statusText));
      dispatch(fetchGenresSuccess(response.data));
    })
    .catch(error => {
      dispatch(fetchRequestFailure(error.response.data.error));
    });
};

// Book requests
const addBookToList = book => dispatch => {
  dispatch(fetchRequest());
  axios.post(`${URL}api/v1/books`, {
    title: book.title,
    author: book.author,
    genre: book.genre,
  })
    .then(response => {
      const newBook = response.data;
      dispatch(fetchRequestSuccess(response.data.message));
      dispatch(createBook(newBook.data));
    })
    .catch(error => {
      dispatch(fetchRequestFailure(error.response.data.error));
    });
};

const removeBookFromList = book => dispatch => {
  dispatch(fetchRequest());
  axios.delete(`${URL}api/v1/books/${book.id}`)
    .then(response => {
      dispatch(fetchRequestSuccess(response.data.message));
      dispatch(removeBook(book));
    })
    .catch(error => {
      dispatch(fetchRequestFailure(error.response.data.error));
    });
};

// Comments requests
const addCommentToBook = (book, comment) => dispatch => {
  dispatch(fetchRequest());
  axios.post(`${URL}api/v1/books/${book.id}/comments`, {
    body: comment,
  })
    .then(response => {
      dispatch(fetchRequestSuccess(response.data.message));
      dispatch(createComment(book, comment));
    })
    .catch(error => {
      dispatch(fetchRequestFailure(error.response.data.error));
    });
};

const removeCommentFromBook = (book, comment) => dispatch => {
  dispatch(fetchRequest());
  axios.delete(`${URL}api/v1/books/${book.id}`)
    .then(response => {
      dispatch(fetchRequestSuccess(response.data.message));
      dispatch(removeComment(book, comment));
    })
    .catch(error => {
      dispatch(fetchRequestFailure(error.response.data.error));
    });
};

// Genres requests
const addGenreToDB = genre => dispatch => {
  dispatch(fetchRequest());
  axios.post(`${URL}api/v1/genre`, {
    name: genre,
  })
    .then(response => {
      dispatch(fetchRequestSuccess(response.data.message));
      dispatch(createGenre(genre));
    })
    .catch(error => {
      dispatch(fetchRequestFailure(error.response.data.error));
    });
};

const removeGenreFromDB = genre => dispatch => {
  dispatch(fetchRequest());
  axios.delete(`${URL}api/v1/genre/${genre.id}`)
    .then(response => {
      dispatch(fetchRequestSuccess(response.data.message));
      dispatch(removeGenre(genre));
    })
    .catch(error => {
      dispatch(fetchRequestFailure(error.response.data.error));
    });
};

export {
  CREATE_BOOK, REMOVE_BOOK, CHANGE_FILTER, FETCH_BOOKLIST,
  FETCH_GENRES, CREATE_GENRE, REMOVE_GENRE, CREATE_COMMENT, REMOVE_COMMENT,
  FETCH_REQUEST, FETCH_REQUEST_SUCCESS, FETCH_REQUEST_FAILURE,
  TOGGLE_MODAL,
  changeFilter, addBookToList, removeBookFromList,
  fetchBookList, fetchGenres, addGenreToDB, removeGenreFromDB,
  addCommentToBook, removeCommentFromBook,
  toggleModal,
};
