"use strict";(self["webpackChunkhexo_theme_mirages"]=self["webpackChunkhexo_theme_mirages"]||[]).push([[443],{9383:function(e,t,a){a.d(t,{u:function(){return u}});var n=a(1510),o=a(8592),r=a(2023);const u=(0,r.Q_)({id:"page",state:()=>({}),getters:{},actions:{async fetchPage(e){const{data:t}=await(0,n.ji)(e);return new Promise((e=>setTimeout((()=>{e(new o.T3(t))}),200)))}}})},1877:function(e,t,a){a.r(t),a.d(t,{default:function(){return d}});var n=a(6252);const o={class:"w-full"},r={class:"relative w-full"},u={class:"\n          w-full\n          m-auto\n          overflow-hidden\n          md:max-w-2xl\n          lg:max-w-4xl\n          xl:max-w-5xl\n          2xl:max-w-6xl\n        "},l=["innerHTML"];function s(e,t,a,s,c,i){const h=(0,n.up)("PageCover");return(0,n.wg)(),(0,n.iD)("div",o,[(0,n.Wm)(h,{data:e.cover,type:"about"},null,8,["data"]),(0,n._)("div",r,[(0,n._)("div",u,[(0,n._)("div",{class:"post-html",innerHTML:e.pageData.content},null,8,l)])])])}var c=a(8592),i=a(5368),h=a(9383),m=a(3527),g=a(2262),v=a(9298),f=(0,n.aZ)({components:{PageCover:v.Z},setup(){const e=(0,i.q)(),t=(0,h.u)(),a=(0,g.iH)(new c.T3),o=()=>{t.fetchPage("about").then((e=>{a.value=e}))},r=(0,g.Fl)((()=>{const t=a.value.cover.length>0?a.value.cover:(0,m.az)(e.themeConfig.pictures),n=e.themeConfig.author.avator.length>0?e.themeConfig.author.avator:"https://z3.ax1x.com/2021/08/30/hNY8xS.jpg",o=e.themeConfig.author.name.length>0?e.themeConfig.author.name:"About";return{title:o,background:t,avator:n}}));return(0,n.wF)(o),{cover:r,pageData:a}}});f.render=s;var d=f}}]);