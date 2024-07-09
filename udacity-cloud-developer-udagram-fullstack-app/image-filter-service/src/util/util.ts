import fs from 'fs';
import Jimp from "jimp";
import * as jwt from 'jsonwebtoken';
import { config } from '../config';

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
const filterImageFromURL = async (inputURL: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    Jimp.read(inputURL)
      .then((photo: Jimp) => {
        const outpath =
          '/tmp/filtered.' + Math.floor(Math.random() * 2000) + '.jpg';
        photo
          .resize(256, 256) // resize
          .quality(60) // set JPEG quality
          .greyscale() // set greyscale
          .write(__dirname + outpath, () => {
            resolve(__dirname + outpath);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
const deleteLocalFiles = (files: Array<string>): void => {
  for (const file of files) {
    fs.unlinkSync(file);
  }
};

const generateJWT = (payload: string | object | Buffer): string => jwt.sign(payload, config.dev.jwtSecret!);

export { filterImageFromURL, deleteLocalFiles, generateJWT };