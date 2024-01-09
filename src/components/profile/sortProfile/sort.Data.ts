interface iSortProfileValue {
    name: string,
    active: number,
    sortValue: string,
}

export const SortProfileValue: iSortProfileValue[] = [
    {
        name:'Data',
        active:1,
        sortValue:'Data',
    },
    {
        name:'Popular',
        active:2,
        sortValue:'Popular',
    },
    {
        name:'Reset',
        active:0,
        sortValue:'Reset',
    },

]