/**
 * hooks/index.js
 * 
 * This file exports all custom hooks for easier imports in components.
 */

export {
  useAddResource,
  useUpdateResource,
  useDeleteResource,
  useFilterResources,
  useResourcesData,
  useResourceById,
  useResourcesByType,
  useResourcesByTag
} from './useResourceHooks';

export {
  useAddTag,
  useUpdateTag,
  useDeleteTag,
  useFilterTags,
  useTagsData,
  useTagById,
  useTagsByCategory,
  useCategories
} from './useTagHooks';