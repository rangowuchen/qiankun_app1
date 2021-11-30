/*
 * @Author: wuchen
 * @Date: 2021-11-29 14:08:25
 * @LastEditors: wuchen
 * @LastEditTime: 2021-11-30 10:46:09
 * @Description: 
 * 根据路由匹配地址
 * data 路由数据
 * base 路由前缀
 * options 粗略的配置项
 * @Email: rangowu@163.com
 */
function routeMatch(data, base, options = {
  url: 'url',
  name: 'name',
  id: "id",
  permissions: 'permissions'
}) {
  if (!Array.isArray(data)) return [];
  // 创建路由盒子
  let routerBox = [];
  // 将菜单数据处理为一维函数 如果有多级菜单
  // let menu = flattenDeep(data, 'children');
  let menu = data;
  // 遍历处理路由 
  menu.forEach(item => {
    if (!item[options.url]) return;
    let _url = item[options.url].replace(base, '');
    try {
      let routerItem = {
        path: _url, // 路由路径名
        name: item[options.name] || item[options.id], // 命名路由 用于配合菜单简洁跳转
        meta: {
          purview: item[options.permissions],
        }, // 路由元信息 定义路由时即可携带的参数，可用来管理每个路由的按钮操作权限, 详细可以看minix下suth.js但是现在更普遍的是做v-auth指令
        component: () => import(`@/views${_url}/index.vue`) // 路由映射真实视图路径
      };
      routerBox.push(routerItem);
    } catch (err) {
      item[options.url] = '/err-404'
    }
  });
  // 推入需要授权后等异步加载的，非服务端获取的功能性页面
  // routerBox.push(...nextRouter);
  let errorBox = {
    path: "*",
    redirect: "/err-404"
  };
  routerBox.push(errorBox)
  return routerBox;
}


export default routeMatch