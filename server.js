const express = require("express");
require("dotenv").config();
const pool = require("./databasepg");
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
const uuid = require("uuid");
const cors = require("cors");
console.log(process.env.user, process.env.password, process.env.database, process.env.portpg);
const app = express();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read',
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname })
      },
      key: (req, file, cb) => {
        cb(null, 'files_from_node/' + Date.now().toString() + file.originalname)
      }
    })
  })
app.use(cors());
app.use(express.json());
app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
        if (user.rows.length !== 0) {
            return res.status(401).json("User already exists");
        }
        const newUser = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [username, email, password]);
        res.status(201).json(newUser.rows[0]);
        // console.error(err.message);
        // const newUser = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [username, email, password]);
        // res.status(201).json(newUser.rows[0]);
    } catch (err) {
        // console.error(err.message);
        console.error(err);
        res.status(500).send("Server Error");
    }
});
app.get('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email=$1 AND password=$2", [email, password]);
        res.status(200).json(user.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});
app.post('/createfolder', async (req, res) => {
    try {
        const { foldername, layer, parent, owner } = req.body;
        const uuid1 = uuid.v4();
        const newfolder = await pool.query(
            "INSERT INTO folders (identifier, name, layer, parent, owner) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [uuid1, foldername, layer + 1, parent, owner]
        );
        res.status(200).json(newfolder.rows[0]);
    } catch (e) {
        console.error(e);
        res.status(500).send("Server Error");
    }
});
app.post('/uploadfile', upload.single('file'), async (req, res) => {
    try {
        const { name, layer, parent, owner,content } = req.body;
        const uuid1 = uuid.v4();
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: uuid1,
            Body: content
        };

        s3.upload(params, async (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send("Server Error");
            }
            console.log(`File uploaded successfully. ${data.Location}`);
            console.log(uuid1, name, layer + 1, parent, owner, data.Location);

            const newfile = await pool.query("INSERT INTO files (identifier, name, layer, parent, owner, content) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [uuid1, name, layer + 1, parent, owner, data.Location]);
            res.status(200).json(newfile.rows[0]);
        });
    } catch (e) {
        console.error(e);
        res.status(500).send("Server Error");
    }
});

app.get("/test", (req, res) => {
    res.status(200).json({
        message: "Hello from server",
        databaseStatus: "Connected"
    });
});
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});