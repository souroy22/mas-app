const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    key: { type: String, unique: true},
    companyName: { type: String, required: true },
    email: {type: String, required: true},
    phone: {type: String},
    createdTime: { type: Date, default: new Date() },
    updatedDate: {type: Date, default: new Date() },
    createdBy: {type: String, required: true},
    projects: {type: Array, default: []}
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Company', schema);

// ffmpeg -thread_queue_size 512 -f v4l2 -i /dev/video0 \
//   -ar 44100 -ac 2 -acodec pcm_s16le -f s16le -ac 2 -i /dev/zero -acodec aac -ab 128k -strict experimental \
//   -aspect 16:9 -vcodec h264 -preset veryfast -crf 25 -pix_fmt yuv420p -g 60 -vb 820k -maxrate 820k -bufsize 820k -profile:v baseline \
//   -r 30 -f flv rtmp://192.168.191.183/live/logo

//   python alef_logo_detection.py

//   python -m pip install redis

//   ffmpeg -thread_queue_size 512 -f v4l2 -i /dev/video0   -ar 44100 -ac 2 -acodec pcm_s16le -f s16le -ac 2 -i /dev/zero -acodec aac -ab 128k -strict experimental   -aspect 16:9 -vcodec h264 -preset veryfast -crf 25 -pix_fmt yuv420p -g 60 -vb 820k -maxrate 820k -bufsize 820k -profile:v baseline   -r 30 -f flv rtmp://192.168.191.183/live/logo
