// Start button behavior (go to dashboard if auth, otherwise to auth)
document.getElementById('startBtn')?.addEventListener('click', goStart);
document.getElementById('startBtn2')?.addEventListener('click', goStart);

function goStart() {
  if (localStorage.getItem('isAuth')) {
    location.href = 'dashboard.html';
  } else {
    location.href = 'auth.html';
  }
}

// render phone list from localStorage (same format as dashboard uses)
(function renderPhoneMock() {
  const data = JSON.parse(localStorage.getItem('subs')) || [];
  const list = document.getElementById('phoneList');
  const total = document.getElementById('phoneTotal');

  if (!list) return;

  list.innerHTML = '';
  let sum = 0;

  data.forEach(s => {
    sum += Number(s.price) || 0;

    const el = document.createElement('div');
    el.className = 'phone-item';
    el.innerHTML = `
      <div>
        <strong>${s.name} — ${s.price} ₽</strong>
        <div class="sub-day">Списывается ${s.day}-го числа</div>
      </div>
      <div>›</div>
    `;
    list.appendChild(el);
  });

  total.innerText = (sum || 0) + ' ₽';
})();
if ("Notification" in window) {
  if (Notification.permission === "default") {
    Notification.requestPermission(); // браузер покажет окно: разрешить/запретить
  }
}
function showNotification(title, body) {
  if (Notification.permission === "granted") {
    new Notification(title, {
      body: body,
      icon: "icon.png" // можно убрать, или вставить свою иконку
    });
  }
}
function showNotification(title, body) {
  if (Notification.permission === "granted") {
    new Notification(title, { body });
  }
}
function checkReminders() {
  const subs = JSON.parse(localStorage.getItem('subs')) || [];
  const today = new Date().getDate(); // сегодня число месяца

  subs.forEach(sub => {
    const diff = sub.day - today;

    if (diff === 3) showNotification("Списание через 3 дня", `${sub.name} — ${sub.price} ₽`);
    if (diff === 1) showNotification("Списание завтра", `${sub.name} — ${sub.price} ₽`);
    if (diff === 0) showNotification("Сегодня списание", `${sub.name} — ${sub.price} ₽`);
  });
}

// запускаем проверку сразу при загрузке
checkReminders();