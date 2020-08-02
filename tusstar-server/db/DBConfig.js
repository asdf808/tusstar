module.exports={
  host: '101.132.102.217:27017',
  user: 'root',
  password: '123456',
  DBname: 'tusstar',
  get url(){
    return `mongodb://${this.user}:${this.password}@${this.host}/${this.DBname}?authSource=admin`
  }
}