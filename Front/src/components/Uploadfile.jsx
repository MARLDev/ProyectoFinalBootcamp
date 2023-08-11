import './Uploadfile.css';

import { useEffect } from 'react';

export const Uploadfile = ({ registerForm }) => {
  const ekUpload = () => {
    const Init = () => {
      var fileSelect = document.getElementById('file-upload');
      fileSelect.addEventListener('change', fileSelectHandler, false);
    };

    const fileDragHover = (e) => {
      let fileDrag = document.getElementById('file-drag');

      e.stopPropagation();
      e.preventDefault();

      fileDrag.className = e.type === 'dragover' ? 'hover' : 'modal-body file-upload';
    };

    const fileSelectHandler = (e) => {
      // Fetch FileList object
      let files = e.target.files || e.dataTransfer.files;

      // Cancel event and hover styling
      fileDragHover(e);

      // Process all File objects
      for (let i = 0, f; (f = files[i]); i++) {
        parseFile(f);
      }
    };

    // Output
    const output = (msg) => {
      // Response
      let m = document.getElementById('messages');
      m.innerHTML = msg;
    };

    function parseFile(file) {
      output('<strong>' + encodeURI(file.name) + '</strong>');
      let imagenName = file.name;
      console.log(file, imagenName);
      let isGood = /\.(?=gif|jpg|png|jpeg)/gi.test(imagenName);
      if (isGood) {
        document.getElementById('start').classList.add('hidden');
        document.getElementById('response').classList.remove('hidden');
        document.getElementById('notimagen').classList.add('hidden');
        // Thumbnail Preview
        document.getElementById('file-imagen').classList.remove('hidden');
        document.getElementById('file-imagen').src = URL.createObjectURL(file);
      } else {
        document.getElementById('file-imagen').classList.add('hidden');
        document.getElementById('notimagen').classList.remove('hidden');
        document.getElementById('start').classList.remove('hidden');
        document.getElementById('response').classList.add('hidden');
        document.getElementById('file-upload-form').reset();
      }
    }
    if (window.File && window.FileList && window.FileReader) {
      Init();
    } else {
      document.getElementById('file-drag').style.display = 'none';
    }
  };

  useEffect(() => {
    ekUpload();
  });

  return (
    <div id="file-upload-form" className="uploader">
      <input
        id="file-upload"
        type="file"
        name="imagen"
        accept="imagen/*"
        {...registerForm}
      />

      <label htmlFor="file-upload" id="file-drag">
        <img id="file-imagen" src="#" alt="Preview" className="hidden" />
        <div id="start">
          <i className="fa fa-download" aria-hidden="true"></i>
          <div className="divSelect">Selecciona un archivo de imagen para tu avatar</div>
          <div id="notimagen" className="hidden"></div>
          <span id="file-upload-btn" className="btn btn-primary">
            Selecciona un archivo
          </span>
        </div>
        <div id="response" className="hidden">
          <div id="messages"></div>
        </div>
      </label>
    </div>
  );
};
