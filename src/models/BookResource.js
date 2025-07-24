/**
 * BookResource.js
 * 
 * This file defines the BookResource model, extending the BaseResource.
 * It includes properties specific to book resources.
 */

import { createBaseResource, isValidBaseResource } from './BaseResource';

/**
 * Creates a new BookResource object.
 * 
 * @param {Object} resource - The resource object.
 * @param {string} resource.id - Unique identifier for the book resource.
 * @param {string} resource.title - Title of the book.
 * @param {string} resource.url - URL to access the book (e.g., a purchase link or online reader).
 * @param {string} [resource.description] - Optional description of the book.
 * @param {string[]} [resource.tags] - Optional array of tags associated with the book.
 * @returns {Object} A new BookResource object.
 */
export function createBookResource(resource) {
  const bookResource = createBaseResource({
    ...resource,
    type: 'book',
  });

  return bookResource;
}

/**
 * Validates if an object is a valid BookResource.
 * 
 * @param {Object} resource - The resource to validate.
 * @returns {boolean} True if the resource is a valid BookResource, false otherwise.
 */
export function isValidBookResource(resource) {
  return isValidBaseResource(resource) && resource.type === 'book';
}