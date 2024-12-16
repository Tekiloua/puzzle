const tabButtons=document.querySelectorAll(".button")
let i=0, j=0, u=0 ,isWin=false
let mat=[] , r, matNotExact=[] , matExact=[] ,tabButtonsShuffledContent=[]

while(tabButtonsShuffledContent.length<16){
  r=Math.floor(Math.random()*16+1)
  if(tabButtonsShuffledContent.indexOf(r)==-1)
    tabButtonsShuffledContent.push(r)
}

for(i=0;i<4;i++){
  let m=new Array()
  let mE=new Array()
  for(j=0;j<4;j++){
    m.push(tabButtons[u])
    mE.push(tabButtons[u++].textContent)
  }
  mat.push(m)
  matExact.push(mE)
}

tabButtons.forEach((el,i)=>{
  if(tabButtonsShuffledContent[i]==16)
    el.classList.add("buttonEmpty")
  el.innerHTML=tabButtonsShuffledContent[i]
})

const giveIndexPosition=(el)=>{
  for(i=0;i<4;i++) for(j=0;j<4;j++)
      if(mat[i][j].textContent==el.textContent)
       return { x:i, y:j }
}

const getIndexEmpty=()=>{
  for(i=0;i<4;i++) for(j=0;j<4;j++)
      if(mat[i][j].textContent=='16')
       return { x:i, y:j }
}

const canMove=(iElement,jElement,iEmpty,jEmpty)=>{
  if( (iElement==iEmpty-1 && jElement==jEmpty)||
      (iElement==iEmpty && jElement==jEmpty-1)||
      (iElement==iEmpty+1 && jElement==jEmpty)||
      (iElement==iEmpty && jElement==jEmpty+1) )return true
  return false
}

tabButtons.forEach(el=>{
  el.addEventListener("click",()=>{
    isWin=true
    if(canMove(giveIndexPosition(el).x,giveIndexPosition(el).y,getIndexEmpty().x,getIndexEmpty().y)){
      mat[getIndexEmpty().x][getIndexEmpty().y].classList.remove("buttonEmpty")
      mat[getIndexEmpty().x][getIndexEmpty().y].innerHTML=mat[giveIndexPosition(el).x][giveIndexPosition(el).y].textContent
      el.innerHTML="16"
      el.classList.add("buttonEmpty")
    }
    for(i=0;i<4;i++) for(j=0;j<4;j++)
        if(mat[i][j].textContent!=matExact[i][j]){
          isWin=false
          break
        }
  })
})