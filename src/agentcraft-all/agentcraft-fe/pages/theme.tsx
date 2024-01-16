const THEME: any = {
    colorScheme: "light",
    components: {
        AppShell: {
            styles: {
                main: {
                    // paddingLeft: 220,
                    height: '100hv'
                },

            }
        },
        Navbar: {
            styles: {
                root: {
                    backgroundColor: '#F6F7F9'
                },

            }
        },
        Tabs: {
            styles: {
                root: {
                    height: 40,
                },
                tabsList: {
                    height: 40,
                    borderBottom: 'none',
                },
                tab: {
                    width: 118,
                    height: 40,
                    fontSize: '12px',
                    fontWeight: 500,
                    borderBottom: 'none',
                    "&[data-active]": {
                        position: 'relative',
                        backgroundColor: '#fff',
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px'
                    },


                }
            }
        },
        NavLink: {
            styles: {
                root: {
                    "&[data-active]": {
                        height: 36,
                        lineHeight: '36px',
                        // width: 188,
                        margin: '0 auto',
                        backgroundColor: '#1A1A1A !important'
                    }
                }
            }
        },
        // Button: {
        //     styles: {
        //         root: {
        //             backgroundColor: '#7F56FB'
        //         }
        //     }
        // },
        UnstyledButton: {
            styles: {
                root: {

                }
            }
        }
    }
}

export default THEME;