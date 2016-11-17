#mongodb 文件系统操作

mongodb会对上传的文件内容做MD5取值，所以对于内容相同的文件，只保存一份。


##参考

[official gridstore api][3]

[Node.js操作mongodb（2）——gridfs操作文件][0]

[How can I stream file uploads directly into Mongo's GridFS using Formidable?][2]

[Storing data stream from POST request in GridFS, express, mongoDB, node.js][1]

[gridfs-stream module][4]


[0]:http://toozhao.com/2012/10/24/201210nodejs-mongodb-gridfs/  "Node.js操作mongodb（2）——gridfs操作文件"
[1]:http://stackoverflow.com/questions/20860005/storing-data-stream-from-post-request-in-gridfs-express-mongodb-node-js "Storing data stream from POST request in GridFS, express, mongoDB, node.js"
[2]:http://stackoverflow.com/questions/10469350/how-can-i-stream-file-uploads-directly-into-mongos-gridfs-using-formidable "How can I stream file uploads directly into Mongo's GridFS using Formidable?"
[3]:http://mongodb.github.io/node-mongodb-native/api-generated/gridstore.html "official gridstore api"
[4]:https://github.com/aheckmann/gridfs-stream "gridfs-stream module"