<template>
<div class="v-left-item">
    <div>
        <slot name="left-toolbar-before" />
        <button :disabled="!editable" type="button" v-if="toolbars.bold" @click="$clicks('bold')"
                class="op-icon fa fa-mavon-bold" aria-hidden="true"
                :title="`${d_words.tl_bold} (ctrl+b)`"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.italic" @click="$clicks('italic')"
                class="op-icon fa fa-mavon-italic" aria-hidden="true"
                :title="`${d_words.tl_italic} (ctrl+i)`"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.strikethrough" @click="$clicks('strikethrough')"
                class="op-icon fa fa-mavon-strikethrough"
                :title="`${d_words.tl_strikethrough} (ctrl+shift+d)`" aria-hidden="true"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.header" @click="$clicks('header')"
                class="op-icon fa fa-mavon-header" aria-hidden="true"
                :title="`${d_words.tl_header} (ctrl+h)`"></button>
        <span v-if="toolbars.header || toolbars.italic || toolbars.bold || toolbar.strikethrough" class="op-icon-divider"></span>
        <button :disabled="!editable" type="button" v-if="toolbars.code" @click="$clicks('code')"
                class="op-icon fa fa-mavon-code" aria-hidden="true"
                :title="`${d_words.tl_code} (ctrl+alt+c)`"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.quote" @click="$clicks('quote')"
                class="op-icon fa fa-mavon-quote-left" aria-hidden="true"
                :title="`${d_words.tl_quote} (ctrl+q)`"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.ol" @click="$clicks('ol')"
                class="op-icon fa fa-mavon-list-ol" aria-hidden="true"
                :title="`${d_words.tl_ol} (ctrl+o)`"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.ul" @click="$clicks('ul')"
                class="op-icon fa fa-mavon-list-ul" aria-hidden="true"
                :title="`${d_words.tl_ul} (ctrl+alt+u)`"></button>
        <button :disabled="!editable" type="button" v-if="toolbars.task" @click="$clicks('task')"
                class="op-icon icon-btn" aria-hidden="true">
                <svg t="1587552064824" class="task-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7961" width="200" height="200"><path d="M896 64H128a64 64 0 0 0-64 64v768a64 64 0 0 0 64 64h768a64 64 0 0 0 64-64V128a64 64 0 0 0-64-64z m-162.368 292.16l-223.36 358.784a44.864 44.864 0 0 1-35.904 20.928c-0.576 0.128-1.344 0.128-1.984 0.128a44.992 44.992 0 0 1-35.648-17.664L292.608 537.472a44.608 44.608 0 0 1 71.104-53.888l105.088 129.152 189.248-303.744a44.544 44.544 0 1 1 75.584 47.168z" p-id="7962" fill="#ccc"></path></svg>
                </button>
        <span v-if="toolbars.code || toolbars.quote || toolbars.ol || toolbar.ul || toolbar.task" class="op-icon-divider"></span>
        <button :disabled="!editable" type="button" v-if="toolbars.link" @click.stop="$clicks('link')"
                class="op-icon fa fa-mavon-link" aria-hidden="true"
                :title="`${d_words.tl_link} (ctrl+l)`"></button>
                <!-- @click.stop="$clicks('imagelink')" -->
        <button :disabled="!editable" type="button" v-if="toolbars.imagelink" @click.stop="defaultImageUpload"
                class="image op-icon fa fa-mavon-picture-o" aria-hidden="true">
            <input v-if="imageUploadAction !== 'default'" id="file" class="image-file" type="file" accept="image/*" @change="$upload($event)" multiple="multiple"/>
        </button>
        <button :disabled="!editable" type="button" v-if="toolbars.line" @click.stop="$clicks('line')"
                class="op-icon icon-btn" aria-hidden="true">
                <svg t="1587552973767" class="line-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10053" width="200" height="200"><path d="M904 476H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" p-id="10054" fill="#ccc"></path></svg>
        </button>
        <slot name="left-toolbar-after"></slot>
    </div>
    <div>
        <button :disabled="!editable" type="button" @click.stop="$clickToggle('edit')"
            class="op-icon icon-btn" aria-hidden="true">
            <svg t="1587538645109" class="edit-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3796" width="200" height="200"><path d="M64.5 927.7c-3.7 18.7 13.1 35.5 31.8 31.8l203.8-48.6c7.5-1.9 13.1-5.6 16.8-9.3l3.7-3.7c3.7-3.7 5.6-16.8-1.9-24.3L150.5 705.2c-7.5-7.5-20.6-5.6-24.3-1.9l-3.7 3.7c-5.6 5.6-7.5 11.2-9.3 16.8L64.5 927.7z m635.7-794.6c-7.5 7.5-7.5 18.7 0 26.2l164.5 164.5c7.5 7.5 18.7 7.5 26.2 0l46.7-46.7c29.9-28 29.9-72.9 0-102.8l-87.9-87.9c-29.9-29.9-76.7-29.9-106.6 0l-42.9 46.7zM202.8 651l166.4 166.4c7.5 7.5 18.7 7.5 26.2 0l415.1-416.9c7.5-7.5 7.5-18.7 0-26.2L645.9 209.8c-7.5-7.5-18.7-7.5-26.2 0L202.8 626.7c-7.4 7.5-7.4 18.7 0 24.3z" p-id="3797" fill="#ccc"></path></svg>
        </button>

        <button :disabled="!editable" type="button" @click.stop="$clickToggle('compared')"
            class="op-icon fa fa-mavon-columns" aria-hidden="true"></button>
    </div>
