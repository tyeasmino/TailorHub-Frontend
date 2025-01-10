export const uploadImage = async (imageFile) => {
    if (!imageFile) {
      console.error('No image file provided');
      return null; // Return null if no image file is provided
    }
  
    const formData = new FormData();
    formData.append('file', imageFile); // Append the image file to form data
  
    try {
      const response = await fetch('YOUR_API_UPLOAD_ENDPOINT', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you use a Bearer token for authentication
        },
      });
  
      if (!response.ok) {
        throw new Error('Image upload failed');
      }
  
      const result = await response.json();
      return result.imageUrl; // Assuming your API returns the URL of the uploaded image
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };
  