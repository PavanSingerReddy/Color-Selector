const button = document.querySelector(".btn")   
const colorGrid = document.querySelector(".colorGrid")
const colorValue = document.querySelector(".colorValue")
const message = document.querySelector(".message")

let copyValue = null;
button.addEventListener('click',async()=>{

    const [tab] = await chrome.tabs.query({active:true,currentWindow:true})

    await chrome.scripting.executeScript({
        target:{tabId : tab.id},
        function : selectColor,
    },async(returnedResult)=>{

        const [data] = await returnedResult
        if(data.result){
        const color = data.result.sRGBHex;
        colorGrid.style.background = color;
        colorValue.innerHTML = color;
        copyValue = color;
        }
    });
})


colorValue.addEventListener('click',async()=>{
    try {
        
        await navigator.clipboard.writeText(copyValue)
        message.innerHTML = "copied value successfully"
        setTimeout(()=>{
            message.innerHTML = ""
        },3000)
    } catch (error) {
        console.error(error)
    }
})


colorGrid.addEventListener('click',async()=>{
    try {
        
        await navigator.clipboard.writeText(copyValue)
        message.innerHTML = "copied value successfully"
        setTimeout(()=>{
            message.innerHTML = ""
        },3000)
    } catch (error) {
        console.error(error)
    }
})


async function selectColor(){

    try {
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open()
    } catch (error) {
        console.log(error)
    }
}