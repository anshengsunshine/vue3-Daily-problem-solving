<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!--
      allowClear : 支持清除		false:不清除	
      mode :	设置 Select 的模式为多选或标签	'multiple' | 'tags' | 'combobox'
      show-search 	可输入关键词后，对下拉框数据进行搜索
      popupScroll ： 下拉列表滚动时的回调
      change ： 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数
      dropdownVisibleChange ： 展开下拉菜单的回调
     -->
    <a-select
      :allowClear="true"
      mode="multiple"
      style="width: 200px"
      placeholder="请选择"
      showArrow
      show-search
      @popupScroll="handlePopupScroll"
      @change="handleChange"
      @dropdownVisibleChange="handleDropdownVisibleChange"
    >
      <a-select-opt-group v-for="item in showList" :key="item">
        <template #label>
          <span> {{ item.letter }} </span>
        </template>
        <a-select-option
          v-for="item in item.letter_arr"
          :key="item"
          :value="item"
          >{{ item }}</a-select-option
        >
      </a-select-opt-group>
    </a-select>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import debounce from "lodash/debounce";
/**
 * all_Data: 总数据
 * showList：用来展示在 select 下拉框中的数据
 * handlePopupScroll：select 下拉框中的滚动条 滚动时 的回调，做防抖处理
 * handleDropdownVisibleChange：select 下拉框 展开时 的回调监听，open===true，即展开下拉框
 * loadMoreData：滚动条滚动时，showList加载 all_Data 中的数据，更新下拉框的数据
 * handleChange：获取 点击选中的 数据
 * 
*/
export default {
  name: "Home",
  setup() {
    const home_reac = reactive({
      all_Data: [
        {
          letter: "A",
          letter_arr: [
            "a_1",
            "a_2",
            "a_3",
            "a_4",
            "a_5",
            "a_6",
            "a_7",
            "a_8",
            "a_9",
            "a_10",
          ],
        },
        {
          letter: "B",
          letter_arr: [
            "b_1",
            "b_2",
            "b_3",
            "b_4",
            "b_5",
            "b_6",
            "b_7",
            "b_8",
            "b_9",
            "b_10",
          ],
        },
        {
          letter: "C",
          letter_arr: [
            "c_1",
            "c_2",
            "c_3",
            "c_4",
            "c_5",
            "c_6",
            "c_7",
            "c_8",
            "c_9",
            "c_10",
          ],
        },
        {
          letter: "D",
          letter_arr: [
            "d_1",
            "d_2",
            "d_3",
            "d_4",
            "d_5",
            "d_6",
            "d_7",
            "d_8",
            "d_9",
            "d_10",
          ],
        },
        {
          letter: "E",
          letter_arr: [
            "e_1",
            "e_2",
            "e_3",
            "e_4",
            "e_5",
            "e_6",
            "e_7",
            "e_8",
            "e_9",
            "e_10",
          ],
        },
      ],
      showList: [],
    });

    // select - 滚动条 回调 - select数据请求
    const handlePopupScroll = debounce(function () {
      loadMoreData(home_reac.all_Data);
    }, 400);

    // 下拉框打开时 的 回调
    const handleDropdownVisibleChange = (open) => {
      if (open) {
        // 下拉框打开时重置展示的数据
        home_reac.showList = home_reac.all_Data.slice(0, 1);
      }
    };

    // 更新下拉框 展示  的 数据
    const loadMoreData = (dataList) => {
      // 已渲染的下拉列表长度
      const length = home_reac.showList.length;
      // 当前数据源的长度
      const total = dataList.length;
      // 新加载的数据
      let addList = [];
      if (length < total) {
        if (length + 1 <= total) {
          addList = dataList.slice(length, length + 1);
        } else {
          addList = dataList.slice(length, length + (total % 1));
        }
        // 更新下拉框展示的数据
        home_reac.showList = home_reac.showList.concat(addList);
      }
    };

    //数据 筛选
    const handleChange = (item) => {
      console.log("数据筛选", item);
    };

    return {
      ...toRefs(home_reac),
      handlePopupScroll,
      handleChange,
      handleDropdownVisibleChange,
    };
  },
};
</script>
