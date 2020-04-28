import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TinyMCE({ value, init, onChange, name }) {
  const onType = (string) => onChange({ target: { value: string, name }});

  return (
    <Editor
      initialValue={init || value}
      init={{
        height: 300,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help'
      }}
      value={value}
      onEditorChange={onType}
    />
  )
}
