<template>
  <div class="pdf_modu_wrap">
    <div class="pdf_modu">
      <template v-for="item in pageNum" :key="item" class="pdf-page">
        <canvas :id="`pdf-canvas-${item}`"></canvas>
      </template>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, nextTick, onMounted } from "vue";
const PDF = require("pdfjs-dist");
PDF.GlobalWorkerOptions.workerSrc = "/pdf_viewer.js";
export default {
  name: "PdfComp",
  props: {
    url: {
      type: String,
      default:
        "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf",
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      url: "",
      pageNum: 0,
      pdfCtx: null,
    });
    onMounted(() => {
      if (props.url) {
        state.url = props.url;
        loadingTaskPdf(state.url);
      }
    });
    const loadingTaskPdf = (url) => {
      const loadingTask = PDF.getDocument(url);
      console.log(loadingTask);
      loadingTask.promise.then((pdf) => {
        state.pdfCtx = pdf;
        state.pageNum = pdf.numPages;

        nextTick(() => {
          renderPdf();
        });
      });
    };
    const renderPdf = (num = 1) => {
      state.pdfCtx.getPage(num).then((page) => {
        console.log(page);
        // 获取元素
        const canvas = document.getElementById(`pdf-canvas-${num}`);
        const ctx = canvas.getContext("2d");
        // 设置缩放值
        const viewport = page.getViewport(1.4);
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        page.render({
          canvasContext: ctx,
          viewport: viewport,
        });
        //是否达到最大页数
        if (num < state.pageNum) {
          renderPdf(num + 1);
        }
      });
    };
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style scoped lang="less">
.pdf_modu_wrap {
  margin: 0 auto;
  width: 80%;
  height: 600px;
  overflow-y: auto;
  box-shadow: 0 0 10px 10px #cccccc4d;
  .pdf_modu {
    width: 100%;
    height: 100%;
    canvas {
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
