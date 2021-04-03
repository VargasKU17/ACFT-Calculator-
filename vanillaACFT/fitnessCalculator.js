const calculate = document.getElementById('calculate')

let getScores = (raw, array) => {
    let match = array.filter(x => x.raw === parseInt(raw))
    if (raw > array[0].raw){
        return 100
    } else if (raw <= array[array.length-1].raw){
        return 0
    } else if(match.length === 0){
        return getScores(raw-1, array)
    }else{
        return match[0].points
    }
}

getTimedPoints = array => rawMin => rawSec => {
    let matchMin = array.filter(x => x.rawMin === parseInt(rawMin))
    let matchMinSec = matchMin.filter(x => x.rawSec === parseInt(rawSec))
    if(matchMinSec.length === 0){
        if((rawMin < array[0].rawMin) || (rawMin === array[0].rawMin && rawSec <= array[0].rawSec)){
            return 100
        }else if(rawMin >= array[array.length-1].rawMin && rawSec >= array[array.length-1].rawSec){
            return 0 
        }else{
            for (let i = 0; i < matchMin.length; i++) {
                if (matchMin[i].rawSec-rawSec > 0){
                    rawSec = matchMin[i].rawSec
                    return(matchMin.filter(x => x.rawSec === rawSec)[0].points)
                }
            }
        }
    }else{
        return matchMinSec[0].points 
    }
}

let twoMilePoints = getTimedPoints(twoMileScores)
let sprintDragCarryPoints = getTimedPoints(sprintDragCarryScores)

calculate.addEventListener('click', ()=> {
    let sendIt = false
    
    // let deadliftSend = false 
    let deadliftRaw = document.getElementById('deadlift').value
    let getDeadliftPoints = getScores(deadliftRaw, deadliftScores)
    // deadliftRaw.match(/^[0-9]{3}/)? deadliftSend = true: deadliftSend = false

    

    let ballThrowRaw = document.getElementById('ball-throw').value
    let getBallThrowPoints = getScores(ballThrowRaw, ballThrowScores)

    let pushupRaw = document.getElementById('push-ups').value
    let getPushupPoints = getScores(pushupRaw, pushupScores)

    let sdcSend = false 
    let sprintDragCarryRawMin = document.getElementById('sprint-drag-carry-min').value
    let sprintDragCarryRawSec = document.getElementById('sprint-drag-carry-sec').value
    sprintDragCarryRawSec.match(/^[0-5][0-9]/)? sdcSend = true: sdcSend = false
    let getSprintDragCarryPoints = sprintDragCarryPoints(sprintDragCarryRawMin)(sprintDragCarryRawSec)

    let legtucksRaw = document.getElementById('leg-tucks').value
    let getLegtucksPoints = getScores(legtucksRaw, legTuckScores)

    let tmrSend = false 
    let twoMileRawMin = document.getElementById('two-mile-min').value
    let twoMileRawSec = document.getElementById('two-mile-sec').value
    twoMileRawSec.match(/^[0-5][0-9]/)? tmrSend = true: tmrSend = false
    let getTwoMilePoints = twoMilePoints(twoMileRawMin)(twoMileRawSec)
    
    sdcSend === true && tmrSend === true? sendIt = true: sendIt = false 

    sendIt? 
    alert(getDeadliftPoints+getBallThrowPoints+getPushupPoints+getSprintDragCarryPoints+getLegtucksPoints+getTwoMilePoints):
    alert('fill out fields properly')
})