const express = require('express')
const router = express.Router()
const {check, validationResult} = require("express-validator")
let fruits = [
    {
        name: "Apple",
        color: "Red"
    },
    {
        name: "Banana",
        color: "Yellow"
    },
    {
        name: "Kiwi",
        color: "Green"
    },
    {
        name: "Grape",
        color: "Purple"
    },
]

router.get('/', (req, res) => {
    res.json(fruits)
})

router.get('/:id', (req, res) => {
    index = req.params.id -1
    objFound = fruits[index]
    res.json(objFound)
})

router.post('/', [check("color").not().isEmpty().trim()], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }
    else{
    objToPush = req.body
    fruits.push(objToPush)
    res.json(fruits)
    }
})

router.put('/:id', (req, res) => {
    index = req.params.id -1 
    objFound = fruits[index]
    objFound.name = req.body.name 
    objFound.age = req.body.age

    res.json(objFound)

})

router.delete('/:id', (req, res) => {
    indexToDelete = req.params.id -1
    if(indexToDelete !=0){
        fruits.splice(indexToDelete, 1)
        res.json(fruits)
    } else{
        fruits.shift()
        res.json(fruits)
    }

})

module.exports = router