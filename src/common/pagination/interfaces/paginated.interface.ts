export interface Paginated<T>{
    data: T[];
    meta: {
        itemPerPage: number,
        totalItems: number;
        currenPage: number;
        totalPages: number;
    },
    links: {
        first: string;
        last: string;
        current: string;
        next:string;
        previous: string;
    }
}