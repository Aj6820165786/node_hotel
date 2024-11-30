import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const personSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum: ['chef','waiter','manager'],
        required: true
    },
    mobile:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String
    },
    salary:{
        type: Number,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

personSchema.pre('save',async function(next){
    const person = this;
    
    // hash the password if save new or modified
    if(!person.isModified('password')) return next() // isModified is prebuild function

    try {
        
        // hash password generation
        const salt = await bcrypt.genSalt(10)
        
        // hash the password

        const hashedPassword = await bcrypt.hash(person.password,salt)

        // override the person password

        person.password = hashedPassword

        next()
    } catch (err) {
        return next(err)
    }
})

personSchema.methods.comparePassword = async function(userPassword){
    try {
        
        // use bcrypt to compare user provided password or already hashed password
        const isMatch = await bcrypt.compare(userPassword,this.password)

        return isMatch

    } catch (err) {
        throw err
    }
}

export const Person = mongoose.model('Person',personSchema)