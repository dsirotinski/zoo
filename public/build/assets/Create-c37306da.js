import{l as p,T as _,r as t,c as f,w,o as h,b as o,e as v,a,u as e,n,O as b}from"./app-2a75dbdf.js";import{_ as V}from"./App-1d6c1f16.js";import"./Admin-ac7cbed2.js";const T={class:"grid"},M={class:"col-12"},k={ref:"card",class:"card"},g=o("h4",null,"Create User",-1),x=["onSubmit"],H={class:"field p-fluid"},L=o("label",null,"Name",-1),C=["innerHTML"],P={class:"field p-fluid"},U=o("label",null,"Email",-1),y=["innerHTML"],B={class:"field p-fluid"},S=o("label",null,"Password",-1),q=["innerHTML"],N={class:"field p-fluid"},E=o("label",null,"Password confirmation",-1),I=["innerHTML"],D={__name:"Create",setup(O){const u=p(),s=_({name:"",email:"",password:"",password_confirmation:""}),i=()=>{s.post(route("users.index"),{preserveScroll:!0,onSuccess:()=>{b.visit(route("users.index"),{onSuccess:()=>{u.add({severity:"success",summary:"User created successfully",detail:"",life:5e3})}})}})};return(z,l)=>{const d=t("InputText"),c=t("Password"),m=t("Button");return h(),f(V,null,{default:w(()=>[o("div",T,[o("div",M,[o("div",k,[g,o("form",{onSubmit:v(i,["prevent"])},[o("div",H,[L,a(d,{type:"text",placeholder:"Name",modelValue:e(s).name,"onUpdate:modelValue":l[0]||(l[0]=r=>e(s).name=r),class:n({"p-invalid":e(s).errors.name}),required:!0},null,8,["modelValue","class"]),o("small",{class:"p-error mb-2",innerHTML:e(s).errors.name},null,8,C)]),o("div",P,[U,a(d,{type:"email",placeholder:"Email address",modelValue:e(s).email,"onUpdate:modelValue":l[1]||(l[1]=r=>e(s).email=r),class:n({"p-invalid":e(s).errors.email}),required:!0},null,8,["modelValue","class"]),o("small",{class:"block p-error",innerHTML:e(s).errors.email},null,8,y)]),o("div",B,[S,a(c,{modelValue:e(s).password,"onUpdate:modelValue":l[2]||(l[2]=r=>e(s).password=r),feedback:!0,toggleMask:!0,class:n({"p-invalid":e(s).errors.password}),placeholder:"Password",required:!0},null,8,["modelValue","class"]),o("small",{class:"block p-error",innerHTML:e(s).errors.password},null,8,q)]),o("div",N,[E,a(c,{modelValue:e(s).password_confirmation,"onUpdate:modelValue":l[3]||(l[3]=r=>e(s).password_confirmation=r),feedback:!1,toggleMask:!0,class:n({"p-invalid":e(s).errors.password_confirmation}),placeholder:"Password confirmation",required:!0},null,8,["modelValue","class"]),o("small",{class:"block p-error",innerHTML:e(s).errors.password_confirmation},null,8,I)]),a(m,{class:"mt-4",label:"Create",loading:e(s).processing,onClick:i},null,8,["loading"])],40,x)],512)])])]),_:1})}}};export{D as default};