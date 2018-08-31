//check out req.query
//person.innerHTML = ''; to clear

const loadScript = () => {
  let data = [];
  
  const displayPeople = data => {(
    data.forEach((person, index) => {
      $("ListPeople").append(
        `<Person id=${person._id}>${person.firstName} ${person.lastName}</Person>`
      ) 
    })
      
  )};

  fetch('/getList')
    .then(res => res.json())
    .then(res => {
      data = [];
      data = res;
      displayPeople(res);
    })

  //when user submits a new entry pressing submit button
  $("#submitButton").click(function() {
    const person = {
      firstName : $("#firstName").val(),
      lastName : $("#lastName").val(),
      address : $("#address").val(),
      city : $("#city").val(),
      state : $("#state").val(),
      zipCode : $("#zipCode").val(),
      phoneNumber : $("#phoneNumber").val()
    }

    fetch('/addPerson', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(person)
    })
      .then(response => 
        response.json()
      )
  })

  $("#deleteButton").click(function() {
      const name = {
        firstName : $("#firstName").val(),
        lastName : $("#lastName").val()
      }

      fetch('/deletePerson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(name)
      })
        .then(response => 
        response.json()
      )
  })

  $("#updateButton").click(function() {
    let data;
    fetch('/updatePerson')
      .then(res=> res.json())
      .then(res => console.log('fetched data: ', res))
  })

  //allows clicking on dynamitically changing elements
  $('body').on('click','Person', function(e) {
    e.preventDefault();
    const id = e.target.id;

    $("ListPerson").text('');
    //ugly but works
    for(x = 0; x < data.length; x += 1) {
      if(data[x]._id === id.toString()){
        $("ListPerson").append(`
          <h3> ${data[x].firstName} ${data[x].lastName}</h3>
          <h3> ${data[x].address}</h3>
          <h3> ${data[x].city}, ${data[x].state} ${data[x].zipCode}</h3>
          <h3> ${data[x].phoneNumber}</h3>`
        )}
    }
  });
}


window.onload = loadScript();