/**
 * �������ݿ�
 * ����Ǽ�+ģ��
 */
var mongoose = require('mongoose');
var settings = require('../settings');
var ObjectId = mongoose.Schema.Types.ObjectId;
//�������ݿ�  mongodb:/��������IP/���ݿ�
mongoose.connect(settings.dbUrl);
var UserSchema = new mongoose.Schema({
    username: String, //�û���
    password: String, //����(Ҫ��md5����֮���ٱ���)
    email: String,    //����
    avatar: String    //ͷ��
});
var UserModel = mongoose.model('User', UserSchema);
//���µ�ģ�͹Ǽ�
var ArticleSchema = new mongoose.Schema({
    title: String,  //����
    content: String, //����
    pv:{type:Number,default:0},
    comments:[{user:{type:ObjectId,ref:'User'},
            createAt:{type:Date,default:Date.now()},content:String}],
    user: {type: ObjectId, ref: 'User'}, //�������µ��û�
    createAt: {type: Date, default: Date.now()}//����ʱ��
});
//����������ʾ������һ��ģ�ͣ�һ��������ʾ��ȡһ��ģ��
var ArticleModel = mongoose.model('Article', ArticleSchema);
//��ȫ�ֶ����϶���һ���������ԣ�����һ��ģ�����ƣ����ش����ƶ�Ӧ��ģ��
global.Model = function (modelName) {
    return mongoose.model(modelName);
};



