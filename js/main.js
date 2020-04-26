let imgHover = document.querySelectorAll('.container .items');

for(let i=0; i<imgHover.length; i++){
    imgHover[i].addEventListener('mouseover', function(){
        this.lastChild.previousElementSibling.style.display = 'block';
    })
}

for(let i=0; i<imgHover.length; i++){
    imgHover[i].addEventListener('mouseout', function(){
        this.lastChild.previousElementSibling.style.display = 'none';
    })
}