//lib/db.ts
import mongoose from "mongoose";

var MONGODB_URI = process.env.MONGODB_URI!
//! -> means i am telling you MONGODB_URI will for sure exits it will be for sure string instead of string|undefined 
//because first parameter of mongoose.connect only accepts string 

if (!MONGODB_URI) {
  throw new Error('Can find Mongo URI in env');
}

var cached = (global as any ).mongoose || {conn: null , promise: null}

export async function connectDB() {
  //if cached.connection exits and of course its value is not null
  if (cached.conn) return cached.conn ; 
 
  // if cached.conn not exits or have value null neither cached.promise exits of have value null
  //add promise to connect and resolve it  
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose)=>{
      console.log("MongoDB connected successfully");
      return mongoose;
      }) ;// resolve the mongoose instance
  }
  
  //when promise exits    Await the promise if not already done    and store it in cached.conn
  cached.conn = await cached.promise ; 

   //  Store cached object globally for reuse
   (global as any).mongoose = cached ; 

   return cached.conn; 
}

//global -> In Node.js, global is a built-in object that acts like a global namespace — kind of like window in the browser.

//No, global.mongoose does not exist by default.
// Only the global object exists by default in Node.js. It's a special object that lives throughout your app’s lifecycle.
// But properties like global.mongoose are not pre-defined. You define them yourself when needed