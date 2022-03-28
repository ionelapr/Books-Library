sap.ui.define(["sap/ui/base/Object", "ns/finalproject/utils/constants"], function(Object, Constants){


    const BOOKS_API="v1/16d1f456-0ed1-4601-8b12-08792688457e";
    const CATEGORIES = "Categories";
    
    let oServices=Object.extend("ns.finalproject.utils.services",{
        constructor:function(ownerComponent){
            this.BOOKS_URL= ownerComponent.getManifestEntry(Constants.BOOKS);
        }
    })
    oServices.prototype.getData= async function(){
        let oData=null;
    
        let oResponse=await fetch(`${this.BOOKS_URL}${BOOKS_API}?$format=json`, {
            method:"GET"
        })
        if(oResponse.ok){
            oData=await oResponse.json();
    
        }
        return oData; 
    }
    oServices.prototype.getCategories= async function(){
        let oCategories=null;
    
        let oResponse=await fetch(`${this.BOOKS_URL}${BOOKS_API}/${CATEGORIES}?$format=json`, {
            method:"GET"
        })
        if(oResponse.ok){
            oCategories=await oResponse.json();
    
        }
        return oCategories; 
    }
    return oServices;
    })