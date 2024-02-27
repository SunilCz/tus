import React from "react";
import * as tus from "tus-js-client";

class Test extends React.Component {
  handleFileUpload = () => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const fileByteArray = new Uint8Array(reader.result);

      // Create a Blob from byte array
      const blob = new Blob([fileByteArray], { type: file.type });

      // Create a new tus upload
      const upload = new tus.Upload(blob, {
        endpoint: "https://localhost:44319/files",
        metadata: {
          fileName: file.name,
          releaseId: "3a10fc2d-1d82-f513-8c57-133d77bfa4e7",
        },
        onError: (error) => {
          console.log("Upload error:", error);
        },
        onProgress: (bytesUploaded, bytesTotal) => {
          const progress = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          console.log(`Upload progress: ${progress}%`);
        },
        onSuccess: () => {
          console.log("Upload complete");
        },
      });

      // Start the upload
      upload.start();
    };

    reader.readAsArrayBuffer(file);
  };

  render() {
    return (
      <div>
        <input type="file" id="fileInput" />
        <button onClick={this.handleFileUpload}>Upload</button>
      </div>
    );
  }
}

export default Test;
