const msgTexArea = document.getElementById('mesaage-textarea');
const submitBtn = document.getElementById("submit-btn");
const messageForm = document.getElementById('post-form');

var editor = new EditorJS({
  readOnly: false,
  holder: 'editorjs',
  placeholder: 'Dí algo a tu clase',
  tools: {
    header: {
      class: Header,
      shortcut: 'CMD+SHIFT+H'
    },
    image: SimpleImage,
    list: {
      class: List,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+L'
    },
    quote: {
      class: Quote,
      inlineToolbar: true,
      config: {
        quotePlaceholder: 'Enter a quote',
        captionPlaceholder: 'Quote\'s author',
      },
      shortcut: 'CMD+SHIFT+O'
    },
    delimiter: Delimiter,
    inlineCode: {
      class: InlineCode,
      shortcut: 'CMD+SHIFT+C'
    },
  },
  onChange: function (api, block) {
    editor.save()
    .then((savedData) => {
      msgTexArea.innerText = JSON.stringify(savedData)
    })
  }
});

submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  editor.save()
    .then((savedData) => {
      console.log('datos a guardar: ',savedData);
      msgTexArea.innerText = JSON.stringify(savedData)
      messageForm.submit();

    })
    .catch((error) => {
      console.error('Saving error', error);
    });
});