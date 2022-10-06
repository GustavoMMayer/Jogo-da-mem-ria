export const formatTimeElapsed = (seconds:number)=>{
    let minutes = Math.floor(seconds/60);
    seconds = seconds-(minutes*60);

   let minString = `${minutes<10?'0'+minutes:minutes}`; 
   let secString = `${seconds<10?'0'+seconds:seconds}`; 

   return (`${minString}:${secString}`);
};