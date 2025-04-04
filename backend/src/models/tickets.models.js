import mongoose from 'mongoose'

const {Schema} =mongoose;

const ticketSchema= new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Solved","Pending"],
        default:"Pending"
    },
    owner:{
      type:Schema.Types.ObjectId,
      ref:"User"
    },
    Name:{
        type:String,
        required:true
    },
    evidence:{
        type:String
    },
    officerName:{
        type:String
    },
    location:{
        city:{
            type:String,
            required:true
        },
        state:{
           type:String,
           required:true
        }
    },
    isAnonymously:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})

const Ticket=mongoose.model('Ticket',ticketSchema);
export default Ticket