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

updatePreview();