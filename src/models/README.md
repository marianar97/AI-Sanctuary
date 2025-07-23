# AI-Sanctuary Models

This directory contains the data models used throughout the AI-Sanctuary application.

## Models Structure

### BaseResource

The `BaseResource` model serves as the foundation for all resource types in the application (videos, books, articles, etc.).

#### Required Fields

- `id`: Unique identifier for the resource
- `type`: Type of resource (video, book, article, etc.)
- `title`: Title of the resource
- `url`: URL to access the resource

#### Optional Fields

- `description`: Description of the resource
- `tags`: Array of tags associated with the resource
- `metadata`: Object containing metadata specific to the resource type
- `createdAt`: Timestamp when the resource was created
- `updatedAt`: Timestamp when the resource was last updated

## Usage

```javascript
import { createBaseResource, isValidBaseResource } from './models';

// Create a new resource
const videoResource = createBaseResource({
  id: '1',
  type: 'video',
  title: 'Introduction to AI',
  url: 'https://www.youtube.com/watch?v=abc123',
  description: 'A beginner-friendly introduction to AI',
  tags: ['AI', 'beginner'],
  metadata: {
    duration: '10:30',
    channelTitle: 'AI Academy'
  }
});

// Validate a resource
const isValid = isValidBaseResource(videoResource); // true
```

See `BaseResource.test.js` for more examples.