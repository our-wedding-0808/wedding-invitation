const opening = document.getElementById("opening");
const wax = document.getElementById("wax");
const page = document.getElementById("page");

const invitationView = document.getElementById("invitationView");
const guideView = document.getElementById("guideView");

const guidePageTitle = document.getElementById("guidePageTitle");
const guidePageSubtitle = document.getElementById("guidePageSubtitle");

let hasStarted = false;


/* ==================================
   ページ表示位置を常に先頭にする
================================== */

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.scrollTo(0, 0);


/* ==================================
   LINE案内ページ
================================== */

const guideInfo = {
  about: {
    title: "ABOUT",
    subtitle: "結婚式について"
  },

  access: {
    title: "ACCESS",
    subtitle: "アクセス"
  },

  schedule: {
    title: "SCHEDULE",
    subtitle: "当日の流れ"
  },

  faq: {
    title: "FAQ",
    subtitle: "よくある質問"
  },

  photo: {
    title: "PHOTO",
    subtitle: "写真共有"
  },

  afterparty: {
    title: "AFTER PARTY",
    subtitle: "二次会について"
  }
};


/* ==================================
   URLの ?guide=○○ を確認
================================== */

const params = new URLSearchParams(window.location.search);
const guideKey = params.get("guide");


/* ==================================
   FAQの開閉
================================== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

  const question = item.querySelector(".faq-question");

  if (!question) return;

  question.addEventListener("click", () => {

    item.classList.toggle("open");

  });

});


/* ==================================
   案内ページを表示
================================== */

function showGuide(key) {

  const info = guideInfo[key];

  if (!info) return;


  /* 招待状を完全に非表示 */

  if (invitationView) {
    invitationView.style.display = "none";
  }


  /* 案内ページを表示 */

  if (guideView) {
    guideView.classList.add("is-active");
  }


  /* タイトル変更 */

  if (guidePageTitle) {
    guidePageTitle.textContent = info.title;
  }

  if (guidePageSubtitle) {
    guidePageSubtitle.textContent = info.subtitle;
  }


  /* すべての案内セクションを非表示 */

  const sections = document.querySelectorAll(".guide-section");

  sections.forEach((section) => {
    section.classList.remove("is-active");
  });


  /* 指定されたページだけ表示 */

  const targetSection = document.getElementById(
    `guide-${key}`
  );

  if (targetSection) {
    targetSection.classList.add("is-active");
  }


  /* ページタイトル */

  document.title = `${info.title} | Our Wedding`;


  /* 一番上から表示 */

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant"
  });

}


/* ==================================
   通常の招待状を表示
================================== */

function showInvitation() {

  if (invitationView) {
    invitationView.style.display = "";
  }

  if (guideView) {
    guideView.classList.remove("is-active");
  }

  document.title = "Our Wedding Invitation";


  /* ==================================
     封筒アニメーション
  ================================== */

  if (!opening || !wax || !page) {
    return;
  }


  wax.addEventListener("click", () => {

    if (hasStarted) return;

    hasStarted = true;


    /* タップを受け付ける */

    opening.classList.add("started");


    /* ==================================
       1. 封筒のフラップを開く
    ================================== */

    window.setTimeout(() => {

      opening.classList.add("flap-open");

    }, 150);


    /* ==================================
       2. 折りたたまれた便箋が
          封筒から出てくる
    ================================== */

    window.setTimeout(() => {

      opening.classList.add("letter-out");

    }, 1050);


    /* ==================================
       3. 封筒を消す
    ================================== */

    window.setTimeout(() => {

      opening.classList.add("envelope-away");

    }, 2050);


    /* ==================================
       4. 便箋の上半分を
          折り目から上へ開く
    ================================== */

    window.setTimeout(() => {

      opening.classList.add("letter-open");

    }, 2750);


    /* ==================================
       5. 招待状本編を表示
    ================================== */

    window.setTimeout(() => {

      /* 招待状を必ず一番上から表示 */

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
      });

      page.classList.add("show");

    }, 4300);


    /* ==================================
       6. 白いオープニング画面を
          フェードアウト
    ================================== */

    window.setTimeout(() => {

      opening.classList.add("hide");

    }, 5300);

  });

}


/* ==================================
   起動
================================== */

if (guideKey && guideInfo[guideKey]) {

  /* LINEから ?guide=○○ で来た場合 */

  showGuide(guideKey);

} else {

  /* 通常の招待状 */

  showInvitation();

}