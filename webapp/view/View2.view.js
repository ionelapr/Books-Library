sap.ui.jsview("ns.finalproject.view.View2", {
    getControllerName: function () {
        return "ns.finalproject.controller.View2"
    },

    createContent: function (oController) {
        return new sap.m.App({
            pages: new sap.m.Page(this.createId("page"), {
                showNavButton: true,
                navButtonPress: oController.onBackPress.bind(oController),
                content: [

                    new sap.m.VBox({
                        alignItems: sap.m.FlexAlignItems.Center,
                        justifyContent: sap.m.FlexJustifyContent.Center,
                        items: [
                            new sap.m.Label({
                                text: "ID: " + new sap.ushell.services.UserInfo().getId()
                            }),
                            new sap.m.Label({
                                text: "Email: " + new sap.ushell.services.UserInfo().getEmail()
                            }),
                            new sap.m.Label({
                                text: "First Name: " + new sap.ushell.services.UserInfo().getFirstName()
                            }),
                            new sap.m.Label({
                                text: "Last Name: " + new sap.ushell.services.UserInfo().getLastName()
                            }),
                        ]
                    }),
                    new sap.m.HBox({
                        items:[
                            new sap.m.Button(this.createId("fileUpload"),{
                                icon:"sap-icon://upload",
                                text:"Upload document",
                                press:oController.onAddExcelData.bind(oController)
                            
                            })
                        ]
                    }),
                    new sap.m.HBox({
                        items:[
                            new sap.m.Table(this.createId("table2"),{
                                headerToolbar: new sap.m.OverflowToolbar({
                                    content: [
                                                new sap.m.SearchField(this.createId("searchField"), {
                                                    width: "20%",
                                                    liveChange: oController.onSearch.bind(oController)
                                                }),
                                                new sap.m.Button(this.createId("sort"), {
                                                    icon:"sap-icon://sort",
                                                   
                                                    press: oController.onSort.bind(oController)
                                                }),
                                                new sap.m.Button(this.createId("filter"), {
                                                    icon:"sap-icon://filter",
                                                   
                                                    press: oController.onFilter.bind(oController)
                                                }),
                                                new sap.m.Button(this.createId("group"), {
                                                    icon:"sap-icon://group-2",
                                                  
                                                    press: oController.onGroup.bind(oController)
                                                }),
                                                
                                    ]
                                }).addStyleClass("headerStyle"),
                                columns: {
                                    path: "/columns",
                                    template: new sap.m.Column({
                                        header: new sap.m.Text({
                                            text: "{name}"
                                        })
                                    })
                                },
                                items: {
                                    path: "/rows",
                                    factory: (id, context) => {
                                        let oRow = context.getProperty();
                                        let aCells = Object.values(oRow).map(cell => {
                                            return new sap.m.Text({
                                                text: cell
                                            })
                                        })

                                        return new sap.m.ColumnListItem({
                                            cells: aCells
                                        })
                                    }
                                }
                            })
                        ]
                    })

                ]
            })
        })
    }
})
