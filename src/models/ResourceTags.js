/**
 * ResourceTags.js
 * 
 * This file defines the ResourceTags model for the Sanctuary application.
 * ResourceTags manages the many-to-many relationship between resources and tags.
 */

/**
 * Creates a new ResourceTag association
 *
 * @param {Object} resourceTag - The resource-tag association
 * @param {string} resourceTag.resourceId - ID of the resource
 * @param {string} resourceTag.tagId - ID of the tag
 * @returns {Object} A new ResourceTag association
 */
export function createResourceTag({
  resourceId,
  tagId,
}) {
  // Validate required fields
  if (!resourceId) throw new Error("Resource ID is required");
  if (!tagId) throw new Error("Tag ID is required");

  // Return the resource-tag association
  return {
    resourceId,
    tagId,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Validates if an object is a valid ResourceTag association
 *
 * @param {Object} resourceTag - The resource-tag association to validate
 * @returns {boolean} True if the association is valid, false otherwise
 */
export function isValidResourceTag(resourceTag) {
  return (
    resourceTag &&
    typeof resourceTag.resourceId === "string" &&
    resourceTag.resourceId.trim() !== "" &&
    typeof resourceTag.tagId === "string" &&
    resourceTag.tagId.trim() !== ""
  );
}

/**
 * Associates multiple tags with a resource
 *
 * @param {string} resourceId - ID of the resource
 * @param {string[]} tagIds - Array of tag IDs to associate with the resource
 * @returns {Object[]} Array of ResourceTag associations
 */
export function addTagsToResource(resourceId, tagIds) {
  if (!Array.isArray(tagIds)) {
    throw new Error("tagIds must be an array");
  }
  
  return tagIds.map(tagId => createResourceTag({ resourceId, tagId }));
}

/**
 * Gets all tag IDs associated with a resource
 *
 * @param {string} resourceId - ID of the resource
 * @param {Object[]} resourceTags - Array of all resource-tag associations
 * @returns {string[]} Array of tag IDs associated with the resource
 */
export function getResourceTagIds(resourceId, resourceTags) {
  if (!Array.isArray(resourceTags)) {
    throw new Error("resourceTags must be an array");
  }
  
  return resourceTags
    .filter(rt => rt.resourceId === resourceId)
    .map(rt => rt.tagId);
}

/**
 * Gets all resource IDs associated with a tag
 *
 * @param {string} tagId - ID of the tag
 * @param {Object[]} resourceTags - Array of all resource-tag associations
 * @returns {string[]} Array of resource IDs associated with the tag
 */
export function getTagResourceIds(tagId, resourceTags) {
  if (!Array.isArray(resourceTags)) {
    throw new Error("resourceTags must be an array");
  }
  
  return resourceTags
    .filter(rt => rt.tagId === tagId)
    .map(rt => rt.resourceId);
}