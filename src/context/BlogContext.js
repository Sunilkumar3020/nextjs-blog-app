import { blogReducer, initialBLogState } from "@/reducers/blogReducer";

const { createContext, useReducer, useEffect, useContext } = require("react");

const BlogContext = createContext();


export const BlogProvider = ({ children }) => {

    const [state, dispatch] = useReducer(blogReducer, initialBLogState)

    // fetchPosts all post
    const fetchPosts = async () => {
        dispatch({ type: 'SET_LOADING', payload: true })
        try {
            const response = await fetch('/api/posts')
            const data = await response.json()
            if (data.success) {
                dispatch({ type: 'SET_POSTS', payload: data.posts })
            } else {
                dispatch({ type: 'SET_ERROR', payload: data.message })
            }
        }
        catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch posts' })
        }
    }
    // Create new post
    const createPost = async (postData) => {
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData)
            });
            const data = await response.json()
            if (data.success) {
                dispatch({ type: 'ADD_POST', payload: data.post })
                return { success: true }
            }
        }
        catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to create post' });
            return { success: false, message: 'Failed to create post' }
        }
    }

    // updatePost

    const updatePost = async (id, postData) => {
        try {
            const response = await fetch(`/api/post/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData)
            })
            const data = await response.json();
            if (data.success) {
                dispatch({ type: 'UPDATE_POST', payload: data.post });
                return { success: true };

            }
            else {
                dispatch({ type: 'SET_ERROR', payload: data.message })
                return { success: false, message: data.message }
            }
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to update post' });
            return { success: false, message: 'Failed to update post' }
        }
    }

    // deletePost

    const deletePost = async (id) => {
        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'DELETE'
            })
            const data = await response.json();
            if (data.success) {
                dispatch({ type: 'DELETE_POST', payload: id });
                return { success: true }
            } else {
                dispatch({ type: 'SET_ERROR', payload: data.message });
                return { success: false, message: 'Failed to delete post' }
            }
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to delete post' });
            return { success: false, message: 'Failed to delete post' }
        }
    }

    // setCurrentPost

    const setCurrentPost = (post) => {
        dispatch({ type: 'SET_CURRENT_POST', payload: post })
    }

    // setFilter

    const setFilter = (filter) => {
        dispatch({ type: 'SET_FILTER', payload: filter })
    }

    // setSearch

    const setSearch = (term) => {
        dispatch({ type: 'SET_SEARCH', payload: term })
    }

    //Load post on mount
    useEffect(() => {
        fetchPosts();
    }, [])

    return (
        <BlogContext.Provider value={{ state, fetchPosts, createPost, updatePost, deletePost, setCurrentPost, setFilter, setSearch }}>
            {children}
        </BlogContext.Provider>
    )
}

export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error('useBlog must be used within BlogProvider')
    }
    return context;

}