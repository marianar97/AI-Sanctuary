/**
 * useResourceHooks.js
 * 
 * This file implements custom hooks for accessing and manipulating resource state from components.
 * These hooks provide a simplified interface for common resource operations by leveraging the base
 * ResourceContext.
 */

import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useResources, filterResources } from '../context/ResourceContext';

/**
 * Hook for adding a new resource
 * @returns {Function} Function to add a resource
 */
export function useAddResource() {
  const { dispatch } = useResources();
  
  return useCallback((resource) => {
    // Generate a unique ID if not provided
    const newResource = {
      ...resource,
      id: resource.id || uuidv4(),
      createdAt: resource.createdAt || new Date().toISOString()
    };
    
    dispatch({ type: 'ADD_RESOURCE', payload: newResource });
    return newResource;
  }, [dispatch]);
}

/**
 * Hook for updating an existing resource
 * @returns {Function} Function to update a resource
 */
export function useUpdateResource() {
  const { dispatch } = useResources();
  
  return useCallback((resource) => {
    if (!resource.id) {
      throw new Error('Cannot update a resource without an id');
    }
    
    const updatedResource = {
      ...resource,
      updatedAt: new Date().toISOString()
    };
    
    dispatch({ type: 'UPDATE_RESOURCE', payload: updatedResource });
    return updatedResource;
  }, [dispatch]);
}

/**
 * Hook for deleting a resource
 * @returns {Function} Function to delete a resource by id
 */
export function useDeleteResource() {
  const { dispatch } = useResources();
  
  return useCallback((resourceId) => {
    if (!resourceId) {
      throw new Error('Cannot delete a resource without an id');
    }
    
    dispatch({ type: 'DELETE_RESOURCE', payload: resourceId });
    return resourceId;
  }, [dispatch]);
}

/**
 * Hook for filtering resources
 * @returns {Object} Filtered resources and filter management functions
 */
export function useFilterResources() {
  const { state, dispatch } = useResources();
  
  const setFilter = useCallback((key, value) => {
    dispatch({ 
      type: 'SET_FILTER', 
      payload: { key, value } 
    });
  }, [dispatch]);
  
  const clearFilters = useCallback(() => {
    dispatch({ type: 'CLEAR_FILTERS' });
  }, [dispatch]);
  
  // Apply filters to resources
  const filteredResources = filterResources(state.resources, state.filters);
  
  return {
    resources: filteredResources,
    filters: state.filters,
    setFilter,
    clearFilters,
    setTypeFilter: (type) => setFilter('type', type),
    setTagsFilter: (tags) => setFilter('tags', tags),
    setSearchFilter: (search) => setFilter('search', search)
  };
}

/**
 * Hook for accessing all resources and their loading/error state
 * @returns {Object} Resources data with loading and error states
 */
export function useResourcesData() {
  const { state } = useResources();
  
  return {
    resources: state.resources,
    isLoading: state.loading,
    error: state.error
  };
}

/**
 * Hook for finding a resource by id
 * @returns {Function} Function to get a resource by id
 */
export function useResourceById() {
  const { state } = useResources();
  
  return useCallback((resourceId) => {
    if (!resourceId) return null;
    return state.resources.find(resource => resource.id === resourceId) || null;
  }, [state.resources]);
}

/**
 * Hook for getting resources by type
 * @returns {Function} Function to get resources by type
 */
export function useResourcesByType() {
  const { state } = useResources();
  
  return useCallback((type) => {
    if (!type) return state.resources;
    return state.resources.filter(resource => resource.type === type);
  }, [state.resources]);
}

/**
 * Hook for getting resources by tag
 * @returns {Function} Function to get resources by tag id
 */
export function useResourcesByTag() {
  const { state } = useResources();
  
  return useCallback((tagId) => {
    if (!tagId) return state.resources;
    return state.resources.filter(resource => 
      resource.tags && resource.tags.includes(tagId)
    );
  }, [state.resources]);
}