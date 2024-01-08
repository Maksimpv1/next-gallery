interface SortAllData {
    name:string;
    active:number;
    sortValue:string;
}

export const SortAllData =  [
    {
        name:'Природа',
        active:1,
        sortValue:'nature',
    },
    {
        name:'Города',
        active:2,
        sortValue:'city',
    },
    {
        name:'Портреты',
        active:3,
        sortValue:'people',
    },
    {
        name:'Cброс',
        active:0,
        sortValue:'all',
    },
]