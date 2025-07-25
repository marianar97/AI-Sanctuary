/**
 * Tag.js
 * 
 * This file defines the Tag model for the Sanctuary application.
 * Tags are used to categorize resources for better organization and searchability.
 */

/**
 * Creates a new Tag object
 *
 * @param {Object} tag - The tag object
 * @param {string} tag.id - Unique identifier for the tag
 * @param {string} tag.name - Name of the tag
 * @returns {Object} A new Tag object
 */
export function createTag({
  id,
  name,
}) {
  // Validate required fields
  if (!id) throw new Error("Tag ID is required");
  if (!name) throw new Error("Tag name is required");

  // Return the tag object
  return {
    id,
    name,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Validates if an object is a valid Tag
 *
 * @param {Object} tag - The tag to validate
 * @returns {boolean} True if the tag is valid, false otherwise
 */
export function isValidTag(tag) {
  return (
    tag &&
    typeof tag.id === "string" &&
    tag.id.trim() !== "" &&
    typeof tag.name === "string" &&
    tag.name.trim() !== ""
  );
}