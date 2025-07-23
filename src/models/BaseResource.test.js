/**
 * BaseResource.test.js
 * 
 * This file contains examples of how to use the BaseResource model.
 * It's not an actual test file but serves as documentation.
 */

import { createBaseResource, isValidBaseResource } from './BaseResource';

// Example of creating a video resource
const videoResource = createBaseResource({
  id: '1',
  type: 'video',
  title: 'Introduction to AI',
  url: 'https://www.youtube.com/watch?v=abc123',
  description: 'A beginner-friendly introduction to artificial intelligence concepts',
  tags: ['AI', 'beginner', 'introduction'],
  metadata: {
    duration: '10:30',
    channelTitle: 'AI Academy',
    thumbnails: {
      high: { url: 'https://example.com/thumbnail.jpg' }
    }
  }
});

console.log('Video Resource:', videoResource);
console.log('Is Valid Resource:', isValidBaseResource(videoResource)); // Should be true

// Example of creating a book resource
const bookResource = createBaseResource({
  id: '2',
  type: 'book',
  title: 'Artificial Intelligence: A Modern Approach',
  url: 'https://example.com/ai-book',
  description: 'The leading textbook in Artificial Intelligence',
  tags: ['AI', 'textbook', 'computer science'],
  metadata: {
    authors: ['Stuart Russell', 'Peter Norvig'],
    publishedYear: 2020,
    edition: '4th',
    isbn: '978-0134610993'
  }
});

console.log('Book Resource:', bookResource);
console.log('Is Valid Resource:', isValidBaseResource(bookResource)); // Should be true

// Example of an invalid resource (missing required fields)
try {
  const invalidResource = createBaseResource({
    id: '3',
    type: 'article',
    // Missing title and url
  });
} catch (error) {
  console.error('Error creating invalid resource:', error.message);
}

// Example of validating an invalid resource
const invalidResource = {
  id: '3',
  type: 'article',
  // Missing title and url
};

console.log('Is Invalid Resource Valid:', isValidBaseResource(invalidResource)); // Should be false