/**
 * Models index file
 *
 * This file exports all models from the models directory for easier imports
 * throughout the application.
 */

export * from "./BaseResource";
export * from "./VideoResource";
export * from "./BookResource";
export * from "./ArticleResource";
export * from "./Tag";
export * from "./Category";
export * from "./ResourceTags";
export { default as tagsStore } from "./tagsStore";

// Export resource type constants
export const RESOURCE_TYPES = {
  VIDEO: 'video',
  BOOK: 'book',
  ARTICLE: 'article',
  COURSE: 'course',
  TOOL: 'tool'
};
