export const state = () => ({
  project_name: "",
  current_path: "",
  file_list: [],
  showMdOnly: true,
})

export const getters = {
  mdFileList: (state) => state.showMdOnly ?
    state.file_list.filter(e => e.name.includes('.md')) :
    state.file_list,
}

export const mutations = {
  set_list(state, list) {
    state.file_list = list;
    let pathL = (list[0].path).split('/');
    state.current_path = pathL.length > 1 ? pathL[pathL.length - 2] : "root";
  },

  set_project_name(state, name) {
    state.project_name = name;
  },
  set_doc_only_filter(state, onOff) {
    state.showMdOnly = onOff;
  },
}