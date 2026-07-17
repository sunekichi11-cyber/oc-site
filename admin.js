const inputs = {
  id: document.getElementById("character-id"),
  name: document.getElementById("character-name"),
  nameJp: document.getElementById(
    "character-name-jp-input"
  ),
  gender: document.getElementById(
    "character-gender-input"
  ),
  height: document.getElementById(
    "character-height-input"
  )
};

const preview = {
  id: document.getElementById("preview-id"),
  name: document.getElementById("preview-name"),
  nameJp: document.getElementById(
    "preview-name-jp"
  ),
  gender: document.getElementById(
    "preview-gender"
  ),
  height: document.getElementById(
    "preview-height"
  )
};

function getValue(input, fallback) {
  const value = input.value.trim();

  if (value === "") {
    return fallback;
  }

  return value;
}

function updatePreview() {
  preview.id.textContent = getValue(
    inputs.id,
    "未入力"
  );

  preview.name.textContent = getValue(
    inputs.name,
    "Character Name"
  );

  preview.nameJp.textContent = getValue(
    inputs.nameJp,
    "キャラクター名"
  );

  preview.gender.textContent = getValue(
    inputs.gender,
    "未入力"
  );

  preview.height.textContent = getValue(
    inputs.height,
    "未入力"
  );
}

Object.values(inputs).forEach((input) => {
  input.addEventListener("input", updatePreview);
});

const generateCodeButton = document.getElementById(
  "generate-code-button"
);

const copyCodeButton = document.getElementById(
  "copy-code-button"
);

const generatedCodeElement = document.getElementById(
  "generated-code"
);

const copyMessageElement = document.getElementById(
  "copy-message"
);

function escapeJavaScriptString(value) {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll('"', '\\"')
    .replaceAll("\n", "\\n");
}

function createCharacterCode() {
  const characterId = getValue(
    inputs.id,
    "newCharacter"
  );

  const characterName = getValue(
    inputs.name,
    "Character Name"
  );

  const characterNameJp = getValue(
    inputs.nameJp,
    "キャラクター名"
  );

  const characterGender = getValue(
    inputs.gender,
    "不明"
  );

  const characterHeight = getValue(
    inputs.height,
    "不明"
  );

  const safeId = characterId
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "");

  const finalId =
    safeId === ""
      ? "newCharacter"
      : safeId;

  return `${finalId}: {
  name: "${escapeJavaScriptString(characterName)}",
  nameJp: "${escapeJavaScriptString(characterNameJp)}",
  gender: "${escapeJavaScriptString(characterGender)}",
  height: "${escapeJavaScriptString(characterHeight)}"
}`;
}

function generateCode() {
  const generatedCode = createCharacterCode();

  generatedCodeElement.textContent = generatedCode;

  copyMessageElement.textContent =
    "コードを生成しました！";
}

async function copyGeneratedCode() {
  const code = generatedCodeElement.textContent;

  if (
    code === "" ||
    code === "まだコードは生成されていません。"
  ) {
    copyMessageElement.textContent =
      "先にコードを生成してください！";

    return;
  }

  try {
    await navigator.clipboard.writeText(code);

    copyMessageElement.textContent =
      "コードをコピーしました！";
  } catch (error) {
    copyMessageElement.textContent =
      "コピーできませんでした。コードを長押ししてコピーしてください。";

    console.error(error);
  }
}

generateCodeButton.addEventListener(
  "click",
  generateCode
);

copyCodeButton.addEventListener(
  "click",
  copyGeneratedCode
);

updatePreview();