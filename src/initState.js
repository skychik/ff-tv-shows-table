const initState = {
  shows: {
    info: [],
    pageCount: null, // TODO: move to info section
    itemCount: null, // TODO: move to info section
    pageNumber: 1, // TODO: move to info section
    itemsPerPage: 10, // TODO: move to info section
    infoNeedToBeChanged: true, // TODO: move to info section
    showsDownloaded: false // TODO: move to info section
  },
  search: {
    value: "",
    pending: false,
    failed: false
  },
  info: {
    mode: "popular",
    searchMode: "title"
  }
};

export default initState;
