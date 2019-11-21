/* Step 1: using axios, send a GET request to the following URL 
            (replacing the palceholder with your Github name):
            https://api.github.com/users/<your name>
  */





/* Step 2: Inspect and study the data coming back, this is YOUR 
  github info! You will need to understand the structure of this 
  data in order to use it to build your component function 

  Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
            create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/


const personCard = (singleObject) => {

  // CREATE ELEMENTS 
  const card = document.createElement('div');
  const image = document.createElement('img');
  const cardInfo = document.createElement('div');
  const name = document.createElement('h3');
  const userName = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const link = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

  // ADD CLASSES 
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  userName.classList.add('username');



  // ADD CONTENT 

  image.src = `${singleObject.avatar_url}`;
  name.textContent = `${singleObject.name}`;
  userName.textContent = `${singleObject.login}`;
  location.textContent = `${singleObject.location}`;
  profile.textContent = `${singleObject.html_url}`;
  followers.textContent = `${singleObject.followers}`;
  following.textContent = `${singleObject.following}`;
  bio.textContent = `${singleObject.bio}`;

  // APPEND CHILDREN 
  card.appendChild(image);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  profile.appendChild(link);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

  return card;
}

const entryPoint = document.querySelector('.cards');


// MY CARD 

let getCard = axios
  .get('https://api.github.com/users/oashtari')
  .then(response => {
    const cardData = response.data;
    // console.log('cardData', cardData);
    const newCard = personCard(cardData);
    // console.log('newCard', newCard);
    entryPoint.appendChild(newCard);
  })
  .catch(error => {
    if (error.includes("Network Error")) {
      console.log('network error')
    }
    console.log('the data was not returned', error);
  })

// FOLLOWER CARDS 

// console.log('test', axios.get('https://api.github.com/users/oashtari/followers'));
const followersArray = [];


axios
  .get('https://api.github.com/users/oashtari/followers')
  .then(response => {
    const followerURL = response.data;
    followerURL.forEach(item => {
      // console.log(item.url);
      axios.get(item.url)
        .then(response => {
          const cardData = response.data;
          // console.log('cardData', cardData);
          const newCard = personCard(cardData);
          // console.log('newCard', newCard);
          entryPoint.appendChild(newCard);
        })
    })
  })


// console.log('working array', followersArray);
// console.log(followersArray[2]);

// for (let i = 0; i < followersArray.length; i++) {
//   console.log(followersArray[i])
// }

// followersArray.push(item.url);

// followersArray.forEach(item => console.log(item));
// followersArray.forEach(item => {
//   console.log(item);
//   let followerCard = axios
//     .get(item)
// .then(response => {
//   const followerData = response.data;
//   // console.log('followerData', followerData);
//   const newFollowerCard = personCard(followerData);
//   // console.log('newCard', newCard);
//   entryPoint.appendChild(newFollowerCard);
// })
// .catch(error => {
//   if (error.includes("Network Error")) {
//     console.log('network error')
//   }
//   console.log('the data was not returned', error);
// })
// })

// const eachFollower = response.data;
// eachFollower.forEach(followerData => {
//   const newFollowerCard = personCard(followerData);
//   entryPoint.appendChild(newFollowerCard);
// });
// return 'hello world'
// })
// .catch(error => {
//   if (error.includes("Network Error")) {
//     console.log('network error')
//   }
//   console.log('the data was not returned', error);
// })

// console.log('followers', followersCards);




/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/