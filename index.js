// localStorage.setItem("myLeads", "") used to put an item to the local storage usi/ng a key and value method
// localStorage.getItem("") getting items from the local storage
// localStorage.clear() clearing the local storage
// myLeads = JSON.parse(myLeads) used to Turn string to array 
// myLeads = JSON.stringify(myLeads)used to Turn array to string 


const btnclicked = document.querySelector("#save") //declaring save button selector
const deletebtn = document.querySelector("#delete") //declaring delete button selctor
const getText  = document.querySelector("#input") //declaring text button selector
const saveTab = document.querySelector("#saveTab") //dclaring save tab selector
let myLeads = []  //declaring array to store texts
const ul = document.querySelector("#ul") //declaring list delector for styling
const leadFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")) //creating a variable to store the leads saved into local storage 

// const tabs = [{url:"www.google.com"}]creating an array with an object in it to store a url

saveTab.addEventListener("click", function(){
    //grabs the url of the current tab
    chrome.tabs.query({active: true, currentWindow: false, function(tabs){
        myLeads.push(tabs[0].url) //grabs the url and pushies it to the leads array
        localStorage.setItem("myLeads", JSON.stringify(myLeads)) //stores the url in local storage
        render(myLeads) 
    }})
})

// condition statement to check if there are any previous stored leads in storage
if (leadFromLocalStorage){
    myLeads = leadFromLocalStorage
    render(myLeads)
}

// creating a function to get the text inputted and passing it to the my leads array
click = function (){
    myLeads.push(getText.value)
    console.log(myLeads)
}

//creating a function to input out the array in a list form
render = function(Leads){
    //FOR statement to loop through the myleads array
    ul.innerHTML = ""
    for ( var i = 0 ; i <= (Leads.length-1); i++){
        // ul.innerHTML += "<li><a target='_blank' href='"+ myLeads[i] +"'>" + myLeads[i] +"</a></li>"
        //Then to input them as list contents in htmml using template strings
        ul.innerHTML += `
            <li>
                <a target='_blank' href='${Leads[i]}'>
                    ${Leads[i]}
                </a>
            </li>
        `
    }
    document.querySelector("ul").style.border= "1px solid #5f9341"
    getText.value = ""
}

// event listener for when the save button is clicked
btnclicked.addEventListener("click", function(){
    //IF statement for if the text submitted is empty 
    if ((getText.value).length > 0){
        click()
        render(myLeads)
        //to store the values of my leads to local storage
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        // to print them out in console
        console.log(localStorage.getItem("myLeads"))
    }else if((getText.value).length === 0){
        alert("Type actual characters")
    }
})

// event listener for when the text is submitted using the enter key
getText.addEventListener("keypress", function(event){
    //IF statement for if the text submitted is empty 
    if (event.key === 'Enter' && (getText.value).length > 0){
        click()
        render(myLeads)
        //to store the values of my leads to local storage
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        console.log(localStorage.getItem("myLeads"))
    }else if(event.key === 'Enter' && (getText.value).length < 1){
        alert("Type actual characters")
    }
})

// event listener for when the delete all button is clicked
deletebtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
    document.querySelector("ul").style.border= "none"
})