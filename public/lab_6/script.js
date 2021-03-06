function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

function getRandomIntInclusive(min, max) {
  min1 = Math.ceil(min);
  max1 = Math.floor(max);
  test_value = Math.floor(Math.random() * (max1 - min1 + 1) + min1);
  test_arr = [];
  test_arr.push(test_value);

  // Tried to make sure all numbers were unique, but couldn't figure it out

  // console.log(test_arr);
  const index = test_arr.length;
  // if (test_arr.length > 1) {
  for (let i = 0; i < index; i++) {
    // console.log(test_arr[i]);
    for (let x = i + 1; x < index; x++) {
      console.log(test_arr[i], test_arr[x]);
      if (test_arr[i] === test_arr[x]) {

        test_arr[x] = Math.floor(Math.random() * (max1 - min1 + 1) + min1);
        console.log(test_arr[x]);
        test_value = test_arr[x];
      }
    }
  }
  // }
  console.log(test_arr);
  return test_value;
  // return Math.floor(Math.random() * (max1 - min1 + 1) + min1);
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      // console.log(fromServer);
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }
      // eslint-disable-next-line camelcase
      const arr_1 = range(10);
      // eslint-disable-next-line camelcase
      const arr_2 = arr_1.map(() => {
        const num = getRandomIntInclusive(0, 243);
        // const num = testarr2(0, 243);

        return fromServer[num];
      });

      const reverseList = arr_2.sort((a, b) => sortFunction(b, a, 'name'));
      const ol = document.createElement('ol');
      ol.className = 'flex-inner';
      $('form').prepend(ol);

      reverseList.forEach((el, i) => {
        // console.log(el.code);
        const li = document.createElement('li');
        $(li).append(`<input type="checkbox" value=${el.code} id=${el.code}/>`);

        $(li).append(`<label for=${el.code}>${el.name} </label>`);
        $(ol).append(li);
      });
      // console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});