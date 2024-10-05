// المتغيرات الأساسية
let carbon = 100; // مستوى انبعاثات الكربون الابتدائية
let temperature = 15; // درجة الحرارة الابتدائية
let year = 2024; // السنة الابتدائية
const maxTemperature = 30; // الحد الأقصى المسموح به لدرجة الحرارة

const character = document.getElementById("character");

function performAction(action) {
  switch (action) {
    case "renewable":
      carbon -= 10;
      temperature -= 0.5;
      displayMessage("لقد التحقت إلى الطاقة المتجددة!");
      animateCharacter("renewable");
      break;
    case "plantTrees":
      carbon -= 15;
      temperature -= 0.7;
      displayMessage("تم زراعة الأشجار بنجاح!");
      animateCharacter("plantTrees");
      break;
    case "reduceFossil":
      carbon -= 12;
      temperature -= 0.6;
      displayMessage("تم تقليل استخدام الوقود الأحفوري!");
      animateCharacter("reduceFossil");
      break;
    case "publicTransport":
      carbon -= 8;
      temperature -= 0.4;
      displayMessage("تم تعزيز النقل العام!");
      animateCharacter("publicTransport");
      break;
    case "recycle":
      carbon -= 5;
      temperature -= 0.2;
      displayMessage("تم إعادة تدوير النفايات!");
      animateCharacter("recycle");
      break;
    default:
      break;
  }

  // تحديث المؤشرات
  carbon = Math.max(carbon, 0);
  temperature = Math.max(temperature, -10);
  year += 1;

  updateStats();

  // التحقق من الفوز أو الخسارة
  checkGameStatus();
}

function updateStats() {
  document.getElementById("carbon").innerText = carbon;
  document.getElementById("temperature").innerText = temperature.toFixed(1);
  document.getElementById("year").innerText = year;
}

function displayMessage(msg) {
  const messageDiv = document.getElementById("message");
  messageDiv.innerText = msg;
  // إزالة الرسالة بعد 3 ثوانٍ
  setTimeout(() => {
    messageDiv.innerText = "";
  }, 3000);
}

function checkGameStatus() {
  if (temperature >= maxTemperature) {
    alert("لقد تجاوزت درجة الحرارة الحد المسموح به! خسرت اللعبة.");
    resetGame();
  } else if (year >= 2100) {
    alert("تهانينا! نجحت في الحفاظ على الكوكب حتى عام 2100.");
    resetGame();
  }
}

function resetGame() {
  carbon = 100;
  temperature = 15;
  year = 2024;
  updateStats();
  displayMessage("تم إعادة ضبط اللعبة.");
}

// دالة لتحريك الشخصية بناءً على الإجراء باستخدام GSAP
function animateCharacter(action) {
  switch (action) {
    case "renewable":
      gsap.to("#character", {
        x: -50,
        duration: 0.5,
        ease: "power1.out",
        yoyo: true,
        repeat: 1,
      });
      break;
    case "plantTrees":
      gsap.to("#character", {
        y: -30,
        duration: 0.5,
        ease: "bounce.out",
        yoyo: true,
        repeat: 1,
      });
      break;
    case "reduceFossil":
      gsap.to("#character", {
        rotation: 20,
        duration: 0.3,
        ease: "power1.out",
        yoyo: true,
        repeat: 1,
      });
      break;
    case "publicTransport":
      gsap.to("#character", {
        scale: 1.2,
        duration: 0.3,
        ease: "power1.out",
        yoyo: true,
        repeat: 1,
      });
      break;
    case "recycle":
      gsap.to("#character", {
        opacity: 0.5,
        duration: 0.3,
        ease: "power1.out",
        yoyo: true,
        repeat: 1,
      });
      break;
    default:
      break;
  }
}

// تهيئة اللعبة عند التحميل
window.onload = () => {
  updateStats();
  // إضافة حركة انطلاق للشخصية باستخدام GSAP
  gsap.from("#character", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "bounce.out",
  });
};