</div>
</template>
<script type="text/ecmascript-6">
import { uploadImage } from '../lib/image_upload'
export default {
    name: 's-md-toolbar',
    props: {
        editable: { // 是否开启编辑
            type: Boolean,
            default: true
        },
        transition: { // TODO: 是否开启动画过渡
            type: Boolean,
            default: true
        },
        toolbars: { // 工具栏
            type: Object,
            required: true
        },
        d_words: {
            type: Object,
            required: true
        },
        image_filter: {
            type: Function,
            default: null
        },
        // 上传图片动作
        // default 默认行为是写入markdown标签
        // customize 根据自定义的路径上传图片
        imageUploadAction: {
            type: String,
            default: 'default'
            // default: 'customize'
        },
        // 图片上传方法
        imageUploadFn: {
            type: Function,
            default: () => {}
        }
    },
    data() {
        return {
            // [index, file]
            img_file: [[0, null]],
            img_timer: null,
            header_timer: null,
            s_img_dropdown_open: false,
            s_header_dropdown_open: false,
            s_img_link_open: false,
            trigger: null,
            num: 0,
            link_text: '',
            link_addr: '',
            link_type: 'link'
        }
    },
    created() {
        // 删除莫名其妙出现的undefined hack...
        this.$nextTick(() => {
            const itemNodes = document.querySelector('.v-left-item').childNodes
            if (itemNodes[itemNodes.length - 1].textContent === 'undefined') {
                itemNodes[itemNodes.length - 1].remove()
            }
        })
    },
    methods: {
        $imgLinkAdd() {
            this.$emit('toolbar_left_addlink', this.link_type, this.link_text, this.link_addr);
            this.s_img_link_open = false;
        },
        $toggle_imgLinkAdd(type) {
            this.link_type = type;
            this.link_text = this.link_addr = '';
            this.s_img_link_open = true;
            this.$nextTick(() => {
                this.$refs.linkTextInput.focus()
            })
            this.s_img_dropdown_open = false;
        },
        $imgFileListClick(pos) {
            this.$emit('imgTouch', this.img_file[pos]);
        },
        $changeUrl(index,url) {
            this.img_file[index][0] = url;
        },
        $imgFileAdd($file) {
            // this.img_file[0][0] = this.num;
            // this.img_file[0][1] = $file;
            // this.img_file.unshift([(this.num + 1), null]);
            // this.num = this.num + 1;
            this.img_file.push([++this.num, $file])
            this.$emit('imgAdd', this.num, $file);
            this.s_img_dropdown_open = false;
        },
        $imgFilesAdd($files) {
            // valid means if the image_filter exist.
            let valid = (typeof this.image_filter === 'function');
            for (let i = 0; i < $files.length; i++) {
                if (valid && this.image_filter($files[i]) === true) {
                    this.$imgFileAdd($files[i]);
                } else if (!valid && $files[i].type.match(/^image\//i)) {
                    this.$imgFileAdd($files[i]);
                }
            }
        },
        $imgAdd($e) {
            this.$imgFilesAdd($e.target.files);
            $e.target.value = ''; // 初始化
        },

        async $upload($e) {
            // 如果是默认行为 阻止
            if (this.imageUploadAction === 'default') return

            let files = [...$e.target.files]

            console.log('file', files)
            // hack file 无法选择同一文件bug
            document.querySelector('#file').setAttribute("type", "text");

            // 遍历所有文件
            for (let i = 0, l = files.length; i < l; i++) {
                const res = await this.imageUploadFn(files[i])
                // 如果有结果
                if (res) {
                    this.$emit('toolbar_left_click', 'imagelink', {
                        action: this.imageUploadAction, // default customize
                        url: res,
                        title: files[i].name || ''
                    });
                }
            }
            // hack file 无法选择同一文件bug
            document.querySelector('#file').setAttribute("type", "file");
        },
        // 图片图片上传
        defaultImageUpload() {
            if (this.imageUploadAction === 'default') {
                this.$emit('toolbar_left_click', 'imagelink', {
                    action: this.imageUploadAction
                })
            }
        },
        $imgDel(pos) {
            this.$emit('imgDel', this.img_file[pos]);
            this.img_file.splice(pos, 1);
            this.num--;

            this.s_img_dropdown_open = false;
        },
        isEqualName(filename, pos) {
            if (this.img_file[pos][1]) {
                if (this.img_file[pos][1].name == filename || this.img_file[pos][1]._name == filename) {
                    return true
                }
            }
            return false
        },
        $imgDelByFilename(filename) {
            var pos = 0;
            while (this.img_file.length > pos) {
                if (this.img_file[pos][1] == filename || this.isEqualName(filename, pos)) {
                    this.$imgDel(pos);
                    return true;
                }
                pos += 1;
            }
            return false;
        },
        $imgAddByFilename(filename, $file) {
            for (var i = 0; i < this.img_file.length; i++)
                { if (this.img_file[i][0] == filename) return false; }
            this.img_file[0][0] = filename;
            this.img_file[0][1] = $file;
            this.img_file[0][2] = filename;
            this.img_file.unshift(['./' + (this.num), null])
            this.$emit('imgAdd', this.img_file[1][0], $file, false);
            return true;
        },
        $imgAddByUrl(filename, $url) {
            for (var i = 0; i < this.img_file.length; i++)
                { if (this.img_file[i][0] == filename) return false; }
            this.img_file[0][0] = filename;
            this.img_file[0][1] = $url;
            this.img_file.unshift(['./' + (this.num), null])
            return true;
        },
        $imgUpdateByFilename(filename, $file) {
            for (var i = 0; i < this.img_file.length; i++) {
                if (this.img_file[i][0] == filename || this.isEqualName(filename, i)) {
                    this.img_file[i][1] = $file;
                    this.$emit('imgAdd', filename, $file, false);
                    return true;
                }
            }
            return false;
        },
        // 工具栏功能图标click-----------------
        $mouseenter_img_dropdown() {
            if (this.editable) {
                clearTimeout(this.img_timer)
                this.s_img_dropdown_open = true
            }
        },
        $mouseleave_img_dropdown() {
            let vm = this
            this.img_timer = setTimeout(function() {
                vm.s_img_dropdown_open = false
            },200)
        },
        $mouseenter_header_dropdown() {
            if (this.editable) {
                clearTimeout(this.header_timer)
                this.s_header_dropdown_open = true
            }
        },
        $mouseleave_header_dropdown() {
            let vm = this
            this.header_timer = setTimeout(function() {
                vm.s_header_dropdown_open = false
            },200)
        },
        $clicks(_type) {
            // 让父节点来绑定事件并
            if (this.editable) {
                this.$emit('toolbar_left_click', _type);
            }
        },
        $clickToggle(_type) {
            // 让父节点来绑定事件并
            if (this.editable) {
                this.$emit('toolbar_toggle_click', _type);
            }
        },
        $click_header(_type) {
            // 让父节点来绑定事件并
            this.$emit('toolbar_left_click', _type);
            this.s_header_dropdown_open = false
        },
        handleClose(e) {
            this.s_img_dropdown_open = false;
        }
    }
}
</script>
<style lang="stylus" scoped>
    .op-icon.dropdown-wrapper.dropdown
        position relative
        &[type=button]
            -webkit-appearance unset
        .popup-dropdown
            position absolute
            display block
            background #fff
            top 32px
            left -45px
            min-width 130px
            z-index 1600
            border 1px solid #ebeef5
            border-radius 4px
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
            .dropdown-item:first-child
                border-top-left-radius 3px
                border-top-right-radius 3px
            .dropdown-item:last-child
                border-bottom-left-radius 3px
                border-bottom-right-radius 3px
            &.op-header
                left -30px
                min-width 90px
            &.fade-enter-active, &.fade-leave-active
                opacity 1
            &.fade-enter, &.fade-leave-active
                opacity 0
            &.transition
              &, .dropdown-item
                transition all 0.2s linear 0s
        .dropdown-item
            height 40px
            line-height @height
            font-size 14px
            color #606266
            position relative
            &:hover
                color #303133
                background-color #e9e9eb
            input
                position absolute
                font-size 100px
                right 0
                top 0
                opacity 0
                cursor pointer
        .dropdown-images
            box-sizing border-box
            button
                position absolute
                top -1px
                right 5px
                font-size: 14px
                &:hover
                    color #F56C6C
                    background-color: transparent
            span
                display inline-block
                width 80px
                white-space nowrap
                overflow hidden
                text-overflow ellipsis
            &:hover
                .image-show
                    display block !important
            .image-show
                display none
                position absolute
                left -128px
                top 0
                width 120px
                height 90px
                object-fit contain
                border 1px solid #F2F6FC
                &.transition
                    transition all 0.2s linear 0s
            &.transition
                transition all 0.2s linear 0s
.add-image-link-wrapper
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    background rgba(0, 0, 0, 0.7)
    z-index 1600
    transition all 0.1s linear 0s
    &.fade-enter-active, &.fade-leave-active
        opacity 1
    &.fade-enter, &.fade-leave-active
        opacity 0
    .add-image-link
        position fixed
        box-sizing border-box
        text-align center
        width 24%
        left 38%
        @media only screen and (max-width 1500px)
            width 34%
            left 33%
        @media only screen and (max-width 1000px)
            width 50%
            left 25%
        @media only screen and (max-width 600px)
            width 80%
            left 10%
        height auto
        padding 40px
        top 25%
        transition all 0.1s linear 0s
        z-index 3
        background #fff
        border-radius 2px

        i
            font-size 24px
            position absolute
            right 8px
            top 6px
            color rgba(0, 0, 0, 0.7)
            cursor pointer
        .title
            font-size 20px
            margin-bottom 30px
            margin-top 10px
            font-weight 500 !important
        .input-wrapper
            margin-top 10px
            width 80%
            border  1px solid #eeece8
            text-align left
            margin-left 10%
            height 35px
            input
                height 32px
                line-height 32px
                font-size 15px
                width 90%
                margin-left 8px
                border none
                outline none
        .op-btn
            width 100px
            height 35px
            display inline-block
            margin-top 30px
            cursor pointer
            text-align center
            line-height @height
            opacity 0.9
            border-radius 2px
            letter-spacing 1px
            font-size 15px
        .op-btn.sure
            background #2185d0
            color #fff
            margin-left 5%
            &:hover
                opacity 1
        .op-btn.cancel
            border 1px solid #bcbcbc
            color #bcbcbc
            &:hover
                color #000

.task-icon,
.line-icon,
.edit-icon
    width: 1em
    height: 1em
    font-size: 16px

.icon-btn
    position: relative
    top: 2px
.task-icon
    position: absolute
    top: 6px
    left: 5px
.line-icon
    position: absolute
    top: 7px
    left: 6px
.edit-icon
    position: absolute
    top: 5px;
    left: 5px;

.v-left-item 
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
.image
    overflow hidden
    position relative
    cursor pointer
    .image-file
        position absolute
        top 0
        left 0
        bottom 0
        opacity 0
        cursor pointer
</style>
