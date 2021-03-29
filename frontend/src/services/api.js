import axios from "axios";
import { config } from "../config";
import moment from 'moment';

export const uploadFile = (payload ) => {
  return new Promise((accept, reject) => {
    let formData = new FormData();

    formData.append('file', payload.file, payload.file.name);
    formData.append('category', payload.fileCategory);
    formData.append('lastReviewedDate', moment(payload.lastReviewedDate).toJSON());
    formData.append('fileName', payload.file.name);

    const headers = {
      headers: { "Content-Type": "multipart/form-data" },
    };

     try {
      axios
        .post(`${config.baseUrl}/${config.uploadEndpoint}`, formData, {
          headers
        })
        .then((response) => {
          console.log(response);
          if (response.status !== 200) {
            reject();
          }

          accept(response.data);
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const getFilesOnServer = () => {
  return new Promise((accept, reject) => {

     try {
      axios
        .get(`${config.baseUrl}/${config.listDocuments}`)
        .then((response) => {
          console.log(response);
          if (response.status !== 200) {
            reject();
          }

          accept(response.data);
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const downloadImage = (payload) => {
  return new Promise((accept, reject) => {
    const headers = {
      headers: { "Access-Control-Allow-Origin": "*" },
    };
    try {
     axios
       .get(`${payload.url}`,{
         headers,
       })
       .then((response) => {
         console.log(response);

         accept(response.blob);
       });
   } catch (error) {
     reject(error);
   }
 });
}
