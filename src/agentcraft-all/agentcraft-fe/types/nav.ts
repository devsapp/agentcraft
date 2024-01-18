export interface NavItem {
    name?: string,
    path: string,
    type?: string,
    icon?: JSX.Element,
    subNav?: NavItem[],
    parentPath?: string,
    level?: number,
    solo?: boolean
}
