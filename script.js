const input = document.getElementById("imageInput")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let img = new Image()

input.addEventListener("change", function(){

const file = input.files[0]

img.src = URL.createObjectURL(file)

img.onload = function(){

document.getElementById("width").value = img.width
document.getElementById("height").value = img.height

canvas.width = img.width
canvas.height = img.height

ctx.drawImage(img,0,0)

}

})

function applyPreset(){

const preset = document.getElementById("preset").value

if(preset){

const size = preset.split("x")

document.getElementById("width").value = size[0]
document.getElementById("height").value = size[1]

}

}

function processImage(){

const width = parseInt(document.getElementById("width").value)
const height = parseInt(document.getElementById("height").value)
const quality = parseFloat(document.getElementById("quality").value)

canvas.width = width
canvas.height = height

ctx.drawImage(img,0,0,width,height)

const dataURL = canvas.toDataURL("image/jpeg",quality)

document.getElementById("downloadBtn").href = dataURL

}
const dropArea = document.getElementById("dropArea")

dropArea.addEventListener("dragover", e => {

e.preventDefault()

})

dropArea.addEventListener("drop", e => {

e.preventDefault()

const file = e.dataTransfer.files[0]

loadImage(file)

})

function loadImage(file){

img.src = URL.createObjectURL(file)

img.onload = function(){

document.getElementById("width").value = img.width
document.getElementById("height").value = img.height

}

}