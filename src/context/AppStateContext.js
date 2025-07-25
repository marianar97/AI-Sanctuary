/**
 * AppStateContext.js
 * 
 * This file implements a combined context provider that wraps both ResourceProvider and TagProvider
 * to provide a single entry point for global state management.
 */

import React from 'react';
import { ResourceProvider } from './ResourceContext';
import { TagProvider } from './TagContext';

/**
 * AppStateProvider component that combines both ResourceProvider and TagProvider
 * to provide a single entry point for global state management.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @returns {React.ReactElement} Combined context provider
 */
export function AppStateProvider({ children }) {
  return (
    <ResourceProvider>
      <TagProvider>
        {children}
      </TagProvider>
    </ResourceProvider>
  );
}

/**
 * Export individual providers and hooks for direct access when needed
 */
export { ResourceProvider, useResources } from './ResourceContext';
export { TagProvider, useTags } from './TagContext';

// Export custom hooks from the hooks directory
export * from '../hooks';