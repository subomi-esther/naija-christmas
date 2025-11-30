const paragraph = document.getElementById('paragraph')
const calender = document.getElementById('calender')
const buttons = document.querySelectorAll('.btn')
const  title = document.getElementById('chapterTitle')
const cancelPopup = document.getElementById('exit')
const backBtn = document.getElementById('toCal')
const popUp = document.getElementById('popup')
const chapterContent = document.getElementById('chapterContent')

calender.hidden = false
chapterContent.hidden = true
popUp.hidden= true
async function getData() {

   const url = './data.json'
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result); 

    const chapters = []  //created an empty array to store the string text content
    // for of loop work with await without having to use async
    for(let ch of result) {
      // ch represents each indiv. objects(each elemnt) in the result array
      // console.log(ch)
      const res = await fetch(ch.content) //ch.content (indiv object, gets the content)
      const text = await res.text() //.text()changes it into a string 
      // console.log(text)
      chapters.push(text) // texts fetched is now added to the empty array

      // console.log(text)
    }



    //  console.log(result.publicationDate)

     //publication dates are not valid, look into this
     buttons.forEach((btn, index)=> {


      const openDate = new Date(result[index].publicationDate)
      const open = openDate.toISOString().split('T')[0]
      console.log(open)
      const today = new Date().toLocaleDateString('en-CA').split('T')[0]
      // console.log(today)


      if(open > today){
        console.log('come back')
        btn.disabled = true
        
      }else if(open < today){
        console.log('you can view')
        btn.disabled = false


      }
      else if (open === today) {
        console.log('view')
        btn.disabled = false
      }
      




    btn.addEventListener('click', function() {

      
      calender.style.display='none'
      chapterContent.hidden = false
      paragraph.innerHTML= chapters[index] // we are able to get the index of chapters because its in an array
      title.innerText =`Chapter ${result[index].id}`
     


     
      
    })
  })



backBtn.addEventListener('click', function() {
  calender.style.display = 'flex'
  setTimeout(() => {
      popUp.hidden = false

  }, 1500);
  chapterContent.hidden = true

})

cancelPopup.addEventListener('click', function() {
  popUp.style.display='none'

})





  } catch (error) {
    console.error(error.message);
  }
}
 




getData()
