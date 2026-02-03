const i18n = {
    es: { greet: "Hola, ", sub0: "POLICÍA NACIONAL", sub1: "MÉDICO / BOMBEROS", sub2: "SMS UBICACIÓN + LLAMADA", set: "Ajustes", name: "Tu Nombre", phone: "Teléfono Familiar", lang: "Idioma", save: "GUARDAR AJUSTES", msg: "¡EMERGENCIA! Soy {n}. Mi ubicación exacta: " },
    en: { greet: "Hello, ", sub0: "NATIONAL POLICE", sub1: "MEDICAL / FIRE", sub2: "SMS LOCATION + CALL", set: "Settings", name: "Your Name", phone: "Family Phone", lang: "Language", save: "SAVE SETTINGS", msg: "EMERGENCY! I am {n}. My exact location: " }
};

let currentCoords = "Obteniendo...";

// RASTREO GPS
navigator.geolocation.watchPosition(
    p => { currentCoords = `https://www.google.com/maps?q=${p.coords.latitude},${p.coords.longitude}`; },
    e => { console.error(e); },
    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
);

function openSettings() {
    document.getElementById('main-screen').classList.remove('active');
    document.getElementById('settings-screen').classList.add('active');
}

function saveSettings() {
    const n = document.getElementById('name-input').value;
    const p = document.getElementById('phone-input').value;
    const l = document.getElementById('lang-input').value;
    if(n && p) {
        localStorage.setItem('s_name', n);
        localStorage.setItem('s_phone', p);
        localStorage.setItem('s_lang', l);
        initApp();
    }
}

function initApp() {
    const n = localStorage.getItem('s_name');
    const l = localStorage.getItem('s_lang') || 'es';
    if(!n) { openSettings(); } 
    else {
        document.getElementById('user-display').innerText = n;
        const T = i18n[l];
        document.getElementById('txt-greet').firstChild.textContent = T.greet;
        document.getElementById('txt-sub0').innerText = T.sub0;
        document.getElementById('txt-sub1').innerText = T.sub1;
                document.getElementById('txt-sub2').innerText = T.sub2;
        document.getElementById('txt-set-title').innerText = T.set;
        document.getElementById('lbl-name').innerText = T.name;
        document.getElementById('lbl-phone').innerText = T.phone;
        document.getElementById('lbl-lang').innerText = T.lang;
        document.getElementById('btn-save').innerText = T.save;
        document.getElementById('settings-screen').classList.remove('active');
        document.getElementById('main-screen').classList.add('active');
    }
}

function executeFamilyAlert() {
    const n = localStorage.getItem('s_name');
    const p = localStorage.getItem('s_phone');
    const l = localStorage.getItem('s_lang') || 'es';
    const m = i18n[l].msg.replace('{n}', n) + currentCoords;
    window.location.href = `sms:${p}?&body=${encodeURIComponent(m)}`;
    setTimeout(() => { window.location.href = `tel:${p}`; }, 2500);
}

window.onload = initApp;
