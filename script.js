"use strict";

/*
  指定されたキャラクターを画面へ表示します。
*/
function showCharacter(characterId) {
  const character = characters[characterId];

  if (!character) {
    console.error(
      `キャラクター「${characterId}」が見つかりません。`
    );
    return;
  }

  const detailArea =
    document.getElementById("character-detail");

  const characterImage =
    document.getElementById("character-image");

  /*
    画像を先に読み込んでから切り替えることで、
    一瞬画像が消える現象を減らします。
  */
  const preloadImage = new Image();

  preloadImage.onload = () => {
    characterImage.src = character.image;
    characterImage.alt = `${character.name}の立ち絵`;

    updateCharacterText(character);

    restartSwitchAnimation(detailArea);
  };

  preloadImage.onerror = () => {
    console.error(
      `画像を読み込めませんでした: ${character.image}`
    );

    updateCharacterText(character);
    restartSwitchAnimation(detailArea);
  };

  preloadImage.src = character.image;

  updateActiveButton(characterId);
}


/*
  プロフィールの文字を変更します。
*/
function updateCharacterText(character) {
  document.getElementById("character-title").textContent =
    character.title;

  document.getElementById("character-name").textContent =
    character.name;

  document.getElementById("character-name-jp").textContent =
    character.nameJp;

  document.getElementById("character-gender").textContent =
    character.gender;

  document.getElementById("character-height").textContent =
    character.height;

  document.getElementById("character-age").textContent =
    character.age;

  document.getElementById("character-group").textContent =
    character.group;

  document.getElementById("character-ability").textContent =
    character.ability;

  document.getElementById("character-description").textContent =
    character.description;

  document.getElementById(
    "character-author-comment"
    ).textContent = character.authorComment;

    document.getElementById(
    "character-likes"
    ).textContent = character.likes;

    document.getElementById(
    "character-dislikes"
    ).textContent = character.dislikes;

    document.getElementById(
    "character-first-person"
    ).textContent = character.firstPerson;

    document.getElementById(
    "character-second-person"
    ).textContent = character.secondPerson;

    const speech =
    document.getElementById("character-speech");

    speech.innerHTML="";

    character.speech.forEach(line=>{

    speech.innerHTML+=`<p>「${line}」</p>`;

  }
);
}


/*
  選択中のアイコンへactiveを付けます。
*/
function updateActiveButton(characterId) {
  const buttons =
    document.querySelectorAll(".character-icon-button");

  buttons.forEach((button) => {
    const isSelected =
      button.dataset.character === characterId;

    button.classList.toggle("active", isSelected);
  });
}


/*
  切り替えアニメーションを最初から再生します。
*/
function restartSwitchAnimation(element) {
  if (!element) {
    return;
  }

  element.classList.remove("switching");

  /*
    ブラウザへ一度変更を認識させます。
  */
  void element.offsetWidth;

  element.classList.add("switching");
}


/*
  ページを開いたあと、各アイコンへ
  クリック処理を登録します。
*/
document.addEventListener("DOMContentLoaded", () => {
  const buttons =
    document.querySelectorAll(".character-icon-button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const characterId = button.dataset.character;

      showCharacter(characterId);

      /*
        キャラ詳細まで滑らかに移動します。
        最初は不要なら、この部分を削除しても大丈夫です。
      */
      document
        .getElementById("character-detail")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
        updateActiveButton(characterId);
        openCharacterTab("profile");
    });
  });
  setupCharacterTabs();
});

/*
  プロフィール右側のタブ切り替え
*/
function setupCharacterTabs() {
  const tabButtons =
    document.querySelectorAll(".tab-button");

  const tabContents =
    document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedTab = button.dataset.tab;

      /*
        全ボタンからactiveを外し、
        選択されたボタンだけactiveにします。
      */
      tabButtons.forEach((tabButton) => {
        const isSelected = tabButton === button;

        tabButton.classList.toggle(
          "active",
          isSelected
        );

        tabButton.setAttribute(
          "aria-selected",
          String(isSelected)
        );
      });

      /*
        対応するタブ内容だけ表示します。
      */
      tabContents.forEach((content) => {
        const isSelected =
          content.id === `tab-${selectedTab}`;

        content.hidden = !isSelected;
        content.classList.toggle(
          "active",
          isSelected
        );
      });
    });
  });
}

function openCharacterTab(tabName) {
  const tabButtons =
    document.querySelectorAll(".tab-button");

  const tabContents =
    document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    const isSelected =
      button.dataset.tab === tabName;

    button.classList.toggle(
      "active",
      isSelected
    );

    button.setAttribute(
      "aria-selected",
      String(isSelected)
    );
  });

  tabContents.forEach((content) => {
    const isSelected =
      content.id === `tab-${tabName}`;

    content.hidden = !isSelected;
    content.classList.toggle(
      "active",
      isSelected
    );
  });
}