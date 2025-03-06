import express from 'express';
import { config } from 'dotenv';
import http from 'http';
import { PrismaClient } from '@prisma/client';



// load environment variables
config();
const prisma = new PrismaClient();
const app = express();

// slightly modified version of the code we wrote in class.
// we wrap the express app in a node http server so that we can
// expose the server to socket.io later on.
const server = http.createServer(app);
const port = parseInt(process.env.PORT || '3000');


// a simple middleware the redirects
// to the asset server if the request
// path contains a dot. We use the dot
// to differentiate between asset requests
// and normal requests because file names have
// dots in them.
app.use((req, res, next) => {
  if (req.path.includes(".")) {
    res.redirect(process.env.ASSET_URL + req.path);
    return;
  }
  next();
});

// Check if a username exists
app.get("/api/user/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { name: username },
    });
    // if the username exists in the database, login user
    if (user) {
      await prisma.user.update({
        where: { name: username },
        data: { updatedAt: new Date() },
      });
      res.json({ exists: true });
    }
    // if the username does not exist in the database, create a new user
    else {
      await prisma.user.create({
        data: { name: username },
      });
      res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking username:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get('/', (req, res) => {
  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="${process.env.ASSET_URL}/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React-Express Starter App</title>
        <script type="module">
          import RefreshRuntime from '${process.env.ASSET_URL}/@react-refresh'
          RefreshRuntime.injectIntoGlobalHook(window)
          window.$RefreshReg$ = () => {}
          window.$RefreshSig$ = () => (type) => type
          window.__vite_plugin_react_preamble_installed__ = true
        </script>
        <script type="module" src="${process.env.ASSET_URL}/@vite/client"></script>
        </head>
        <body>
        <div id="root"></div>
        <script type="module" src="${process.env.ASSET_URL}/src/main.tsx"></script>
      </body>
    </html>
    `);
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});