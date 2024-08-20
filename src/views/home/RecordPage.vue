<template>
    <div class="record">
        <div class="nav">
            <router-link to="/Home/OrePage">
                <div class="lesfx">
                    < </div>
            </router-link>
            <div class="sdacx">{{$t('record.record1')}}</div>
        </div>
        <div class="rlii">
            <vue-hash-calendar :theme-color="themeColor" today-class-name="today-class-name"
                :mark-date="ismark" :show-week-view="showweek" format="YY.MM/DD" @change="handleChange">
                <template #action>
                    <div class="timeas">{{ isshowday }}</div>
                    <div class="sac" @click="showweek = !showweek">
                        {{ showweek ? $t('my.my7') : $t('my.my8')  }}<img src="@/assets/my/xa.png" alt=""
                            :style="{ transform: `rotate(${showweek ? 360 : 180}deg)` }">
                    </div>
                </template>
            </vue-hash-calendar>
        </div>
        <div class="text1ac">
            <div>
                <div class="title">{{$t('record.record2')}}$DBTC</div>
                <div class="num">1</div>
            </div>
            <div>
                <div class="title">{{$t('record.record3')}}</div>
                <div class="num">5</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
let showweek = ref(false)
let isshowday = ref('2024.08/20')
let themeColor = ref({
    'main-color': '#FFFFFF',
    'main-font-color': '#FFFFFF',
    'disabled-bg-color': 'black',
    // 'disabled-font-color': '#FFFFFF',
})
let ismark = ref([
    {
        color: '#FF4040',
        date: [
            `2024/08/17`,
        ],
    },
    {
        color: '#C2FF40',
        date: [
            `2024/08/18`,
            `2024/08/19`,
        ],
    }
])
const handleChange = (val) => {
    isshowday.value = val
}
</script>

<style lang="scss" scoped>
.record {
    .text1ac {
        position: relative;
        padding: 20px;
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 16px 16px 16px 16px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        display: flex;
        flex-wrap: wrap;
        margin: 20px 0 5px 0;
        margin:  24px;
        >div {
            flex-grow: 1;
            width: 50%;
        }
        .num {
            font-weight: 600;
            font-size: 20px;
            color: #C2B3FF;
            line-height: 45px;
        }

        .title {
            font-weight: 400;
            font-size: 12px;
            color: #D6D6D6;
            line-height: 45px;
        }
    }

    .rlii {
        ::v-deep {
            .calendar_title {
                background-color: transparent;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
            }

            .hash-calendar .calendar_content {
                background-color: transparent;
            }

            .hash-calendar .calendar_title {
                border: none;
            }

            .hash-calendar .calendar_group_li {
                background-color: transparent;
            }

            .calendar_week {
                background-color: transparent;
            }

            .hash-calendar .calendar_group_li .calendar_day {
                background-color: #292929;
                border-radius: 5px;
                padding: 0 2px;
            }

            .hash-calendar .calendar_group_li .calendar_day_checked {
                background-color: #CDF202;
                color: #1B1B1D;
            }

            .calendar_dot {
                width: 6px;
                height: 6px;
                margin: 5px 0;
                left: 47%;
            }
        }

        .sac {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            font-weight: 500;
            font-size: 11px;
            color: #D6D6D6;
            display: flex;
            align-items: center;

            img {
                width: 8px;
                height: 8px;
                margin-left: 5px;
                transition: all 1s;
            }
        }

        .timeas {
            padding: 10px 0;
            color: white;
        }
    }

    .nav {
        position: sticky;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px;
        position: relative;
        color: #FFFFFF;

        .lesfx {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translate(0, -50%);
            font-weight: 600;
            font-size: 18px;
            color: white;
        }

        .sdacx {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-weight: 600;
            font-size: 18px;

            line-height: 18px;
        }
    }
}
</style>
