document.addEventListener('DOMContentLoaded', () => {
    const cameraList = document.getElementById('camera-list');
    const cameraModal = document.getElementById('camera-modal');
    const saveCameraBtn = document.getElementById('save-camera-btn');
    const switchButton = document.getElementById('toggle-switch');

    let cameras = [];
    let originalCameras = [];
    let editedCamera = null;

    cameras = [
        { id: 1, manufacturer: 'Nikon', memory: 32, zoom: 4.5 },
        { id: 2, manufacturer: 'Canon', memory: 16, zoom: 5.0 },
        { id: 3, manufacturer: 'Sony', memory: 64, zoom: 3.8 },
        { id: 3, manufacturer: 'Panasonic', memory: 24, zoom: 7.9 },
        { id: 3, manufacturer: 'Sony', memory: 34, zoom: 9.8 },
        { id: 3, manufacturer: 'Canon', memory: 54, zoom: 6.8 }

    ];

    originalCameras = cameras.slice();
    displayCameras();

    document.getElementById('search-btn').addEventListener('click', () => {
        const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
        const filteredCameras = cameras.filter((camera) =>
            camera.manufacturer.toLowerCase().includes(searchInput)
        );
        displayCameras(filteredCameras); 
    });

    document.getElementById('clear-btn').addEventListener('click', () => {
        cameras = [];
        displayCameras();
    });
    
    function updateCameraCount() {
        const cameraCount = cameras.length;
        document.getElementById('count').textContent = cameraCount;
    }

    function deleteCamera(index) {
        cameras.splice(index, 1);
        displayCameras();
        closeCameraModal();
    }

    function updateCamera(cameraId, manufacturer, memory, zoom) {
        if (cameraId === 0) {
            alert('Invalid camera ID. Please select a valid camera.');
            return;
        }
        const updatedCamera = { id: cameraId, manufacturer, memory, zoom };
        cameras = cameras.map(camera => (camera.id === cameraId ? updatedCamera : camera));
        closeCameraModal();
    }

    function displayCameras(cameraData = cameras) {
        cameraList.innerHTML = '';
        cameraData.forEach((camera, index) => {
            const cameraItem = document.createElement('div');
            cameraItem.className = 'camera-item';
            cameraItem.innerHTML = `
                <h3>${camera.manufacturer}</h3>
                <p>Memory: ${camera.memory} MB</p>
                <p>Zoom: ${camera.zoom}</p>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            cameraList.appendChild(cameraItem);
        });

        addEditDeleteListeners();
        updateCameraCount();
    }

    function addEditDeleteListeners() {
        const editButtons = document.querySelectorAll('.edit-btn');
        const deleteButtons = document.querySelectorAll('.delete-btn');

        editButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                editedCamera = cameras[index];
                document.getElementById('modal-title').textContent = 'Edit Camera';
                document.getElementById('manufacturer').value = editedCamera.manufacturer;
                document.getElementById('memory').value = editedCamera.memory;
                document.getElementById('zoom').value = editedCamera.zoom;
                cameraModal.style.display = 'block';
            });
        });

        deleteButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                deleteCamera(index);
            });
        });
    }

    document.getElementById('create-btn').addEventListener('click', () => {
        editedCamera = null;
        document.getElementById('modal-title').textContent = 'Create Camera';
        document.getElementById('create-btn').style.background = 'lightgray';
        cameraModal.style.display = 'block';
    });

    function saveCamera(manufacturer, memory, zoom) {
        if (!manufacturer) {
            alert('Please enter the manufacturer.');
            return;
        }
        if (isNaN(memory) || memory < 1) {
            alert('Please enter a valid memory value greater than or equal to 1 MB.');
            return;
        }
        if (isNaN(zoom) || zoom < 0.1 || zoom > 10) {
            alert('Please enter a valid zoom factor between 0.1 and 10.');
            return;
        }

        const newCamera = { manufacturer, memory, zoom };

        if (!editedCamera) {
            cameras.push(newCamera);
        } else {
            updateCamera(editedCamera.id, manufacturer, memory, zoom);
        }

        displayCameras();
        closeCameraModal();
    }

    saveCameraBtn.addEventListener('click', () => {
        const manufacturer = document.getElementById('manufacturer').value;
        const memory = parseFloat(document.getElementById('memory').value);
        const zoom = parseFloat(document.getElementById('zoom').value);

        saveCamera(manufacturer, memory, zoom);
    });

    document.getElementById('close-modal').addEventListener('click', closeCameraModal);

    function closeCameraModal() {
        editedCamera = null;
        cameraModal.style.display = 'none';
        document.getElementById('camera-form').reset();
        document.getElementById('create-btn').style.background = 'rgba(234, 232, 232)';
    }

    switchButton.addEventListener('click', () => {
        switchButton.classList.toggle('switch-on');

        if (switchButton.classList.contains('switch-on')) {
            cameras = cameras.slice().sort((a, b) => a.manufacturer.localeCompare(b.manufacturer));
            displayCameras(); 
        } else {
            cameras = originalCameras.slice();
            displayCameras();
        }
    });
});
