sap.ui.jsview("ns.finalproject.view.View1", {
    getControllerName:function(){
        return "ns.finalproject.controller.View1"
    },
    createContent:function(oController){
        return new sap.m.Shell(this.createId("shell"),{
            app: new sap.m.App(this.createId("app"),{
                pages:new sap.m.Page(this.createId("page"),{
                    title: 'My list of books',
                    content: [
                        new sap.m.HBox({
                            width: "100%",
                            alignItems: sap.m.FlexAlignItems.Center,
                            justifyContent: sap.m.FlexJustifyContent.End,
                            items: [
                                new sap.m.Button({
                                    icon: "sap-icon://customer",
                                    text: "Profile",
                                    press: oController.onProfilePress.bind(oController)
                                }).addStyleClass("profileButton"),

                            ]
                        }),
                       
                        new sap.m.HBox({
                            width: "100%",

                            alignItems: sap.m.FlexAlignItems.Center,
                            justifyContent: sap.m.FlexJustifyContent.Start,
                            items: [
                                new sap.m.Button(this.createId("create"), {
                                    icon:"sap-icon://add",
                                    text: "Create",
                                    press: oController.onCreate.bind(oController)
                                }).addStyleClass("button"),
                                new sap.m.Button(this.createId("delete"), {
                                    icon:"sap-icon://delete",
                                    text: "Delete",
                                    press: oController.onDelete.bind(oController)
                                }).addStyleClass("button"),
                                new sap.m.Button(this.createId("update"), {
                                    icon:"sap-icon://edit",
                                    text: "Edit",
                                    press: oController.onUpdateTable.bind(oController)
                                }).addStyleClass("button"),
                               

                            ]
                        }),
                        new sap.m.HBox({
                            items: [
                                new sap.m.Table(this.createId("table1"), {
                                    mode: sap.m.ListMode.SingleSelectLeft ,
                                    includeItemInSelection: false,
                                    headerToolbar: new sap.m.OverflowToolbar({
                                        content: [
                                                    new sap.m.SearchField(this.createId("searchField"), {
                                                        width: "20%",
                                                        liveChange: oController.onSearch.bind(oController)
                                                    }),
                                                    new sap.m.Button(this.createId("sort"), {
                                                        icon:"sap-icon://sort",
                                                        text: "Sort",
                                                        press: oController.onSort.bind(oController)
                                                    }),
                                                    new sap.m.Button(this.createId("filter"), {
                                                        icon:"sap-icon://filter",
                                                        text: "Filter",
                                                        press: oController.onFilter.bind(oController)
                                                    }),
                                                    new sap.m.Button(this.createId("group"), {
                                                        icon:"sap-icon://group-2",
                                                        text: "Group",
                                                        press: oController.onGroup.bind(oController)
                                                    }),
                                                    new sap.m.Button(this.createId("download"), {
                                                        icon:"sap-icon://download",
                                                        text: "Download data",
                                                        press: oController.onDownload.bind(oController)
                                                    }),
                                                    new sap.m.Button(this.createId("reset"), {
                                                        icon:"sap-icon://refresh",
                                                        text: "Reset data",
                                                        press: oController.onReset.bind(oController)
                                                    }),
                                        ]
                                    }).addStyleClass("headerTable"),
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
                        }),

                    ]
                }),


            })
        })
    }
})



