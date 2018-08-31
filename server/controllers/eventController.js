const AddressBookList = require('../schemas/peopleSchema');

const addressBookController = {};

addressBookController.AddPerson = (req, res, next) => {
  AddressBookList.create(req.body, (err, person) => {
    if(err) return console.log('err: ', err);

    console.log('successfully added person to the database');
    next();
  });
}

addressBookController.DeletePerson = (req, res, next) => {
  AddressBookList.findOneAndDelete({firstName: req.body.firstName, lastName: req.body.lastName})
    .then(res => res.sendStatus(200))
    .catch(err => res.sendStatus(400))
  // AddressBookList.findOneAndDelete({firstName: req.body.firstName, lastName: req.body.lastName}, (err, body) => {
  //   if(body === null || err) return res.send('Did not delete');
    
  //   console.log('successfully deleted from database');
  //   next();
  // })
}

addressBookController.GetList = (req, res, next) => {
  AddressBookList.find({}, (err, people) => {
    if(err) return console.log('err', err)

    //res.json() sends the data as json without setting the header
    res.json(people);
    console.log(`Here's the list!`);
    next();
  })
}

addressBookController.FindPerson = (req, res, next) => {
  const updates =   {
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    phoneNumber: req.body.phoneNumber
  }

  AddressBookList.findOneAndUpdate({firstName: req.body.firstName, lastName: req.body.lastName}, {$set: updates})
  // AddressBookList.findOneAndUpdate({firstName: req.body.firstName, lastName: req.body.lastName}, {$set: updates}, (err, person) => {
  //   if(err) return console.log('err: ', err);
  //   console.log('err', err);
  //   console.log('found person: ', person);
  //   res.json(person);
  //   next();
  // })
}

module.exports = addressBookController;

