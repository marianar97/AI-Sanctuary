/**
 * TagContext.js
 * 
 * This file implements the TagContext provider for global state management of tags.
 * It uses React's Context API and useReducer hook to manage the state of tags,
 * including loading from localStorage, filtering, and CRUD operations.
 */

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import tagsStore from '../models/tagsStore';
import { isLocalStorageAvailable } from '../utils/localStorage';

// Create the context
const TagContext = createContext();

// Initial state for the tag reducer
const initialState = {
  tags: [],
  categories: [],
  loading: false,
  error: null,
  filters: {
    category: null,
    search: ''
  }
};

/**
 * Tag reducer function to handle all tag-related actions
 * @param {Object} state - Current state
 * @param {Object} action - Action with type and payload
 * @returns {Object} New state
 */
function tagReducer(state, action) {
  switch (action.type) {
    case 'FETCH_TAGS_START':
      return { ...state, loading: true, error: null };
    
    case 'FETCH_TAGS_SUCCESS':
      return { 
        ...state, 
        tags: action.payload.tags, 
        categories: action.payload.categories,
        loading: false,
        error: null
      };
    
    case 'FETCH_TAGS_ERROR':
      return { 
        ...state, 
        error: action.payload, 
        loading: false 
      };
    
    case 'ADD_TAG':
      try {
        // Add a new tag using tagsStore
        const newTag = tagsStore.addTag(action.payload);
        return { 
          ...state, 
          tags: [...state.tags, newTag],
          // Update categories if this tag has a new category
          categories: action.payload.category && !state.categories.includes(action.payload.category)
            ? [...state.categories, action.payload.category]
            : state.categories
        };
      } catch (error) {
        return {
          ...state,
          error: error.message
        };
      }
    
    case 'UPDATE_TAG':
      try {
        // Update an existing tag
        const updatedTag = tagsStore.updateTag(action.payload.id, action.payload);
        if (!updatedTag) {
          return {
            ...state,
            error: `Tag with ID ${action.payload.id} not found`
          };
        }
        
        // Update the tags array
        const updatedTags = state.tags.map(tag => 
          tag.id === updatedTag.id ? updatedTag : tag
        );
        
        // Check if we need to update categories
        let updatedCategories = [...state.categories];
        if (updatedTag.category && !state.categories.includes(updatedTag.category)) {
          updatedCategories.push(updatedTag.category);
        }
        
        return {
          ...state,
          tags: updatedTags,
          categories: updatedCategories
        };
      } catch (error) {
        return {
          ...state,
          error: error.message
        };
      }
    
    case 'DELETE_TAG':
      try {
        // Remove a tag
        const removed = tagsStore.removeTag(action.payload);
        if (!removed) {
          return {
            ...state,
            error: `Tag with ID ${action.payload} not found`
          };
        }
        
        const filteredTags = state.tags.filter(tag => tag.id !== action.payload);
        
        // Recalculate categories based on remaining tags
        const remainingCategories = new Set(filteredTags.map(tag => tag.category).filter(Boolean));
        
        return {
          ...state,
          tags: filteredTags,
          categories: Array.from(remainingCategories)
        };
      } catch (error) {
        return {
          ...state,
          error: error.message
        };
      }
    
    case 'SET_FILTER':
      // Update a specific filter
      return { 
        ...state, 
        filters: { 
          ...state.filters, 
          [action.payload.key]: action.payload.value 
        } 
      };
    
    case 'CLEAR_FILTERS':
      // Reset all filters to initial values
      return {
        ...state,
        filters: initialState.filters
      };
    
    default:
      return state;
  }
}

/**
 * TagProvider component that provides the tag state and dispatch function
 * to all child components
 */
export function TagProvider({ children }) {
  const [state, dispatch] = useReducer(tagReducer, initialState);
  
  // Load tags from tagsStore on mount
  useEffect(() => {
    dispatch({ type: 'FETCH_TAGS_START' });
    try {
      // Check if localStorage is available
      if (isLocalStorageAvailable()) {
        // Load tags from localStorage via tagsStore
        tagsStore.loadTags();
        const tags = tagsStore.tags;
        const categories = tagsStore.getAllCategories();
        
        dispatch({ 
          type: 'FETCH_TAGS_SUCCESS', 
          payload: { tags, categories } 
        });
      } else {
        // If localStorage is not available, use empty arrays
        dispatch({ 
          type: 'FETCH_TAGS_SUCCESS', 
          payload: { tags: [], categories: [] } 
        });
        console.warn('localStorage is not available. Tags will not persist.');
      }
    } catch (error) {
      dispatch({ type: 'FETCH_TAGS_ERROR', payload: error.message });
      console.error('Error loading tags:', error);
    }
  }, []);
  
  // Create a memoized context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  
  return (
    <TagContext.Provider value={contextValue}>
      {children}
    </TagContext.Provider>
  );
}

/**
 * Custom hook to use the tag context
 * @returns {Object} Context containing state and dispatch function
 */
export function useTags() {
  const context = useContext(TagContext);
  if (context === undefined) {
    throw new Error('useTags must be used within a TagProvider');
  }
  return context;
}

/**
 * Helper function to filter tags based on current filters
 * @param {Array} tags - Array of tags to filter
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered tags
 */
export function filterTags(tags, filters) {
  let result = [...tags];
  
  // Filter by category
  if (filters.category) {
    result = result.filter(tag => tag.category === filters.category);
  }
  
  // Filter by search term (case insensitive)
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    result = result.filter(tag => 
      tag.name.toLowerCase().includes(searchLower)
    );
  }
  
  return result;
}