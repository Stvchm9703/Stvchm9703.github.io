export const state = () => ({
  project_list: [],
  on_showing_project: {},
  colorIndex: {},
})

export const mutations = {
  set_list(state, list) {
    state.project_list = list;
  },
  set_showed_project(state, proj_id) {
    state.on_showing_project = state.project_list.filter(e => e.id === proj_id)[0];
  },
  set_color_index(state, set) {
    state.colorIndex = set;
  }
}