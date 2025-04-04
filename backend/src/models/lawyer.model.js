import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"

const {Schema} =mongoose;

const lawyerSchema=new Schema({
    Name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    totalConnects:{
        type:Number,
        default:0
    },
    ID_proof:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    call_fees:{
        type:Number,
        default:0
    },
    location:{
        city:{
            type:String
        },
        state:{
            type:String
        }
    },
    refreshToken:{
        type:String
    }
},{
    timestamps:true
})

Lawyer.pre("save",async function(next){
    if(!this.isModified("passowrd")) return next();

    this.password=await bcrypt.hash(this.password,10);
    next();
})

Lawyer.method.comparePassword=async function(InputPassword){
    return bcrypt.compare(InputPassword,this.password);
}


Lawyer.methods.generateRefreshToken=async function(){
    return jwt.sign({
        _id:this._id
    },
    Process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
 )
}

Lawyer.methods.generateAccessToken=async function(){
    return jwt.sign({
        _id:this._id,
        Name:this.Name,
        email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
 )
}


const Lawyer=mongoose.model('Lawyer',lawyerSchema)
export default Lawyer