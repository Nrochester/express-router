const express = require('express')
const router  = express.Router()
const {check, validationResult} = require("express-validator")
let users = [
    {
        name: "User 1",
        age: 30
    },
    {
        name: "User 2",
        age: 45
    },
    {
        name: "User 3",
        age: 27
    },
    {
        name: "User 4",
        age: 22
    }
]


router.get('/', (req, res) => {
    res.json(users)
})

router.get('/:id', (req, res) => {
    index = req.params.id - 1
    objFound = users[index]
    res.json(objFound)
})

router.post('/', [check("name").not().isEmpty().trim()], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }
    else{
        objToPush = req.body
        users.push(objToPush)
        res.json(users)
    }
    

})

router.put('/:id', (req, res) => {
    index = req.params.id -1 
    objFound = users[index]
    objFound.name = req.body.name 
    objFound.age = req.body.age

    res.json(objFound)

})

router.delete('/:id', (req, res) => {
    indexToDelete = req.params.id -1
    if(indexToDelete !=0){
        users.splice(indexToDelete, 1)
        res.json(users)
    } else{
        users.shift()
        res.json(users)
    }

})

module.exports = router