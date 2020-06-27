/**
 * Convert paging metadata from gorest.com format to internal application format
 */
export default function convertPaging(meta) {
    return {
        currentPage: meta.currentPage,
        pagesCount: meta.pageCount,
        pageSize: meta.perPage,
        totalCount: meta.totalCount
    }
}