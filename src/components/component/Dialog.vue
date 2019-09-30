<template>
  <!-- 弹出层 -->
  <van-dialog v-model="showManagement" title="用户管理" show-cancel-button>
    <van-cell-group>
      <van-field
        v-model="message"
        label="用户名"
        type="textarea"
        placeholder="请输入用户名"
        rows="1"
        autosize
        :value="message"
      />
      <div class="sexBox">
        <div class="selectSex">性别</div>
        <van-radio-group v-model="sex" class="sex">
          <van-radio name="1">男</van-radio>
          <van-radio name="2">女</van-radio>
        </van-radio-group>
      </div>

      <van-field
        v-model="message"
        label="部门"
        type="textarea"
        placeholder="请输入部门"
        rows="1"
        autosize
        :value="message"
      />
      <van-field
        v-model="message"
        label="电话"
        type="textarea"
        placeholder="请输入电话"
        rows="1"
        autosize
        :value="message"
      />
      <van-field
        v-model="message"
        label="手机号"
        type="textarea"
        placeholder="请输入手机号"
        rows="1"
        autosize
        :value="message"
      />
      <van-field
        v-model="message"
        label="邮箱"
        type="textarea"
        placeholder="请输入邮箱"
        rows="1"
        autosize
        :value="message"
      />
    </van-cell-group>
  </van-dialog>
</template>

<script>
export default {
  props: ["showManagement"],
  data() {
    return {
      message: null,
    };
  }
};
</script>