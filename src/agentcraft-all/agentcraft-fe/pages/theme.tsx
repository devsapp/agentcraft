import { ButtonStylesParams } from '@mantine/core';

const THEME: any = {
    colorScheme: "light",
    colors: {
        brand: ['#f8f6fe', '#f1ecfd', '#e6defc', '#ab91f8', '#622eef', '#5719e6', '#7f69c4', '#4516c5', '#7F56FB'],
    },
    primaryColor: 'brand',
    components: {
        AppShell: {
            styles: {
                main: {
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
                        margin: '0 auto',
                        backgroundColor: '#1A1A1A !important'
                    }
                }
            }
        },
        Button: {
            styles: (theme: any, params: ButtonStylesParams, { variant }: any) => ({
                root: {
                    height: 32,
                    // backgroundColor:
                    //     variant === 'filled'
                    //         ? '#7F56FB'
                    //         : undefined,
                    // bordeColor:
                    //     variant === 'filled'
                    //         ? '#7F56FB'
                    //         : '#EDEDED'
                },
            }),
        },
        UnstyledButton: {
            styles: {
                root: {

                }
            }
        }
    }
}

export default THEME;