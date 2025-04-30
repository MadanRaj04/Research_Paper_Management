// controllers/fileController.js

const { Dropbox } = require('dropbox');
const fetch = require('isomorphic-fetch');

// Dropbox setup
const dropboxClient = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  fetch
});

const uploadFileToDropbox = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const fileName = file.originalname;

    const uploadResponse = await dropboxClient.filesUpload({
      path: `/uploads/${fileName}`,
      contents: file.buffer
    });

    const sharedLinkResponse = await dropboxClient.sharingCreateSharedLinkWithSettings({
      path: uploadResponse.result.path_display
    });

    const fileUrl = sharedLinkResponse.result.url;

    res.status(200).json({
      message: 'File uploaded successfully!',
      fileUrl
    });
  } catch (error) {
    console.error('Error uploading to Dropbox:', error);
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
};

module.exports = { uploadFileToDropbox };
