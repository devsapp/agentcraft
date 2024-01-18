export interface NavItem {
    name?: string,
    path: string,
    type?: string,
    icon?: any,
    subNav?: NavItem[],
    parentPath?: string,
    level?: number,
    solo?: boolean
}
