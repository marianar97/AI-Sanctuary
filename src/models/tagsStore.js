/**
 * tagsStore.js
 * 
 * This file implements an in-memory store for managing tags with category support.
 * It provides methods for adding, retrieving, and persisting tags.
 */

import { isValidTag } from './Tag';
import { isValidCategory } from './Category';

/**
 * In-memory store for managing tags
 */
const tagsStore = {
  tags: [],
  
  /**
   * Adds a new tag to the store
   * 
   * @param {Object} tag - The tag to add
   * @param {string} tag.id - Unique identifier for the tag
   * @param {string} tag.name - Name of the tag
   * @param {string} [tag.category] - Optional category for the tag
   * @returns {Object} The added tag
   * @throws {Error} If the tag is invalid
   */
  addTag(tag) {
    // Validate tag
    if (!isValidTag(tag)) {
      throw new Error('Invalid tag: missing required fields');
    }
    
    // Validate category if provided
    if (tag.category && !isValidCategory({ id: tag.category, name: tag.category })) {
      throw new Error('Invalid category');
    }
    
    // Check for duplicate tag name in the same category
    const existingTag = this.tags.find(t => 
      t.name.toLowerCase() === tag.name.toLowerCase() && 
      t.category === tag.category
    );
    
    if (existingTag) {
      throw new Error(`Tag "${tag.name}" already exists in ${tag.category || 'uncategorized'} category`);
    }
    
    // Add tag to store
    this.tags.push(tag);
    
    // Persist to localStorage
    this.persistTags();
    
    return tag;
  },
  
  /**
   * Gets all tags or filters by category
   * 
   * @param {string} [category] - Optional category to filter by
   * @returns {Object[]} Array of tags, filtered by category if specified
   */
  getTagsByCategory(category) {
    return category ? 
      this.tags.filter(t => t.category === category) : 
      this.tags;
  },
  
  /**
   * Gets a tag by its ID
   * 
   * @param {string} id - The tag ID to look for
   * @returns {Object|null} The tag object or null if not found
   */
  getTagById(id) {
    return this.tags.find(tag => tag.id === id) || null;
  },
  
  /**
   * Gets all unique categories used by tags
   * 
   * @returns {string[]} Array of unique category names
   */
  getAllCategories() {
    const categories = new Set(this.tags.map(t => t.category).filter(Boolean));
    return Array.from(categories);
  },
  
  /**
   * Updates an existing tag
   * 
   * @param {string} id - ID of the tag to update
   * @param {Object} updates - Properties to update
   * @returns {Object|null} The updated tag or null if not found
   */
  updateTag(id, updates) {
    const index = this.tags.findIndex(tag => tag.id === id);
    if (index === -1) return null;
    
    // Create updated tag
    const updatedTag = { ...this.tags[index], ...updates };
    
    // Validate the updated tag
    if (!isValidTag(updatedTag)) {
      throw new Error('Invalid tag: missing required fields');
    }
    
    // Validate category if provided
    if (updatedTag.category && !isValidCategory({ id: updatedTag.category, name: updatedTag.category })) {
      throw new Error('Invalid category');
    }
    
    // Check for duplicate tag name in the same category (excluding this tag)
    const duplicateTag = this.tags.find(t => 
      t.id !== id &&
      t.name.toLowerCase() === updatedTag.name.toLowerCase() && 
      t.category === updatedTag.category
    );
    
    if (duplicateTag) {
      throw new Error(`Tag "${updatedTag.name}" already exists in ${updatedTag.category || 'uncategorized'} category`);
    }
    
    // Update the tag
    this.tags[index] = updatedTag;
    
    // Persist to localStorage
    this.persistTags();
    
    return updatedTag;
  },
  
  /**
   * Removes a tag from the store
   * 
   * @param {string} id - ID of the tag to remove
   * @returns {boolean} True if the tag was removed, false if not found
   */
  removeTag(id) {
    const initialLength = this.tags.length;
    this.tags = this.tags.filter(tag => tag.id !== id);
    
    const removed = initialLength > this.tags.length;
    
    if (removed) {
      // Persist to localStorage
      this.persistTags();
    }
    
    return removed;
  },
  
  /**
   * Persists tags to localStorage
   */
  persistTags() {
    try {
      localStorage.setItem('tags', JSON.stringify(this.tags));
    } catch (error) {
      console.error('Failed to persist tags to localStorage:', error);
    }
  },
  
  /**
   * Loads tags from localStorage
   */
  loadTags() {
    try {
      const storedTags = localStorage.getItem('tags');
      if (storedTags) {
        this.tags = JSON.parse(storedTags);
      }
    } catch (error) {
      console.error('Failed to load tags from localStorage:', error);
    }
  },
  
  /**
   * Clears all tags from the store
   */
  clearTags() {
    this.tags = [];
    this.persistTags();
  }
};

export default tagsStore;