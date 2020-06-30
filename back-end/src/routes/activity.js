const express = require('express')
const Activity = require('../db/models/activity.js')
const auth = require('../middleware/auth')

const ActivityRoute = new express.Router()

ActivityRoute.post('/api/activity', auth, async (req, res) =>{
    const activity = new Activity({
        ...req.body,
        owner: req.user._id,
        ownerEmail: req.user.email
    })
    try {
        await activity.save()
        res.status(200).send(activity)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

ActivityRoute.get('/api/activity', auth, async (req, res) =>{
    const match = {}
    console.log("field_if", req.query.field);
    if(req.query.title != 'undefined' && req.query.title != null){
        let sea = new RegExp(`^.*${req.query.title}.*$`, "img")
        match['description'] = sea
    }
    if(req.query.field != 'undefined' && req.query.field != null){
        match['field'] = req.query.field
    }
    console.log("match", match);
    try {
        await req.user.populate({
            path: 'activities',
            match,
            options:{
                limit: parseInt(req.query.limit) || 5,
                skip: parseInt(req.query.skip) * 5 || 0
            }
        }).execPopulate()
        const sum = req.user.activities.reduce((a, {expense}) => a + expense, 0);
        res.send({sum, activities: req.user.activities})
    } catch (error) {
        res.status(500).send(error)
    }
})

ActivityRoute.get('/api/oneactivity/:id', auth, async (req, res) =>{
    const _id = req.params.id;
    try {
        const oneActivity = await Activity.findOne({_id, owner: req.user._id});
        if(!oneActivity){
            return res.status(404).send({error: "Not found"})
        }
        res.send(oneActivity)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

ActivityRoute.patch('/api/activity/:id', auth, async (req, res) =>{
    console.log("patch field");
    const updates = Object.keys(req.body)
    console.log(updates);
    const allowedUpdates= ["description", "expense", "field", "reminder"];
    const isValidOperation = updates.every((update) =>{
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        return res.status(400).send()
    }
    try {
        console.log("try");
        const activity = await Activity.findOne({_id:req.params.id, owner: req.user._id})
        console.log("Field finded",activity);
        updates.forEach((update) => activity[update] = req.body[update])
        
        await activity.save()
        if(!activity){
            return res.status(404).send()
        }
        res.send(activity)
    } catch (error) {
        res.status(400).send(error)
    }
})

ActivityRoute.delete('/api/activity/:id', auth, async (req, res) =>{
    const _id = req.params.id;
    try {
        const activity = await Activity.findOneAndDelete({_id, owner: req.user._id})
        if(!activity){
            return res.status(404).send()
        }
        res.send(activity)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = ActivityRoute