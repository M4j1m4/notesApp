import Note from "../models/Note.js";
import mongoose from "mongoose";

export const getAllNotes = async (req,res) => {
    try{
        const notes = await Note.find().sort({createdAt:-1});
        res.status(200).json(notes);
    }catch(error){
        res.status(500).json({message:"Server Error"});
        console.error("Error in getAllNotes Controller", error);
    }
};

export const getNote = async (req,res) => {
    try {
        const note = await Note.findById(req.params.id);
        res.status(200).json(note);
    } catch (error) {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({message:"Note not found"})
        };
        res.status(500).json({message:"Server Error"});
        console.error("Error in getNote Controller", error);
    }
};

export const createNote = async (req,res) => {
    try {
        const  {title, content} = req.body;
        const note = new Note({title, content});
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({message:"Server Error"});
        console.error("Error in createNote Controller", error);        
    }
}

export const updateNote = async (req,res) => {
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title, content}, {new:true});
        res.status(200).json(updatedNote);
    } catch (error) {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({message:"Note not found"});
        }        
        res.status(500).json({message:"Server Error"});
        console.error("Error in updateNote Controller", error);  
    }
};

export const deleteNote = async (req,res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Note Deleted Succesfully!"});
    } catch (error) {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({message:"Note not found"});
        }
        res.status(500).json({message:"Server Error"});
        console.error("Error in delete Controller", error);  
    }
};