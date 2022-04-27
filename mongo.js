db = db.getSiblingDB('abatcaverna');
db.createUser(
  {
    user: 'admin',
    pwd: 'admin',
    roles: [{ role: 'readWrite', db: 'abatcaverna' }],
  },
);
db.createCollection('moradores');

const data = [{"_id":"61b137bb576628682425b259","nome":"Lucas Takeshi","apelido":"Coleira","ano_entrada":2016,"curso":"Ciência da Computação","imagem":"/moradores/coleira.jpeg","instagram":"https://www.instagram.com/lucastakeshii/","cachaca_ja_tomada":24,"cachaca_para_tomar":35,"senha":"21e66a0fda50e082ab2aee92d3dd69b7aa5a81dec1e85107420beef9755102cd"},{"_id":"61b1080c46ad280d3a076519","nome":"Matheus S","ano_entrada":2019,"apelido":"Teta","imagem":"/moradores/teta.jpeg","instagram":"https://www.instagram.com/bu.matheus/","cachaca_ja_tomada":12,"cachaca_para_tomar":12,"senha":"21e66a0fda50e082ab2aee92d3dd69b7aa5a81dec1e85107420beef9755102cd"},{"_id":"61b138b9576628682425b25c","nome":"Rubens","apelido":"Alan","ano_entrada":2021,"curso":"Agronomia","imagem":"/moradores/alan.jpeg","instagram":"https://www.instagram.com/rubens5664/","cachaca_ja_tomada":12,"cachaca_para_tomar":2,"senha":"21e66a0fda50e082ab2aee92d3dd69b7aa5a81dec1e85107420beef9755102cd"},{"_id":"61b13890576628682425b25b","nome":"Vinicius T","apelido":"Chapoca","ano_entrada":2019,"curso":"Ciência da Computação","imagem":"/moradores/chapoca.jpeg","instagram":"https://www.instagram.com/vinciust/","cachaca_ja_tomada":11,"cachaca_para_tomar":12,"senha":"26dd351564756933daac9aa22da8ca26d2d1ba626550c7798977aca69a3daa7d"},{"_id":"61b1385b576628682425b25a","nome":"Victor Hugo","apelido":"Cocorico","ano_entrada":2018,"curso":"Ciência da Computação","imagem":"/moradores/cocorico.jpeg","instagram":"https://www.instagram.com/victorhugo_99/","cachaca_ja_tomada":1,"cachaca_para_tomar":12,"senha":"21e66a0fda50e082ab2aee92d3dd69b7aa5a81dec1e85107420beef9755102cd"},{"_id":"61b139b4576628682425b25d","nome":"Heron","apelido":"?","ano_entrada":2021,"curso":"Ciência da Computação","imagem":"/moradores/heron.jpeg","instagram":"https://www.instagram.com/heron_f4/","cachaca_ja_tomada":1,"cachaca_para_tomar":2,"senha":"21e66a0fda50e082ab2aee92d3dd69b7aa5a81dec1e85107420beef9755102cd"}]

db.moradores.insertMany(data)

db.createCollection('users')

print("Init database!")
