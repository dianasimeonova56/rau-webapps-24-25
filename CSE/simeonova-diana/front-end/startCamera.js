const video = document.getElementById('video');
const startButton = document.getElementById('startButton');
const takePhotoButton = document.getElementById('takePhotoButton');
const submitPicturesButton = document.getElementById('submitPictures');
const uploadIdButton = document.getElementById('uploadIdButton')
const uploadSelfieButton = document.getElementById('uploadSelfieButton')
const overlay = document.getElementById('overlay');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let dataToSubmit = {
    "id": undefined,
    "selfie": undefined
}

startCameraButton.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        overlay.style.display = 'none';
        takePhotoButton.style.display = 'block';
        submitPicturesButton.style.display = 'block';
    } catch (err) {
        console.error('Error accessing the camera: ', err);
    }
});

takePhotoButton.addEventListener('click', (event) => {
    event.preventDefault();

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'selfie.png';
    link.click();
});

uploadIdButton.addEventListener('change', async (e) => {
    e.preventDefault;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('selfieFile', file);
    formData.append('idFile', file);
    formData.append('userID', 1); //Read ID from localstorage and then add as a form property

    try {
        const url = 'http://localhost:5001/upload';
        const options = {
            method: 'POST',
            body:formData
        }
        const response = await fetch(url, options);
        const result = await response.json();
        alert(result.message || result.error);
    } catch (error) {
        console.log(error);
        alert(error.message);
     }
})

uploadSelfieButton.addEventListener('change', (e) => {
    e.preventDefault;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);
})

submitPicturesButton.addEventListener('click', async () => {
    debugger
    // e.preventDefault;
    console.log(dataToSubmit);

    // Make a POST request to your server with the dataToSubmit object.
    // Once the server responds, display the response in the console.
    // try {
    //     const response = await fetch('/upload-selfie', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(dataToSubmit)
    //     });

    //     if (!response.ok) {
    //         throw new Error('Failed to submit pictures');
    //     }

    //     const responseData = await response.json();
    // console.log('Server response:', responseData);
    if (dataToSubmit.id == "" || dataToSubmit.selfie == "") {
        window.location.replace("signup-fail.html");
    } else {
        window.location.replace("home.html");
    }

    // } catch (error) {
    //     console.error('Error:', error);
    // }

});

