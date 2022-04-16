var numApartments = document.querySelector("#number-of-apartments");
var numCompanies = document.querySelector("#number-of-companies");
var numCorporations = document.querySelector("#number-of-corporations");
var numFloors = document.querySelector("#number-of-floors");
var numBasements = document.querySelector("#number-of-basements");
var numParking = document.querySelector("#number-of-parking-spots");
var numElevators = document.querySelector("#number-of-elevators");
var maxOccupancy = document.querySelector("#maximum-occupancy");
var busHours = document.querySelector("#business-hours");
var buildingTypeSelector = document.querySelector("#building-type");
var productLineSelector = document.querySelector('input[name="service_grade"]');
var standardPrice = 7565;
var premiumPrice = 12345;
var exceliumPrice = 15400;
var standardFee = .1;
var premiumFee = .13;
var exceliumFee = .16;


function HideAllElements(){
//    for(var i = 5; i < 22; i++){
//        fieldset1.getElementsByTagName("div")[i].style.display = "none"
//    }
    numApartments.style.display = "none";
    numCompanies.style.display = "none";
    numCorporations.style.display = "none";
    numFloors.style.display = "none";
    numBasements.style.display = "none";
    numParking.style.display = "none";
    numElevators.style.display = "none";
    maxOccupancy.style.display = "none";
    busHours.style.display = "none";
};

HideAllElements();

function ResetFields(){
    for(var i = 0; i < fieldset1.getElementsByTagName("input").length; i++){
        document.getElementsByTagName("input")[i].value = ""
    }
    document.querySelector("#required-elevators").value=""
}

function ShowResidentialElements(){
    numApartments.style.display = "block";
    numFloors.style.display = "block";
    numBasements.style.display = "block";
};

function ShowCommercialElements(){
    numCompanies.style.display = "block";
    numFloors.style.display = "block";
    numBasements.style.display = "block";
    numParking.style.display = "block";
    numElevators.style.display = "block";
};

function ShowCorporateElements(){
    numCorporations.style.display = "block";
    numFloors.style.display = "block";
    numBasements.style.display = "block";
    numParking.style.display = "block";
    maxOccupancy.style.display = "block";
};

function ShowHybridElements(){
    numCompanies.style.display = "block";
    numFloors.style.display = "block";
    numBasements.style.display = "block";
    numParking.style.display = "block";
    maxOccupancy.style.display = "block";
    busHours.style.display = "block";
};

function LoadSelection(){
    HideAllElements()
    var buildingVal = buildingTypeSelector.value
    ResetFields()
    if (buildingVal === "residential"){
        ShowResidentialElements()
    } else if (buildingVal === "commercial"){
        ShowCommercialElements()
    } else if (buildingVal === "corporate"){
        ShowCorporateElements()
    } else if (buildingVal === "hybrid"){
        ShowHybridElements()
    }
}

buildingTypeSelector.addEventListener("change", LoadSelection)

//function RequiredShafts(){
//
//}

function UnitPriceUpdate(){
    var productLineVal = document.querySelector('input[name="service_grade"]:checked').value
    var unitPriceBox = document.querySelector("#unit-price")
    unitPriceBox.value = ""
    if (productLineVal === "standard"){
        unitPriceBox.value = standardPrice.toLocaleString("en-US", {style: 'currency', currency: 'USD'});
    } else if (productLineVal === "premium") {
        unitPriceBox.value = premiumPrice.toLocaleString("en-US", {style: 'currency', currency: 'USD'});
    } else if (productLineVal === "excelium") {
        unitPriceBox.value = exceliumPrice.toLocaleString("en-US", {style: 'currency', currency: 'USD'});
    }
    CalculateCosts();
};

//productLineSelector.addEventListener("change", UnitPriceUpdate)
//removed because "onchange" added to raido buttons

function ResidentialCagesNeeded(){
    if(numApartments.querySelector("input").value==="" || numFloors.querySelector("input").value===""){
        return;
    }
    var totalApartments = numApartments.querySelector("input").value
    var totalFloors = numFloors.querySelector("input").value
    var aptsPerFloor = totalApartments / totalFloors
//    console.log(aptsPerFloor)
    var cagesApts = Math.ceil(aptsPerFloor / 6)
//    console.log(cagesApts)
    var floorMultiplier = Math.ceil(parseInt(numFloors.querySelector("input").value) / 20)
//    console.log(floorMultiplier)
    document.querySelector("#required-elevators").value = cagesApts * floorMultiplier
};

function CorporateHybridCagesNeeded(){
    var totalFloors = parseInt(numFloors.querySelector("input").value) + parseInt(numBasements.querySelector("input").value)
//    console.log(totalFloors)
    var totalOccupants = maxOccupancy.querySelector("input").value * totalFloors
//    console.log(totalOccupants)
    var elevatorsRequired = Math.ceil(totalOccupants / 1000)
//    console.log(elevatorsRequired)
    var columnsRequired = Math.ceil(totalFloors / 20)
//    console.log(columnsRequired)
    var elevatorsPerColumn = Math.ceil(elevatorsRequired/columnsRequired)
//    console.log(elevatorsPerColumn)
    if (isNaN(elevatorsPerColumn * columnsRequired)){
        document.querySelector("#required-elevators").value = "";
        return;
    }
    document.querySelector("#required-elevators").value = elevatorsPerColumn * columnsRequired
};

function CalculateElevatorsNeeded(){
    var buildingVal = buildingTypeSelector.value
    if (buildingVal === "residential"){
        ResidentialCagesNeeded()
    } else if (buildingVal === "commercial"){
        document.querySelector("#required-elevators").value = numElevators.querySelector("input").value
    } else if (buildingVal === "corporate"){
        CorporateHybridCagesNeeded()
    } else if (buildingVal === "hybrid"){
        CorporateHybridCagesNeeded()
    }
    if(document.querySelector('input[name="service_grade"]:checked')===null){
        return;
    }
    CalculateCosts()
}

function CalculateCosts(){
    var productLineVal = document.querySelector('input[name="service_grade"]:checked').value
    var requiredNumOfElevators = document.querySelector("#required-elevators").value
    var partsTotalCost = 0
    var installationFee = 0
    var totalCost = 0
    var unitPrice = 0
    var unitFee = 0
    var partsTotalCostBox = document.querySelector("#parts-total-cost")
    var installationFeeBox = document.querySelector("#installation-fee")
    var totalCostBox = document.querySelector("#total-cost")
    partsTotalCostBox.value = ""
    installationFeeBox.value = ""
    totalCostBox.value = ""
    if (productLineVal === "standard"){
        unitPrice = standardPrice
        unitFee = standardFee
    } else if (productLineVal === "premium") {
        unitPrice = premiumPrice
        unitFee = premiumFee
    } else if (productLineVal === "excelium") {
        unitPrice = exceliumPrice
        unitFee = exceliumFee
    }
    partsTotalCost = unitPrice * requiredNumOfElevators
    installationFee = partsTotalCost * unitFee
    totalCost = partsTotalCost + installationFee

    partsTotalCostBox.value = (partsTotalCost).toLocaleString("en-US", {style: 'currency', currency: 'USD'})
    installationFeeBox.value = (installationFee).toLocaleString("en-US", {style: 'currency', currency: 'USD'})
    totalCostBox.value = (totalCost).toLocaleString("en-US", {style: 'currency', currency: 'USD'})
};

function imposeMinMax(el){
    if(el.value != ""){
      if(parseInt(el.value) < parseInt(el.min)){
        el.value = el.min;
      }
      if(parseInt(el.value) > parseInt(el.max)){
        el.value = el.max;
      }
    }
  };