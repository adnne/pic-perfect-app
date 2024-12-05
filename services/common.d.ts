declare namespace API {
  type Pagination<T = any> = {
    count: number;
    lastPage: number;
    countItemsOnPage: number;
    current: number;
    next: number | null;
    previous: number | null;
    results: T[];
  };
}
