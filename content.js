// Content management function
exports.handler = async (event, context) => {
    // Handle different HTTP methods
    switch (event.httpMethod) {
      case 'GET':
        return getContent(event);
      case 'POST':
        return createContent(event);
      case 'PUT':
        return updateContent(event);
      case 'DELETE':
        return deleteContent(event);
      default:
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
  };
  
  // Get content
  const getContent = async (event) => {
    try {
      // In a real implementation, you would fetch content from a database
      // For demo purposes, we'll return mock data
      
      const content = [
        { id: 1, title: 'Getting Started with Haibah', type: 'post', status: 'published', updatedAt: '2023-05-15T10:30:00Z' },
        { id: 2, title: 'Advanced Features Guide', type: 'post', status: 'published', updatedAt: '2023-05-14T14:45:00Z' },
        { id: 3, title: 'FAQ and Troubleshooting', type: 'page', status: 'published', updatedAt: '2023-05-12T09:15:00Z' },
        { id: 4, title: 'New Product Launch', type: 'post', status: 'draft', updatedAt: '2023-05-10T16:20:00Z' }
      ];
      
      return {
        statusCode: 200,
        body: JSON.stringify(content)
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch content' })
      };
    }
  };
  
  // Create content
  const createContent = async (event) => {
    try {
      const { title, type, body, status } = JSON.parse(event.body);
      
      // In a real implementation, you would save content to a database
      // For demo purposes, we'll just return success
      
      return {
        statusCode: 201,
        body: JSON.stringify({
          id: Date.now(), // Simple ID generation
          title,
          type,
          body,
          status,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create content' })
      };
    }
  };
  
  // Update content
  const updateContent = async (event) => {
    try {
      const { id, title, type, body, status } = JSON.parse(event.body);
      
      // In a real implementation, you would update content in a database
      // For demo purposes, we'll just return success
      
      return {
        statusCode: 200,
        body: JSON.stringify({
          id,
          title,
          type,
          body,
          status,
          updatedAt: new Date().toISOString()
        })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to update content' })
      };
    }
  };
  
  // Delete content
  const deleteContent = async (event) => {
    try {
      const { id } = JSON.parse(event.body);
      
      // In a real implementation, you would delete content from a database
      // For demo purposes, we'll just return success
      
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, id })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to delete content' })
      };
    }
  };