window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:4000/getExpense-data")
        .then((response) => {
            for (let i = 0; i < response.data.ExpenseData.length; i++) {
                showData(response.data.ExpenseData[i])
            }
        })
        .catch(err => {
            document.body.innerHTML += "<h6> SOMETHING WENT WRONG<h6>"
        })
})




const addExpenseBtn = document.getElementById("addBtn")

addExpenseBtn.onclick = async (e) => {
    e.preventDefault()
    const ExpenseData = {
        amount: document.forms["ExpenseForm"]["Amount"].value,
        description: document.forms["ExpenseForm"]["Description"].value,
        date: document.forms["ExpenseForm"]["Date"].value,

    }
    console.log(ExpenseData, "I am Woking Noew")
    const response = await axios.post("http://localhost:4000/postExpense-data", { ...ExpenseData })
    console.log(response, "this Is Rsponse")
    showData(response.data.ExpenseData)

}


function showData(data) {
    let details = `${data.amount}-${data.description}-${data.date}`
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