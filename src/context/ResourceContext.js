/**
 * ResourceContext.js
 * 
 * This file implements the ResourceContext provider for global state management of resources.
 * It uses React's Context API and useReducer hook to manage the state of resources,
 * including loading from localStorage, filtering, and CRUD operations.
 */

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { tagsStore } from '../models';

// Create the context
const ResourceContext = createContext();

// Initial state for the resource reducer
const initialState = {
  resources: [],
  loading: false,
  error: null,
  filters: {
    type: null,
    tags: [],
    search: ''
  }
};

/**
 * Resource reducer function to handle all resource-related actions
 * @param {Object} state - Current state
 * @param {Object} action - Action with type and payload
 * @returns {Object} New state
 */
function resourceReducer(state, action) {
  switch (action.type) {
    case 'FETCH_RESOURCES_START':
      return { ...state, loading: true, error: null };
    
    case 'FETCH_RESOURCES_SUCCESS':
      return { 
        ...state, 
        resources: action.payload, 
        loading: false,
        error: null
      };
    
    case 'FETCH_RESOURCES_ERROR':
      return { 
        ...state, 
        error: action.payload, 
        loading: false 
      };
    
    case 'ADD_RESOURCE':
      // Add a new resource to the state and persist to localStorage
      const updatedResources = [...state.resources, action.payload];
      localStorage.setItem('resources', JSON.stringify(updatedResources));
      return { 
        ...state, 
        resources: updatedResources 
      };
    
    case 'UPDATE_RESOURCE':
      // Update an existing resource
      const updatedResourceList = state.resources.map(resource => 
        resource.id === action.payload.id ? action.payload : resource
      );
      localStorage.setItem('resources', JSON.stringify(updatedResourceList));
      return {
        ...state,
        resources: updatedResourceList
      };
    
    case 'DELETE_RESOURCE':
      // Remove a resource
      const filteredResources = state.resources.filter(
        resource => resource.id !== action.payload
      );
      localStorage.setItem('resources', JSON.stringify(filteredResources));
      return {
        ...state,
        resources: filteredResources
      };
    
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
 * ResourceProvider component that provides the resource state and dispatch function
 * to all child components
 */
export function ResourceProvider({ children }) {
  const [state, dispatch] = useReducer(resourceReducer, initialState);
  
  // Load resources from localStorage on mount
  useEffect(() => {
    dispatch({ type: 'FETCH_RESOURCES_START' });
    try {
      const storedResources = localStorage.getItem('resources');
      const resources = storedResources ? JSON.parse(storedResources) : [];
      dispatch({ type: 'FETCH_RESOURCES_SUCCESS', payload: resources });
    } catch (error) {
      dispatch({ type: 'FETCH_RESOURCES_ERROR', payload: error.message });
      console.error('Error loading resources from localStorage:', error);
    }
  }, []);
  
  // Create a memoized context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  
  return (
    <ResourceContext.Provider value={contextValue}>
      {children}
    </ResourceContext.Provider>
  );
}

/**
 * Custom hook to use the resource context
 * @returns {Object} Context containing state and dispatch function
 */
export function useResources() {
  const context = useContext(ResourceContext);
  if (context === undefined) {
    throw new Error('useResources must be used within a ResourceProvider');
  }
  return context;
}

/**
 * Helper function to filter resources based on current filters
 * @param {Array} resources - Array of resources to filter
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered resources
 */
export function filterResources(resources, filters) {
  let result = [...resources];
  
  // Filter by resource type
  if (filters.type) {
    result = result.filter(resource => resource.type === filters.type);
  }
  
  // Filter by search term (case insensitive)
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    result = result.filter(resource => 
      resource.title.toLowerCase().includes(searchLower) || 
      (resource.description && resource.description.toLowerCase().includes(searchLower))
    );
  }
  
  // Filter by tags (resources must have ALL selected tags)
  if (filters.tags && filters.tags.length > 0) {
    result = result.filter(resource => 
      filters.tags.every(tagId => {
        // Check if the resource has this tag
        return resource.tags && resource.tags.includes(tagId);
      })
    );
  }
  
  return result;
}