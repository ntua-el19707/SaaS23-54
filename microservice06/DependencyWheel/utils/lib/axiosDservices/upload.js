require("dotenv").config();
const axios = require("axios");
const FormData = require("form-data");
const { createReadStream } = require("fs");
const { sendFiles, PublisDiagram, Charge } = require("../Producers");

function RequestData(filename, jwt) {
  return new Promise((resolve, reject) => {
    const server_upload = process.env.server_upload;
    axios.defaults.headers.common["authorization"] = jwt;
    axios
      .get(`${server_upload}/api_upload/getFile/${filename}`)
      .then((rspUploadServer) => {
        console.log(rspUploadServer);
        resolve(rspUploadServer.data.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
function uploadAll4(fileName, jwt, id) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common["authorization"] = jwt;

    const server_png = process.env.donwload_png_service;
    const server_svg = process.env.donwload_svg_service;
    const server_html = process.env.donwload_html_service;
    const server_pdf = process.env.donwload_pdf_service;

    let formDataPng = new FormData();
    let formDataSvg = new FormData();
    let formDataHtml = new FormData();
    let formDataPdf = new FormData();

    const filePngStream = createReadStream(`utils/Files/png/${fileName}.png`);
    formDataPng.append("file", filePngStream);

    const fileSvgStream = createReadStream(`utils/Files/svg/${fileName}.svg`);
    formDataSvg.append("file", fileSvgStream);

    const fileHtmlStream = createReadStream(
      `utils/Files/html/${fileName}.html`
    );
    formDataHtml.append("file", fileHtmlStream);

    const filePdfStream = createReadStream(`utils/Files/pdf/${fileName}.pdf`);
    formDataPdf.append("file", filePdfStream);

    let png_Request = axios.post(
      `${server_png}/api_DonloadPng/upload/${id}`,
      formDataPng,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    let svg_Request = axios.post(
      `${server_svg}/api_DonloadSvg/upload/${id}`,
      formDataSvg,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    let html_Request = axios.post(
      `${server_html}/api_DonloadHtml/upload/${id}`,
      formDataHtml,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    let pdf_Request = axios.post(
      `${server_pdf}/api_DonloadPdf/upload/${id}`,
      formDataPdf,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    Promise.all([png_Request, svg_Request, html_Request, pdf_Request])
      .then((responses) => {
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
function InsertData(data, jwt, id) {
  return new Promise(async (resolve, reject) => {
    try {
      axios.defaults.headers.common["authorization"] = jwt;
      const server_Diagrams = process.env.Diagrams_service;
      data._id = id;
      await axios.post(`${server_Diagrams}/api_Mydiagrams/insertChart/Lines`, {
        chart: data,
      });
    } catch (err) {
      reject(err);
    }
  });
}
function UpdateApis(filename, owner, data, id) {
  data._id = id;
  return Promise.all([
    sendFiles(id, owner, filename),
    PublisDiagram(data, owner),
    Charge(owner),
  ]); // new Promise((resolve, reject) => {
  //let dserviceP = uploadAll4(filename, jwt, id);
  //let insertP = InsertData(data, jwt, id);

  // Promise.all([dserviceP, insertP])
  // .then((rsp) => {
  //  console.log("done");
  // resolve(rsp);
  // })
  //.catch((err) => {
  // console.log(err);
  // reject(err);
  // });
  // });
}
module.exports = { uploadAll4, UpdateApis, RequestData };
