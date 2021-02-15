let ul=document.querySelector('.worksList');;

let work=document.getElementById('addWorkInput');


let storeObj={};
let storedItems=[];
let storageItems;
let result;
let storing;

// Local Storage 
let stored=JSON.parse(window.localStorage.getItem('lists'));
if(stored!=null){
	stored.map( (element)=>{
		for(let key in element){
			liForStoredItem(key,element[key][0],element[key][1]);
		}
	} )
}


// Adding Items
addBtn.onclick=()=>{
	if(work.value!=""){
		createLi(work.value);
		work.value=null;
		
		alertItem('Work Added','#77ca72');

	}
}



// Accepting Items over Microphone
const speechRecognition = window.webkitSpeechRecognition
const voice = new speechRecognition();
voice.lang = "eng-ENG"
voice.continious = false;
microphone.onclick=()=>{
	addWorkInput.setAttribute('disabled','disabled');
	addBtn.setAttribute('disabled','disabled');
	voice.start();
}
voice.onresult = (event) => {

	alertItem('Work Added','#77ca72');

	result = event.results[0][0].transcript;
	createLi(result);
	addWorkInput.removeAttribute('disabled','disabled');
	addBtn.removeAttribute('disabled','disabled');
}
voice.onspeechend = function() {
  	voice.stop();
}
voice.onerror = function(event) {
   	addWorkInput.removeAttribute('disabled','disabled');
	addBtn.removeAttribute('disabled','disabled');
}


function createLi(item){
	let li=document.createElement('li');

	let spanItem=document.createElement('span');
	spanItem.setAttribute('class','item');
	spanItem.innerText=item;
		
	let deleteDiv=document.createElement('div');
	deleteDiv.setAttribute('class','deleteDate');

	let currentDate=new Date;
	
	deleteDiv.innerHTML=`<span class="date">${currentDate.getHours()}:${currentDate.getMinutes()}</span>
					<i class="fas fa-trash-alt" id="deleteBtn"></i>`
	
	
	storeObj[item]=[currentDate.getHours(),currentDate.getMinutes()];
	storageItems=JSON.parse(window.localStorage.getItem('lists'));
	if(storageItems!=null){
		storedItems=storageItems;
	}
	storedItems.push(storeObj);
	window.localStorage.setItem('lists',JSON.stringify(storedItems));
	storeObj={};	
	li.appendChild(spanItem);
	li.appendChild(deleteDiv);
	ul.appendChild(li);

	// Delete Item

	let newDeleteBTNS=document.querySelectorAll('#deleteBtn');
	deleteItem(newDeleteBTNS);
	
}

function liForStoredItem(items,hours,minutes){
	let li=document.createElement('li');

	let spanItem=document.createElement('span');
	spanItem.setAttribute('class','item');

	spanItem.innerText=items;
	
	let deleteDiv=document.createElement('div');

	deleteDiv.setAttribute('class','deleteDate');

	deleteDiv.innerHTML=`<span class="date">${hours}:${minutes}</span>
					<i class="fas fa-trash-alt" id="deleteBtn"></i>`
	
	li.appendChild(spanItem);
	li.appendChild(deleteDiv);
	ul.appendChild(li);
	
	// Delete Item
	let deleteBTNS=document.querySelectorAll('#deleteBtn');
	deleteItem(deleteBTNS);
}


// Delete Item
function deleteItem(list){
	for(let value of list){
		value.onclick=(e)=>{

			alertItem('Work Removed','#d9534f');

			let targettingValue=e.target.parentElement.parentElement;
			targettingValue.remove();
			let deletingStoredItem=JSON.parse(window.localStorage.getItem('lists'));
			let targetInnerText=e.target.parentElement.parentElement.firstElementChild.innerText;
			deletingStoredItem.map((element,index)=>{
				for(let key in element){
					if(targetInnerText.toLowerCase()==key.toLowerCase()){
						deletingStoredItem.splice(index,1);
					}
				}
			})
			storedItems=deletingStoredItem;
			window.localStorage.setItem('lists',JSON.stringify(storedItems));
		}
	}
}


// Alerting

function alertItem(item,color){
	document.querySelector('.alert').innerText=item;
	document.querySelector('.alert').style.backgroundColor=color;
	document.querySelector('.alert').style.opacity=1;
	setTimeout(()=>{
		document.querySelector('.alert').style.opacity=0;
	},1000)
}

// '#a2231e';