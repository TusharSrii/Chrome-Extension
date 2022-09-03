
let myLeads=[]
const inputEl = document.getElementById("input-el")
const inputBtn=document.getElementById("input-btn")
const ulEl=document.getElementById("ul-el")
const printBtn=document.getElementById("print-btn")
const deleteBtn=document.getElementById("delete-btn")
const tabBtn=document.getElementById("tab-btn")

const leadsFromLocalStorage= JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    printLeads()
}

inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    console.log(myLeads)
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    printLeads()
})


function printLeads() {
    let listItems=""
    // ulEl.innerHTML= "<p></p>"
    for(let i=0;i<myLeads.length;i++){
        // listItems += "<li>" + myLeads[i] + "</li>" 
        listItems += `
            <li>
                <a target='_blank' href='${myLeads[i]}'>
                    ${myLeads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML=listItems //rendering only once instead of every iteration
}


//false values in JS
//false, 0, "", null, undefined, NaN

deleteBtn.addEventListener("dblclick", function (){
    localStorage.clear()
    myLeads=[]
})


tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log(tabs)
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        printLeads()
    })    
})