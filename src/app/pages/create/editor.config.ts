export const editorConfig = {
  base_url: '/tinymce',
  suffix: '.min',
  height: '100%',
  plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
  imagetools_cors_hosts: ['picsum.photos'],
  menubar: 'file edit view insert format tools table help',
  toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
  toolbar_sticky: true,
  resize: false,
  image_advtab: true,
  link_list: [
    {title: 'My page 1', value: 'https://www.tiny.cloud'},
    {title: 'My page 2', value: 'http://www.moxiecode.com'}
  ],
  image_list: [
    {title: 'My page 1', value: 'https://www.tiny.cloud'},
    {title: 'My page 2', value: 'http://www.moxiecode.com'}
  ],
  image_class_list: [
    {title: 'None', value: ''},
    {title: 'Some class', value: 'class-name'}
  ],
  file_picker_types: 'image',
  importcss_append: true,
  templates: [
    {
      title: 'New Table',
      description: 'creates a new table',
      content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>'
    },
    {title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...'},
    {
      title: 'New list with dates',
      description: 'New List with dates',
      content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>'
    }
  ],
  template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
  template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
  image_caption: true,
  quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
  noneditable_noneditable_class: 'mceNonEditable',
  toolbar_mode: 'sliding',
  contextmenu: 'link image imagetools table',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
  allow_unsafe_link_target: true,
  valid_elements: '*[*]',
}
