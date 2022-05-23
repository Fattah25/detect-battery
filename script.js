const chargeLevel = document.getElementById("charge-level");
const charge = document.getElementById("charge");
const chargingTimeRef = document.getElementById("charging-time");

window.onload = () => {
  //untuk browser yang tidak mendukung API battery status
  if(!navigator.getBattery){
    alert("Battery status API Is Not Supported In Your Browser");
    return false;
  }
};

navigator.getBattery().then((battery) => {
  function updateAllBatteryInfo() {
    updateChargingInfo();
    updateLevelInfo();
  }
  updateAllBatteryInfo();

  //when the charging status changes
  battery.addEventListener("chargingchange", () => {
    updateAllBatteryInfo();
    
  });
//when the battery level changes
battery.addEventListener("levelchange", () => {
  updateAllBatteryInfo();
})

  function updateChargingInfo(){
    if(battery.charging){
      charge.classList.add("active");
      chargingTimeRef.innerText = "";
    }else{
      charge.classList.remove("active");
      
      //display time left
      if(parseInt(battery.dischargingTime)){
        let hr = parseInt(battery.dischargingTime/3600);
        let min = parseInt(battery.dischargingTime/60 - hr * 60);
        chargingTimeRef.innerText = `${hr} hr ${min} mins remaining`;
      }
    }
  }

  //updating battery level
  function updateLevelInfo(){
    let batteryLevel = `${parseInt(battery.level*100)}%`;
    charge.style.width = batteryLevel;
    chargeLevel.textContent = batteryLevel;
  }
});






