/**
 * ArticleResource.js
 * 
 * This file defines the ArticleResource model, extending the BaseResource.
 * It includes properties specific to article resources.
 */

import { createBaseResource, isValidBaseResource } from './BaseResource';

/**
 * Creates a new ArticleResource object.
 * 
 * @param {Object} resource - The resource object.
 * @param {string} resource.id - Unique identifier for the article resource.
 * @param {string} resource.title - Title of the article.
 * @param {string} resource.url - URL to access the article.
 * @param {string} [resource.description] - Optional description of the article.
 * @param {string[]} [resource.tags] - Optional array of tags associated with the article.
 * @returns {Object} A new ArticleResource object.
 */
export function createArticleResource(resource) {
  const articleResource = createBaseResource({
    ...resource,
    type: 'article',
  });

  return articleResource;
}

/**
 * Validates if an object is a valid ArticleResource.
 * 
 * @param {Object} resource - The resource to validate.
 * @returns {boolean} True if the resource is a valid ArticleResource, false otherwise.
 */
export function isValidArticleResource(resource) {
  return isValidBaseResource(resource) && resource.type === 'article';
}