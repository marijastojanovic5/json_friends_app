document.addEventListener("DOMContentLoaded",()=>{
    console.log('connected')
    getFriendForm().addEventListener('submit', renderForm)
    renderAllFriends()
})

// let allFriends = []
 function getFriendsContainer(){
     return document.getElementById("friends-container")
 }
 function getFriendForm(){
     return document.getElementById("friend-form")
 }


function renderAllFriends() {
    fetch("http://localhost:3000/friends")
    .then(r => r.json())
    .then(friends =>{
        friends.forEach(friend =>buildFriendCard(friend))
    })
}




function buildFriendCard(friend){
    // console.log("card")
    // let container = getFriendsContainer()
    let cardDiv = document.createElement('div')
    cardDiv.className = "card"
    getFriendsContainer().appendChild(cardDiv)

    let friendName = document.createElement('h2')
    friendName.className = "name"
    friendName.innerText = `Name: ${friend.name}`
    cardDiv.appendChild(friendName)

    let friendAge = document.createElement('h5')
    friendAge.className = "age"
    friendAge.innerText = `Age: ${friend.age}`
    cardDiv.appendChild(friendAge)

    let friendImg = document.createElement('img')
    friendImg.className = "img"
    friendImg.src = friend.image
    cardDiv.appendChild(friendImg)

    let likes = document.createElement('p')
    likes.innerText = `Likes: ${friend.likes}`
    likes.id = `likes-${friend.id}`
    cardDiv.appendChild(likes)

    let likeBtn = document.createElement("button")
    likeBtn.className = "like-button"
    likeBtn.innerText = "Like <3"
    likeBtn.id = `btn-${friend.id}`
    //likeBtn.dataset.id = friend.id
    cardDiv.appendChild(likeBtn)
    likeBtn.addEventListener("click",btnLikeHandler)

    let deleteBtn = document.createElement("button")
    deleteBtn.id = `Delete-${friend.id}`
    // deleteBtn.dataset.id = friend.id
    deleteBtn.innerText = "Delete me!"
    cardDiv.appendChild(deleteBtn)
    deleteBtn.addEventListener("click",deleteFriendHandler)


}
function deleteFriendHandler(event){
    let deleteBtnId = parseInt(event.target.id.split("-")[1])
    fetch("http://localhost:3000/friends/" + deleteBtnId, {
        method: "DELETE"
    }).then(response => response.json())
    .then(console.log)
    event.target.parentElement.remove()
}

function btnLikeHandler(event){
    let findButton = document.getElementById(`${event.target.id}`)
    let findButtonId = parseInt(event.target.id.split("-")[1])
    let currentLikes = parseInt(findButton.previousSibling.innerText.split(" ")[1])
    let newLikes = ++currentLikes
    let newBody = {likes: newLikes}
    // let findBtn = event.target.dataset.id
    fetch("http://localhost:3000/friends/" + findButtonId, {
        method: "PATCH",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBody)
    }).then(response => response.json())
    .then(update => updateLikes(update))
}

function updateLikes(friend){
    let likesDiv = document.getElementById(`likes-${friend.id}`)
    likesDiv.innerText = `Likes: ${friend.likes}`
}

function renderForm(event){
    event.preventDefault()
    let newName = event.target.name.value
    let newAge = event.target.age.value
    let newImg = event.target.image.value
    let newFriend = {name: newName, age: newAge, image: newImg, likes: 0}
    fetch("http://localhost:3000/friends",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newFriend)     
    })
    .then(r => r.json())
    .then(newFriend => buildFriendCard(newFriend))
    event.target.reset()

}



// function friendsArray(friends){
//     let allFriends= friends.forEach{friend => console.log(friend)}

// }
