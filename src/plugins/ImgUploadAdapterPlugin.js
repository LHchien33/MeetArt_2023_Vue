import axios from 'axios';
const { VITE_BASE, VITE_API } = import.meta.env;

class ImgUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const file = await this.loader.file;
    const url = `${VITE_BASE}/v2/api/${VITE_API}/admin/upload`;

    try {
      const response = await this._sendRequest(file, url);
      return { default: response.data.imageUrl };
    } catch (err) {
      throw `無法插入圖片: ${file.name}，錯誤代碼：${err.response?.status}`;
    }
  }

  abort() {
    if (this.cancelToken) {
      this.cancelToken.cancel();
    }
  }

  async _sendRequest(file, url) {
    const data = new FormData();
    data.append('file-to-upload', file)

    const source = axios.CancelToken.source();
    this.cancelToken = source.token;

    const response = await axios.post(url, data, {
      responseType: 'json',
      cancelToken: source.token,
      onUploadProgress: (progressEvent) => {
        if (progressEvent.lengthComputable) {
            this.loader.uploadTotal = progressEvent.total;
            this.loader.uploaded = progressEvent.loaded;
        }
      },
    });
    return response;
  }
}

export default function ImgUploadPlugin( editor ) {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
    // Configure the URL to the upload script in your back-end here!
    return new ImgUploadAdapter( loader );
  };
}