let friends = []

const getFriends = async () => {
  const result = await fetch('/api');
  friends = await result.json();
}

const createFriend = async friendName => {
  const result = await fetch('/api',{
    method: 'POST',
    body: JSON.stringify({friendName}),
    headers: {
      "Content-Type": "application/json"
    }
  });
  await result.json();
}

const render = async () => {
  await getFriends()
  const allFriends = document.getElementById('allFriends')
  while (allFriends.firstChild) {allFriends.removeChild(allFriends.firstChild)}
  friends.forEach(friend => {
    let friendEl = document.createElement('div')
    friendEl.innerHTML = `
    <div class="friend" id="${friend.id}">
    ${friend.name}
    <div class="friendStat">
      ${friend.score}
      <button class="inc friendButton">+</button>
      <button class="dec friendButton">-</button>
      <button class="del friendButton">x</button>
    </div>
  </div>
    `
    friendEl.classList.add('friendContainer')
    allFriends.appendChild(friendEl)
  })
}

const changeFriend = async (friendId, buttonType) => {
  let changeMethod, changeInput
  if(buttonType==='del'){
    changeMethod = 'DELETE'
    changeInput = {friendId}
  } else if(buttonType==='inc') {
    changeMethod = 'PUT'
    let score = friends.filter(friend=>friend.id === +friendId)[0].score + 1
    changeInput = {friendId, score}
  } else {
    changeMethod = 'PUT'
    let score = friends.filter(friend=>friend.id === +friendId)[0].score - 1
    changeInput = {friendId, score}
  }

  const result = await fetch('/api',{
    method: changeMethod,
    body: JSON.stringify(changeInput),
    headers: {
      "Content-Type": "application/json"
    }
  });
  await result.json();
}



document.getElementById('createButton').addEventListener('click', async ()=>{
  const newFriend = document.getElementById('newFriend').value
  if(newFriend === '' || friends.map(friend=>friend.name).includes(newFriend) ) {
    //update this later to be nicer
    alert('New friend must have unique, non-empty name!')
  } else {
    await createFriend(newFriend);
    await render();
  }
})

document.getElementById('allFriends').addEventListener('click', async (ev)=>{
  if(ev.target.classList.contains("friendButton")){
    const selectedFriend = ev.target.parentElement.parentElement.id
    const buttonType = ev.target.classList[0]
    await changeFriend(selectedFriend, buttonType)
    await render()
  }
})

render()
