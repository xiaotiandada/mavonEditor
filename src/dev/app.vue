<template>
  <div id="app">
      <mavon-editor
        ref="md"
        :subfield="subfield"
        :toolbarsFlag="toolbarsFlag"
        :editable="editable"
        :language="d_language"
        @change="change"
        @save="saveone"
        :ishljs="true"
        class="item-editor"
        v-model="help1"
        :autofocus="autofocus"
        :shortCut="true"
        :externalLink="external_link"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
        @subfieldtoggle="$subfieldtoggle"
        @previewtoggle="$previewtoggle"
        :imageFilter="image_filter"
        :scrollStyle="true"
        :transition="true"
        imageUploadAction="customize"
        :imageUploadFn="imageUploadFn"
      >
      </mavon-editor>
  </div>
</template>

<script type="text/ecmascript-6">
// import {CONFIG} from './assets/config.js'
import {CONFIG} from '../lib/config.js'
import axios from 'axios'
import {mavonEditor} from '../index'
import { uploadImage } from '../lib/image_upload'
export default {
    name: 'app',
    data () {
        return {
            d_language: 'zh-CN',
            help1: '',
            help2: '',
            d_words: {},
            screen_phone: false,
            toolbars: {
                underline: true, // 下划线
                strikethrough: true, // 中划线
                alignCenter: true, // 中划线
                undo: true,
                save: true,
                fullscreen: true, // 全屏编辑
                navigation: true,
                preview: true,
                subfield: false
            },
            autofocus: true,
            subfield: true,
            editable: true,
            toolbarsFlag: true,
            img_file: {},
            external_link: {
                markdown_css: function() {
                    return '/markdown/github-markdown.min.css';
                },
                hljs_js: function() {
                    return '/highlightjs/highlight.min.js';
                },
                hljs_css: function(css) {
                    return '/highlightjs/styles/' + css + '.min.css';
                },
                hljs_lang: function(lang) {
                    return '/highlightjs/languages/' + lang + '.min.js';
                },
                katex_css: function() {
                    return '/katex/katex.min.css';
                },
                katex_js: function() {
                    return '/katex/katex.min.js';
                }
            },
            toolbar_settings: {
                undo: true, // 上一步
                redo: true, // 下一步
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                code: true, // code
                readmodel: true, // 沉浸式阅读
                htmlcode: true, // 展示html源码
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: true, // 单双栏模式
                preview: true, // 预览
                /* 1.4.2 */
                navigation: true // 导航目录
            },
            image_filter: function($files) {
                console.log('image_filter files:', $files);
                // console.log('here for you', $files);
                return true;
            },
            imageClick: function (file) {
                console.log(file);
            },
            imgName: ''
        }
    },
    created () {
        var $vm = this;
        this.initLanguage();
        this.sizeToStatus()
        window.addEventListener('resize', function() {
            // 媒介查询
            $vm.sizeToStatus()
        })
    },
    mounted() {
        var md = this.$refs.md;
        var toolbar_left = md.$refs.toolbar_left;
        var diy = this.$refs.diy;
        toolbar_left.$el.append(diy)
        // toolbar_left.$el.append(diy.$el)
        // console.log(toolbar_left)

        const clientHeight = document.body.clientHeight || document.documentElement.clientHeight
        document.querySelector('.item-editor').style.height = clientHeight + 'px'
    },
    methods: {
        async imageUploadFn(file) {
           try {
            const res = await uploadImage(file, 'https://apitest.smartsignature.io/oss/uploadImage?folder=article', {
                key: 'x-access-token',
                value: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI5NTI4MjIzOTlAcXEuY29tIiwiZXhwIjoxNTg4MjI5NTI1NTcwLCJwbGF0Zm9ybSI6ImVtYWlsIiwiaWQiOjEwNTN9.GuZjE7JfnqODw5caehhIoZG4-af3g1WBaoEm9FzXJOo'
            })
            if (res.status === 200 && res.data.code === 0) {
                return 'https://ssimg.frontenduse.top' + res.data.data
            } else {
                console.log(res.data.message)
            }
            return
           } catch (e) {
            console.log(e)
           }
        },
        clearCache() {
            this.$refs.md.$emptyHistory()
        },
        $click(val) {
            // console.log(val);
        },
        imgreplace($e) {
            console.log('here');
            this.$refs.md.$imglst2Url([
                [0, 'https://raw.githubusercontent.com/hinesboy/mavonEditor/master/img/cn/cn-common.png'],
                [1, 'https://raw.githubusercontent.com/hinesboy/mavonEditor/master/img/cn/cn-common.png']
            ]);
        },
        uploadimg($e) {
            console.log(this.img_file);
            for (var _img in this.img_file) {
                this.$refs.md.$img2Url(_img, 'https://raw.githubusercontent.com/hinesboy/mavonEditor/master/img/cn/cn-common.png')
            }
            /* var formdata = new FormData();
            for (var _img in this.img_file) {
                formdata.append(_img, this.img_file[_img]);
                // _imglst.push([_img, this.img_file[_img]]);
            }
            axios({
                url: 'http://127.0.0.1/index.php',
                method: 'post',
                data: formdata,
                headers: {'Content-Type': 'multipart/form-data'},
            }).then((res) => {
                console.log(res);
            }) */
        },
        $imgAdd(pos, $file) {
            console.log('imgAdd', pos, $file);
            this.img_file[pos] = $file;
            // console.log(this.$refs.md.$refs.toolbar_left.$imgDelByFilename(pos));
            // console.log(this.$refs.md.$refs.toolbar_left.$imgAddByFilename('./test', $file))
            // console.log(this.$refs.md.$refs.toolbar_left.$imgUpdateByFilename('./test', $file))
            // console.log(this.$refs.md.$refs.toolbar_left.$imgAddByFilename('./test', $file))
            // console.log(this.$refs.md);
            // this.$refs.md.$imgUpdateByUrl(pos, 'http://pic.58pic.com/58pic/13/46/50/61758PICWZY_1024.jpg');
        },
        $imgDel(pos) {
            console.log('imgDel', pos);
            delete this.img_file[pos];
        },
        sizeToStatus () {
            if (window.matchMedia('(min-width:768px)').matches) {
                // > 768
                this.screen_phone = false
            } else {
                // <  768
                this.screen_phone = true
            }
        },
        saveone (val, render) {
            alert('save one')
        },
        savetwo (val, render) {
            alert('save two')
        },
        change (val, render) {
            // console.log(val)
        },
        opchange (event) {
            this.d_language = event.target.value;
        },
        initLanguage() {
            this.d_words = CONFIG[`words_${this.d_language}`]
            this.help1 = CONFIG[`help_${this.d_language}`]
            this.help2 = CONFIG[`help_${this.d_language}`]
        },
        $subfieldtoggle(flag , value) {
            console.log('sufield toggle' + flag)
        },
        $previewtoggle(flag , value) {
            console.log('preview toggle' + flag)
        },
        imgdelete() {
            var md = this.$refs.md;
            var toolbar_left = md.$refs.toolbar_left;
            toolbar_left.$imgDelByFilename(this.imgName);
        }
    },
    watch: {
        d_language: function () {
            this.initLanguage();
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
body
    margin 0
    padding 0
html, body, #app {
    height 100%
}
.item-editor
    width 100%
    height 800px
</style>
