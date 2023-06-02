export interface IDefaultDropdown  {
    title: string,
    value: string,
    options: Array<IOptionPair>,
    onChange?: (e: any) => void,
}

export interface IOptionPair {
    key: string,
    value: string,
}