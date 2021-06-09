# react hooks+redux+immutable.js

打开方式:
1. 将项目 clone 下来
```shell
$ git clone https://github.com/InsaneBlue/cloud-music-react.git
$ cd cloud-music
$ npm install

// 下载子模块
$ git submodule update --init --recursive
$ cd NeteaseCloudMusicApi
$ npm install
$ cd ../  (注意: 一定要返回到上一层)
```

2. 运行
```shell
$ npm run start
```
后端服务运行在9010端口，前端页面访问9000端口。如果要打包到线上，执行`npm run build`即可。


项目介绍:

![](https://user-gold-cdn.xitu.io/2019/8/11/16c80048984d1af3?w=1423&h=1092&f=png&s=407282)

### 功能介绍

#### 1、推荐部分

首页推荐:

![](https://user-gold-cdn.xitu.io/2019/8/11/16c7f735b83a0d15?w=372&h=668&f=gif&s=2856467)

推荐歌单详情:

![](https://user-gold-cdn.xitu.io/2019/8/11/16c7f75ca0469552?w=372&h=668&f=gif&s=1862466)

空中切入切出效果，另外还有随着滑动会产生和标题跑马灯效果。
在歌单中歌曲数量过多的情况下，做了分页处理，随着滚动不断进行上拉加载，防止大量DOM加载导致的页面卡顿。

#### 2、歌手部分
歌手列表:

![](https://user-gold-cdn.xitu.io/2019/8/11/16c7f793e8a1524b?w=372&h=668&f=gif&s=1224668)

这里做了异步加载的处理，上拉到底进行新数据的获取，下拉则进行数据的重新加载。

歌手详情:

![](https://user-gold-cdn.xitu.io/2019/8/11/16c7f7ea74fffa11?w=372&h=668&f=gif&s=2435912)


#### 3、排行榜

榜单页:

![](https://user-gold-cdn.xitu.io/2019/8/11/16c7f811ec0f7375?w=372&h=668&f=gif&s=2334445)

榜单详情:

![](https://user-gold-cdn.xitu.io/2019/8/11/16c7f82639a1dc34?w=372&h=668&f=gif&s=2162917)

#### 4、播放器

播放器内核:

![](https://user-gold-cdn.xitu.io/2019/8/11/16c7f8a5687ebb93?w=372&h=668&f=gif&s=3339773)

播放列表:

![](https://user-gold-cdn.xitu.io/2019/8/11/16c7f98711c43ae3?w=372&h=667&f=gif&s=2223620)

会有移动端app一样的反弹效果。

#### 5、搜索部分

![](https://user-gold-cdn.xitu.io/2019/8/11/16c804bd87a2dbbe?w=372&h=667&f=gif&s=1275414)
