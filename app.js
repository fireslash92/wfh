/* مرن - نموذج محلي مستقل لدائرة الطرق بمحافظة البريمي
   النسخة 1.0: لا يوجد خادم أو تسجيل دخول حقيقي، وجميع الأسماء والبيانات تجريبية.
   لا تُدخل بيانات موظفين حقيقية أو مستندات رسمية في هذا النموذج. */
(() => {
'use strict';
const STORAGE = 'marn-alburaimi-v1';
const ROLE_STORAGE = 'marn-alburaimi-profile-v1';
const VIEWS = ['dashboard','tasks','schedule','requests','team','reports'];
const DEPARTMENTS = ['الإدارة','الشؤون الإدارية والمالية','صيانة الطرق','المشاريع','النقل البري'];
const ICONS = {
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z"/>',
  clipboard:'<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4.5V3h6v1.5M9 11h6M9 15h6"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  users:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5"/>',
  chart:'<path d="M4 20V9M10 20V4M16 20v-8M22 20H2"/>',
  notification:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 10h18c0-2-3-3-3-10M10 21h4"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  close:'<path d="M5 5l14 14M19 5 5 19"/>',
  search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
  check:'<path d="m4 12 5 5L20 6"/>',
  file:'<path d="M6 2h8l5 5v15H6zM14 2v6h5M9 13h7M9 17h7"/>',
  arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
  building:'<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h1m4 0h1M9 11h1m4 0h1M9 15h1m4 0h1M10 21v-4h4v4"/>',
  road:'<path d="M9 2 5 22M15 2l4 20M12 4v4m0 4v4m0 4v2"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
  print:'<path d="M6 8V3h12v5M6 17H4V9h16v8h-2M6 14h12v7H6z"/>',
  info:'<circle cx="12" cy="12" r="10"/><path d="M12 11v6M12 7v1"/>',
  location:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',
  shield:'<path d="m12 2 8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="m8 12 3 3 5-6"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3m14 0h3M4.9 4.9 7 7m10 10 2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/>',
  chevron:'<path d="m15 18-6-6 6-6"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  repeat:'<path d="M20 7h-12a4 4 0 0 0-4 4M4 7l4-4M4 7l4 4M4 17h12a4 4 0 0 0 4-4M20 17l-4 4M20 17l-4-4"/>',
  log:'<path d="M12 3h8v18h-8M4 12h13m-5-5 5 5-5 5"/>',
  briefcase:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
  edit:'<path d="m4 20 4-1 12-12-3-3L5 16zM15 6l3 3"/>',
  alert:'<path d="m12 2 10 19H2zM12 9v5m0 3v.5"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18M12 3c-5 5-5 13 0 18"/>',
  refresh:'<path d="M20 6v5h-5M4 18v-5h5M5.7 8A7 7 0 0 1 18 6l2 5M4 13l2 5a7 7 0 0 0 12.3-2"/>'
};
const ico=(n,size=20)=>`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n]||ICONS.info}</svg>`;
const esc=(v)=>String(v??'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const iso=(d)=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const shift=(day,delta=0)=>{const d=new Date(day+'T12:00:00');d.setDate(d.getDate()+delta);return iso(d);};
const today=()=>iso(new Date());
const fmt=(date,options={day:'numeric',month:'long'})=>{
  try{return new Intl.DateTimeFormat('ar-OM-u-nu-latn',options).format(new Date(date+'T12:00:00'))}catch{return date}
};
const fullToday=()=>fmt(today(),{weekday:'long',day:'numeric',month:'long',year:'numeric'});
const dayNames=['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const name=(p)=>p?.name||'غير معروف';
function seed(){
  const d=today();
  return {version:1,people:[
    {id:1,name:'أحمد بن سعيد الحوسني',title:'مدير الدائرة',department:'الإدارة',mode:'office'},
    {id:2,name:'خالد بن راشد البلوشي',title:'رئيس قسم صيانة الطرق',department:'صيانة الطرق',mode:'field'},
    {id:3,name:'سالم بن محمد الشامسي',title:'أخصائي إداري',department:'الشؤون الإدارية والمالية',mode:'remote'},
    {id:4,name:'فاطمة بنت علي العبرية',title:'أخصائية مالية',department:'الشؤون الإدارية والمالية',mode:'office'},
    {id:5,name:'بدر بن حمد النعيمي',title:'مهندس صيانة',department:'صيانة الطرق',mode:'field'},
    {id:6,name:'مريم بنت سالم الشامسية',title:'منسقة مشاريع',department:'المشاريع',mode:'office'},
    {id:7,name:'ماجد بن عبدالله المعمري',title:'مفتش نقل بري',department:'النقل البري',mode:'field'},
    {id:8,name:'عائشة بنت راشد الهنائية',title:'أخصائية موارد بشرية',department:'الشؤون الإدارية والمالية',mode:'remote'}
  ],tasks:[
    {id:101,title:'إعداد تقرير حالة الطرق لشهر أكتوبر',description:'تجميع الملاحظات الميدانية ومؤشرات الإنجاز ورفع التقرير الشهري للمراجعة.',department:'صيانة الطرق',assignee:5,creator:2,status:'progress',priority:'high',due:shift(d,2),created:shift(d,-7)},
    {id:102,title:'مراجعة مصروفات صيانة المركبات',description:'مطابقة المصروفات مع البيانات المعتمدة وإعداد ملخص للمدير.',department:'الشؤون الإدارية والمالية',assignee:4,creator:1,status:'progress',priority:'normal',due:shift(d,3),created:shift(d,-4)},
    {id:103,title:'تحديث سجل الورش التدريبية',description:'توثيق الورش وإعداد تقرير مشاركة الموظفين.',department:'الشؤون الإدارية والمالية',assignee:3,creator:1,status:'done',priority:'normal',due:shift(d,-1),created:shift(d,-8)},
    {id:104,title:'متابعة بلاغات الأضرار على الطرق',description:'فرز البلاغات ذات الأولوية وإسناد حالات المعاينة للفريق الميداني.',department:'صيانة الطرق',assignee:2,creator:1,status:'todo',priority:'high',due:shift(d,1),created:shift(d,-1)},
    {id:105,title:'مراجعة خطة المشروعات المقترحة',description:'تجهيز عرض مختصر عن تقدم المشروعات ومؤشرات المخاطر.',department:'المشاريع',assignee:6,creator:1,status:'progress',priority:'medium',due:shift(d,5),created:shift(d,-2)},
    {id:106,title:'إعداد ملخص التفتيش الميداني',description:'استكمال نماذج التفتيش ورفع الملاحظات الفنية.',department:'النقل البري',assignee:7,creator:1,status:'done',priority:'normal',due:shift(d,-2),created:shift(d,-10)},
    {id:107,title:'مراجعة نماذج أوامر العمل',description:'تحديث النماذج الإلكترونية واعتماد قائمة البيانات الأساسية.',department:'الشؤون الإدارية والمالية',assignee:3,creator:1,status:'progress',priority:'medium',due:shift(d,4),created:shift(d,-3)},
    {id:108,title:'متابعة طلبات تحديث بيانات الموظفين',description:'مراجعة التحديثات المطلوبة ضمن إجراءات الإدارة الداخلية.',department:'الشؤون الإدارية والمالية',assignee:8,creator:1,status:'todo',priority:'normal',due:shift(d,5),created:shift(d,-1)}
  ],requests:[
    {id:201,employee:3,type:'remote',start:shift(d,2),end:shift(d,2),reason:'إنجاز أعمال التقارير الإلكترونية بعيداً عن المقاطعات.',status:'pending',created:shift(d,-1)},
    {id:202,employee:4,type:'hours',start:shift(d,3),end:shift(d,4),reason:'مرونة بدء وانتهاء الدوام مع الحفاظ على تغطية المهام.',status:'pending',created:d},
    {id:203,employee:8,type:'remote',start:shift(d,-3),end:shift(d,-3),reason:'إنجاز أرشفة إلكترونية.',status:'approved',created:shift(d,-7)},
    {id:204,employee:5,type:'hours',start:shift(d,6),end:shift(d,6),reason:'تنسيق دوام ميداني مع جدول المعاينات.',status:'pending',created:shift(d,-1)}
  ],schedule:{},nextTask:109,nextRequest:205};
}
function readDB(){try{const s=JSON.parse(localStorage.getItem(STORAGE));if(s && s.version===1 && Array.isArray(s.tasks)&&Array.isArray(s.people)&&Array.isArray(s.requests))return s}catch{}return seed()}
let db=readDB();
function persist(){try{localStorage.setItem(STORAGE,JSON.stringify(db))}catch{toast('تعذر الحفظ على هذا الجهاز؛ قد تكون مساحة التخزين أو صلاحيات المتصفح محدودة.')}}
let profile = [1,2,3].includes(Number(localStorage.getItem(ROLE_STORAGE)))?Number(localStorage.getItem(ROLE_STORAGE)):1;
let view='dashboard', modal=null, sidebarOpen=false, search='', taskStatus='', taskDepartment='', requestStatus='', weekOffset=0, toastTimer;
const person=(id)=>db.people.find(p=>p.id===Number(id));
const me=()=>person(profile)||db.people[0];
const isAdmin=()=>profile===1;
const isHead=()=>profile===2;
const canManage=()=>isAdmin()||isHead();
const accessibleTasks=()=>db.tasks.filter(t=>isAdmin() || (isHead()?t.department===me().department : t.assignee===profile));
const accessibleRequests=()=>db.requests.filter(r=>isAdmin() || (isHead()?person(r.employee)?.department===me().department : r.employee===profile));
const teamPeople=()=>db.people.filter(p=>isAdmin() || (isHead()?p.department===me().department : p.id===profile));
const canApprove=(r)=>canManage() && r.employee!==profile && (isAdmin()||person(r.employee)?.department===me().department);
const canCreateTask=()=>canManage();
const statusName={todo:'لم تبدأ',progress:'قيد التنفيذ',done:'مكتملة'};
const reqName={pending:'بانتظار الاعتماد',approved:'معتمد',rejected:'مرفوض'};
const modeName={office:'من المكتب',remote:'عن بُعد',field:'عمل ميداني',leave:'إجازة',off:'عطلة'};
const requestTypeName={remote:'العمل عن بُعد',hours:'ساعات مرنة'};
const taskPill=(t)=>`<span class="pill ${t.status==='todo'&&t.due<today()?'late':t.status}">${t.status==='todo'&&t.due<today()?'متأخرة':statusName[t.status]}</span>`;
const modePill=(m)=>`<span class="pill ${esc(m)}">${esc(modeName[m]||modeName.office)}</span>`;
const reqPill=(r)=>`<span class="pill ${esc(r.status)}">${esc(reqName[r.status])}</span>`;
const initials=(n)=>esc(String(n||'م').split(' ').slice(0,2).map(a=>a[0]).join(''));
function roleDesc(){return isAdmin()?'مدير الدائرة':isHead()?'رئيس القسم':'موظف'}
const nav=[['dashboard','الرئيسية','home'],['tasks','إدارة المهام','clipboard'],['schedule','العمل المرن','calendar'],['requests','الطلبات','clock'],['team','الفريق','users'],['reports','التقارير','chart']];
const app=document.getElementById('app');
function render(){
  const pending=accessibleRequests().filter(r=>r.status==='pending').length;
  app.innerHTML=`<div class="app-shell">
    <div class="screen-dim ${sidebarOpen?'show':''}" data-action="close-sidebar"></div>
    <aside class="sidebar ${sidebarOpen?'show':''}" id="sidebar" aria-label="القائمة الرئيسية">
      <div class="sidebar-top"><button class="nav-close" data-action="close-sidebar" aria-label="إغلاق القائمة">${ico('close')}</button><div class="brand"><div class="brand-icon">${ico('road',27)}</div><div><div class="brand-name">مرن</div><div class="brand-sub">نظام إدارة العمل المرن<br>دائرة الطرق بمحافظة البريمي</div></div></div></div>
      <div class="side-section-title">مساحة العمل</div>
      <nav class="nav-list">${nav.map(([key,label,ic])=>`<button type="button" class="nav-item ${view===key?'active':''}" data-view="${key}" ${view===key?'aria-current="page"':''}>${ico(ic,19)}<span>${label}</span>${key==='requests'&&pending?`<span class="count">${pending}</span>`:''}</button>`).join('')}</nav>
      <div class="sidebar-bottom"><div class="side-info"><strong>${ico('shield',15)} نسخة تجريبية محلية</strong> البيانات والأسماء المعروضة افتراضية. لا يتصل النموذج بالأنظمة الحكومية ولا يستخدم تسجيل دخول حقيقي.</div><div class="side-footer">وزارة النقل والاتصالات وتقنية المعلومات<br>دائرة الطرق بمحافظة البريمي • 2026م</div></div>
    </aside>
    <main class="main" id="main">
      <header class="topbar"><div class="topbar-title"><button class="icon-btn mobile-menu" data-action="toggle-sidebar" aria-label="فتح القائمة">${ico('menu')}</button><div><h1>دائرة الطرق بمحافظة البريمي</h1><p>وزارة النقل والاتصالات وتقنية المعلومات</p></div></div>
        <div class="topbar-actions"><span class="badge-demo">وضع تجريبي</span><label class="sr-only" for="profile-select">اختر حساب العرض</label><select id="profile-select" class="role-select" title="التبديل بين حسابات العرض التجريبي" aria-label="حساب العرض التجريبي"><option value="1" ${profile===1?'selected':''}>مدير الدائرة</option><option value="2" ${profile===2?'selected':''}>رئيس القسم</option><option value="3" ${profile===3?'selected':''}>الموظف</option></select><button class="icon-btn" data-action="notifications" title="الطلبات المعلقة" aria-label="الطلبات المعلقة">${ico('notification',19)}${pending?'<span class="notification-dot"></span>':''}</button><div class="user-mini"><div class="avatar">${initials(me().name)}</div><div><strong>${esc(me().name)}</strong><small>${roleDesc()}</small></div></div></div>
      </header><div class="page" id="page-content">${renderView()}<footer class="page-footer">© 2026م وزارة النقل والاتصالات وتقنية المعلومات — دائرة الطرق بمحافظة البريمي | نموذج أولي غير معتمد</footer></div>
    </main><nav class="bottom-nav" aria-label="التنقل السريع">${[['dashboard','الرئيسية','home'],['tasks','المهام','clipboard'],['schedule','المرونة','calendar'],['requests','الطلبات','clock'],['team','المزيد','menu']].map(([k,n,i])=>`<button class="bottom-link ${view===k?'active':''}" data-view="${k}">${ico(i,21)}<span>${n}</span></button>`).join('')}</nav>
    ${modal?renderModal():''}
  </div><div class="toast-zone" id="toast-zone" role="status" aria-live="polite"></div>`;
}
function renderView(){switch(view){case 'tasks':return tasksPage();case 'schedule':return schedulePage();case 'requests':return requestsPage();case 'team':return teamPage();case 'reports':return reportsPage();default:return dashboardPage()}}
const pageHead=(title,desc,buttons='')=>`<div class="page-intro"><div><div class="eyebrow">نظام مرن / ${esc(title)}</div><h2>${esc(title)}</h2><p>${esc(desc)}</p></div>${buttons?`<div class="toolbar">${buttons}</div>`:''}</div>`;
const button=(text,action,cls='btn-secondary',iconName='',id='')=>`<button type="button" class="btn ${cls}" data-action="${action}" ${id?`data-id="${esc(id)}"`:''}>${iconName?ico(iconName,16):''}${esc(text)}</button>`;
function dashboardPage(){
  const tasks=accessibleTasks(), people=teamPeople(), total=tasks.length, completed=tasks.filter(t=>t.status==='done').length, rate=total?Math.round(completed*100/total):0, progress=tasks.filter(t=>t.status==='progress').length, notstarted=total-completed-progress, pending=accessibleRequests().filter(r=>r.status==='pending').length;
  const modes=['remote','field'];
  const remote=people.filter(p=>workMode(p.id,today())==='remote').length, field=people.filter(p=>workMode(p.id,today())==='field').length;
  const depts=Array.from(new Set(tasks.map(t=>t.department)));
  return `<section class="hero"><div><span class="eyebrow" style="color:#cbdbaa">مرحباً، ${esc(me().name.split(' ')[0])}!</span><h2>مرونة أكبر.. وإنجاز أوضح</h2><p>إدارة مهام الدائرة والعمل المرن من مكان واحد، مع التركيز على جودة المخرجات وتنسيق الفرق الميدانية والإدارية.</p><div class="hero-actions">${canCreateTask()?button('إضافة مهمة','new-task','btn-primary','plus'):button('استعراض مهامي','go-tasks','btn-primary','clipboard')}${button('طلب عمل مرن','new-request','btn-outline','calendar')}</div></div><div class="hero-graphic"><svg class="hero-road" viewBox="0 0 300 190" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M25 185C90 139 74 79 133 48c31-17 94-9 142-43" stroke="#386a7d" stroke-width="72" stroke-linecap="round"/><path d="M25 185C90 139 74 79 133 48c31-17 94-9 142-43" stroke="#d7e7e4" stroke-width="48" stroke-linecap="round"/><path d="M25 185C90 139 74 79 133 48c31-17 94-9 142-43" stroke="#799eaa" stroke-width="1" stroke-dasharray="8 15" stroke-linecap="round"/><circle cx="134" cy="48" r="11" fill="#e0b36c"/><circle cx="134" cy="48" r="4" fill="#fff"/><circle cx="78" cy="134" r="11" fill="#e0b36c"/><circle cx="78" cy="134" r="4" fill="#fff"/></svg><div class="hero-chip">${ico('check',13)} التركيز على النتائج لا ساعات الجلوس</div></div></section>
  <div class="stats">${stat('موظفو نطاق العرض',people.length,'users','teal','بحسب صلاحية الحساب التجريبي')}${stat('عن بُعد اليوم',remote,'home','blue','وفق الجدول التجريبي')}${stat('مهام مكتملة',completed,'check','gold',`من أصل ${total} مهام`)}${stat('طلبات تنتظر البت',pending,'calendar','purple','بانتظار قرار المسؤول')}</div>
  <div class="content-grid">
    <section class="card"><div class="card-head"><div><h3>المهام القادمة</h3><p class="card-caption">آخر مستجدات المهام المسندة</p></div><button class="section-link" data-view="tasks">عرض الكل ${ico('chevron',13)}</button></div>
      ${tasks.filter(t=>t.status!=='done').sort((a,b)=>a.due.localeCompare(b.due)).slice(0,4).map(t=>`<div class="task-row"><div class="task-logo">${ico('clipboard',18)}</div><div class="task-info"><div class="task-title">${esc(t.title)}</div><div class="task-sub">${esc(t.department)} • ${fmt(t.due)}</div></div>${taskPill(t)}</div>`).join('')||empty('لا توجد مهام مفتوحة حالياً')}
    </section>
    <section class="card"><div class="card-head"><div><h3>مؤشر إنجاز المهام</h3><p class="card-caption">المهام التي تظهر لهذا الحساب</p></div><span class="pill progress">تحديث تلقائي</span></div><div class="chart-wrap"><div class="donut" style="--percent:${rate}%"><div class="donut-text"><strong>${rate}%</strong><span>نسبة الإنجاز</span></div></div><div class="legend"><div class="legend-row"><span><i class="dot" style="background:#087f76"></i>مكتملة</span><strong>${completed}</strong></div><div class="legend-row"><span><i class="dot" style="background:#4a82b6"></i>قيد التنفيذ</span><strong>${progress}</strong></div><div class="legend-row"><span><i class="dot" style="background:#becdd5"></i>لم تبدأ</span><strong>${notstarted}</strong></div></div></div><p class="small-note">المؤشر يعرض عدد المهام المكتملة، ولا يمثل تقييم أداء الموظفين أو جودة الخدمات بمفرده.</p></section>
    <section class="card"><div class="card-head"><div><h3>إنجاز الأقسام</h3><p class="card-caption">بحسب عدد المهام المسجلة في النموذج</p></div><button class="section-link" data-view="reports">التقارير ${ico('chevron',13)}</button></div>${depts.map((dep,i)=>{const arr=tasks.filter(t=>t.department===dep);const pc=Math.round(arr.filter(t=>t.status==='done').length/arr.length*100);return `<div class="bar-row"><span class="bar-label">${esc(dep)}</span><div class="bar"><span style="width:${pc}%;background:${['#168d84','#3178aa','#c49344','#7b73c2','#3d8a9e'][i%5]}"></span></div><strong>${pc}%</strong></div>`}).join('')||empty('لا تتوفر بيانات')}</section>
    <section class="card"><div class="card-head"><div><h3>حركة العمل المرن</h3><p class="card-caption">الطلبات وتنسيق الفرق</p></div><button class="section-link" data-view="requests">عرض الطلبات ${ico('chevron',13)}</button></div><div class="timeline-list">${accessibleRequests().slice().sort((a,b)=>b.id-a.id).slice(0,4).map(r=>`<div class="timeline"><div class="timeline-date">${fmt(r.start,{day:'numeric'})}<small>${fmt(r.start,{month:'long'})}</small></div><div class="timeline-main"><strong>${esc(name(person(r.employee)))}</strong><p>${esc(requestTypeName[r.type])} • ${fmt(r.start)}${r.start!==r.end?' إلى '+fmt(r.end):''}</p></div>${reqPill(r)}</div>`).join('')||empty('لا توجد طلبات')}</div></section>
  </div>`;
}
function stat(label,value,ic,colour,foot){return `<div class="stat"><div><div class="label">${esc(label)}</div><div class="value">${value}</div><div class="foot">${esc(foot)}</div></div><div class="stat-icon ${colour}">${ico(ic,24)}</div></div>`}
function empty(txt){return `<div class="empty">${ico('info',26)}${esc(txt)}</div>`}
function tasksPage(){let tasks=accessibleTasks().slice().sort((a,b)=>(a.status==='done')-(b.status==='done')||a.due.localeCompare(b.due));if(taskStatus)tasks=tasks.filter(t=>t.status===taskStatus);if(taskDepartment)tasks=tasks.filter(t=>t.department===taskDepartment);if(search.trim())tasks=tasks.filter(t=>(t.title+' '+t.department+' '+name(person(t.assignee))).includes(search.trim()));return `${pageHead('إدارة المهام','توزيع ومتابعة الأعمال الإدارية والميدانية وفق الإنجاز.',canCreateTask()?button('مهمة جديدة','new-task','btn-primary','plus'):'')}
<div class="filter-card"><div class="search-wrap">${ico('search',17)}<input id="task-search" placeholder="ابحث عن مهمة أو موظف..." value="${esc(search)}" aria-label="البحث في المهام"></div><select id="task-status" class="input-select" aria-label="تصفية بحسب الحالة"><option value="">جميع الحالات</option>${Object.entries(statusName).map(([k,v])=>`<option value="${k}" ${taskStatus===k?'selected':''}>${v}</option>`).join('')}</select><select id="task-department" class="input-select" aria-label="تصفية بحسب القسم"><option value="">جميع الأقسام</option>${DEPARTMENTS.map(d=>`<option ${taskDepartment===d?'selected':''}>${esc(d)}</option>`).join('')}</select><span class="small-note">${tasks.length} مهمة</span></div>
<div class="data-list">${tasks.map(t=>`<article class="data-item"><div class="data-icon">${ico('clipboard',23)}</div><div class="data-main"><h3>${esc(t.title)}</h3><p>${esc(t.department)}</p><div class="data-meta"><span>${ico('users',13)} ${esc(name(person(t.assignee)))}</span><span>${ico('calendar',13)} ${fmt(t.due)}</span><span class="${t.priority==='high'?'priority-high':t.priority==='medium'?'priority-medium':'priority-normal'}">${t.priority==='high'?'أولوية عالية':t.priority==='medium'?'أولوية متوسطة':'أولوية عادية'}</span></div></div><div class="data-actions">${taskPill(t)}${button('التفاصيل','task-detail','btn-secondary','arrow',t.id)}</div></article>`).join('')||empty('لا توجد مهام تطابق معايير البحث')}</div>`}
function weekStart(){let d=new Date(today()+'T12:00:00');d.setDate(d.getDate()-d.getDay()+(weekOffset*7));return iso(d)}
function workMode(pid,date){
 const dow=new Date(date+'T12:00:00').getDay();
 if(dow===5||dow===6)return 'off';
 if(db.schedule[`${pid}|${date}`])return db.schedule[`${pid}|${date}`];
 if(date===today())return person(pid)?.mode||'office';
 if(pid===5||pid===7)return 'field';
 if(pid===2)return dow===2||dow===4?'office':'field';
 if(pid===3||pid===8)return dow===1||dow===3?'remote':'office';
 return 'office';
}
function schedulePage(){const w=weekStart(),days=Array.from({length:7},(_,i)=>shift(w,i));const p=me();let peers=teamPeople();return `${pageHead('جدول العمل المرن','رؤية أسبوعية لأنماط العمل، دون تعقب الموقع أو مراقبة الشاشة.',button('تقديم طلب مرونة','new-request','btn-primary','plus'))}
<div class="notice notice-flex">${ico('info',17)} <span>هذا الجدول توضيحي، ولا يعد موافقة رسمية على العمل عن بُعد. تبقى المهام الميدانية ومتطلبات الخدمة واللوائح المعتمدة أولوية.</span></div>
<div class="card" style="margin-bottom:16px"><div class="cal-nav"><div><h3>جدولي الأسبوعي</h3><div class="small-note">${fmt(w)} — ${fmt(days[6])}</div></div><div class="toolbar">${button('الأسبوع السابق','prev-week','btn-secondary','chevron')}${button('هذا الأسبوع','this-week','btn-soft','calendar')}${button('الأسبوع التالي','next-week','btn-secondary','chevron')}</div></div>
<div class="schedule-grid">${days.map(date=>{const d=new Date(date+'T12:00:00'),m=workMode(profile,date);return `<div class="day-card ${date===today()?'is-today':''}"><div class="weekday">${dayNames[d.getDay()]}</div><div class="day-number">${d.getDate()}<span>${fmt(date,{month:'long'})}</span></div><div class="day-mode">${modePill(m)}</div><div class="small-note">${m==='remote'?'مهام إلكترونية':m==='field'?'تنفيذ ومعاينات':m==='office'?'حضور بمقر العمل':'خارج أيام العمل'}</div></div>`}).join('')}</div>
<div class="bulk-note">${ico('shield',15)} عرض الجدول مخصص للتنسيق؛ أي تغيير في نمط العمل يتطلب طلباً وموافقة المسؤول المختص.</div></div>
<div class="card"><div class="card-head"><div><h3>توزيع فريق العمل اليوم</h3><p class="card-caption">${fullToday()}</p></div><button class="section-link" data-view="team">دليل الفريق ${ico('chevron',13)}</button></div><div class="table-scroll"><table class="table"><thead><tr><th>الموظف</th><th>القسم</th><th>نمط العمل</th></tr></thead><tbody>${peers.map(p=>`<tr><td>${esc(p.name)}</td><td>${esc(p.department)}</td><td>${modePill(workMode(p.id,today()))}</td></tr>`).join('')}</tbody></table></div></div>`}
function requestsPage(){const all=accessibleRequests();const list=all.filter(r=>!requestStatus||r.status===requestStatus).slice().sort((a,b)=>b.id-a.id);return `${pageHead('طلبات العمل المرن','تقديم طلبات المرونة ومراجعتها وفق طبيعة المهام ومتطلبات العمل.',button('طلب جديد','new-request','btn-primary','plus'))}
<div class="notice notice-flex">${ico('shield',17)} <span>الموافقات في هذا النموذج محاكاة داخل المتصفح فقط، وليست قرارات إدارية نافذة.</span></div>
<div class="filter-card"><span class="strong">سجل الطلبات</span><select id="request-status" class="input-select" aria-label="تصفية الطلبات"><option value="">جميع الحالات</option>${Object.entries(reqName).map(([k,v])=>`<option value="${k}" ${requestStatus===k?'selected':''}>${v}</option>`).join('')}</select><span class="small-note">${list.length} طلب</span></div>
<div class="data-list">${list.map(r=>`<article class="data-item"><div class="data-icon">${ico('calendar',22)}</div><div class="data-main"><h3>${esc(requestTypeName[r.type])} — ${esc(name(person(r.employee)))}</h3><p>${fmt(r.start)}${r.end!==r.start?' إلى '+fmt(r.end):''}</p><div class="data-meta"><span>${ico('file',13)} ${esc(r.reason)}</span></div></div><div class="data-actions">${reqPill(r)}${r.status==='pending'&&canApprove(r)?button('اعتماد','approve-request','btn-teal','check',r.id)+button('رفض','reject-request','btn-danger','close',r.id):''}${r.status==='pending'&&r.employee===profile?button('إلغاء','cancel-request','btn-secondary','close',r.id):''}</div></article>`).join('')||empty('لا توجد طلبات في هذا التصنيف')}</div>`}
function teamPage(){return `${pageHead('فريق العمل','دليل افتراضي للتنسيق بين فرق الدائرة وتوضيح أنماط العمل.')}
<div class="notice notice-flex">${ico('info',17)}<span>جميع الأسماء المعروضة بيانات اختبارية وليست سجلاً فعلياً لموظفي دائرة الطرق.</span></div>
<div class="team-grid">${teamPeople().map(p=>`<article class="member-card"><div class="member-avatar">${initials(p.name)}</div><div class="member-content"><strong>${esc(p.name)}</strong><div class="muted">${esc(p.title)}</div><div class="muted">${esc(p.department)}</div>${modePill(workMode(p.id,today()))}</div></article>`).join('')}</div>`}
function reportsPage(){const tasks=accessibleTasks(),all=tasks.length,completed=tasks.filter(t=>t.status==='done').length,late=tasks.filter(t=>t.status!=='done'&&t.due<today()).length,requests=accessibleRequests(),approved=requests.filter(r=>r.status==='approved').length,depts=Array.from(new Set(tasks.map(t=>t.department)));return `${pageHead('التقارير ومؤشرات الأداء','مؤشرات أولية للمهام والطلبات تساعد على تحسين العمل.',button('تصدير CSV','export-report','btn-secondary','download')+button('طباعة','print-report','btn-primary','print'))}
<div class="notice notice-flex">${ico('info',17)}<span>مؤشرات هذه الشاشة ناتجة عن بيانات اختبارية ولا تمثل أداء الدائرة الحقيقي. لا تُستخدم في تقييم الموظفين أو اتخاذ قرارات وظيفية.</span></div>
<div class="report-head"><div class="report-block"><div class="label">المهام المكتملة</div><div class="value">${completed} <span class="small-note">/ ${all}</span></div><div class="small-note">${all?Math.round(completed/all*100):0}% من المسجل</div></div><div class="report-block"><div class="label">المهام المتأخرة</div><div class="value">${late}</div><div class="small-note">مفتوحة وتجاوزت موعدها</div></div><div class="report-block"><div class="label">طلبات المرونة المعتمدة</div><div class="value">${approved}</div><div class="small-note">من أصل ${requests.length} طلبات</div></div></div>
<div class="report-layout"><section class="card"><h3>ملخص الأقسام</h3><p class="card-caption">نسبة المهام المكتملة لكل قسم</p>${depts.map((d,i)=>{const ts=tasks.filter(t=>t.department===d);const rate=Math.round(ts.filter(t=>t.status==='done').length/ts.length*100);return `<div class="bar-row"><span class="bar-label">${esc(d)}</span><div class="bar"><span style="width:${rate}%;background:${['#168d84','#3178aa','#bd8d45','#776ab7','#408aa0'][i%5]}"></span></div><strong>${rate}%</strong></div>`}).join('')||empty('لا توجد مهام')}</section>
<section class="card"><h3>ملخص العمل المرن</h3><p class="card-caption">الطلبات المتاحة لهذا الحساب</p><div style="margin-top:20px">${Object.keys(reqName).map((st,i)=>{const count=requests.filter(r=>r.status===st).length,rate=requests.length?Math.round(count/requests.length*100):0;return `<div class="bar-row"><span class="bar-label">${esc(reqName[st])}</span><div class="bar"><span style="width:${rate}%;background:${['#cb9a4c','#13886e','#bb6969'][i]}"></span></div><strong>${count}</strong></div>`}).join('')}</div></section></div>
<div class="card" style="margin-top:17px"><div class="card-head"><h3>المهام المسجلة</h3><span class="small-note">${tasks.length} سجل</span></div><div class="table-scroll"><table class="table"><thead><tr><th>المهمة</th><th>الموظف</th><th>القسم</th><th>الموعد</th><th>الحالة</th></tr></thead><tbody>${tasks.map(t=>`<tr><td>${esc(t.title)}</td><td>${esc(name(person(t.assignee)))}</td><td>${esc(t.department)}</td><td>${fmt(t.due)}</td><td>${taskPill(t)}</td></tr>`).join('')}</tbody></table></div></div>`}
function renderModal(){let title='',body='',footer='';
 if(modal.type==='new-task'){
   title='إضافة مهمة جديدة';const people=isAdmin()?db.people:db.people.filter(p=>p.department===me().department);const deps=isAdmin()?DEPARTMENTS:[me().department];
   body=`<form id="task-form"><div class="form-grid"><div class="field full"><label for="task-title-input">عنوان المهمة *</label><input id="task-title-input" name="title" maxlength="120" required placeholder="مثال: مراجعة تقرير صيانة الطرق"></div><div class="field"><label for="task-dept-input">القسم *</label><select id="task-dept-input" name="department">${deps.map(d=>`<option>${esc(d)}</option>`).join('')}</select></div><div class="field"><label for="task-assignee-input">الموظف المكلف *</label><select id="task-assignee-input" name="assignee">${people.map(p=>`<option value="${p.id}" data-department="${esc(p.department)}">${esc(p.name)}</option>`).join('')}</select></div><div class="field"><label for="task-date-input">موعد الإنجاز *</label><input id="task-date-input" name="due" type="date" min="${today()}" value="${shift(today(),3)}" required></div><div class="field"><label for="task-priority-input">الأولوية</label><select id="task-priority-input" name="priority"><option value="normal">عادية</option><option value="medium">متوسطة</option><option value="high">عالية</option></select></div><div class="field full"><label for="task-description-input">وصف المهمة</label><textarea id="task-description-input" name="description" maxlength="900" placeholder="المخرجات المطلوبة ومعايير الإنجاز..."></textarea></div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-action="close-modal">إلغاء</button><button type="submit" class="btn btn-primary">${ico('check',16)} حفظ المهمة</button></div></form>`;
 }else if(modal.type==='new-request'){
   title='طلب عمل مرن';body=`<form id="request-form"><div class="form-grid"><div class="field full"><label for="request-type-input">نوع المرونة *</label><select id="request-type-input" name="type"><option value="remote">عمل عن بُعد</option><option value="hours">ساعات عمل مرنة</option></select></div><div class="field"><label for="request-start-input">من تاريخ *</label><input id="request-start-input" name="start" type="date" min="${today()}" value="${shift(today(),1)}" required></div><div class="field"><label for="request-end-input">إلى تاريخ *</label><input id="request-end-input" name="end" type="date" min="${today()}" value="${shift(today(),1)}" required></div><div class="field full"><label for="request-reason-input">المبرر وخطة تغطية العمل *</label><textarea id="request-reason-input" name="reason" maxlength="700" required placeholder="اذكر المهام التي ستُنجز وكيف ستستمر الخدمة والتواصل..."></textarea><small>خاضع لموافقة المسؤول المعني والضوابط الرسمية. لا يجوز استخدام الطلب لمهام تتطلب حضوراً ميدانياً دون تنسيق.</small></div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-action="close-modal">إلغاء</button><button type="submit" class="btn btn-primary">${ico('check',16)} إرسال الطلب</button></div></form>`;
 }else if(modal.type==='task-detail'){
   const t=accessibleTasks().find(x=>x.id===modal.id);if(!t)return '';
   title='تفاصيل المهمة';body=`<div class="detail-list"><div class="detail-item"><span>المهمة</span><strong>${esc(t.title)}</strong></div><div class="detail-item"><span>الوصف</span><div class="detail-description">${esc(t.description||'لا يوجد وصف إضافي')}</div></div><div class="detail-item"><span>المكلف</span><strong>${esc(name(person(t.assignee)))}</strong></div><div class="detail-item"><span>القسم • الموعد</span><strong>${esc(t.department)} • ${fmt(t.due)}</strong></div><div class="detail-item"><span>الحالة الحالية</span>${taskPill(t)}</div></div>${canManage()||t.assignee===profile?`<form id="task-status-form" data-id="${t.id}"><div class="field" style="margin-top:15px"><label for="new-task-status">تحديث حالة المهمة</label><select id="new-task-status" name="status">${Object.entries(statusName).map(([key,val])=>`<option value="${key}" ${key===t.status?'selected':''}>${val}</option>`).join('')}</select></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-action="close-modal">إغلاق</button><button type="submit" class="btn btn-primary">حفظ الحالة</button></div></form>`:`<div class="modal-footer">${button('إغلاق','close-modal','btn-secondary')}</div>`}`;
 }else if(modal.type==='reset'){
   title='إعادة ضبط البيانات التجريبية';body=`<p>سيتم استبدال جميع التغييرات المحفوظة على هذا الجهاز بالبيانات التجريبية الأصلية. لا يمكن التراجع عن العملية.</p><div class="modal-footer">${button('إلغاء','close-modal')}${button('نعم، إعادة الضبط','confirm-reset','btn-danger','refresh')}</div>`;
 }
 return `<div class="modal-backdrop" data-action="backdrop-close"><section class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="modal-header"><h2>${esc(title)}</h2><button type="button" class="close" data-action="close-modal" aria-label="إغلاق">${ico('close',18)}</button></div>${body}${footer}</section></div>`;
}
function toast(msg){let zone=document.getElementById('toast-zone');if(!zone)return;zone.innerHTML=`<div class="toast">${esc(msg)}</div>`;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{if(document.getElementById('toast-zone'))document.getElementById('toast-zone').innerHTML=''},4400)}
function switchView(v){if(!VIEWS.includes(v))return;view=v;modal=null;sidebarOpen=false;search='';taskStatus='';taskDepartment='';requestStatus='';render();window.scrollTo({top:0,behavior:'instant'})}
function openModal(type,id){modal={type,id:Number(id)};render();const el=document.querySelector('.modal input, .modal select, .modal button');el?.focus()}
function updateRequest(id,status){const r=db.requests.find(r=>r.id===id);if(!r||r.status!=='pending'||!canApprove(r))return toast('ليس لديك صلاحية اتخاذ القرار لهذا الطلب.');r.status=status;r.decidedBy=profile;r.decidedDate=today();persist();render();toast(status==='approved'?'تم اعتماد الطلب في النموذج التجريبي.':'تم رفض الطلب في النموذج التجريبي.')}
function csvEscape(s){const x=String(s??'');return '"'+x.replace(/"/g,'""')+'"'}
function exportCSV(){const rows=[['رقم المهمة','المهمة','القسم','الموظف','الاستحقاق','الحالة','الأولوية'],...accessibleTasks().map(t=>[t.id,t.title,t.department,name(person(t.assignee)),t.due,statusName[t.status],t.priority])];const csv='\uFEFF'+rows.map(r=>r.map(csvEscape).join(',')).join('\r\n');const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='marn-buraimi-tasks-'+today()+'.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('تم تجهيز ملف CSV للمهام الظاهرة في حساب العرض.')}
app.addEventListener('click',e=>{
  const b=e.target.closest('[data-action],[data-view]');if(!b)return;
  const v=b.getAttribute('data-view');if(v){switchView(v);return}
  const a=b.getAttribute('data-action'),id=Number(b.dataset.id);
  if(a==='backdrop-close'&&e.target!==b)return;
  switch(a){case 'toggle-sidebar':sidebarOpen=!sidebarOpen;render();break;case 'close-sidebar':sidebarOpen=false;render();break;case 'new-task':if(canCreateTask())openModal('new-task');break;case 'new-request':openModal('new-request');break;case 'go-tasks':switchView('tasks');break;case 'task-detail':openModal('task-detail',id);break;case 'close-modal':case 'backdrop-close':modal=null;render();break;case 'approve-request':updateRequest(id,'approved');break;case 'reject-request':updateRequest(id,'rejected');break;
  case 'cancel-request':{const r=db.requests.find(r=>r.id===id);if(r?.employee===profile&&r.status==='pending'&&confirm('هل تريد إلغاء الطلب؟')){db.requests=db.requests.filter(x=>x.id!==id);persist();render();toast('تم إلغاء الطلب.')}break}
  case 'notifications':switchView('requests');requestStatus='pending';render();break;
  case 'prev-week':weekOffset--;render();break;case 'next-week':weekOffset++;render();break;case 'this-week':weekOffset=0;render();break;
  case 'export-report':exportCSV();break;case 'print-report':window.print();break;
  case 'confirm-reset':db=seed();persist();modal=null;render();toast('استُعيدت البيانات التجريبية الأصلية.');break;
  }});
app.addEventListener('change',e=>{
 const el=e.target;
 if(el.id==='profile-select'){profile=Number(el.value);try{localStorage.setItem(ROLE_STORAGE,String(profile))}catch{}switchView('dashboard');toast('أنت الآن في حساب عرض: '+roleDesc());}
 else if(el.id==='task-status'){taskStatus=el.value;render();}
 else if(el.id==='task-department'){taskDepartment=el.value;render();}
 else if(el.id==='request-status'){requestStatus=el.value;render();}
 else if(el.id==='task-dept-input'){
   const assignee=document.getElementById('task-assignee-input');if(assignee){const opts=Array.from(assignee.options);let first=null;opts.forEach(o=>{o.hidden=o.dataset.department!==el.value;if(!o.hidden&&!first)first=o});if(first)assignee.value=first.value;}
 }
 else if(el.id==='task-assignee-input'){
   const user=person(el.value),dept=document.getElementById('task-dept-input');if(user&&dept&&isAdmin())dept.value=user.department;
 }
});
app.addEventListener('input',e=>{
 if(e.target.id==='task-search'){
   const t=e.target,caret=t.selectionStart;search=t.value;const page=document.getElementById('page-content');page.innerHTML=renderView()+`<footer class="page-footer">© 2026م وزارة النقل والاتصالات وتقنية المعلومات — دائرة الطرق بمحافظة البريمي | نموذج أولي غير معتمد</footer>`;let input=document.getElementById('task-search');input.focus();input.setSelectionRange(caret,caret)
 }
});
app.addEventListener('submit',e=>{
 e.preventDefault();const form=e.target;
 if(form.id==='task-form'){
   if(!canCreateTask())return toast('هذا الحساب لا يسمح بإضافة مهام.');
   const f=new FormData(form),title=String(f.get('title')||'').trim(),description=String(f.get('description')||'').trim(),department=String(f.get('department')||''),assignee=Number(f.get('assignee')),due=String(f.get('due')||''),priority=String(f.get('priority')||'normal');
   if(!title||!person(assignee)||!DEPARTMENTS.includes(department)||person(assignee).department!==department||!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(due)||due<today())return toast('راجع بيانات المهمة، وموعدها، والقسم المتوافق مع الموظف.');
   if(isHead()&&department!==me().department)return toast('لا يمكن لهذا الحساب إسناد مهام خارج قسمه.');
   db.tasks.unshift({id:db.nextTask++,title,description,department,assignee,creator:profile,due,priority,status:'todo',created:today()});persist();modal=null;view='tasks';render();toast('تمت إضافة المهمة بنجاح إلى النسخة التجريبية.');
 }else if(form.id==='request-form'){
   const f=new FormData(form),type=String(f.get('type')),start=String(f.get('start')),end=String(f.get('end')),reason=String(f.get('reason')||'').trim();
   if(!['remote','hours'].includes(type)||!reason||start<today()||end<start||!/^\d{4}-\d{2}-\d{2}$/.test(start)||!/^\d{4}-\d{2}-\d{2}$/.test(end))return toast('تحقق من التاريخ والمبرر ثم حاول مجدداً.');
   db.requests.unshift({id:db.nextRequest++,employee:profile,type,start,end,reason,status:'pending',created:today()});persist();modal=null;view='requests';requestStatus='';render();toast('تم إرسال الطلب التجريبي وهو بانتظار الاعتماد.');
 }else if(form.id==='task-status-form'){
   const id=Number(form.dataset.id),t=accessibleTasks().find(x=>x.id===id),st=String(new FormData(form).get('status'));
   if(!t||(!canManage()&&t.assignee!==profile)||!Object.keys(statusName).includes(st))return toast('لا يمكنك تعديل هذه المهمة.');
   t.status=st;persist();modal=null;render();toast('تم تحديث حالة المهمة.');
 }
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal){modal=null;render()}else if(e.key==='Escape'&&sidebarOpen){sidebarOpen=false;render()}});
render();
})();
