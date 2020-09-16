<template lang="pug">
.sidebar-page
  section.sidebar-layout
    b-sidebar(
      position="static",
      :mobile="mobile",
      :expand-on-hover="expandOnHover",
      :reduce="reduce",
      open
    )
      .p-1
        .block
          img(
            src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png",
            alt="Lightweight UI components for Vue.js based on Bulma"
          )
        b-menu.is-custom-mobile
          b-menu-list(label="Menu")
            b-menu-item(icon="information-outline", label="Info")
            b-menu-item(
              active,
              expanded,
              icon="settings",
              label="Administrator"
            )
              b-menu-item(icon="account", label="Users")
              b-menu-item(icon="cellphone-link", label="Devices")
              b-menu-item(icon="cash-multiple", label="Payments", disabled)
            b-menu-item(icon="account", label="My Account")
              b-menu-item(icon="account-box", label="Account data")
              b-menu-item(icon="home-account", label="Addresses")
          b-menu-list
            b-menu-item(label="Expo", icon="link")
          b-menu-list(label="Actions")
            b-menu-item(icon="logout", label="Logout")
    .p-1
      b-field
        b-switch(v-model="reduce") Reduced
      b-field
        b-switch(v-model="expandOnHover") Expand on hover
      b-field(label="Mobile Layout")
        b-select(v-model="mobile")
          option(:value="null")
          option(value="reduce") Reduced
          option(value="hide") Hidden
          option(value="fullwidth") Fullwidth
</template>

<script>
export default {
  data() {
    return {
      expandOnHover: false,
      mobile: "reduce",
      reduce: false,
    };
  },
};
</script>

<style lang="scss">
.p-1 {
  padding: 1em;
}
.sidebar-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  // min-height: 100vh;
  .sidebar-layout {
    display: flex;
    flex-direction: row;
    min-height: 100%;
    // min-height: 100vh;
  }
}
@media screen and (max-width: 1023px) {
  .b-sidebar .sidebar-content {
    &.is-mini-mobile {
      &:not(.is-mini-expand),
      &.is-mini-expand:not(:hover) {
        .menu-list {
          li {
            a span:nth-child(2) {
              display: none;
            }
            ul {
              padding-left: 0;
              li a {
                display: inline-block;
              }
            }
          }
        }
        .menu-label:not(:last-child) {
          margin-bottom: 0;
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .b-sidebar .sidebar-content {
    &.is-mini {
      &:not(.is-mini-expand),
      &.is-mini-expand:not(:hover) {
        .menu-list {
          li {
            a span:nth-child(2) {
              display: none;
            }

            ul {
              padding-left: 0;
              li a {
                display: inline-block;
              }
            }
          }
        }
        .menu-label:not(:last-child) {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>