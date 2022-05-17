<template>
  <div>
    <VueFileAgent
     ref="vueFileAgent"
    :theme="'grid'"
    :multiple="true"
    :deletable="true"
    :accept="'image/*,.zip,.pdf'"
    :maxSize="'10MB'"
    :maxFiles="10"
    :helpText="'Choose images or zip files'"
    :errorText="{
      type: 'Invalid file type. Only images or zip Allowed',
      size: 'Files should not exceed 10MB in size',
    }"
    :uploadUrl="uploadUrl"
    v-model="fileRecords"></VueFileAgent>
  </div>
</template>
<script>
export default {
  data(){
    return {
      fileRecords: [],
      uploadUrl: 'https://example.com',
    }
  }
}
</script>
