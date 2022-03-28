sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ns/finalproject/utils/services",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller ) {
        "use strict";

        return Controller.extend("ns.finalproject.controller.View2", {
            onInit: function () {
               
                this.router = this.getOwnerComponent().getRouter();
                this.router.getRoute("RouteView2").attachPatternMatched(e => {
                    var params = e.getParameters().arguments;
                    this.byId("page").setTitle("Profile page");
                });
                var i18n = new sap.ui.model.resource.ResourceModel({ bundleUrl: "./i18n/i18n.properties" });
                this.i18nBundle = i18n.getResourceBundle();
                this.oTableData = {
                    columns: [
                        {
                            name: "Country",
                            key: 0
                        },
                        {
                            name: "Age",
                            key: 1
                        },
                        {
                            name: "Salary",
                            key: 2
                        },
                        {
                            name: "Purchased",
                            key: 3
                        },
                    ],
                    rows: []
                }
                this.byId("table2").setModel(new sap.ui.model.json.JSONModel(this.oTableData))
            },
            onAddExcelData: function () {
                var that = this;
                if (this.fixedDialog === undefined) {
                    this.fixedDialog = new sap.m.Dialog({
                        contentWidth:"15%",
                
                        title: "Choose a file for upload",
                        beginButton: new sap.m.Button({
                            text: "Upload",
                            press: function (oEvent) {
                                that.fixedDialog.close()
                            }
                        }),
                        content: [
                            new sap.ui.unified.FileUploader("fileUpload")
                        ],
                        endButton: new sap.m.Button({
                            text: "Cancel",
                            press: function () {
                                that.fixedDialog.close()
                            }
                        })
                    });
                    this.getView().addDependent(this.fixedDialog);
                    this.fixedDialog.attachBeforeClose(this.setDataToJson, this)
                }

                this.fixedDialog.open();
               
            },
            setDataToJson: function (oEvent) {
                var oUploader = oEvent.getSource().getContent()[0];
                var domRef = oUploader.getFocusDomRef();
                //in cazul ca care nu am selectat nici un fisier atunci va face return
                if(domRef.files.length===0){
                    return;
                }
                var file = domRef.files[0];
                var that = this;
                this.fileName = file.name;
                this.fileType = file.type;
                var reader = new FileReader();
                reader.onload =  (e)=> {
                    //get an access to the content of the file
                        var arrCSV=e.currentTarget.result.match(/[\w .]+(?=,?)/g);
                        var noOfCol= 4;
                        var headerRow=arrCSV.splice(0, noOfCol);
                        var data=[];

                        while(arrCSV.length>0){
                            var record={};
                            var excelData=arrCSV.splice(0,noOfCol);
                            for(var i=0;i<excelData.length;i++){
                                    record[headerRow[i]]= excelData[i].trim()
                            }
                            data.push(record);
                            
                        }
                        var table= this.byId("table2");
                        table.getModel().setProperty("/rows", data)
                };
                //file reader will start readeing the file
                reader.readAsBinaryString(file);
            },
            onSearch:function(){
                var table = this.byId("table2");
                var items = table.getBinding("items");
                var inputValue = this.byId("searchField").getValue()
                if (inputValue === " " || inputValue === null || inputValue === undefined) {
                    items.filter([])
                    return;
                }
                var filter1 = new sap.ui.model.Filter("Country", sap.ui.model.FilterOperator.Contains, inputValue)
                var filter2 = new sap.ui.model.Filter("Purchased", sap.ui.model.FilterOperator.Contains, inputValue)
                var oFilter = new sap.ui.model.Filter([filter1, filter2], false)
                items.filter(oFilter);
            },
            onSort:function(){
                new sap.m.ViewSettingsDialog({
                    sortItems: [
                        new sap.m.ViewSettingsItem({
                            text: this.i18nBundle.getText("Country"),
                            key: "Country",
                            selected: true
                        }), new sap.m.ViewSettingsItem({
                            text: this.i18nBundle.getText("Age"),
                            key: "Age",
                        }),
                        new sap.m.ViewSettingsItem({
                            text: this.i18nBundle.getText("Salary"),
                            key: "Salary",
                        })
                    ], confirm: this.onSortConfirm.bind(this)
                }).open()

            },
            onSortConfirm: function (e) {
                var params = e.getParameters();
                var key = params.sortItem.getKey();
                var order = params.sortDescending;
                var sorters = [];
                var table = this.byId("table2");
                var items = table.getBinding("items");
                sorters.push(new sap.ui.model.Sorter(key, order));

                items.sort(sorters);
            },
            onFilter:function(){
                new sap.m.ViewSettingsDialog({
                    filterItems: [
                        new sap.m.ViewSettingsFilterItem({
                            text: this.i18nBundle.getText("Country"),
                            key: "Country",
                            items: [
                                new sap.m.ViewSettingsItem({
                                    text: this.i18nBundle.getText("France"),
                                    key: "France"
                                }),
                                new sap.m.ViewSettingsItem({
                                    text: this.i18nBundle.getText("Spain"),
                                    key: "Spain"
                                }),
                                new sap.m.ViewSettingsItem({
                                    text: this.i18nBundle.getText("Germany"),
                                    key: "Germany"
                                }),

                            ]
                        })
                    ],
                    confirm: this.onFilterConfirm.bind(this)
                }).open()

            },
            onFilterConfirm: function (e) {
                var params = e.getParameters();
                var table = this.byId("table2");
                var items = table.getBinding("items");

                var filters = params.filterItems.map(e => {
                    var path = e.getParent().getKey();
                    var value = e.getKey()
                    return new sap.ui.model.Filter(path, "EQ", value)
                })
                items.filter(filters);
            },
            onGroup:function(){
                new sap.m.ViewSettingsDialog({
                    groupItems: [
                        new sap.m.ViewSettingsItem({
                            text: this.i18nBundle.getText("Country"),
                            key: "Country",
                        }),
                        new sap.m.ViewSettingsItem({
                            text: this.i18nBundle.getText("Purchased"),
                            key: "Purchased",
                        })
                    ], confirm: this.onGroupConfirm.bind(this)
                }).open()

            },
            onGroupConfirm: function (e) {
                var table = this.byId("table2");
                var items = table.getBinding("items");
                var params = e.getParameters();
                var key = params.groupItem.getKey();
                var order = params.groupDescending;
                var sorters = [];
                var vGroup = function (oContext) {
                    var name = oContext.getProperty(key);
                    return {
                        key: name,
                        text: name
                    };
                };
                sorters.push(new sap.ui.model.Sorter(key, order, vGroup));

                items.sort(sorters);
            },

            onBackPress: function () {
                this.router.navTo("RouteView1");
                this.router.getTargets().display("TargetView1");
            }
        })
    }
)