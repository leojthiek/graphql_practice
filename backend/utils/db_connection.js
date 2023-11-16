import mongoose from 'mongoose'

const mongoDb_Connection = () => {
    const MongoURI = 'mongodb://localhost:27017/graphql'
    mongoose.connect(MongoURI)
    
    const Db = mongoose.connection
    
    Db.on('error',console.error.bind(console,'mongoDB connection error'))
    Db.once('open',()=>{
        console.log('MongoDB connected')
    })
}



export default mongoDb_Connection

