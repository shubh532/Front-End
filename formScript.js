window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:4000/get-data")
        .then((response) => {
            for (let i = 0; i < response.data.userData.length; i++) {
                showData(response.data.userData[i])
            }
        })
        .catch(err => {
            document.body.innerHTML += "<h6> SOMETHING WENT WRONG<h6>"
        })
})



const SubmitBtn = document.getElementById("submitBtn")
SubmitBtn.onclick = async (e) => {
    e.preventDefault()
    let userData = {
        name: document.forms["userform"]["name"].value,
        email: document.forms["userform"]["email"].value,
        contact: document.forms["userform"]["number"].value,
    }
    console.log(userData, "USERDATA")
    const response = await axios.post("http://localhost:4000/add-user", { ...userData })
    showData(response.data.userData)
}


function showData(data) {
    let details = `${data.name}-${data.email}-${data.contact}`
    let li = document.createElement("li")
    li.appendChild(document.createTextNode(details))
    li.id = `${data.id}`
    let delBtn = document.createElement("button")
    delBtn.appendChild(document.createTextNode("Delete"))
    let editBtn = document.createElement("button")
    editBtn.appendChild(document.createTextNode("Edit"))
    document.getElementById("showUser").appendChild(delBtn)
    li.appendChild(delBtn)
    li.appendChild(editBtn)
    document.getElementById("showUser").appendChild(li)


    delBtn.onclick = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.delete(`http://localhost:4000/delete/${data.id}`)
            console.log(response, "RESPONSE")
            if (response.status === 200) {
                document.getElementById("showUser").removeChild(li)
            }
        } catch (err) {
            console.log(err)
        }
    }
}