var editor = new EditorJS({
  readOnly: false,
  holder: 'editorjs',
  tools: {
    header: {
      class: Header,
      inlineToolbar: ['marker', 'link'],
      config: {
        placeholder: 'Header'
      },
      shortcut: 'CMD+SHIFT+H'
    },
    image: SimpleImage,
    list: {
      class: List,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+L'
    },
    checklist: {
      class: Checklist,
      inlineToolbar: true,
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
    warning: Warning,
    marker: {
      class: Marker,
      shortcut: 'CMD+SHIFT+M'
    },
    code: {
      class: CodeTool,
      shortcut: 'CMD+SHIFT+C'
    },
    delimiter: Delimiter,
    inlineCode: {
      class: InlineCode,
      shortcut: 'CMD+SHIFT+C'
    },
    linkTool: LinkTool,
    embed: Embed,
    table: {
      class: Table,
      inlineToolbar: true,
      shortcut: 'CMD+ALT+T'
    },
  },
  onReady: function () {
    saveButton.click();
  },
  onChange: function (api, block) {
    console.log('something changed', block);
  }
});
const saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', function () {
  editor.save()
    .then((savedData) => {
      console.log('datos a guardar: ',savedData);
      fetch('/post/3', {
        method: 'POST',
        body: JSON.stringify({ message: { savedData } })
      }).then(function (response) {
        if (response.ok) {
          console.log(response);
        } else {
          throw "Error en la llamada Ajax";
        }

      })
        .then(function (texto) {
          console.log(texto);
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch((error) => {
      console.error('Saving error', error);
    });
});