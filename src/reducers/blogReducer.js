export const initialBLogState = {
    posts: [],
    currentPost: null,
    loading: false,
    error: null,
    filter: 'all',
    searchTerm: '',
    totalPages: 1,
    currentPage: 1

}

export const blogReducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                ...state,
                posts: action.payload,
                loading: false,
                error: null
            }
        case 'ADD_POST':
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                error: null
            };
        case 'UPDATE_POST':
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post),
                currentPage: null,
                error: null
            }
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload),
                error: null
            }

        case 'SET_CURRENT_POST':
            return {
                ...state,
                currentPost: action.payload
            }
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case 'SET_SEARCH':
            return {
                ...state,
                searchTerm: action.payload
            }
        case 'INCREMENT_VIEWS':
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload ? { ...post, views: post.views + 1 } : post)
            }
        case 'TOGGLE_LIKE':
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload ? { ...post, likes: post.likes + 1 } : post)
            }
        default:
            return state;

    }
}