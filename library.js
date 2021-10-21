let myLibrary=[]; 
let container=document.querySelector('.main-container');
if(JSON.parse(localStorage.getItem('sabzi'))) {
  myLibrary = JSON.parse(localStorage.getItem('sabzi'));
  myLibrary.forEach(book => {
      addBookToLibrary(book);
  });
}


let remove=document.querySelector('.delete');
remove.addEventListener('click',e=>{
    container.removeChild(e.target.parentElement);
});



function Book(title,author,pages) {
    this.title=title;
    this.author="-By"+author;
    this.pages=pages;
    this.status='unread';
  }
function addBookToLibrary(book) {
    let div=document.createElement('div');
    let h3=document.createElement('h3');
    div.appendChild(h3);
    let h4=document.createElement('h4');  
    div.appendChild(h4);
    let h5=document.createElement('h5');  
    div.appendChild(h5);
    let checkbox = document.createElement('input');
    checkbox.type='checkbox';
    checkbox.id='todo';
    if(book.status==='read'){
      checkbox.checked=true;
      }
    checkbox.addEventListener('change', function() {
        if (this.checked) {
          book.status='read'
          localStorage.removeItem('sabzi');
          localStorage.setItem('sabzi',JSON.stringify(myLibrary));
        } else {
          book.status='unread'
          localStorage.removeItem('sabzi');
          localStorage.setItem('sabzi',JSON.stringify(myLibrary));
        }
      });
    div.appendChild(checkbox);
    let label=document.createElement('label');
    label.htmlFor='todo';
    label.setAttribute('data-content','not-Read');
    label.innerText='not-Read';
    div.appendChild(label);
    let button=document.createElement('button');
    button.classList.add('delete');
    button.innerText='Remove';
    button.addEventListener('click',e=>{
        let parent=e.target.parentElement;
        let index = myLibrary.findIndex(element=>{
          return  element.title===parent.dataset.objectid;})
        myLibrary.splice(index,1);
        container.removeChild(e.target.parentElement);
        localStorage.removeItem('sabzi');
        localStorage.setItem('sabzi',JSON.stringify(myLibrary));
      
        
    })

    div.appendChild(button);
    container.appendChild(div);
    h3.textContent=book.title;
    h4.textContent=book.author;
    h5.textContent=book.pages;
    div.setAttribute('data-objectid',book.title);
    
    
}


let x=0;
let add= document.getElementById('add');
add.addEventListener('click',function(){
    document.querySelector('.popup').style.display='flex';
})

let close=document.getElementById('close');
close.addEventListener('click',function(){
    document.querySelector('.popup').style.display='none';
})

let form = document.getElementById('actual-form');
form.addEventListener('submit',function(event){
   event.preventDefault();
   let flag=0;
   myLibrary.forEach(item=>{
       if(item.title===document.getElementById('title').value){
           flag=1;
       }
   })
   if(flag===1){
       console.log('title exists');
       return false;
   }

   let {title,author,pages}=this.elements;
   console.log(pages.value);
   const book = new Book(title.value,author.value,pages.value);

   myLibrary.push(book);
   localStorage.setItem('sabzi',JSON.stringify(myLibrary));
   x=x+1;
   addBookToLibrary(book);
   form.reset();
   document.querySelector('.popup').style.display='none';
});

