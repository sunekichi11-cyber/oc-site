// キャラクターデータ
const characters = {
  vesperion: {
    title: "深紅薔薇の執行者",
    name: "Vespellion Dreadrose",
    nameJp: "ヴェスペリオン・ドレッドローズ",
    gender: "男",
    height: "257cm",
    group: "DREAD CATHEDRAL",
    motif: "宇宙・神父・軍人・薔薇",
    description:
      "銀河中で恐れられている軍人神父。無口で無表情だが、圧倒的な戦闘力と威圧感を持つ。",
    image: "images/vesperion.png"
  },

  sakuraviel: {
    title: "宇宙最強のサイバー九尾",
    name: "Sakuraviel",
    nameJp: "サクラヴィエル",
    gender: "男",
    height: "242cm",
    group: "未所属",
    motif: "九尾・桜・天使・サイバーパンク",
    description:
      "桜と近未来技術をまとったサイバー九尾。華やかで美しい外見とは裏腹に、中身はかなり自由で騒がしい。",
    image: "images/sakuraviel.png"
  }
};

// 選んだキャラクターを表示する
function showCharacter(characterId) {
  const character = characters[characterId];

  if (!character) {
    console.error("キャラクターが見つかりません。");
    return;
  }

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

  document.getElementById("character-group").textContent =
    character.group;

  document.getElementById("character-motif").textContent =
    character.motif;

  document.getElementById("character-description").textContent =
    character.description;

  const characterImage =
    document.getElementById("character-image");

  characterImage.src = character.image;
  characterImage.alt = `${character.nameJp}の立ち絵`;
}