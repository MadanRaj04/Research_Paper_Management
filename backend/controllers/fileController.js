// controllers/fileController.js

const { Dropbox } = require('dropbox');  // Dropbox SDK
const fetch = require('isomorphic-fetch');  // For Dropbox API

// Dropbox Client Setup
const dropboxClient = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,  // Use your Dropbox access token here
  fetch
});

// Controller to handle file upload
const uploadFileToDropbox = async (req, res) => {
  try {
    const file = req.body;  // Assuming the file is base64 encoded or as a buffer
    const fileName = 'uploaded_file.pdf';  // Give the file a name
    // Upload the file to Dropbox
    const uploadResponse = await dropboxClient.filesUpload({
      path: `/uploads/${fileName}`,  // Dropbox path to save the file
      contents: file
    });

    // Generate a shared link for the uploaded file
    const sharedLinkResponse = await dropboxClient.sharingCreateSharedLinkWithSettings({
      path: uploadResponse.result.path_display
    });

    const fileUrl = sharedLinkResponse.result.url;  // Shared URL

    // Send back the file URL in the response
    res.status(200).json({
      message: 'File uploaded successfully!',
      fileUrl: fileUrl
    });
  } catch (error) {
    console.error('Error uploading to Dropbox:', error);
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
};

module.exports = { uploadFileToDropbox };
