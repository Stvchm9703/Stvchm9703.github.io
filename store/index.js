// for common layout setting
export const state = () => ({
  // REMARK: 
  // for navlink/indexMobile / navlink/InnerPage
  menu_on_open: false,
  extra_route_map: [],
  // show_doc_only: false,
  // doc-page-config
  project_name: "",
  current_path: "",
  current_branch: "",
  showMdOnly: true,
})

export const getters = {}

export const mutations = {
  open_menu(state, onoff) {
    state.menu_on_open = onoff;
  },
  set_route_map(state, maps) {
    state.extra_route_map = maps;
  },
  set_route_file_list(state, fileList) {
    let fli = fileList
      .map(e => ({
        name: e.name,
        path: e.path,
        _d: e.type === 'dir' ? 2 : 1,
      }))
      .sort((a, b) => b._d - a._d);

    // console.log(fli);
    let pathList = (fli[0].path).split('/');
    // console.log(pathList);

    state.extra_route_map.push({
      title: pathList.length > 1 ? pathList[-2] : 'root',
      itemList: fli,
    });
  },

  reset_route_map(state) {
    state.extra_route_map = [];
  }
}