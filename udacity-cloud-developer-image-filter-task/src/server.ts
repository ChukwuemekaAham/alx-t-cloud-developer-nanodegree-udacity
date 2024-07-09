import express, { Request, Response } from "express";

import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util";

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
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  app.get("/filteredimage/", async (req: Request, res: Response) => {
    // destruct our query paramaters
    let { image_url } = req.query;

    // check to make sure the id is set
    if (!image_url) {
      return res.status(400).send(`image_url is required`);
    }
    const image = await filterImageFromURL(image_url);

    // return the resulting list along with 200 success
    res.status(200).sendFile(image, {}, (error) => {
      if (error) {
        res.status(500).send({ message: "could not proccess request" });
      } else {
        // deleteLocalFiles();
        deleteLocalFiles([image]);
      }
    });
  });

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
