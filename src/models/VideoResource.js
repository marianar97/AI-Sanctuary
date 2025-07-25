/**
 * VideoResource.js
 * 
 * This file defines the VideoResource model, extending the BaseResource.
 * It includes properties specific to video resources.
 */

import { createBaseResource, isValidBaseResource } from './BaseResource';

/**
 * Creates a new VideoResource object.
 * 
 * @param {Object} resource - The resource object.
 * @param {string} resource.id - Unique identifier for the video resource.
 * @param {string} resource.categoryId - The ID of the category this resource belongs to.
 * @param {string} resource.title - Title of the video.
 * @param {string} resource.url - URL to the video.
 * @returns {Object} A new VideoResource object.
 */
export function createVideoResource(resource) {
  const videoResource = createBaseResource({
    ...resource,
    type: 'video',
  });

  return videoResource;
}

/**
 * Validates if an object is a valid VideoResource.
 * 
 * @param {Object} resource - The resource to validate.
 * @returns {boolean} True if the resource is a valid VideoResource, false otherwise.
 */
export function isValidVideoResource(resource) {
  return isValidBaseResource(resource) && resource.type === 'video';
}