// User management function
exports.handler = async (event, context) => {
    // Handle different HTTP methods
    switch (event.httpMethod) {
      case 'GET':
        return getUsers(event);
      case 'POST':
        return createUser(event);
      case 'PUT':
        return updateUser(event);
      case 'DELETE':
        return deleteUser(event);
      default:
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
  };
  
  // Get users
  const getUsers = async (event) => {
    try {
      // In a real implementation, you would fetch users from a database
      // For demo purposes, we'll return mock data
      
      const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'editor', status: 'active' },
        { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'subscriber', status: 'inactive' }
      ];
      
      return {
        statusCode: 200,
        body: JSON.stringify(users)
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch users' })
      };
    }
  };
  
  // Create user
  const createUser = async (event) => {
    try {
      const { name, email, role, status } = JSON.parse(event.body);
      
      // In a real implementation, you would save user to a database
      // For demo purposes, we'll just return success
      
      return {
        statusCode: 201,
        body: JSON.stringify({
          id: Date.now(), // Simple ID generation
          name,
          email,
          role,
          status,
          createdAt: new Date().toISOString()
        })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create user' })
      };
    }
  };
  
  // Update user
  const updateUser = async (event) => {
    try {
      const { id, name, email, role, status } = JSON.parse(event.body);
      
      // In a real implementation, you would update user in a database
      // For demo purposes, we'll just return success
      
      return {
        statusCode: 200,
        body: JSON.stringify({
          id,
          name,
          email,
          role,
          status,
          updatedAt: new Date().toISOString()
        })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to update user' })
      };
    }
  };
  
  // Delete user
  const deleteUser = async (event) => {
    try {
      const { id } = JSON.parse(event.body);
      
      // In a real implementation, you would delete user from a database
      // For demo purposes, we'll just return success
      
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, id })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to delete user' })
      };
    }
  };