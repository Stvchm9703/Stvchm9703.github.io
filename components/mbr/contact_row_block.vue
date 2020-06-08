<template lang="pug">
section.maps4.mbr-parallax-background
  .mbr-overlay(style='opacity: 0.5; background-color: rgb(0, 0, 0);')
  .container.mbr-white
    h2.mbr-section-title.main-title.mbr-fonts-style.align-center.display-2
      | Contact Me
    .row.main-row.justify-content-center.pt-5
      .col-md-10.col-lg-6.form-wrapper(data-form-type='formoid')
        h2.mbr-section-title.form-title.mbr-fonts-style.pb-3.display-5
          | Landing Page HTML Template
        p.mbr-text.form-text.mbr-fonts-style.m-0.pb-4.mbr-lighter.display-7
          | With its classic high-mountain surface, superb snow document as well as short transfer times,
          | Hotel Website Template is ideal for those searching for a much more challenging short break
          | destination.
        
       
      
    .row.info-row.justify-content-center.pt-3
      .first-column.col-12.mbr-fonts-style.col-md-6.display-7
        ol
          li
            span.info-title.mbr-fonts-style
              | Plurk :
            a.info-value.mbr-fonts-style(
              href='https://www.plurk.com/stv_chm9703'
              target='blank'
              )
              | @stv_chm9703
          li
            span.info-title.mbr-fonts-style
              | Twitter:
            a.info-value.mbr-fonts-style(
              href='https://twitter.com/STV_AO'
              target='blank'
              
              )
              | @STV_AO
        
      .col-md-6.second-column.mbr-fonts-style.display-7
        ol
         
          li
            span.info-title.mbr-fonts-style
              | E-mail:
            span.info-value.mbr-fonts-style
              a.__cf_email__(
                href='/cdn-cgi/l/email-protection', 
                data-cfemail='24575154544b565064494b464d564d57410a474b49'
              ) [email protected]
</template>

<style lang="scss" scoped>
.maps4 {
  padding-top: 60px;
  padding-bottom: 60px;
  // background-image: url("~assets/images/background11.jpg");
  .underline .line {
    width: 2rem;
    height: 1px;
    background: #878787;
    display: inline-block;
  }

  .form1 {
    .input-wrap {
      margin-bottom: 1rem;
    }

    .form-control {
      border: none;
      border-radius: 0;
      padding: 0.5rem 1rem;
      background: #efefef;
      color: #000000;
      width: 100%;
    }
    .input-group-btn {
      width: 100%;
      .btn {
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
    }

    .form-label-outside {
      color: #ffffff;
    }
  }
  .google-map {
    width: 100%;
    height: 25rem;
    iframe {
      width: inherit;
      height: 100%;
    }
  }

  .info-row {
    ol {
      list-style: none;
      padding-left: 0;
      margin: 0;
      li {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ffffff;
        padding: 10px;
      }
    }
  }

  .info-value {
    color: #efefef;
  }

  @media (max-width: 991px), (max-width: 767px) {
    .form-wrapper {
      padding-bottom: 2rem;
    }
  }

  @media (max-width: 767px) {
    .form-subtitle {
      text-align: center;
    }
  }
}
</style>