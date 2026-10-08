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
   LINE案内ページの設定
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
   URLを確認
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
   LINE案内ページを表示
================================== */

function showGuide(key) {

  const info = guideInfo[key];

  if (!info) return;


  /* ----------------------------------
     招待状を非表示
  ---------------------------------- */

  if (invitationView) {
    invitationView.style.display = "none";
  }


  /* ----------------------------------
     案内ページを表示
  ---------------------------------- */

  if (guideView) {
    guideView.style.display = "block";
  }


  /* ----------------------------------
     ページタイトル
  ---------------------------------- */

  if (guidePageTitle) {
    guidePageTitle.textContent = info.title;
  }

  if (guidePageSubtitle) {
    guidePageSubtitle.textContent = info.subtitle;
  }


  /* ----------------------------------
     すべての案内ページを一旦非表示
  ---------------------------------- */

  const sections = document.querySelectorAll(".guide-section");

  sections.forEach((section) => {

    section.style.display = "none";

  });


  /* ----------------------------------
     指定されたページだけ表示
  ---------------------------------- */

  const targetSection = document.getElementById(
    "guide-" + key
  );

  if (targetSection) {

    targetSection.style.display = "block";

  }


  /* ----------------------------------
     ブラウザのタイトル
  ---------------------------------- */

  document.title = info.title + " | Our Wedding";


  /* ----------------------------------
     ページ最上部へ
  ---------------------------------- */

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


  /* ----------------------------------
     招待状を表示
  ---------------------------------- */

  if (invitationView) {
    invitationView.style.display = "block";
  }


  /* ----------------------------------
     案内ページを非表示
  ---------------------------------- */

  if (guideView) {
    guideView.style.display = "none";
  }


  document.title = "Our Wedding Invitation";


  /* ----------------------------------
     封筒アニメーションに必要な
     要素がなければ終了
  ---------------------------------- */

  if (!opening || !wax || !page) {
    return;
  }


  /* ==================================
     シーリングスタンプをクリック
  ================================== */

  wax.addEventListener("click", () => {


    /* 2回クリック防止 */

    if (hasStarted) return;

    hasStarted = true;


    /* ----------------------------------
       TAPを消す
    ---------------------------------- */

    opening.classList.add("started");


    /* ==================================
       1. 封筒のフラップを開く
    ================================== */

    window.setTimeout(() => {

      opening.classList.add("flap-open");

    }, 150);


    /* ==================================
       2. 便箋が封筒から出てくる
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
       4. 便箋を上方向へ開く
    ================================== */

    window.setTimeout(() => {

      opening.classList.add("letter-open");

    }, 2750);


    /* ==================================
       5. 招待状本編を表示
    ================================== */

    window.setTimeout(() => {


      /* 必ずページ最上部から表示 */

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
      });


      page.classList.add("show");


    }, 4300);


    /* ==================================
       6. オープニング画面を消す
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

  /*
    URLに ?guide=about などがある場合
    → 案内ページを表示
  */

  showGuide(guideKey);

} else {

  /*
    URLにguideがない場合
    → 通常の招待状を表示
  */

  showInvitation();

}
