const express = require('express')
const Field = require('../db/models/field.js')
const auth = require('../middleware/auth')

const FieldRoute = new express.Router()

//add field
FieldRoute.post('/api/fields', auth, async (req, res) =>{
    const field = new Field({
        ...req.body,
        owner: req.user._id
    })
    try {
        await field.save()
        res.status(200).send(field)
    } catch (error) {
        res.status(500).send({error})
    }
})

//sva polja za logiranog usera
FieldRoute.get('/api/fields', auth, async (req, res) =>{
    const match = {}
    console.log("field", req.query.title);
    if(req.query.title != 'undefined' && req.query.title != null){
        let sea = new RegExp(`^.*${req.query.title}.*$`, "img")
        match['$or'] = [{"name": sea}, {"culture": sea}]
        console.log("field mat", match);
    }
    // match[req.query.poCemu] = {[req.query.filter]: req.query.value}

    try {
        // const allFields = await Field.find({owner: req.user._id});
        //oboje radi isto
        await req.user.populate({
            path: 'fields',
            match,
            options:{
                limit: parseInt(req.query.limit) || 5,
                skip: parseInt(req.query.skip) * 5 || 0
            }
        }).execPopulate()

        if(req.query.short === 'true'){
            req.user.fields = req.user.fields.map(({_id, name}) => { return {_id, name}})
            console.log("nakon svega ",req.user.fields);
        }
        res.send(req.user.fields)
    } catch (error) {
        res.status(500).send({error: error.message})
    }   
})

//pregled jednog fielda
FieldRoute.get('/api/fields/:id', auth, async (req, res) =>{
    const _id = req.params.id;
    try {
        const oneField = await Field.findOne({_id, owner: req.user._id});
    
        if(!oneField){
            return res.status(404).send({error: "Not found"})
        }
        res.send(oneField)
        } catch (error) {
            res.status(500).send(error.message)
        }
} )

//update fielda
FieldRoute.patch('/api/fields/:id', auth, async (req, res) =>{
    console.log("patch field");
    const updates = Object.keys(req.body)
    console.log(updates);
    const allowedUpdates= ["area", "name", "culture", "unit"];
    const isValidOperation = updates.every((update) =>{
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        return res.status(400).send()
    }
    try {
        console.log("try");
        const field = await Field.findOne({_id:req.params.id, owner: req.user._id})
        console.log("Field finded",field);
        updates.forEach((update) => field[update] = req.body[update])
        
        await field.save()
        if(!field){
            return res.status(404).send()
        }
        res.send(field)
    } catch (error) {
        res.status(400).send(error)
    }
})

FieldRoute.delete('/api/fields/:id', auth, async (req, res) =>{
    const _id = req.params.id;
    try {
        const field = await Field.findOneAndDelete({_id, owner: req.user._id})
        if(!field){
            return res.status(404).send()
        }
        res.send(field)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = FieldRoute;