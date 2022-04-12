import "./App.css";
import { useState } from "react";
import { getSecureS3Url } from "./s3";

function App() {
  const [previewImage, setPreviewImage] = useState();
  const [imgFile, setImgFile] = useState();

  function handleImageChange(e) {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImgFile(file);
    setPreviewImage(imageUrl);
  }

  async function handleUpload() {
    const uploadURL = await getSecureS3Url(); // we can make a get request to server and get the secureUrl
    // post the image direclty to the s3 bucket
    await fetch(uploadURL, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: imgFile,
    })
      .then(() => {
        const imageUrl = uploadURL.split("?")[0];
        console.log(`Image Uploaded at - ${imageUrl}`);
      })
      .catch((e) => console.error(e));
  }

  return (
    <div className="App">
      <input
        type={"file"}
        accept="image/png, image/jpg, image/jpeg"
        onChange={handleImageChange}
      />
      <button onClick={handleUpload}>UPLOAD</button>
      {previewImage && <img src={previewImage} className="preview_image" />}
    </div>
  );
}

export default App;
