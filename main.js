const {Skolengo} = require('scolengo-api')
const config = require('./config');

Skolengo.fromConfigObject(config).then(async user => {
  const infoUser = await user.getUserInfo()
  console.log(`Correctement authentifié sous l'identifiant ${infoUser.id}`)
})