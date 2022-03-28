sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ns/finalproject/utils/services",
    "sap/ui/export/Spreadsheet"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (oController,oServices) {
        "use strict";

        return oController.extend("ns.finalproject.controller.View1", {
            onInit: function () {
               
                 //    "uri":"../ada598eb-4260-4da9-90e5-0646e19ced39.ns-finalproject.nsfinalproject/books/"
                this.router = this.getOwnerComponent().getRouter();
                var i18n = new sap.ui.model.resource.ResourceModel({ bundleUrl: "./i18n/i18n.properties" });
                this.i18nBundle = i18n.getResourceBundle();
                this.oTableData = {
                    columns: [
                        {
                            name: "id",
                            key: 0
                        },
                        {
                            name: "title",
                            key: 1
                        },
                        {
                            name: "author",
                            key: 2
                        },
                        {
                            name: "originalLanguage",
                            key: 3
                        },
                        {
                            name: "genre",
                            key: 4
                        },
                        {
                            name: "pusblishDate",
                            key: 5
                        },
                        {
                            name: "characters",
                            key: 6
                        },


                    ],
                    rows: []
                }
                this.oServices = new oServices(this.getOwnerComponent());

                this.oServices.getData().then(res => {
                    let aRows = res.map(oCategory => ({
                        id: oCategory.id,
                        title: oCategory.title,
                        author: oCategory.author,
                        originalLanguage: oCategory.originalLanguage,
                        genre: oCategory.genre,
                        pusblishDate: oCategory.pusblishDate,
                        characters: oCategory.characters
                    }))

                    this.oTableData.rows = aRows;


                    this.byId("table1").setModel(new sap.ui.model.json.JSONModel(this.oTableData))
                })
            },
            onDownload: function () {
                var aColumns = [];

                aColumns.push({
                    label: "id",
                    property: "id",

                });
                aColumns.push({
                    label: "title",
                    property: "title",

                });
                aColumns.push({
                    label: "author",
                    property: "author",

                });
                aColumns.push({
                    label: "originalLanguage",
                    property: "originalLanguage",


                });
                aColumns.push({
                    label: "genre",
                    property: "genre",

                });
                aColumns.push({
                    label: "pusblishDate",
                    property: "pusblishDate",

                });
                aColumns.push({
                    label: "characters",
                    property: "characters",

                });
                var oSettings = {
                    workbook: { columns: aColumns },
                    dataSource: this.byId("table1").getBinding("items").getModel().getProperty(this.byId("table1").getBinding("items").getPath()),
                    worker: false,
                    fileName: "Books.xlsx"
                }
                var oBinding = new sap.ui.export.Spreadsheet(oSettings);
                oBinding.build();



            },
            onProfilePress: function () {
                this.router.navTo("RouteView2");
            },
            onSearch: function () {
                var table = this.byId("table1");
                var items = table.getBinding("items");
                var inputValue = this.byId("searchField").getValue()
                if (inputValue === " " || inputValue === null || inputValue === undefined) {
                    items.filter([])
                    return;
                }
                var filter1 = new sap.ui.model.Filter("title", sap.ui.model.FilterOperator.Contains, inputValue)
                var filter2 = new sap.ui.model.Filter("author", sap.ui.model.FilterOperator.Contains, inputValue)
                var filter3 = new sap.ui.model.Filter("originalLanguage", sap.ui.model.FilterOperator.Contains, inputValue)
                var filter4 = new sap.ui.model.Filter("characters", sap.ui.model.FilterOperator.Contains, inputValue)
                var filter5 = new sap.ui.model.Filter("genre", sap.ui.model.FilterOperator.Contains, inputValue)
                var oFilter = new sap.ui.model.Filter([filter1, filter2, filter3, filter4, filter5], false)
                items.filter(oFilter);

            },
            onReset: function () {
                //this.byId("comboBox").setValue(null)
                this.byId("table1").setModel(new sap.ui.model.json.JSONModel(this.oTableData))
            },
            onCreate: function () {
                new sap.m.Dialog({
                    contentWidth:"30%",
                    buttons: [
                        new sap.m.Button({
                            text: "CLOSE",
                            press: (e) => {
                                var dialog = e.getSource().getParent().close();
                                dialog.close();
                                dialog.destroyContent();
                            }
                        }),
                        new sap.m.Button({
                            text: "ADD",
                            press: (e) => {


                                let columnListItem = {
                                    id: this.byId("idInput").getValue(),
                                    title: this.byId("titleInput").getValue(),
                                    author: this.byId("authorInput").getValue(),
                                    originalLanguage: this.byId("languageSelect").getSelectedItem().getKey(),
                                    genre: this.byId("genreInput").getValue(),
                                    pusblishDate: this.byId("dateInput").getValue(),
                                    characters: this.byId("charactersInput").getValue()
                                };
                                let data = this.byId("table1").getModel().getData();
                                data.rows.push(columnListItem);
                                this.byId("table1").setModel(new sap.ui.model.json.JSONModel(data))


                                var dialog = e.getSource().getParent().close();
                                dialog.close();
                                dialog.destroyContent();
                            }
                        })
                    ],
                    content: [
                        new sap.m.HBox({
                            items: [
                                new sap.m.Label({
                                    text: "ID: " }),
                                new sap.m.Input(this.createId("idInput"))
                            ]
                        }),
                        new sap.m.HBox({
                            items: [
                                new sap.m.Label({
                                    text: "Title: "}),
                                new sap.m.Input(this.createId("titleInput"), {})
                            ]
                        }),
                        new sap.m.HBox({
                            items: [
                                new sap.m.Label({
                                    text: "Author: " }),
                                new sap.m.Input(this.createId("authorInput"), {
                                })
                            ]
                        }),
                        new sap.m.HBox({
                            items: [
                                new sap.m.Label({
                                    text: "Original Language: ",
                                }),
                                new sap.m.ComboBox(this.createId("languageSelect"), {
                                    items: [
                                        new sap.ui.core.Item({
                                            key: "English",
                                            text: "English"
                                        }),
                                        new sap.ui.core.Item({
                                            key: "French",
                                            text: "French"
                                        }),
                                        new sap.ui.core.Item({
                                            key: "Romanian",
                                            text: "Romanian"
                                        }),
                                    ]
                                })
                            ]
                        }),
                        new sap.m.HBox({
                            items: [
                                new sap.m.Label({
                                    text: "Genre: "
                                }),
                                new sap.m.Input(this.createId("genreInput"), {
                                })
                            ]
                        }),

                        new sap.m.HBox({
                            items: [
                                new sap.m.Label({
                                    text: "Publishdate: "
                                }),
                                new sap.m.DatePicker(this.createId("dateInput"), {
                                    valueFormat: "yyyy.MM.dd",
                                    displayFormat: "long",
                                })

                            ]
                        }),
                        new sap.m.HBox({
                            items: [
                                new sap.m.Label({
                                    text: "Characters: "
                                }),
                                new sap.m.Input(this.createId("charactersInput"), {
                                })
                            ]
                        }),
                    ]
                }).open();

            },
            onUpdateTable: function (e) {
                var table = this.byId("table1");
                var model = table.getModel();
                var data = model.getData();
                var path = table.getSelectedItem().getBindingContext().sPath
                var aPathParts = path.split("/");
                var iIndex = aPathParts[aPathParts.length - 1];
                var vBox = new sap.m.VBox({
                    width: "70%",
                    justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                    items: [
                        new sap.m.HBox({
                            items: [
                                new sap.m.Label({
                                    text: "id: " + data.rows[iIndex].id,
                                }),
                            ]
                        }),
                        new sap.m.HBox({
                            items: [
                                new sap.m.Label({
                                    text: "title: "
                                }),
                                new sap.m.Input(this.createId("titleInput"), {
                                    value: data.rows[iIndex].title
                                })
                            ]
                        }),
                        new sap.m.HBox({
                            items: [
                                new sap.m.Label({
                                    text: "author: "
                                }),
                                new sap.m.Input(this.createId("authorInput"), {
                                    value: data.rows[iIndex].author
                                })
                            ]
                        }),
                        new sap.m.HBox({
                            items: [
                                new sap.m.Label({
                                    text: "originalLanguage: "
                                }),
                                new sap.m.ComboBox(this.createId("languageSelect"), {
                                    value: data.rows[iIndex].originalLanguage,
                                    items: [
                                        new sap.ui.core.Item({
                                            key: "English",
                                            text: "English"
                                        }),
                                        new sap.ui.core.Item({
                                            key: "French",
                                            text: "French"
                                        }),
                                        new sap.ui.core.Item({
                                            key: "Romanian",
                                            text: "Romanian"
                                        }),
                                    ]

                                })

                            ]
                        }),
                        new sap.m.HBox({
                            items: [
                                new sap.m.Label({
                                    text: "genre: "
                                }),
                                new sap.m.Input(this.createId("genreInput"), {
                                    value: data.rows[iIndex].genre
                                })
                            ]
                        }),

                        new sap.m.HBox({
                            items: [
                                new sap.m.Label({
                                    text: "pusblishDate: "
                                }),
                                new sap.m.DatePicker(this.createId("dateInput"), {
                                    valueFormat: "yyyy.MM.dd",
                                    displayFormat: "long",
                                    value: data.rows[iIndex].pusblishDate
                                })
                            ]
                        }),
                        new sap.m.HBox({
                            items: [
                                new sap.m.Label({
                                    text: "characters: "
                                }),
                                new sap.m.Input(this.createId("charactersInput"), {
                                    value: data.rows[iIndex].characters
                                })
                            ]
                        })
                    ]
                })

                new sap.m.Dialog({
                    contentWidth:"30%",
                    content: vBox,
                    buttons: [
                        new sap.m.Button({
                            text: "CLOSE",
                            press: (e) => {
                                var dialog = e.getSource().getParent().close();
                                dialog.close();
                                dialog.destroyContent();
                            }
                        }),
                        new sap.m.Button({
                            text: "SAVE INFOS",
                            press: (e) => {
                                let columnListItem = {
                                    // id: this.byId("idInput").getValue(),
                                    title: this.byId("titleInput").getValue(),
                                    author: this.byId("authorInput").getValue(),
                                    originalLanguage: this.byId("languageSelect").getSelectedItem().getKey(),
                                    genre: this.byId("genreInput").getValue(),
                                    pusblishDate: this.byId("dateInput").getValue(),
                                    characters: this.byId("charactersInput").getValue()
                                };

                                //data.rows[iIndex].id = columnListItem.id
                                data.rows[iIndex].title = columnListItem.title
                                data.rows[iIndex].author = columnListItem.author;
                                data.rows[iIndex].originalLanguage = columnListItem.originalLanguage;
                                data.rows[iIndex].genre = columnListItem.genre;
                                data.rows[iIndex].characters = columnListItem.characters;
                                data.rows[iIndex].pusblishDate = columnListItem.pusblishDate;

                                this.byId("table1").setModel(new sap.ui.model.json.JSONModel(data))

                                var dialog = e.getSource().getParent().close();
                                dialog.close();
                                dialog.destroyContent();

                            }
                        })
                    ],

                }).open();

            },
            onDelete: function () {
                var table = this.byId("table1");
                var model = table.getModel();
                var data = model.getData();
                var path = table.getSelectedItem().getBindingContext().sPath
                var aPathParts = path.split("/");
                var iIndex = aPathParts[aPathParts.length - 1];
                var removed = data.rows.splice(iIndex, 1);
                model.setData(data)
                sap.m.MessageToast.show(JSON.stringify(removed) + ' is removed');

            },
            onFilter: function (e) {
                new sap.m.ViewSettingsDialog({
                    filterItems: [
                        new sap.m.ViewSettingsFilterItem({
                            text: this.i18nBundle.getText("originalLanguage"),
                            key: "originalLanguage",
                            items: [
                                new sap.m.ViewSettingsItem({
                                    text: this.i18nBundle.getText("English"),
                                    key: "English"
                                }),
                                new sap.m.ViewSettingsItem({
                                    text: this.i18nBundle.getText("French"),
                                    key: "French"
                                }),
                                new sap.m.ViewSettingsItem({
                                    text: this.i18nBundle.getText("Romanian"),
                                    key: "Romanian"
                                }),

                            ]
                        })
                    ],
                    confirm: this.onFilterConfirm.bind(this)
                }).open()

            },
            onFilterConfirm: function (e) {
                var params = e.getParameters();
                var table = this.byId("table1");
                var items = table.getBinding("items");

                var filters = params.filterItems.map(e => {
                    var path = e.getParent().getKey();
                    var value = e.getKey()
                    return new sap.ui.model.Filter(path, "EQ", value)
                })
                items.filter(filters);
            },
            onSort: function () {
                new sap.m.ViewSettingsDialog({
                    sortItems: [
                        new sap.m.ViewSettingsItem({
                            text: this.i18nBundle.getText("id"),
                            key: "id",
                            selected: true
                        }), new sap.m.ViewSettingsItem({
                            text: this.i18nBundle.getText("genre"),
                            key: "genre",
                        }),
                        new sap.m.ViewSettingsItem({
                            text: this.i18nBundle.getText("originalLanguage"),
                            key: "originalLanguage",
                        })
                    ], confirm: this.onSortConfirm.bind(this)
                }).open()

            },
            onSortConfirm: function (e) {
                var params = e.getParameters();
                var key = params.sortItem.getKey();
                var order = params.sortDescending;
                var sorters = [];
                var table = this.byId("table1");
                var items = table.getBinding("items");
                sorters.push(new sap.ui.model.Sorter(key, order));

                items.sort(sorters);
            },
            onGroup: function (e) {
                new sap.m.ViewSettingsDialog({
                    groupItems: [
                        new sap.m.ViewSettingsItem({
                            text: this.i18nBundle.getText("genre"),
                            key: "genre",
                        }),
                        new sap.m.ViewSettingsItem({
                            text: this.i18nBundle.getText("originalLanguage"),
                            key: "originalLanguage",
                        })
                    ], confirm: this.onGroupConfirm.bind(this)
                }).open()

            },
            onGroupConfirm: function (e) {
                var table = this.byId("table1");
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
        });
    });
