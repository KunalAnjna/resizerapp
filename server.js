const express = require("express")
const multer = require("multer")
const sharp = require("sharp")
const cors = require("cors")
const path = require("path")

const app = express()
app.use(cors())

app.use(express.static("public"))

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.post("/resize", upload.single("image"), async (req, res) => {

    try{

        const width = parseInt(req.body.width)
        const height = parseInt(req.body.height)
        const quality = parseFloat(req.body.quality)

        const resized = await sharp(req.file.buffer)
        .resize(width, height)
        .jpeg({ quality: Math.round(quality*100) })
        .toBuffer()

        res.set("Content-Type","image/jpeg")
        res.send(resized)

    }
    catch(err){

        res.status(500).send("Error processing image")

    }

})

app.listen(3000, ()=>{

console.log("Server running on port 3000")

})