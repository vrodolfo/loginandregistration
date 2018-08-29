const mongoose  = require('mongoose');
const db_name   = 'nodelogin';

// mongoose.connect(`mongodb://localhost/${db_name}`);

const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 5, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  }

const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  mongoose.connect("mongodb://localhost:27017/nodelogin", options).then(()=>{
    console.log('MongoDB is connected')
  }).catch(err=>{
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
    console.log(err);
    setTimeout(connectWithRetry, 5000)
  })
}

connectWithRetry()
