<template>
<div class="v-left-item">
    <div class="toolbar-left">
        <div class="toolbar-btn">
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
            <span v-if="toolbars.header || toolbars.italic || toolbars.bold || toolbar.strikethrough" class="toolbar-line"></span>
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
            <span v-if="toolbars.code || toolbars.quote || toolbars.ol || toolbar.ul || toolbar.task" class="toolbar-line"></span>
            <button :disabled="!editable" type="button" v-if="toolbars.link" @click.stop="$clicks('link')"
                    class="op-icon fa fa-mavon-link" aria-hidden="true"
                    :title="`${d_words.tl_link} (ctrl+l)`"></button>
                    <!-- @click.stop="$clicks('imagelink')" -->
            <button :disabled="!editable" type="button" v-if="toolbars.imagelink" @click.stop="defaultImageUpload"
                    class="image op-icon fa fa-mavon-picture-o" aria-hidden="true">
                <input v-if="imageUploadAction !== 'default'" id="_toolbar-file" class="image-file" type="file" accept="image/*" @change="$upload($event)" multiple="multiple"/>
            </button>
            <button :disabled="!editable" type="button" v-if="toolbars.table" @click="$clicks('table')"
                    class="op-icon fa fa-mavon-table" aria-hidden="true"
                    :title="`${d_words.tl_table} (ctrl+alt+t)`"></button>
            <button :disabled="!editable" type="button" v-if="toolbars.line" @click.stop="$clicks('line')"
                    title="分割线"
                    class="op-icon icon-btn" aria-hidden="true">
                    <svg t="1587552973767" class="line-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10053" width="200" height="200"><path d="M904 476H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" p-id="10054" fill="#ccc"></path></svg>
            </button>
            <button :disabled="!editable" type="button" v-if="toolbars.encryption" @click.stop="$clickEncryption('encryption')"
                    title="插入加密内容"
                    class="op-icon icon-btn" aria-hidden="true">
                    <svg t="1587969444818" class="lock-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1130" width="200" height="200"><path d="M256 448V320a256 256 0 0 1 512 0v128h64a64 64 0 0 1 64 64v448a64 64 0 0 1-64 64H192a64 64 0 0 1-64-64V512a64 64 0 0 1 64-64h64z m224.448 346.688a29.248 29.248 0 0 0-0.448 5.312v64a32 32 0 0 0 64 0v-64a29.248 29.248 0 0 0-0.448-5.312 96 96 0 1 0-63.104 0zM512 192a128 128 0 0 0-128 128v128h256V320a128 128 0 0 0-128-128z" fill="#ccc" p-id="1131"></path></svg>
            </button>
            <slot name="left-toolbar-after"></slot>
        </div>
    </div>
    <div class="toolbar-right">
        <!-- 切换编辑语法的展示样式 -->
        <button :disabled="!editable" type="button" @click.stop="read_tags_display_mode = (read_tags_display_mode + 1) % 3"
                :title="read_mode_labels[read_tags_display_mode]"
                class="op-icon icon-btn" aria-hidden="true">
                <svg v-show="read_tags_display_mode === 0" width="16px" height="16px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path d="M24.6788126,1 C25.5141201,1 26.3189851,1.15753997 27.0933775,1.472469 C27.8678901,1.78742821 28.5552782,2.22047449 29.1556921,2.7716078 C29.7561059,3.32286188 30.2389528,3.96588093 30.604473,4.70075557 C30.9699632,5.43575095 31.1526183,6.22308857 31.1526183,7.06294959 L31.1526183,10.9475672 L27.9939833,10.9475672 L27.9939833,7.79794494 C27.9939833,6.69555755 27.685115,5.83818871 27.0672883,5.22565738 C26.4494915,4.61327696 25.6185373,4.30704146 24.5743954,4.30704146 C23.6345507,4.30704146 22.8775711,4.61327696 22.3032465,5.22565738 C21.7288919,5.83818874 21.4418498,6.69555755 21.4418498,7.79794494 L21.4418498,11 L18.1526183,11 L18.1526183,7.06294959 C18.1526183,6.22308857 18.3179505,5.43575092 18.6486149,4.70075557 C18.9792794,3.96588096 19.4361571,3.32286188 20.0191581,2.7716078 C20.602159,2.22047446 21.2895472,1.78742821 22.0813525,1.472469 C22.8731878,1.15753997 23.7389679,1 24.6788126,1 L24.6788126,1 Z M25.1526183,19.736675 L25.1526183,22.1208198 L25.1526183,23.4237986 C25.1526183,23.92271 25.0682484,24.3940742 24.8993248,24.837636 C24.7304318,25.2811979 24.4993119,25.6600364 24.205965,25.9741835 C23.9126182,26.2884901 23.5659997,26.5379457 23.1659561,26.7227101 C22.7659432,26.9076338 22.3259689,27 21.8459412,27 L8.3526293,27 C7.87260156,27 7.43707425,26.9122888 7.04592465,26.736675 C6.65486705,26.5610931 6.31705046,26.3208198 6.03256687,26.0158552 C5.74817529,25.7108905 5.53033494,25.3550718 5.37926054,24.9485266 C5.22818613,24.5418538 5.15261826,24.1076019 5.15261826,23.6455477 L5.15261826,14.8296926 C5.15261826,14.3122888 5.32598886,13.8778775 5.67260741,13.5267456 C6.01925662,13.1755819 6.42371648,13 6.88598696,13 L23.392629,13 C23.8904447,13 24.3081534,13.1755819 24.6459394,13.5267456 C24.9837253,13.8778775 25.1526183,14.3122888 25.1526183,14.8296926 L25.1526183,19.736675 L25.1526183,19.736675 Z" fill="#98c379" fill-rule="nonzero"></path>
                    <path d="M10.6045184,4 C11.5040803,4 12.370858,4.15753997 13.2048191,4.472469 C14.0389096,4.78742821 14.7791737,5.22047449 15.4257732,5.7716078 C16.0723728,6.32286188 16.5923617,6.96588093 16.9859989,7.70075557 C17.3796037,8.43575095 17.5763091,9.22308857 17.5763091,10.0629496 L17.5763091,13.9475672 L14.1747022,13.9475672 L14.1747022,10.7979449 C14.1747022,9.69555755 13.8420748,8.83818871 13.176723,8.22565738 C12.5114034,7.61327696 11.6165296,7.30704146 10.4920692,7.30704146 C9.47992866,7.30704146 8.66471986,7.61327696 8.0462165,8.22565738 C7.42768079,8.83818874 7.11855845,9.69555755 7.11855845,10.7979449 L7.11855845,14 L3.57630913,14 L3.57630913,10.0629496 C3.57630913,9.22308857 3.75435922,8.43575092 4.11045938,7.70075557 C4.46655954,6.96588096 4.95858174,6.32286188 5.58642893,5.7716078 C6.21427612,5.22047446 6.95454027,4.78742821 7.8072537,4.472469 C8.65999945,4.15753997 9.59237794,4 10.6045184,4 L10.6045184,4 Z M20.5763091,22.736675 L20.5763091,25.1208198 L20.5763091,26.4237986 C20.5763091,26.92271 20.4877208,27.3940742 20.310351,27.837636 C20.1330134,28.2811979 19.8903374,28.6600364 19.5823233,28.9741835 C19.274309,29.2884901 18.9103596,29.5379457 18.4903139,29.7227101 C18.0703003,29.9076338 17.6083273,30 17.1042982,30 L2.93632072,30 C2.4322916,30 1.97498793,29.9122888 1.56428084,29.736675 C1.15367036,29.5610931 0.798962948,29.3208198 0.500255175,29.0158552 C0.201644012,28.7108905 -0.0270883537,28.3550718 -0.185716478,27.9485266 C-0.344344602,27.5418538 -0.423690872,27.1076019 -0.423690872,26.6455477 L-0.423690872,17.8296926 C-0.423690872,17.3122888 -0.241651733,16.8778775 0.122297741,16.5267456 C0.486279409,16.1755819 0.910962262,16 1.39634627,16 L18.7283205,16 C19.2510269,16 19.6896211,16.1755819 20.0442963,16.5267456 C20.3989715,16.8778775 20.5763091,17.3122888 20.5763091,17.8296926 L20.5763091,22.736675 L20.5763091,22.736675 Z" fill="#ccc" fill-rule="nonzero"></path>
                </svg>
                <svg v-show="read_tags_display_mode === 1" width="16px" height="16px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path d="M23.2327502,1 C24.2213333,1 25.1738877,1.18543705 26.0903781,1.55613351 C27.0070106,1.92686549 27.8205317,2.43659531 28.5311191,3.08532295 C29.2417065,3.73419274 29.8131539,4.49107719 30.2457456,5.35608295 C30.6783018,6.22123083 30.8944733,7.14798969 30.8944733,8.13657274 L30.8944733,12.7090759 L27.1562414,12.7090759 L27.1562414,9.00172059 C27.1562414,7.70412316 26.790697,6.69493201 26.0595016,5.97393403 C25.3283416,5.25311368 24.3449106,4.89265021 23.1091729,4.89265021 C21.9968704,4.89265021 21.1009881,5.25311368 20.4212773,5.97393403 C19.7415309,6.69493205 19.4018176,7.70412316 19.4018176,9.00172059 L19.4018176,12.7707935 L15.5090253,12.7707935 L15.5090253,8.13657274 C15.5090253,7.14798969 15.7046953,6.2212308 16.0960354,5.35608295 C16.4873754,4.49107722 17.0280884,3.73419274 17.7180677,3.08532295 C18.408047,2.43659528 19.2215681,1.92686549 20.1586666,1.55613351 C21.0958005,1.18543705 22.1204477,1 23.2327502,1 L23.2327502,1 Z M23.1708905,22.0701115 L23.1708905,24.727024 L23.1708905,26.1790753 C23.1708905,26.7350666 23.0731443,27.2603591 22.8774387,27.7546684 C22.6817687,28.2489777 22.414006,28.6711588 22.0741506,29.0212472 C21.7342952,29.3715132 21.3327222,29.6495089 20.869254,29.8554119 C20.4058212,30.0614925 19.8960914,30.1644263 19.3399579,30.1644263 L3.70735528,30.1644263 C3.15122177,30.1644263 2.64664399,30.0666801 2.19347976,29.8709745 C1.74042212,29.6753045 1.34904656,29.4075418 1.01945965,29.0676864 C0.68997934,28.727831 0.437601597,28.3313034 0.262575174,27.8782458 C0.08754875,27.425046 -2.71782596e-13,26.9411118 -2.71782596e-13,26.4261945 L-2.71782596e-13,16.6017261 C-2.71782596e-13,16.0251266 0.200857569,15.5410148 0.60243059,15.1497103 C1.00403913,14.7583702 1.47262389,14.5627002 2.00818483,14.5627002 L21.1318647,14.5627002 C21.7086062,14.5627002 22.1925404,14.7583702 22.5838805,15.1497103 C22.9752205,15.5410148 23.1708905,16.0251266 23.1708905,16.6017261 L23.1708905,22.0701115 L23.1708905,22.0701115 Z" fill="#ccc" fill-rule="nonzero"></path>
                    <path d="M19.7896173,22.969573 L30.2699769,22.969573 C30.3584932,22.981196 30.4471403,22.9490747 30.5100122,22.882596 C30.5899648,22.882596 30.5899648,22.7956191 30.6699174,22.7956191 C30.8538888,22.6123815 30.9676491,22.364739 30.9897276,22.0994304 C30.9964786,21.8696151 30.9090792,21.6477947 30.7496923,21.4902186 C30.7503645,21.467328 30.7421883,21.4451262 30.7270262,21.4286709 C30.711864,21.4122155 30.6910071,21.4029079 30.6692067,21.4028684 L27.7900261,18.2696459 C27.1504056,17.5734571 26.1900865,18.1822956 26.1900865,19.226952 L26.1900865,21.2287279 L19.7896173,21.2287279 C19.3534907,21.2684239 19.0121565,21.6401451 18.9900917,22.0994304 C19.0123383,22.558533 19.3536467,22.929987 19.7896173,22.969573 Z M30.1905535,24.9742706 L19.7103849,24.9742706 C19.6218614,24.962588 19.5331891,24.9947221 19.4703458,25.0612587 C19.390392,25.0612587 19.390392,25.1482468 19.3104381,25.1482468 C19.1262222,25.3313436 19.0123611,25.5790959 18.9904452,25.8445251 C18.9837968,26.0742412 19.0711891,26.2959327 19.2304843,26.4534419 C19.2298128,26.4762041 19.2379276,26.498285 19.2529847,26.5146668 C19.2680418,26.5310486 19.2887625,26.5403402 19.3104381,26.54043 L22.1905523,29.6746155 C22.8301828,30.370147 23.790517,29.7612302 23.790517,28.7168129 L23.790517,26.7147796 L30.1905535,26.7147796 C30.626531,26.6751885 30.9678448,26.3036868 30.9900917,25.8445251 C30.9678448,25.3853634 30.626531,25.0138617 30.1905535,24.9742706 Z" stroke-opacity="0" stroke="#979797" fill="#98c379" fill-rule="nonzero"></path>
                </svg>
                <svg v-show="read_tags_display_mode === 2" width="16px" height="16px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path d="M11.79226,1 C12.8091664,1 13.789012,1.1907499 14.7317602,1.57206698 C15.6746547,1.95342059 16.5114835,2.4777544 17.2424295,3.14506838 C17.9733756,3.81252857 18.5611952,4.59109809 19.0061808,5.48088666 C19.4511299,6.37082141 19.6734948,7.32413231 19.6734948,8.34103871 L19.6734948,13.0445461 L15.828161,13.0445461 L15.828161,9.23097343 C15.828161,7.89619925 15.4521436,6.85809434 14.699999,6.11643944 C13.9478911,5.37496727 12.9362843,5.00417636 11.6651421,5.00417636 C10.5209717,5.00417636 9.59942193,5.37496727 8.90023712,6.11643944 C8.20101573,6.85809437 7.85156953,7.89619925 7.85156953,9.23097343 L7.85156953,13.1080319 L3.84724698,13.1080319 L3.84724698,8.34103871 C3.84724698,7.32413231 4.04852305,6.37082137 4.45107515,5.48088666 C4.85362725,4.59109813 5.4098319,3.81252857 6.11957942,3.14506838 C6.82932694,2.47775437 7.66615579,1.95342059 8.63010251,1.57206698 C9.59408577,1.1907499 10.6480896,1 11.79226,1 L11.79226,1 Z M23.8347468,22.6737795 L23.8347468,25.4068137 L23.8347468,26.9004669 C23.8347468,27.4723877 23.7342001,28.01273 23.5328875,28.5212015 C23.3316114,29.029673 23.0561772,29.4639497 22.7065848,29.8240683 C22.3569924,30.1843696 21.9439142,30.47033 21.4671673,30.6821322 C20.990457,30.8941172 20.4661232,31 19.8940563,31 L3.81357265,31 C3.24150567,31 2.72247151,30.8994533 2.25632392,30.6981407 C1.79028598,30.4968647 1.38769734,30.2214304 1.04866762,29.8718381 C0.709747554,29.5222456 0.450139077,29.1143574 0.270098068,28.6483194 C0.0900570604,28.1821353 -1.49213975e-13,27.6843362 -1.49213975e-13,27.1546662 L-1.49213975e-13,17.0487224 C-1.49213975e-13,16.4556032 0.206612228,15.9576213 0.619690493,15.5551057 C1.0328053,15.1525536 1.51481521,14.9512776 2.06572021,14.9512776 L21.7373019,14.9512776 C22.3305674,14.9512776 22.8283665,15.1525536 23.2309186,15.5551057 C23.6334707,15.9576213 23.8347468,16.4556032 23.8347468,17.0487224 L23.8347468,22.6737795 L23.8347468,22.6737795 Z" fill="#ccc" fill-rule="nonzero"></path>
                    <path d="M19.7995256,22.9976613 L30.2798852,22.9976613 C30.3684015,23.0092843 30.4570486,22.977163 30.5199205,22.9106844 C30.5998731,22.9106844 30.5998731,22.8237074 30.6798257,22.8237074 C30.8637971,22.6404698 30.9775574,22.3928273 30.9996359,22.1275187 C31.0063869,21.8977035 30.9189875,21.6758831 30.7596006,21.5183069 C30.7602728,21.4954163 30.7520966,21.4732146 30.7369345,21.4567592 C30.7217723,21.4403039 30.7009154,21.4309963 30.679115,21.4309567 L27.7999344,18.2977342 C27.1603139,17.6015455 26.1999948,18.210384 26.1999948,19.2550403 L26.1999948,21.2568162 L19.7995256,21.2568162 C19.363399,21.2965122 19.0220648,21.6682334 19,22.1275187 C19.0222466,22.5866214 19.363555,22.9580753 19.7995256,22.9976613 Z M30.2004618,25.002359 L19.7202932,25.002359 C19.6317697,24.9906763 19.5430974,25.0228104 19.4802541,25.0893471 C19.4003003,25.0893471 19.4003003,25.1763352 19.3203464,25.1763352 C19.1361305,25.3594319 19.0222694,25.6071843 19.0003535,25.8726134 C18.9937051,26.1023295 19.0810974,26.3240211 19.2403926,26.4815302 C19.2397211,26.5042924 19.2478359,26.5263733 19.262893,26.5427551 C19.2779501,26.559137 19.2986708,26.5684285 19.3203464,26.5685183 L22.2004606,29.7027038 C22.8400911,30.3982354 23.8004253,29.7893186 23.8004253,28.7449012 L23.8004253,26.7428679 L30.2004618,26.7428679 C30.6364393,26.7032769 30.9777531,26.3317751 31,25.8726134 C30.9777531,25.4134517 30.6364393,25.04195 30.2004618,25.002359 Z" stroke-opacity="0" stroke="#979797" fill="#98c379" fill-rule="nonzero"></path>
                </svg>
        </button>

        <button :disabled="!editable" type="button" @click.stop="$clickToggle('edit')"
            title="编辑模式"
            class="op-icon icon-btn" aria-hidden="true">
            <svg t="1587538645109" class="edit-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3796" width="200" height="200"><path d="M64.5 927.7c-3.7 18.7 13.1 35.5 31.8 31.8l203.8-48.6c7.5-1.9 13.1-5.6 16.8-9.3l3.7-3.7c3.7-3.7 5.6-16.8-1.9-24.3L150.5 705.2c-7.5-7.5-20.6-5.6-24.3-1.9l-3.7 3.7c-5.6 5.6-7.5 11.2-9.3 16.8L64.5 927.7z m635.7-794.6c-7.5 7.5-7.5 18.7 0 26.2l164.5 164.5c7.5 7.5 18.7 7.5 26.2 0l46.7-46.7c29.9-28 29.9-72.9 0-102.8l-87.9-87.9c-29.9-29.9-76.7-29.9-106.6 0l-42.9 46.7zM202.8 651l166.4 166.4c7.5 7.5 18.7 7.5 26.2 0l415.1-416.9c7.5-7.5 7.5-18.7 0-26.2L645.9 209.8c-7.5-7.5-18.7-7.5-26.2 0L202.8 626.7c-7.4 7.5-7.4 18.7 0 24.3z" p-id="3797" fill="#ccc"></path></svg>
        </button>

        <button :disabled="!editable" type="button" @click.stop="$clickToggle('compared')"
            title="对照模式"
            class="op-icon fa fa-mavon-columns" aria-hidden="true">
        </button>
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
        },
        // 加密语法内容
        encryption: {
            type: String,
            default: ''
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
            link_type: 'link',
            read_tags_display_mode: 0,
            read_mode_labels: [
                '隐藏和预览同时显示',
                '隐藏内容',
                '预览内容'
            ]
        }
    },
    watch: {
        read_tags_display_mode(newVal) {
            this.$emit('read_tags_display_mode', newVal);
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
            document.querySelector('#_toolbar-file').setAttribute("type", "text");

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
            document.querySelector('#_toolbar-file').setAttribute("type", "file");
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
        $clickEncryption(_type) {
            // 让父节点来绑定事件并
            if (this.editable) {
                this.$emit('toolbar_left_click', _type, {
                    string: this.encryption
                });
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
.task-icon,
.line-icon,
.edit-icon,
.lock-icon
    position: absolute
    top: 5px
    left: 5px
    font-size: 16px
    width: 1em
    height: 1em

.v-left-item 
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    width: 100%;
    box-sizing border-box
    .op-icon
        margin: 0 2px;
    .toolbar-left,
    .toolbar-right
        overflow: hidden;
        display: flex;
        align-items: center;
    .toolbar-left
        width: calc(100% - 80px)
        .toolbar-btn
            min-width 400px
            overflow: hidden;
            display: flex;
            align-items: center;

    .toolbar-right
        min-width 80px
        justify-content flex-end
    .toolbar-line
        border-left: 1px solid #4d4d4d
        height 22px
        margin 0 6px
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
