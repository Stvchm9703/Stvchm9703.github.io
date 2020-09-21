// for common layout setting
export const state = () => ({
  // REMARK: 
  // for navlink/indexMobile / navlink/InnerPage
  menu_on_open: false
})


export const mutations = {
  open_menu(state, onoff) {
    state.menu_on_open = onoff;
  },
}