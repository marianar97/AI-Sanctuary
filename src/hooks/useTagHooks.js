/**
 * useTagHooks.js
 * 
 * This file implements custom hooks for accessing and manipulating tag state from components.
 * These hooks provide a simplified interface for common tag operations by leveraging the base
 * TagContext.
 */

import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTags, filterTags } from '../context/TagContext';

/**
 * Hook for adding a new tag
 * @returns {Function} Function to add a tag
 */
export function useAddTag() {
  const { dispatch } = useTags();
  
  return useCallback((tag) => {
    // Generate a unique ID if not provided
    const newTag = {
      ...tag,
      id: tag.id || uuidv4()
    };
    
    dispatch({ type: 'ADD_TAG', payload: newTag });
    return newTag;
  }, [dispatch]);
}

/**
 * Hook for updating an existing tag
 * @returns {Function} Function to update a tag
 */
export function useUpdateTag() {
  const { dispatch } = useTags();
  
  return useCallback((tag) => {
    if (!tag.id) {
      throw new Error('Cannot update a tag without an id');
    }
    
    dispatch({ type: 'UPDATE_TAG', payload: tag });
    return tag;
  }, [dispatch]);
}

/**
 * Hook for deleting a tag
 * @returns {Function} Function to delete a tag by id
 */
export function useDeleteTag() {
  const { dispatch } = useTags();
  
  return useCallback((tagId) => {
    if (!tagId) {
      throw new Error('Cannot delete a tag without an id');
    }
    
    dispatch({ type: 'DELETE_TAG', payload: tagId });
    return tagId;
  }, [dispatch]);
}

/**
 * Hook for filtering tags
 * @returns {Object} Filtered tags and filter management functions
 */
export function useFilterTags() {
  const { state, dispatch } = useTags();
  
  const setFilter = useCallback((key, value) => {
    dispatch({ 
      type: 'SET_FILTER', 
      payload: { key, value } 
    });
  }, [dispatch]);
  
  const clearFilters = useCallback(() => {
    dispatch({ type: 'CLEAR_FILTERS' });
  }, [dispatch]);
  
  // Apply filters to tags
  const filteredTags = filterTags(state.tags, state.filters);
  
  return {
    tags: filteredTags,
    filters: state.filters,
    setFilter,
    clearFilters,
    setCategoryFilter: (category) => setFilter('category', category),
    setSearchFilter: (search) => setFilter('search', search)
  };
}

/**
 * Hook for accessing all tags and their loading/error state
 * @returns {Object} Tags data with loading and error states
 */
export function useTagsData() {
  const { state } = useTags();
  
  return {
    tags: state.tags,
    categories: state.categories,
    isLoading: state.loading,
    error: state.error
  };
}

/**
 * Hook for finding a tag by id
 * @returns {Function} Function to get a tag by id
 */
export function useTagById() {
  const { state } = useTags();
  
  return useCallback((tagId) => {
    if (!tagId) return null;
    return state.tags.find(tag => tag.id === tagId) || null;
  }, [state.tags]);
}

/**
 * Hook for getting tags by category
 * @returns {Function} Function to get tags by category
 */
export function useTagsByCategory() {
  const { state } = useTags();
  
  return useCallback((category) => {
    if (!category) return state.tags;
    return state.tags.filter(tag => tag.category === category);
  }, [state.tags]);
}

/**
 * Hook for getting all available categories
 * @returns {Array} List of all categories
 */
export function useCategories() {
  const { state } = useTags();
  return state.categories;
}