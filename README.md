## 更新日志 ##
<p>-2020/11/02-  修复月份算法的逻辑错误问题以及月份出现不加载的问题。</p>
<p>-2020/11/01-  将部分全局声明变量转换为了vue实例变量，关闭了console.log。</p>
<p>-2020/11/01-  修复了PUG中当最新月份为11月时，标签显示不完全的问题。</p>
<p>-2020/11/01-  修复了一周前时间不显示的bug，请更换js文件。</p>
<p>-2020/10/31-  修复了PUG中信息来源无法动态切换的bug,请更换pug。</p>

## 序言：效果展示 ##

![example](https://zfe.space/images/gitcalendar2.0.png)

<p>因为用之前的gitcalendar服务器失效了，于是找api自己手写了一个。</p>
<p>项目用到了<a  class="btn-beautify button--animated outline black" style="cursor:pointer"  href="https://github.com/rschristian/github-contribution-calendar-api">GitHub Contribution Calendar API</a></p>
<a href="https://zfour.github.io/Butterfly-gitcalendar/index">SITE DEMO</a>
<a href="https://zfe.space">BLOG DEMO</a>
<p>通过vuejs进行编码。</p>
<p>资源包地址：https://github.com/Zfour/Butterfly-gitcalendar</p>
<a  class="btn-beautify button--animated outline black" style="cursor:pointer"  href="https://github.com/Zfour/Butterfly-gitcalendar">资源包下载</a>
<p>废话不多说了，开始教学。</p>
<hr></hr>

## 步骤1：修改pug代码 ##

 {% blockquote %}
如果你配置过1.0版本请先将inject中的引入删除。
 {% endblockquote %}

### 下载资源包 ###

<a  class="btn-beautify button--animated outline black" style="cursor:pointer"  href="https://github.com/Zfour/Butterfly-gitcalendar">资源包下载</a>

### 增加、替换代码 ###

<p>前往"根目录\themes\butterfly\layout"文件夹</p>
<p>将资源包中的"gitcalendar.pug"复制到文件夹中。</p>
<p>将"index.pug"复制并重命名为"index-re.pug"作为备份。</p>
<p>将资源包pug文件夹的Original中的"index.pug"覆盖进行替换，如果你使用磁贴请使用Magnet Plus文件夹的"index.pug"。</p>
<p>或者打开"index.pug"按照以下代码进行修改。修改的起始点为"#recent-posts.recent-posts"。</p>

```PUG
extends includes/layout.pug

block content
  include ./includes/mixins/post-ui.pug
  #recent-posts.recent-posts
    .recent-post-item(style='width:100%')
       include gitcalendar.pug
    .recent-post-item(style='height:0px;clear:both;margin-top: 0px;')
    +postUI
    include includes/pagination.pug
```

<hr></hr>

## 步骤2：添加引入js、css代码 ##

### 放置资源包 ###

<p>将下载包中的gitcalendar文件夹放入根目录的"source"文件夹下。</p>

### 引入js和css ###

<p>打开"\themes\butterfly\"路径下的"_config.yml"</p>
<p>搜索到"inject:"设置处</p>
<p>添加以下代码：</p>
<p>若已有vue引入，请确保vue的版本为2.6以上。</p>

```yml
inject:
  head:
  - <link rel="stylesheet" href="/gitcalendar/css/gitcalendar.css"/>

  bottom:
  - <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11"></script>
  - <script src="/gitcalendar/js/gitcalendar.js"></script>
  
```

<hr></hr>

## 步骤3：填写自定义属性的js配置 ##

<p>本磁贴通过gitcalendar.js的配置项实现以下自定义属性。</p>

### 配置用户信息 ###

<p>填写github用户名，配置用户信息。</p>

```js
 data: {
	    user:'Zfour', //用户名称
	    fixed:'fixed',
	    px:'px',
	    x:'',
            y:'',
            span1:'',
            span2:'',
```

### 配置颜色主题 ###

<p>修改颜色配置。</p>

```js
color: [ //这里是颜色配置，当前为蓝色，若需更换请对应数组内容进行替换
            '#ebedf0',
            '#f1f8ff',
            '#dbedff',
            '#c8e1ff',
            '#79b8ff',
            '#2188ff',
            '#0366d6',
            '#005cc5',
            '#044289',
            '#032f62',
            '#05264c',
             ]
```

<hr></hr>
