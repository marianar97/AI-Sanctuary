/**
 * BaseResource.js
 *
 * This file defines the base resource model for the Sanctuary application.
 * It serves as the foundation for all resource types (videos, books, articles, etc.)
 * with only id, type, title, and url being mandatory fields.
 */

/**
 * Creates a new BaseResource object
 *
 * @param {Object} resource - The resource object
 * @param {string} resource.id - Unique identifier for the resource
 * @param {string} resource.type - Type of resource (video, book, article, etc.)
 * @param {string} resource.title - Title of the resource
 * @param {string} resource.url - URL to access the resource
 * @param {string} [resource.description] - Optional description of the resource
 * @param {string[]} [resource.tags] - Optional array of tags associated with the resource
 * @param {Object} [resource.metadata] - Optional metadata specific to the resource type
 * @returns {Object} A new BaseResource object
 */
export function createBaseResource({
  id,
  type,
  title,
  url,
  description = "",
  tags = [],
  metadata = {},
}) {
  // Validate required fields
  if (!id) throw new Error("Resource id is required");
  if (!type) throw new Error("Resource type is required");
  if (!title) throw new Error("Resource title is required");
  if (!url) throw new Error("Resource url is required");

  // Return the base resource object
  return {
    id,
    type,
    title,
    url,
    description,
    tags,
    metadata,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Validates if an object is a valid BaseResource
 *
 * @param {Object} resource - The resource to validate
 * @returns {boolean} True if the resource is valid, false otherwise
 */
export function isValidBaseResource(resource) {
  return (
    resource &&
    typeof resource.id === "number" &&
    resource.id.trim() !== "" &&
    typeof resource.type === "string" &&
    resource.type.trim() !== "" &&
    typeof resource.title === "string" &&
    resource.title.trim() !== "" &&
    typeof resource.url === "string" &&
    resource.url.trim() !== ""
  );
}
