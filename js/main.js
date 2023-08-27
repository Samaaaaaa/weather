let todayName = document.getElementById("todayName")
let todayNumber = document.getElementById("todayNumber")
let todayMonth = document.getElementById("todayMonth")
let todayLocation = document.getElementById("todayLocation")
let todayTemp = document.getElementById("todayTemp")
let todayConditionImg = document.getElementById("todayImg")
let todayConditionText = document.getElementById("todayText")
let humidity = document.getElementById("umbrella")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("windDirection")

let nextDay = document.getElementsByClassName("nextName")
let nextMaxTemp = document.getElementsByClassName("nextTemp")
let nextMinTemp = document.getElementsByClassName("nextMinTemp")
let nextConditionImg = document.getElementsByClassName("nextImg")
let nextConditionText = document.getElementsByClassName("nextText")

let searchInput = document.getElementById("search")


async function getWeatherData(cityName)
{
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${cityName}&days=3`)
    let weatherData = await weatherResponse.json()
    return weatherData
}




function displayTodayData(data)
{
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"})
    todayNumber.innerHTML = todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"})
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayConditionImg.setAttribute("src",data.current.condition.icon)
    todayConditionText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity+"%"
    wind.innerHTML = data.current.wind_kph+"km/h"
    windDirection.innerHTML = data.current.wind_dir
}



function displayNextData(data)
{
    let forecastData = data.forecast.forecastday
    for(let i = 0 ; i < 2 ; i++)
    {
        let nextDate = new Date(forecastData[i+1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"})
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c
        nextConditionImg[i].setAttribute("src",forecastData[i+1].day.condition.icon)
        nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text
    }
}



async function startApp(city="london")
{
    let weatherData = await getWeatherData(city)
    if(!weatherData.error)
    {
        displayTodayData(weatherData)
        displayNextData(weatherData)
    }
}

startApp()


searchInput.addEventListener("input",function(){
    startApp(searchInput.value)
})