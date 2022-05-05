<script>
import folderIcon from '@/assets/icons/folder.png'
import pdfIcon from '@/assets/icons/pdf.png'
import textIcon from '@/assets/icons/txt.png'
import docxIcon from '@/assets/icons/docx.png'
import unverifyIcon from '@/assets/icons/unverify.jpg'
import zipIcon from '@/assets/icons/zip.png'
import htmlIcon from '@/assets/icons/html.png'
import mp3Icon from '@/assets/icons/mp3.png'
export default {
  data(){
    return {
      folderIcon,
      pdfIcon,
      textIcon,
      docxIcon,
      unverifyIcon,
      zipIcon,
      htmlIcon,
      mp3Icon
    }
  },
  computed:{
    types(){
      return [
        {
          type:'folder',
          icon: this.folderIcon
        },
        {
          type:'image',
          icon:''
        },
        {
          type:'pdf',
          icon:this.pdfIcon
        },
        {
          type:'text',
          icon:this.textIcon
        },
        {
          type:'docx',
          icon:this.docxIcon
        },
        {
          type:'zip',
          icon:this.zipIcon
        },
        {
          type:'html',
          icon:this.htmlIcon
        },
        {
          type:'mp3',
          icon:this.mp3Icon
        },
      ]
    }
  },
}
</script>
