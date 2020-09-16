# stvchm9703.github.io

> stv chm logging app

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate

# generate full-static project
$ npm run u-gen
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


#### for the doc (DocMDRenderPage)
http://localhost:3000/doc/#projMD/unlight-zwei-game-duel-service/master/README.md


### Route-map

```bash 
[/]
  |
  |--[/(index.html)]
  |
  |--[/doc]
  |   |
  |   |--[/(index)]
  |   |
  |   |
  |   |--[/:project_name]
  |   |   |
  |   |   |--[/:sub_path]
  |
  |--[/post]
  |   |
  |   |--[/(index)]
  |   |
  |   |--[/:post_id]
  |   
  |--[/tag]
  |   |
  |   |--[/:tag_list]
  |
  |--[/about]
  
```

<!-- slide-break -->

### Page content

- remark : set the config in .page repo

#### index.html

- to show reconet update in Github/plurk(public)
- to slice-show the recent artifact-profo

#### doc/

- to list out the project in github
- load the config/route-map from github api(public) and config file in .page repo
- (doc/:project) 
  - load the Markdown file as content

#### post/

- to list the post with tag 
- (post/:post_id)
  - load the post from `".page/post/*.md"`

#### tag/

- search engine to list the post with tag 
- (`advance`) .io.page repo should have `tag/config.json` for prefetched result 

#### /about/ 

- show content
- show SNS?

#### /slice/

- for broadcasting presenting? 

<!-- slide-break -->

#### TODO

- Component Sys
  - sideMenu
    - for quick-directing part (in Page/Doc, Page/post )
    - for navagating the page to other page 
  - Slice/Present-mode Markdown
    - for presentation?
  - quick-scrolling bar (in page/doc)
  - 

- Page 
  - Doc 
    - Github api fetch list
  - About 
    - SNS-block 
      - api fetch from plurk 
      - api fetch from github profile
      - api fetch from twitter
      - set with config fetching rule
  - Post 
    - artifact-post fetching 
      - api fetch from twitter (with hashtag posting) 
      - api fetch from plurk (with hashtag posting)
    - short tech logging 
      - markdown from .io.page/post
  - Tag
    - search-engine 
      - search from twitter (with hashtag posting)
      - search from plurk (with hashtag posting)
    - ignore/back-list tag 



