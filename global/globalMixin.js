import Vue from 'vue'
Vue.mixin({
    data() {
        return {
            select_addOn: { name: 'All', id: 0 }
        }
    },
    methods: {
        getIds(items) {
            return items.map((item) => {
                    return item.id;
                })
                .join(",");
        },
        successNotification(items = [], action = '', suffixSingular = '', suffixPlural = '', key = '') {
            if (items.length > 1) {
                this.$awn.success(`Successfully ${action} <strong>${items.length}</strong> ${suffixPlural}`)
            } else {
                let selectedItem = items.constructor === Array ? items[0] : items
                this.$awn.success(`Successfully ${action} ${suffixSingular} <strong>${selectedItem[key]}</strong>.`)
            }
        },
        successDeleteNotification(action = '') {
            this.$awn.success(`Successfully ${action} <strong> documents </strong> `)
        },
        successdocumentsNotification(message = '') {
            this.$awn.success(`Successfully ${message} <strong> documents </strong> `)
        },
        successfeedbackNotification(message = '') {
            this.$awn.success(`Successfully ${message} <strong> feedback </strong> `)
        },

        successCoachSchedNotification(type = '', message = '') {
            this.$awn.success(`Successfully ${type} ${message} `)
        },
        ErrorCoachSchedNotification(message = '') {
            this.$awn.warning(` ${message} `)
        },

        ErrorFileTooBigNotification(filename) {
            this.$awn.warning(`This file  <strong> ${filename} </strong> is greater than 5mb`)
        },

        successDeleteCall(message = '') {
            this.$awn.success(`${message} `)
        },

        chatNotification(message = '', name = '') {
            this.$awn.success(`${name} Successfully ${message}`)
        },

        errorNotification(error) {
            this.$awn.alert(`Failed: ${error}`)
        },
        fullNotification(message) {
            this.$awn.success(`${message}`)
        },
        goTo(name, params = {}) {
            this.$router.push({ name: name, params: params })
        },
        cloneVariable(value) {
            if (typeof value != 'object') return
            return JSON.parse(JSON.stringify(value))
        },
        showPrice(price = '') {
            if (!price) price = 0
            return `${price.toFixed(2)} ???`
        },
        imageUrl(folder, id, filename) {
            const url = this.$imageUrl + folder + '/' + id + '/' + filename
            return url;
        },
        imageUrl2(folder, id, filename) {
            const url = this.$imageUrl2 + folder + '/' + id + '/' + filename
            return url;
        },
        download(data, payload) {
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', payload.file_name);
            document.body.appendChild(link);

            link.click();
        },
        downloadClientPhoto(data, payload) {

            const getExt = payload.file_name.split(".");
            const url = window.URL.createObjectURL(new Blob([data.data]));
            const link = document.createElement('a');
            link.href = url;
            // link.setAttribute('download', payload.file_name);
            link.setAttribute('download', payload.title + '.' + getExt[1]);
            document.body.appendChild(link);

            link.click();
        },

        colorStatus(value) {
            switch (value) {
                case '1':
                    // code block
                    return 'primary'
                case '2':
                    // code block
                    return 'accent'
                case '3':
                    // code block
                    return 'info'
                case '4':
                    // code block
                    return 'warning'
                case '5':
                    return 'error'
                default:
                    return 'gray'
            }
        }

    }
})