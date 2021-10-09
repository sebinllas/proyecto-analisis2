const saveButton = document.getElementById('saveButton');
const msgTexArea = document.getElementById('mesaage-textarea')
var editor = new EditorJS({
  readOnly: false,
  holder: 'editorjs',
  placeholder: 'Dí algo a tu clase',
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
    
  }
});

saveButton.addEventListener('click', function () {
  editor.save()
    .then((savedData) => {
      console.log('datos a guardar: ',savedData);
      msgTexArea.innerText = JSON.stringify(savedData)

    })
    .catch((error) => {
      console.error('Saving error', error);
    });
});