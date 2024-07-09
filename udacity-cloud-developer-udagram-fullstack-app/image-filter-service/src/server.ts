import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { filterImageFromURL, deleteLocalFiles, generateJWT } from './util/util';
import {
  FilteredImageRequestParams,
  FilteredImageRequestQuery,
  FilteredImageResponseBody,
  FilteredImageRequestBody,
  TokenRequestParams,
  TokenResponseBody,
  TokenRequestBody,
  TokenRequestQuery
} from './models';
import validator from "validator";
import { requireAuth } from './handlers';

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMETERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  app.get<FilteredImageRequestParams, FilteredImageResponseBody, FilteredImageRequestBody, FilteredImageRequestQuery>('/filteredimage', requireAuth, async (req, res) => {
    const imageUrl = req.query.image_url;

    // check imageUrl is not empty
    if (!imageUrl) {
      return res.status(400).send({
        success: false,
        message: `The image_url query parameter is required.`
      });
    }

    // check imageUrl is valid
    if (!validator.isURL(imageUrl)) {
      return res.status(400).send({
        success: false,
        message: `Invalid image url`,
      });
    }

    try {
      const filteredImagePath = await filterImageFromURL(imageUrl);
      const sendFileOptions = {};

      res.sendFile(filteredImagePath, sendFileOptions, async (error: Error) => {
        // status: 200
        deleteLocalFiles([filteredImagePath]);
        if (error) {
          res.status(500).send({
            success: false,
            message: 'An error occurred while returning the filtered image.',
            detail: `${error}`,
          });
        }
      });
    } catch (error) {
      // Possible exceptions:
      // * Promise.reject() throws an exception (filterImageFromURL -> jimp functions (read, write etc.))

      res.status(500).send({
        success: false,
        message: `An error occurred while processing your image.`,
        detail: `${error}`,
      });
    }
  });

  //! END @TODO1

  // Generates a token based on client IP address
  app.get<TokenRequestParams, TokenResponseBody, TokenRequestBody, TokenRequestQuery>("/token", async (req, res) => {
    const token = generateJWT(`${req.connection.remoteAddress || req.connection.localAddress}${new Date().getDate()}`);
    res.status(200).send({ success: true, token });
  });

  // Root Endpoint
  // Displays a simple message to the user
  app.get('/', async (req: Request, res: Response) => {
    res.send('try GET /filteredimage?image_url={{}}');
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
