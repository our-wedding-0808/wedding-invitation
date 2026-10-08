const form = document.getElementById("rsvpForm");

const attendanceDetails =
  document.getElementById("attendanceDetails");

const companionDetails =
  document.getElementById("companionDetails");

const childrenDetails =
  document.getElementById("childrenDetails");

const allergyDetails =
  document.getElementById("allergyDetails");

const submitButton =
  document.getElementById("submitButton");

const formMessage =
  document.getElementById("formMessage");

const completeMessage =
  document.getElementById("completeMessage");

const lineGuide =
  document.getElementById("lineGuide");


/* ==================================
   出欠
================================== */

document
  .querySelectorAll('input[name="attendance"]')
  .forEach((radio) => {

    radio.addEventListener("change", () => {

      if (radio.value === "出席" && radio.checked) {

        attendanceDetails.classList.remove("hidden");

        document
          .querySelector('input[name="phone"]')
          .required = true;

        document
          .querySelectorAll(
            'input[name="companion"], input[name="children"], input[name="allergy"]'
          )
          .forEach((input) => {

            input.required = true;

          });

      }


      if (radio.value === "欠席" && radio.checked) {

        attendanceDetails.classList.add("hidden");

        document
          .querySelector('input[name="phone"]')
          .required = false;

        document
          .querySelectorAll(
            'input[name="companion"], input[name="children"], input[name="allergy"]'
          )
          .forEach((input) => {

            input.required = false;

          });

        hideConditionalSections();

      }

    });

  });


/* ==================================
   同伴者
================================== */

document
  .querySelectorAll('input[name="companion"]')
  .forEach((radio) => {

    radio.addEventListener("change", () => {

      if (radio.value === "あり" && radio.checked) {

        companionDetails.classList.remove("hidden");

        document
          .querySelector('input[name="companionCount"]')
          .required = true;

        document
          .querySelector('textarea[name="companionNames"]')
          .required = true;

      }


      if (radio.value === "なし" && radio.checked) {

        companionDetails.classList.add("hidden");

        document
          .querySelector('input[name="companionCount"]')
          .required = false;

        document
          .querySelector('textarea[name="companionNames"]')
          .required = false;

        document
          .querySelector('input[name="companionCount"]')
          .value = "";

        document
          .querySelector('textarea[name="companionNames"]')
          .value = "";

      }

    });

  });


/* ==================================
   お子さま
================================== */

document
  .querySelectorAll('input[name="children"]')
  .forEach((radio) => {

    radio.addEventListener("change", () => {

      if (radio.value === "あり" && radio.checked) {

        childrenDetails.classList.remove("hidden");

        document
          .querySelector('input[name="childrenCount"]')
          .required = true;

        document
          .querySelector('input[name="childrenAges"]')
          .required = true;

        document
          .querySelectorAll('input[name="childrenMeal"]')
          .forEach((input) => {

            input.required = true;

          });

      }


      if (radio.value === "なし" && radio.checked) {

        childrenDetails.classList.add("hidden");

        document
          .querySelector('input[name="childrenCount"]')
          .required = false;

        document
          .querySelector('input[name="childrenAges"]')
          .required = false;

        document
          .querySelectorAll('input[name="childrenMeal"]')
          .forEach((input) => {

            input.required = false;
            input.checked = false;

          });

        document
          .querySelector('input[name="childrenCount"]')
          .value = "";

        document
          .querySelector('input[name="childrenAges"]')
          .value = "";

      }

    });

  });


/* ==================================
   アレルギー
================================== */

document
  .querySelectorAll('input[name="allergy"]')
  .forEach((radio) => {

    radio.addEventListener("change", () => {

      if (radio.value === "あり" && radio.checked) {

        allergyDetails.classList.remove("hidden");

        document
          .querySelector('textarea[name="allergyDetails"]')
          .required = true;

      }


      if (radio.value === "なし" && radio.checked) {

        allergyDetails.classList.add("hidden");

        document
          .querySelector('textarea[name="allergyDetails"]')
          .required = false;

        document
          .querySelector('textarea[name="allergyDetails"]')
          .value = "";

      }

    });

  });


/* ==================================
   条件付き項目をリセット
================================== */

function hideConditionalSections() {

  companionDetails.classList.add("hidden");

  childrenDetails.classList.add("hidden");

  allergyDetails.classList.add("hidden");


  document
    .querySelectorAll(
      'input[name="companion"], input[name="children"], input[name="allergy"]'
    )
    .forEach((input) => {

      input.checked = false;
      input.required = false;

    });


  document
    .querySelectorAll(
      'input[name="companionCount"], input[name="childrenCount"], input[name="childrenAges"]'
    )
    .forEach((input) => {

      input.value = "";
      input.required = false;

    });


  document
    .querySelectorAll(
      'textarea[name="companionNames"], textarea[name="allergyDetails"]'
    )
    .forEach((textarea) => {

      textarea.value = "";
      textarea.required = false;

    });


  document
    .querySelectorAll('input[name="childrenMeal"]')
    .forEach((input) => {

      input.checked = false;
      input.required = false;

    });

}


/* ==================================
   フォーム送信
================================== */

form.addEventListener("submit", (event) => {

  event.preventDefault();

  formMessage.textContent = "";

  submitButton.disabled = true;

  submitButton.textContent = "送信中…";


  /*
   * フォームデータを取得
   */

  const formData = new FormData(form);


  /*
   * 出席かどうかを取得
   */

  const attendance =
    document.querySelector(
      'input[name="attendance"]:checked'
    );


  /*
   * Google Apps ScriptのWebアプリURL
   */

  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbyqudnRGrE3CE3RNzmCG-tM0_kOvqrrnk4XC4f86sksdjh9Je8xu5sG-Z5W6B2jAaun-g/exec";


  /*
   * ==================================
   * 先に完了画面を表示
   * ==================================
   */

  form.classList.add("hidden");

  completeMessage.classList.remove("hidden");


  /*
   * 出席者の場合だけ
   * 公式LINE案内を表示
   */

  if (
    attendance &&
    attendance.value === "出席"
  ) {

    lineGuide.classList.remove("hidden");

  } else {

    lineGuide.classList.add("hidden");

  }


  /*
   * ページ上部へ移動
   */

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  /*
   * ==================================
   * Google Apps Scriptへ送信
   *
   * 完了画面を表示した後、
   * 裏側でスプレッドシートへ保存
   * ==================================
   */

  fetch(scriptUrl, {

    method: "POST",

    mode: "no-cors",

    body: formData

  })
    .then(() => {

      console.log(
        "Googleスプレッドシートへの送信処理が完了しました。"
      );

    })
    .catch((error) => {

      console.error(
        "Googleスプレッドシートへの送信に失敗しました。",
        error
      );

    });

});
