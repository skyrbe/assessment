export const GET_BOOKS_REQUESTED = 'books/BOOKS_REQUESTED';
export const GET_BOOKS_SUCCESS = 'books/BOOKS_SUCCESS';
export const GET_BOOKS_FAILURE = 'books/BOOKS_FAILURE';

export const SEARCH_BOOKS_REQUESTED = 'books/SEARCH_REQUESTED';
export const SEARCH_BOOKS_SUCCESS = 'books/SEARCH_SUCCESS';
export const SEARCH_BOOKS_FAILURE = 'books/SEARCH_FAILURE';

export const UPDATE_BOOKS_REQUESTED = 'books/UPDATE_REQUESTED';
export const UPDATE_BOOKS_SUCCESS = 'books/UPDATE_SUCCESS';
export const UPDATE_BOOKS_FAILURE = 'books/UPDATE_FAILURE';

const initialState = {
  loading: false,
  loaded: false,
  error: false,
  data: null,
  searchLoading: false,
  searchLoaded: false,
  searchError: false,
  searchData: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS_REQUESTED: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case GET_BOOKS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        loaded: true,
        data: action.result,
      };
    }
    case GET_BOOKS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true
      };
    }
    case SEARCH_BOOKS_REQUESTED: {
      return {
        ...state,
        searchLoading: true,
        searchLoaded: false
      };
    }
    case SEARCH_BOOKS_SUCCESS: {
      return {
        ...state,
        searchLoading: false,
        searchError: false,
        searchLoaded: true,
        searchData: action.result,
      };
    }
    case SEARCH_BOOKS_FAILURE: {
      return {
        ...state,
        searchLoading: false,
        searchLoaded: false,
        searchError: true
      };
    }

    case UPDATE_BOOKS_REQUESTED: {
      return state;
    }
    case UPDATE_BOOKS_SUCCESS: {
      const pageType = action.payload.pageType.toLowerCase();
      const data = pageType === 'search' ? [...state.searchData] : [...state.data];
      const existingBooks = data;
      const { itemId, shelfType, isInShelf } = action.payload;

      const objIndex = existingBooks.findIndex(obj => obj.id === itemId);

      // make new object of updated object.
      const updatedObj = { ...existingBooks[objIndex], shelfType, isInShelf };

      const updatedBooks = [
        ...existingBooks.slice(0, objIndex),
        updatedObj,
        ...existingBooks.slice(objIndex + 1),
      ];

      const stateToUpdate = pageType === 'search' ? { searchData: updatedBooks } : { data: updatedBooks };
      return {
        ...state,
        ...stateToUpdate
      };
    }
    case UPDATE_BOOKS_FAILURE: {
      return state;
    }

    default:
      return state;
  }
};

export const getAllBooks = () => {
  return {
    types: [GET_BOOKS_REQUESTED, GET_BOOKS_SUCCESS, GET_BOOKS_FAILURE],
    promise: client => client.get('books')
  };
};

export const searchBooks = (searchTerm) => {
  return {
    types: [SEARCH_BOOKS_REQUESTED, SEARCH_BOOKS_SUCCESS, SEARCH_BOOKS_FAILURE],
    promise: client => client.get(`books?name_like=${searchTerm}`)
  };
};

export const changeShelf = (itemId, shelfType, pageType = 'home') => {
  const data = {
    shelfType
  };

  if (pageType.toLowerCase() === 'search') {
    data.isInShelf = true;
  }

  return {
    types: [UPDATE_BOOKS_REQUESTED, UPDATE_BOOKS_SUCCESS, UPDATE_BOOKS_FAILURE],
    promise: client => client.patch(`books/${itemId}`, {
      data
    }),
    payload: {
      itemId,
      shelfType,
      pageType,
      isInShelf: data.isInShelf
    }
  };
};
